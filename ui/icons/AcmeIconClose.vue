<template>
	<view :class="[`acme-icon-svg`,variant]" :style="setStyle" @tap="onTap">
		<AcmeSvg :svgString="setSvg" :size="size" />
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import AcmeSvg from '../common/AcmeSvg.vue';
	import { cssVariableColor } from '../../utils/theme.js';
	export default {
		name: "AcmeIconClose",
		components: { AcmeSvg },
		props: {
			svg: { type: String, default: undefined },
			size: { type: Number, default: 48 },
			color: { type: String, default: 'acme-theme-color' },
			variant: { type: String, default: '' },
		},
		computed: {
			setColor() { return cssVariableColor(this.color, acmeCfg.theme) },
			setStyle() {
				return { width: `${this.size}rpx`, height: `auto` }
			},
			setSvg() {
				return this.svg || this.svgData();
			}
		},
		methods: {
			onTap() { this.$emit('click') },
			svgData() {
				return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0m0 960C262.4 960 64 761.6 64 512S262.4 64 512 64s448 198.4 448 448-198.4 448-448 448" fill="${this.setColor}"/><path d="M556.8 512 736 332.8c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0L512 467.2 332.8 288c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8L467.2 512 288 691.2c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8 691.2 736c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8z" fill="${this.setColor}"/></svg>`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-icon-svg {
		display: block;
	}
</style>