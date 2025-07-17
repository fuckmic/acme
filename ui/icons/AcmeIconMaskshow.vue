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
		name: "AcmeIconMaskshow",
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
				return `<svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M661.333 512a149.333 149.333 0 1 1-298.666 0 149.333 149.333 0 0 1 298.666 0m-58.66 0a90.673 90.673 0 1 0-181.321 0 90.673 90.673 0 0 0 181.32 0" fill="${this.setColor}"/><path d="M89.064 525.434a30.04 30.04 0 0 1 0-26.868C168.374 339.846 335.36 192 512 192s343.65 147.822 422.96 306.566a29.95 29.95 0 0 1 0 26.868C855.65 684.154 688.64 832 512 832S168.375 684.178 89.064 525.434M299.837 691.76C366.47 743.083 440.125 773.339 512 773.339c71.924 0 145.554-30.256 212.187-81.578C786.7 643.608 839.948 579.145 875.861 512c-35.913-67.145-89.16-131.608-151.674-179.76C657.554 280.916 583.9 250.635 512 250.635c-71.875 0-145.554 30.257-212.163 81.579C237.3 380.392 184.077 444.855 148.139 512c35.937 67.145 89.16 131.608 151.698 179.76" fill="${this.setColor}"/></svg>`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-icon-svg {
		display: block;
	}
</style>