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
		name: "AcmeIconBack",
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
				return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M471.893 149.333a42.667 42.667 0 0 0-73.258-29.781L54.74 472.533a42.667 42.667 0 0 0-.768 58.71l343.894 372.352a42.667 42.667 0 0 0 73.984-28.928V683.989c56.917-5.248 116.821-1.365 179.882 11.99 65.835 13.994 150.528 76.032 253.91 202.24a42.667 42.667 0 0 0 75.477-31.36c-15.445-152.32-73.984-281.302-176.17-384.854-92.758-93.994-204.374-146.432-333.1-156.586V149.333z" fill="${this.setColor}" fill-opacity=".85"/></svg>`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-icon-svg {
		display: block;
	}
</style>