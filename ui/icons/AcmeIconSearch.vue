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
		name: "AcmeIconSearch",
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
				return `<svg viewBox="0 0 1029 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M1002.42 997.218a90.62 90.62 0 0 1-128.636 0L696.317 819.175a447.347 447.347 0 1 1 198.394-372.084 446.4 446.4 0 0 1-70.398 241.848l178.235 179.195a91.773 91.773 0 0 1-.128 129.084M449.925 165.883a281.144 281.144 0 1 0 279.8 281.144 280.504 280.504 0 0 0-279.8-281.144m144.7 467.186a12.1 12.1 0 0 1-7.617 5.184 12.8 12.8 0 0 1-6.847-24.255 211.19 211.19 0 0 0 65.662-241.337 12.2 12.2 0 0 1-1.216-5.568 12.8 12.8 0 0 1 24.127-5.184 236.22 236.22 0 0 1-74.11 270.968z" fill="${this.setColor}"/></svg>`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-icon-svg {
		display: block;
	}
</style>