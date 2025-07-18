<template>
	<view :class="[`acme-body1`,variant]"> {{label}} </view>
</template>

<script>
	export default {
		name: "AcmeLabelStatic",
		props: {
			label: { type: String, default: '' },
			// 外部变体
			variant: { type: String, default: '' },
		}
	}
</script>

<style>
</style>