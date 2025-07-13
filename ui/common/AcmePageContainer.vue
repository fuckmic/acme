<template>
	<view :class="curTheme" class="acme-page-container fade-in">
		<slot></slot>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	export default {
		name: "AcmePageContainer",
		computed: {
			curTheme() { return `${acmeCfg.theme}-theme`; },
		}
	}
</script>

<style lang="scss" scoped>
	/* 定义页面进入动画 */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.acme-page-container {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: var(--acme-bg-page);
	}

	/* 应用渐入动画 */
	.fade-in {
		animation-name: fadeIn;
		animation-duration: 0.5s;
		animation-timing-function: ease-out;
		animation-delay: 0s;
		animation-iteration-count: 1;
		animation-fill-mode: both;
	}
</style>