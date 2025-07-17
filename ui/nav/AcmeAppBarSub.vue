<template>
	<AcmePaper elevation="4" :sx="setSx">
		<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:12rpx;">
			<view @tap="$nav.navBack()">
				<AcmeSvg :svgString="svgDataBack" :size="48" />
			</view>
			<view class="acme-h5">{{$nav.keys.doc}}</view>
			<view style="margin-left: auto;">
				<AcmeSvg :svgString="svgDataSearch" :size="48" />
			</view>
		</view>
	</AcmePaper>
</template>

<script>
	import { acmeCfg, acmeSetTheme } from '../../config.js';
	import AcmePaper from '../common/AcmePaper.vue';
	import AcmeIcon from '../common/AcmeIcon.vue';
	import AcmeSvg from '../common/AcmeSvg.vue';
	import { svgBack, svgSearch } from '../../utils/svg.js';
	import { cssVariableColor } from '../../utils/theme.js'
	export default {
		name: "AcmeAppBarSub",
		components: { AcmePaper, AcmeIcon, AcmeSvg, },
		data() {
			return {}
		},
		computed: {
			setColor() { return cssVariableColor(`acme-theme-color`, acmeCfg.theme) },
			svgDataBack() { return svgBack(this.setColor) },
			svgDataSearch() { return svgSearch(this.setColor) },
			setSx() {
				return {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 9, // 引用 z-index 变量
					backgroundImage: 'none'
				}
			},
		},
		methods: {}
	}
</script>

<style>
</style>