<template>
	<view :class="curTheme" style="background-color: var(--acme-bg-page);">
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<view style="color:var(--acme-primary-color);">{{`Acme`}}</view>
			<view @tap="onTheme(`dark`)" style="color:var(--acme-primary-color);">{{`Dark`}}</view>
			<view @tap="onTheme(`light`)" style="color:var(--acme-primary-color);">{{`Light`}}</view>
			<AcmeIcon icon="account" path="/static/" />
		</view>

		<AcmeSvg :svgString="svgData" :size="128" customClass="my-custom-icon" />
		<AcmeSvg :svgString="svgData" :size="64" sizeMode="heightFix" />
		<AcmeSvg :svgString="svgData" :size="48" />
		<AcmeSvg :svgString="svgData" :size="32" />

		<view @tap="onTheme(`dark`)" style="cursor: pointer;">
			<AcmeSvg :svgString="svgData" :size="128" customClass="my-custom-icon" />
		</view>
		<view @tap="onTheme(`light`)" style="cursor: pointer;">
			<AcmeSvg :svgString="svgData" :size="128" customClass="my-custom-icon" />
		</view>
	</view>
</template>

<script>
	import { wtfConfig, acmeSetTheme } from '../config.js';
	import AcmeIcon from '../ui/common/AcmeIcon.vue';
	import AcmeSvg from '../ui/common/AcmeSvg.vue';
	import { exampleIconSvg } from '../utils/svg.js';
	export default {
		components: { AcmeIcon, AcmeSvg },
		data() {
			return {
				title: 'Acme',
			}
		},
		computed: {
			// 计算主题类名，用于绑定到根 view 元素
			curTheme() { return `${wtfConfig.theme}-theme`; },
			setColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); },
			svgData() { return exampleIconSvg(this.setColor) }
		},
		onLoad() {},
		onShow() {},
		methods: {
			onTheme(val) {
				acmeSetTheme(val);
				uni.navigateTo({
					url: `/pages/index`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>