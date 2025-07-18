<template>
	<AcmePaper elevation="4" :sx="setSx">
		<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:12rpx;">
			<AcmeIcon icon="sun" :size="64" />
			<view class="acme-h5">{{`Name`}}</view>
			<view style="margin-left: auto;" @tap="onTheme()">
				<AcmeIconDark v-if="isDark" />
				<AcmeIconLight v-else />
			</view>
		</view>
	</AcmePaper>
</template>

<script>
	import { acmeSetTheme } from '../../config.js';
	import AcmePaper from '../common/AcmePaper.vue';
	import AcmeIcon from '../common/AcmeIcon.vue';
	import AcmeIconDark from '../icons/AcmeIconDark.vue';
	import AcmeIconLight from '../icons/AcmeIconLight.vue';
	export default {
		name: "AcmeAppBar",
		components: { AcmePaper, AcmeIcon, AcmeIconDark, AcmeIconLight },
		data() {
			return {
				isDark: true,
			}
		},
		computed: {
			setSx() {
				return {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 9, // 引用 z-index 变量
					backgroundImage: 'none',
					backgroundColor: `var(--acme-bg-card)`,
				}
			},
		},
		methods: {
			onTheme() {
				this.isDark = !this.isDark;
				const tmp = this.isDark ? `dark` : `light`;
				acmeSetTheme(tmp);
				uni.navigateTo({
					url: `/pages/index`
				})
			}
		}
	}
</script>

<style>
</style>