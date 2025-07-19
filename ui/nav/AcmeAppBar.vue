<template>
	<view :class="[`acme-app-bar`,variant]">
		<AcmePaper :elevation="elevation" :sx="setSx">
			<slot></slot>
		</AcmePaper>
	</view>
</template>

<script>
	import AcmePaper from '../common/AcmePaper.vue';
	export default {
		name: "AcmeAppBar",
		components: { AcmePaper, },
		props: {
			// AppBar 的海拔高度
			elevation: {
				type: [Number, String],
				default: 4, // AppBar通常有一定海拔
				validator: (val) => val >= 0 && val <= 24,
			},
			variant: { type: String, default: '' },
			// 外部可能传入的背景色
			bgColor: { type: String, default: 'var(--acme-bg-card)' }
		},
		computed: {
			setSx() {
				return {
					width: '100%',
					height: '100%',
					borderRadius: '0',
					overflow: 'hidden',
					position: 'relative', // AcmePaper 内部子元素提供定位上下文
					backgroundColor: this.bgColor,
					backgroundImage: 'none',
				}
			},
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_variables.scss';

	.acme-app-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		box-sizing: border-box;
	}
</style>