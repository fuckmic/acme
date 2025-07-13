<template>
	<view class="acme-empty-data">
		<AcmeIcon v-bind="$attrs" />
		<view :class="[`title`,customClass]">{{title}}</view>
	</view>
</template>

<script>
	import AcmeIcon from './AcmeIcon.vue';
	export default {
		name: "AcmeEmptyData",
		components: { AcmeIcon },
		props: {
			title: { type: String, default: '' },
			customClass: { type: Object, default: () => ({}) },
		},
	}
</script>

<style lang="scss" scoped>
	.acme-empty-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 48rpx;
	}

	.title {
		text-align: center;
		color: var(--acme-empty-data-color);
		font-size: 28rpx;
		font-weight: 500;
	}
</style>