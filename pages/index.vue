<template>
	<view :class="curTheme" style="background-color: var(--acme-bg-page);">
		<view style="color:var(--acme-primary-color);">{{`Acme`}}</view>

		<view @tap="onTheme(`dark`)" style="color:var(--acme-primary-color);">{{`Dark`}}</view>
		<view @tap="onTheme(`light`)" style="color:var(--acme-primary-color);">{{`Light`}}</view>

		<AcmeIcon icon="account" path="/static/" />
	</view>
</template>

<script>
	import { wtfConfig, acmeSetTheme } from '../config.js';
	import { AcmeIcon } from '@/ui/common/AcmeIcon.vue';
	export default {
		components: { AcmeIcon },
		data() {
			return {
				title: 'Acme',
			}
		},
		computed: {
			// 计算主题类名，用于绑定到根 view 元素
			curTheme() { return `${wtfConfig.theme}-theme`; }
		},
		onLoad() {},
		onShow() {},
		methods: {
			onTheme(val) {
				acmeSetTheme(val);
				uni.navigateTo({
					url: `/pages/index`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>