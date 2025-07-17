<template>
	<view :class="['acme-input-base', customClass]">
		<view v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</view>
		<input type="text" :value="displayValue" :placeholder="placeholder" :selection-start="cursorPosition"
			:selection-end="cursorPosition" placeholder-class="placeholder" @input="onInput" @focus="onFocus" @blur="onBlur"
			:disabled="disabled" autocomplete="off" />
		<view class="clear" @tap="onClear">
			<!-- <AcmeSvg v-show="showDel" :svgString="svgData" :size="24" /> -->
		</view>
		<view v-if="$slots.suffix" class="suffix">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import {
		getLocaleSeparators,
		formatterFiat,
		parseFormattedNumber,
		formatCleanNumber
	} from '../../utils/formatter.js';
	export default {
		name: "AcmeInputFiat",
		components: {  },
		props: {
			value: { type: [String, Number], default: '' },
			placeholder: { type: String, default: '' },
			showClearIcon: { type: Boolean, default: true },
			disabled: { type: Boolean, default: false },
			locale: { type: String, default: () => acmeCfg.lgre },
			// 用于 'fiat' 类型，如 'USD', 'EUR'
			currency: { type: String, default: () => acmeCfg.currency },
			customClass: { type: String, default: 'custom_class' },
		},
		data() {
			return {
				displayValue: '', // 输入框中显示的格式化字符串
				rawValue: 0, // 参与计算的原始数值 (Number 类型)
				cursorPosition: -1, // 光标位置
				isFocused: false, // 标记输入框是否处于焦点状态
				lastInputValue: '', // 用于辅助判断用户输入变化和光标位置
			};
		},
		computed: {
			showDel() {
				return (this.value !== null && this.value !== '' && String(this.value).length > 0) && this.showClearIcon
			},
			// 缓存语言环境分隔符
			localeSeparators() { return getLocaleSeparators(this.locale); }
		},
		watch: {
			// 监听 value prop 的变化，更新内部状态
			value: {
				immediate: true, // 立即执行一次，确保初始化
				handler(newVal) {
					const numVal = parseFloat(newVal);
					// 如果外部传入的值是 0 且之前 rawValue 也是 0，或者传入的是空值/无效值
					// 并且当前组件没有聚焦，就显示空字符串
					if ((newVal === 0 || newVal === '0' || newVal === '') && this.rawValue === 0 && !this.isFocused) {
						this.rawValue = 0;
						this.displayValue = ''; // 初始或被清空时显示为空
					} else if (!isNaN(numVal) && numVal !== this.rawValue) {
						this.rawValue = numVal;
						if (!this.isFocused) {
							this.displayValue = formatterFiat(this.rawValue, this.locale, this.currency);
						}
					} else if (newVal === '' || newVal === null || isNaN(numVal)) {
						this.rawValue = 0;
						if (!this.isFocused) {
							this.displayValue = '';
						}
					}
				}
			},
		},
		// mounted 生命周期钩子，用于初始化值并确保格式正确
		mounted() {
			// // 确保在组件挂载后，初始值被正确格式化显示
			// this.displayValue = formatterFiat(this.rawValue, this.locale, this.currency);
			// this.lastInputValue = this.displayValue;
			// 确保在组件挂载后，如果初始 value 为 0，displayValue 保持为空
			if (this.value === 0 || this.value === '0' || this.value === '' ||
				this.value === null || isNaN(parseFloat(this.value))) {
				this.rawValue = 0;
				this.displayValue = '';
			} else {
				this.rawValue = parseFloat(this.value);
				this.displayValue = formatterFiat(this.rawValue, this.locale, this.currency);
			}
			this.lastInputValue = this.displayValue;
		},
		methods: {
			onClear() { this.$emit('input', ''); },
			onInput(event) {
				const oldValue = this.lastInputValue; // 上一次输入框的完整值
				const oldCursorPosition = event.detail.cursor; // 当前光标位置（输入前的光标位置）

				let newValue = event.detail.value.trim();
				newValue = newValue.replace(/[^0-9.,]/g, '');

				// 如果输入内容与上一次完全相同，通常是光标移动等操作，无需处理
				if (newValue === oldValue) {
					this.lastInputValue = newValue; // 更新lastInputValue
					this.cursorPosition = oldCursorPosition;
					return;
				}

				// 解析用户输入的字符串，得到纯数字字符串（小数点为 '.'） 处理输入的句点和逗号
				const cleanNumberStr = parseFormattedNumber(newValue);
				let newRawValue = parseFloat(cleanNumberStr);

				if (isNaN(newRawValue) && cleanNumberStr !== '' && cleanNumberStr !== '.') {
					// 如果解析失败但不是空或'.'，则可能是无效字符被移除，恢复旧值并保持光标
					this.displayValue = oldValue;
					this.lastInputValue = oldValue;
					this.cursorPosition = oldCursorPosition;
					return;
				} else if (isNaN(newRawValue) && (cleanNumberStr === '' || cleanNumberStr === '.')) {
					// 如果是空或只有小数点，允许显示
					newRawValue = 0; // 实际值设为0
				}

				// 格式化为显示字符串 (在焦点状态下，显示不带千分符的干净格式)
				let formattedDisplayValue = formatCleanNumber(newRawValue, this.locale);

				// 计算光标位置 找出本次输入发生变化的起始位置
				let start = 0;
				while (start < oldValue.length && start < newValue.length && oldValue[start] === newValue[start]) {
					start++;
				}
				// 找出本次输入发生变化的结束位置 (从末尾向前找)
				let oldEnd = oldValue.length - 1;
				let newEnd = newValue.length - 1;
				while (oldEnd >= start && newEnd >= start && oldValue[oldEnd] === newValue[newEnd]) {
					oldEnd--;
					newEnd--;
				}

				// 获取改变后的子字符串
				const changedPart = newValue.substring(start, newEnd + 1);

				// 计算新的光标位置
				let newCursorPosition = start + changedPart.length;

				// 如果是删除操作，光标可能需要回退
				if (newValue.length < oldValue.length) {
					newCursorPosition = oldCursorPosition;
				} else {
					// 如果是插入操作，考虑格式化字符的增加
					// 这是一个简化的光标调整逻辑，对于复杂格式化可能会有偏差
					// 更精确的需要逐字符对比新旧字符串并计算光标经过的格式字符数量
					const addedChars = formattedDisplayValue.length - cleanNumberStr.length; // 比如千分符和小数点
					const currentRawCursorPosition = parseFormattedNumber(newValue.substring(0, oldCursorPosition)).length;

					// 重新计算光标在格式化后的字符串中的位置
					let tempFormatted = formattedDisplayValue;
					// 计算当前纯数字字符串中的光标位置，在格式化后字符串中的对应位置
					let charCount = 0;
					let formattedCursorPos = 0;
					const cleanLen = cleanNumberStr.length;

					for (let i = 0; i < tempFormatted.length; i++) {
						const char = tempFormatted[i];
						if (char >= '0' && char <= '9') {
							charCount++;
						} else if (char === this.localeSeparators.decimal) {
							// 小数点也算一个纯数字字符的位置
							charCount++;
						}

						if (charCount > currentRawCursorPosition) {
							formattedCursorPos = i;
							break;
						}
						formattedCursorPos = i + 1; // 确保在末尾时光标正确
					}
					newCursorPosition = formattedCursorPos;

					// 修正小数点后的精度，防止光标超出小数位
					const [intPart, decPart] = formattedDisplayValue.split(this.localeSeparators.decimal);
					if (decPart && decPart.length > this.precision) {
						newCursorPosition = Math.min(newCursorPosition, formattedDisplayValue.indexOf(this.localeSeparators
							.decimal) + this.precision + 1);
					}
				}

				// 确保光标不会超出字符串末尾或跑到开头之前
				if (newCursorPosition > formattedDisplayValue.length) {
					newCursorPosition = formattedDisplayValue.length;
				}
				if (newCursorPosition < 0) {
					newCursorPosition = 0;
				}

				// 更新组件状态和触发事件
				this.displayValue = formattedDisplayValue;
				this.rawValue = isNaN(newRawValue) ? 0 : newRawValue; // 如果无法解析为数字，原始值设为0

				// 更新用于下一次比对的输入框完整值
				this.lastInputValue = formattedDisplayValue;

				// 触发 v-model 更新
				this.$emit('update:value', this.rawValue);
				// 也可以触发一个额外的 input 事件
				this.$emit('input', this.rawValue);

				// 设置光标位置 Uniapp 的 selection-start/end 在 nextTick 中设置会更稳定
				this.$nextTick(() => {
					this.cursorPosition = newCursorPosition;
				});
			},

			// 输入框获取焦点时
			onFocus() {
				this.isFocused = true;
				// 获取焦点时，显示不带千分符的纯数字格式（带本地化小数点）
				this.displayValue = formatCleanNumber(this.rawValue, this.locale);
				// 聚焦时将光标置于末尾
				this.$nextTick(() => {
					this.cursorPosition = this.displayValue.length;
				});
			},

			// 输入框失去焦点时
			onBlur() {
				this.isFocused = false;
				// 失去焦点时，重新格式化显示
				this.displayValue = formatterFiat(this.rawValue, this.locale, this.currency);
				this.cursorPosition = -1; // 失去焦点后重置光标位置
			}
		},
	}
</script>


<style lang="scss" scoped>
	.placeholder {
		color: var(--acme-input-placeholder-color);
		font-size: var(--acme-input-placeholder-size);
		font-weight: 300;
		line-height: inherit;
	}

	.acme-input-base {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: 20rpx;
		padding: 28rpx 0;
		height: 100rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
	}

	/* input 元素样式 */
	.acme-input-base input {
		flex: 1;
		color: var(--acme-input-color);
		height: 100%;
		line-height: 1;
		min-height: unset;
		border: none;
		outline: none;
		font-size: 28rpx;
		background-color: transparent !important;
		appearance: none !important;
		padding: 0;
	}

	.suffix {
		margin-left: auto;
	}

	.clear {
		cursor: pointer;
		margin-left: auto;
	}

	.custom_class {
		border: 1rpx solid var(--acme-input-border-color);
		background-color: transparent;
		border-radius: 20rpx;
	}
</style>