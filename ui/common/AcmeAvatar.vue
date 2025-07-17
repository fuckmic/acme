<template>
	<view :class="[`acme-avatar`,variant]" :style="setStyle">
		<image v-if="src" :src="src" mode="scaleToFill" style="width: 100%;height: 100%;"></image>
		<slot v-else> </slot>
	</view>
</template>

<script>
	export default {
		name: "AcmeAvatar",
		props: {
			src: { type: String, default: undefined },
			size: { type: Number, default: 48 },
			bgColor: { type: String, default: 'transparent' },
			shape: { type: String, default: `100%` },
			variant: { type: String, default: `` },
		},
		computed: {
			setStyle() {
				return {
					width: `${this.size}rpx`,
					height: `${this.size}rpx`,
					backgroundColor: this.bgColor,
					borderRadius: `${this.shape}`,
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-avatar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		line-height: 1;
		overflow: hidden;
		user-select: none;
		cursor: pointer;
	}
</style>