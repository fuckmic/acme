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
		name: "AcmeIconChecked",
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
				return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M810.667 128H213.333C166.187 128 128 166.187 128 213.333v597.334C128 857.813 166.187 896 213.333 896h597.334C857.813 896 896 857.813 896 810.667V213.333C896 166.187 857.813 128 810.667 128m-384 597.333L213.333 512l60.374-60.373 152.96 152.96L750.293 280.96l60.374 60.373z" fill="${this.setColor}"/></svg>`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-icon-svg {
		display: block;
	}
</style>