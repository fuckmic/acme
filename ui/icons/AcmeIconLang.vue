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
		name: "AcmeIconLang",
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
				return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 102.4a409.6 409.6 0 1 1 0 819.2 409.6 409.6 0 0 1 0-819.2m301.62 550.4h-128a523.8 523.8 0 0 1-91.034 181.658A333.47 333.47 0 0 0 813.619 652.85zm-475.24 0h-128a333.57 333.57 0 0 0 219.034 181.658 523.8 523.8 0 0 1-91.033-181.607zm267.111.051H418.51c18.841 57.703 49.92 111.36 93.44 161.28 43.622-49.92 74.7-103.577 93.542-161.28m-281.856-204.8H185.344a334.5 334.5 0 0 0 0 128h138.291a557.7 557.7 0 0 1 0-128m299.315 0h-221.9A477 477 0 0 0 396.8 512c0 21.811 1.434 43.162 4.25 64h221.9c2.816-20.838 4.25-42.189 4.25-64s-1.382-43.162-4.25-64zm215.706 0h-138.24a557.7 557.7 0 0 1-.051 128h138.24a334.5 334.5 0 0 0 .051-128m-409.242-258.56-9.574 2.56A333.67 333.67 0 0 0 210.432 371.2h128a523.8 523.8 0 0 1 91.034-181.658zM512 209.92l-7.731 8.909c-39.475 47.411-68.045 98.099-85.76 152.371H605.49c-18.84-57.754-49.97-111.411-93.49-161.331zm82.534-20.326 3.738 4.966c41.011 54.784 70.144 113.715 87.296 176.691h128a333.57 333.57 0 0 0-219.034-181.657" fill="${this.setColor}"/></svg>`;
			}
		}
	}
</script>

<style>
</style>