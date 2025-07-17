<template>
	<AcmePaper elevation="4" :sx="setSx">
		<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:12rpx;">
			<view @tap="$nav.navBack()">
				<AcmeIconBack />
			</view>
			<view class="acme-h5">{{title}}</view>
			<view style="margin-left: auto;">
				<AcmeInputSearchExpand :placeholder="`Search...`" />
			</view>
		</view>
	</AcmePaper>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import AcmePaper from '../common/AcmePaper.vue';
	import { cssVariableColor } from '../../utils/theme.js';
	import AcmeInputSearchExpand from '../inputs/AcmeInputSearchExpand.vue';
	import AcmeIconBack from '../icons/AcmeIconBack.vue';
	export default {
		name: "AcmeAppBarSub",
		components: { AcmePaper, AcmeInputSearchExpand, AcmeIconBack },
		props: {
			title: { type: String, default: '' }
		},
		data() {
			return {}
		},
		computed: {
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