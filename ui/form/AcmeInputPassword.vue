<template>
	<view :class="['acme-input-base', customClass]">
		<view v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</view>
		<input :value="value" :password="isMask" :placeholder="placeholder" @input="onInput" placeholder-class="placeholder"
			:disabled="disabled" autocomplete="off"></input>
		<view class="clear" @tap="onClear">
			<AcmeSvg v-show="showDel" :svgString="svgData" :size="24" />
		</view>
		<view class="clear" @tap="onMask()">
			<AcmeSvg :svgString="svgMask" :size="40" />
		</view>
		<view v-if="$slots.suffix" class="suffix">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import { cssVariableColor } from '../../utils/theme.js';
	import { svgClose, svgMaskHide, svgMaskShow } from '../../utils/svg.js';
	import AcmeSvg from '../common/AcmeSvg.vue';
	export default {
		name: "AcmeInputPassword",
		components: { AcmeSvg },
		props: {
			value: { type: [String, Number], default: '' },
			placeholder: { type: String, default: '' },
			showClearIcon: { type: Boolean, default: true },
			disabled: { type: Boolean, default: false },
			customClass: { type: String, default: 'custom_class' },
		},
		data() {
			return {
				isMask: true,
			};
		},
		computed: {
			svgData() {
				const _color = cssVariableColor(`acme-svg-close`, acmeCfg.theme)
				return svgClose(_color)
			},
			svgMask() {
				const _color = cssVariableColor(`acme-mask-color`, acmeCfg.theme);
				return this.isMask ? svgMaskHide(_color) : svgMaskShow(_color);
			},
			showDel() {
				return (this.value !== null && this.value !== '' && String(this.value).length > 0) && this.showClearIcon
			},
		},
		methods: {
			onInput(event) {
				const inputValue = event.detail.value.trim();
				const filteredValue = inputValue.replace(/\s/g, '');
				this.$emit('input', filteredValue);
			},
			onClear() { this.$emit('input', ''); },
			onMask() { this.isMask = !this.isMask; }
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