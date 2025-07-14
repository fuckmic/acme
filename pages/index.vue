<template>
	<AcmePageContainer>
		<view style="padding: 40rpx;">
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Acme`}}</view>
				<view @tap="onTheme(`dark`)" style="color:var(--acme-primary-color);">{{`Dark`}}</view>
				<view @tap="onTheme(`light`)" style="color:var(--acme-primary-color);">{{`Light`}}</view>
				<AcmeIcon icon="account" path="/static/" />
			</view>
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>

			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeSvg :svgString="svgData" :size="128" customClass="my-custom-icon" />
				<AcmeSvg :svgString="svgData" :size="64" sizeMode="heightFix" />
				<AcmeSvg :svgString="svgData" :size="48" />
				<AcmeSvg :svgString="svgData" :size="32" />
				<view @tap="onTheme(`dark`)" style="cursor: pointer;">
					<AcmeSvg :svgString="svgData" :size="128" customClass="my-custom-icon" />
				</view>
				<view @tap="onTheme(`light`)" style="cursor: pointer;color:var(--acme-primary-color);">
					<AcmeSvg :svgString="svgData" :size="128" customClass="my-custom-icon" />
				</view>
			</view>
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>

			<AcmeCopyrightVersion appName="Acme" version="V 0.0.1" />
			<AcmeCopyrightVersion appName="Acme" />
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>

			<view style="font-size: 40rpx;font-weight: 900;text-align: center;color:var(--acme-primary-color);">
				{{`Formatter Value`}}
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view>{{`AcmeFmtFiat:`}}</view>
				<AcmeFmtFiat :value="123456.789" />
				<AcmeFmtFiat :value="123456.789" currency="EUR" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`AcmeFmtFiat:`}}</view>
				<AcmeFmtFiat :value="123456.789" color="var(--acme-success)" />
				<AcmeFmtFiat :value="123456.789" currency="EUR" bg="var(--acme-success)" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`AcmeFmtInteger:`}}</view>
				<AcmeFmtInteger :value="123456">
					<template #suffix>
						<text style="font-size: 24rpx;color:var(--acme-info);">{{`KM`}}</text>
					</template>
				</AcmeFmtInteger>
				<AcmeFmtInteger :value="123456" locale="de-DE" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`AcmeFmtPercent:`}}</view>
				<AcmeFmtPercent :value="123.45" />
				<AcmeFmtPercent :value="345.6" locale="de-DE" />
			</view>
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>

			<view style="font-size: 40rpx;font-weight: 900;text-align: center;color:var(--acme-primary-color);">
				{{`Form Input`}}
			</view>
			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmeInputPassword v-model="formData.password" :placeholder="`Enter password`" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmeInputSearch v-model="formData.keyword" :placeholder="`Enter keyword`">
				<template #prefix>
					<AcmeSvg :svgString="svgDataSearch" :size="48" />
				</template>
				<template #suffix>
					<view style="font-size: 28rpx;color:var(--acme-primary-color);">{{`Search`}}</view>
				</template>
			</AcmeInputSearch>
			<view style="margin-bottom: 36rpx;"></view>

			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>
			<AcmeEmptyData icon="empty_data" path="/static/" :size="360" format="png" title="Empty Data" />
		</view>

	</AcmePageContainer>
</template>

<script>
	import { acmeCfg, acmeSetTheme } from '../config.js';
	import AcmeIcon from '../ui/common/AcmeIcon.vue';
	import AcmeSvg from '../ui/common/AcmeSvg.vue';
	import { exampleIconSvg, svgSearch } from '../utils/svg.js';
	import AcmeCopyrightVersion from '../ui/common/AcmeCopyrightVersion.vue';
	import AcmeEmptyData from '../ui/common/AcmeEmptyData.vue';
	import AcmeFmtFiat from '../ui/fmt/AcmeFmtFiat.vue';
	import AcmeFmtInteger from '../ui/fmt/AcmeFmtInteger.vue';
	import AcmeFmtPercent from '../ui/fmt/AcmeFmtPercent.vue';
	import AcmeInputText from '../ui/form/AcmeInputText.vue';
	import AcmeInputPassword from '../ui/form/AcmeInputPassword.vue';
	import AcmeInputSearch from '../ui/form/AcmeInputSearch.vue';
	export default {
		components: {
			AcmeIcon,
			AcmeSvg,
			AcmeCopyrightVersion,
			AcmeEmptyData,
			AcmeFmtFiat,
			AcmeFmtInteger,
			AcmeFmtPercent,
			AcmeInputText,
			AcmeInputPassword,
			AcmeInputSearch,
		},
		data() {
			return {
				title: 'Acme',
				formData: {
					account: '',
					password: '',
					keyword: '',
					amount: '',
				}
			}
		},
		computed: {
			// 计算主题类名，用于绑定到根 view 元素
			curTheme() { return `${acmeCfg.theme}-theme`; },
			setColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); },
			svgData() { return exampleIconSvg(this.setColor) },
			svgDataSearch() { return svgSearch(this.setColor) },
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