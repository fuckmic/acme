<template>
	<view class="copyright">
		<view>{{copyright}}</view>
		<view style="font-size: small;">{{version}}</view>
	</view>
</template>

<script>
	export default {
		name: "AcmeCopyrightVersion",
		props: {
			appName: { type: String, default: '' },
			version: { type: String, default: '' },
		},
		computed: {
			copyright() {
				const currentDate = new Date();
				const currentYear = currentDate.getFullYear();
				return this.appName + ` © ` + currentYear;
			},
		},
	}
</script>

<style lang="scss" scoped>
	.copyright {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24rpx;
		color: var(--acme-copyright-color);
	}
</style>