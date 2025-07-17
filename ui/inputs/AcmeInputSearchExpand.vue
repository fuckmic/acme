<template>
	<view :class="['acme-input-base', variant, { 'is-active': isFocused }]" :style="dynamicWidthStyle">
		<view v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</view>
		<input :value="value" type="text" :placeholder="placeholder" placeholder-class="placeholder" @input="onInput"
			autocomplete="off" @focus="onFocus" @blur="onBlur"></input>
		<view class="clear" @tap="onClear">
			<AcmeSvg v-show="showDel" :svgString="svgData" :size="24" />
		</view>
		<view v-if="$slots.suffix" class="suffix">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import { cssVariableColor } from '../../utils/theme.js';
	import { svgClose } from '../../utils/svg.js';
	import AcmeSvg from '../common/AcmeSvg.vue';
	export default {
		name: "AcmeInputSearchExpand",
		components: { AcmeSvg },
		props: {
			value: { type: [String, Number], default: '' },
			placeholder: { type: String, default: '' },
			showClearIcon: { type: Boolean, default: true },
			variant: { type: String, default: 'custom_class' },
			// 新增 props，用于自定义活跃/非活跃宽度
			activeWidth: { type: String, default: '400rpx' },
			inactiveWidth: { type: String, default: '240rpx' }
		},
		data() {
			return {
				isFocused: false, // 新增状态，记录是否聚焦
			}
		},
		computed: {
			svgData() {
				const _color = cssVariableColor(`acme-svg-close`, acmeCfg.theme)
				return svgClose(_color)
			},
			showDel() {
				return (this.value !== null && this.value !== '' && String(this.value).length > 0) && this.showClearIcon
			},
			dynamicWidthStyle() {
				return {
					width: this.isFocused ? this.activeWidth : this.inactiveWidth
				};
			}
		},
		methods: {
			onInput(event) {
				console.log(`event:`, event);
				const inputValue = event.detail.value.trim();
				// const filteredValue = inputValue.replace(/\s/g, '');
				// this.$emit('input', filteredValue);
				this.$emit('input', inputValue);
			},
			onClear() { this.$emit('input', ''); },
			onFocus() {
				console.log('Input Focused!');
				this.isFocused = true;
				this.$emit('focus'); // 暴露 focus 事件
			},
			onBlur() {
				console.log('Input Blurred!');
				// uni-app 的 input 组件在某些场景下 (如点击非 input 区域，但焦点未完全移出)
				// 可能不会立即触发 blur。但对于点击页面空白处，通常是有效的。
				// 确保在 blur 时才设置宽度，避免在点击清除按钮时立即收缩
				// 可以延迟设置，给用户点击其他地方的时间
				// 如果值为空且非聚焦，则收缩
				if (!this.value && !this.isFocused) {
					// 仅在值为空时，且确定不是聚焦状态下才收缩
					this.isFocused = false;
				} else if (this.isFocused && !this.value) {
					// 如果聚焦，但值为空，也收缩
					this.isFocused = false;
				}
				// 更好的策略是：当用户点击input之外的任何地方时，都触发blur
				// 但是这里只关注input本身的blur
				this.$emit('blur'); // 暴露 blur 事件
			},
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
		height: 80rpx;
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
		border: none;
		border-radius: 8rpx;
		background-color: rgba(255, 255, 255, 0.15);
	}

	/* 可以添加聚焦时的样式，例如边框、阴影等 */
	.acme-input-base.is-active {
		border: 1rpx solid var(--acme-primary-color); // 活跃时边框
		// box-shadow: 0 0 8rpx rgba(0, 123, 255, 0.2); // 活跃时阴影
		// background-color: rgba(255, 255, 255, 0.25); // 活跃时背景可以更亮
	}
</style>