<template>
	<view :class="[`acme-input-base`, variant]">
		<view v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</view>
		<input :value="value" type="text" :placeholder="placeholder" @input="onInput" placeholder-class="placeholder"
			@focus="onFocus" :disabled="disabled" autocomplete="off"></input>
		<view class="clear" @tap="onClear">
			<AcmeIconClose v-show="showDel" :size="32" />
		</view>
		<view v-if="$slots.suffix" class="suffix">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import AcmeIconClose from '../icons/AcmeIconClose.vue';
	export default {
		name: "AcmeInputText",
		components: { AcmeIconClose },
		props: {
			value: { type: [String, Number], default: '' },
			placeholder: { type: String, default: '' },
			showClearIcon: { type: Boolean, default: true },
			disabled: { type: Boolean, default: false },
			variant: { type: String, default: '' },
			// 是否可输入空格
			isSpace: { type: Boolean, default: false },
		},
		computed: {
			showDel() {
				return (this.value !== null && this.value !== '' && String(this.value).length > 0) && this.showClearIcon
			},
		},
		methods: {
			onInput(event) {
				const inputValue = event.detail.value.trim();
				// 如果不可输入空格，则将空格移除
				const filteredValue = this.isSpace ? inputValue : inputValue.replace(/\s/g, '');
				this.$emit('input', filteredValue);
			},
			onClear() { this.$emit('input', ''); },
			// 输入框获取焦点时
			onFocus() {
				// this.isFocused = true;
				this.$emit('focus')
			},

		},
	}
</script>


<style lang="scss" scoped>
	@import '../../styles/_acme-input.scss';

	// .acme-input-base {
	// 	display: flex;
	// 	align-items: center;
	// 	flex-wrap: nowrap;
	// 	gap: 20rpx;
	// 	padding: 28rpx 0;
	// 	height: 100rpx;
	// 	padding: 0 32rpx;
	// 	box-sizing: border-box;
	// }

	/* input 元素样式 */
	// .acme-input-base input {
	// 	flex: 1;
	// 	color: var(--acme-input-color);
	// 	height: 100%;
	// 	line-height: 1;
	// 	min-height: unset;
	// 	border: none;
	// 	outline: none;
	// 	font-size: 28rpx;
	// 	background-color: transparent !important;
	// 	appearance: none !important;
	// 	padding: 0;
	// }

	.suffix {
		margin-left: auto;
	}

	.clear {
		cursor: pointer;
		margin-left: auto;
	}

	// .custom_class {
	// 	border: 1rpx solid var(--acme-input-border-color);
	// 	background-color: transparent;
	// 	border-radius: 20rpx;
	// }
</style>