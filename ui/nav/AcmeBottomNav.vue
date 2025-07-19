<template>
	<view :class="[`acme-bottom-nav`,variant]">
		<AcmePaper :elevation="elevation" :sx="setSx">
			<slot></slot>
		</AcmePaper>
	</view>
</template>

<script>
	import AcmePaper from '../common/AcmePaper.vue';
	export default {
		name: "AcmeBottomNav",
		components: { AcmePaper, },
		props: {
			elevation: {
				type: [Number, String],
				default: 4, // AppBar通常有一定海拔
				validator: (val) => val >= 0 && val <= 24,
			},
			// 外部组件样式覆盖
			variant: { type: String, default: '' },
		},

		computed: {
			setSx() {
				return {
					width: '100%',
					height: '100%',
					borderRadius: '0',
					overflow: 'hidden',
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
					padding: '24rpx var(--acme-spacing-sm)',
					backgroundImage: 'none'
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_variables.scss';

	.acme-bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
</style>