<template>
	<view :class="[`acme-icon-svg`,variant]" :style="setStyle" @tap="onTap">
		<AcmeSvg :svgString="setSvg" :size="size" />
	</view>
</template>

<script>
	import { acmeConfig } from '../../config.js';
	import AcmeSvg from '../common/AcmeSvg.vue';
	import { cssVariableColor } from '../../utils/theme.js';
	export default {
		name: "AcmeIconMaskhide",
		components: { AcmeSvg },
		props: {
			svg: { type: String, default: undefined },
			size: { type: Number, default: 48 },
			color: { type: String, default: 'acme-theme-color' },
			variant: { type: String, default: '' },
		},
		computed: {
			setColor() { return cssVariableColor(this.color, acmeConfig.theme) },
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
				return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M792.966 168.229 189.562 771.633l41.496 41.472L834.438 209.7zM512 832c-64.78 0-128.244-19.895-186.612-52.907l43.276-43.276c46.836 24.113 95.476 37.522 143.36 37.522 71.875 0 145.555-30.256 212.163-81.578C786.7 643.608 839.948 579.145 875.861 512a576.3 576.3 0 0 0-125.318-158.037l41.545-41.57c59.49 53.053 109.13 118.613 142.873 186.173a29.95 29.95 0 0 1 0 26.868C855.65 684.154 688.64 832 512 832M148.139 512a577.1 577.1 0 0 0 103.229 137.46l-41.448 41.496c-49.737-48.981-91.355-106.496-120.832-165.522a30.04 30.04 0 0 1 0-26.868C168.375 339.846 335.36 192 512 192c54.565 0 108.178 14.092 158.598 38.278l-44.422 44.373c-37.669-15.53-76.166-23.99-114.176-23.99-71.875 0-145.554 30.256-212.163 81.578C237.3 380.392 184.077 444.855 148.139 512" fill="${this.setColor}"/><path d="M512 661.333c-20.334 0-39.741-4.071-57.417-11.459l47.762-47.713a90.673 90.673 0 0 0 99.84-99.84l47.714-47.738A149.333 149.333 0 0 1 512 661.333M364.642 536.21l171.593-171.593A149.333 149.333 0 0 0 364.642 536.21" fill="${this.setColor}"/></svg>`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-icon-svg {
		display: block;
	}
</style>