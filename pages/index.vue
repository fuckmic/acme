<template>
	<AcmePageContainer>
		<view style="padding: 40rpx;">
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Acme`}}</view>
				<AcmeIcon icon="account" path="/static/" />
			</view>
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>
			<AcmeTabsFixed v-model="curTab" :tabs="tabs" @change="onTab" />
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>
			<AcmeTabsFixed v-model="curTab" :tabs="tabs" @change="onTab" variant="variant-pill" />
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>

			<AcmeTabsFixed v-model="curTab1" :tabs="tabs1" @change="onTab1" variant="variant-pill" />
			<view style="font-size: 28rpx;color:var(--acme-primary-color);">{{curTab1}}</view>

			<Typography />

			<FormatterValue />

			<PresetSelector />


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
				{{`Form Checkbox`}}
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Checkbox:`}}</view>
				<AcmeCheckbox v-model="isChecked" @change="onCheck" />
			</view>
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>


			<view style="font-size: 40rpx;font-weight: 900;text-align: center;color:var(--acme-primary-color);">
				{{`Form Input`}}
			</view>
			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`">
				<!-- <template #prefix>
					<AcmeSvg :svgString="svgDataSearch" :size="48" />
				</template>
				<template #suffix>
					<view style="font-size: 28rpx;color:var(--acme-primary-color);">{{`Search`}}</view>
				</template> -->
			</AcmeInputText>
			<view style="margin-bottom: 36rpx;"></view>

			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`" variant="variant-bordered" />
			<view style="margin-bottom: 36rpx;"></view>

			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`" variant="variant-filled" />
			<view style="margin-bottom: 36rpx;"></view>

			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`" variant="variant-underline" />
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
			<AcmeInputFiat v-model="formData.amount" :placeholder="`Enter amount`" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmeInputInteger v-model="formData.quantity" :placeholder="`Enter quantity`" />
			<view style="margin-bottom: 36rpx;"></view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Current curFiat:`}}</view>
				<AcmeInputFiat v-model="formData.curFiat" :placeholder="`Enter curFiat`" />
			</view>
			<view style="margin-bottom: 36rpx;"></view>

			<view style="margin-bottom: 36rpx;"></view>

			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Current Lever:`}}</view>
				<AcmeInputInteger v-model="formData.lever" :placeholder="`Enter Lever`" />
			</view>
			<view style="margin-bottom: 36rpx;"></view>


			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>




			<AcmeUpload v-model="formData.imgSrc" :tip="`Upload`" :upload="uploadImage" @uploaded="onUploadSuccess"
				@start="onStartUpload" @end="onEndUpload" />


			<AcmeEmptyData icon="empty_data" path="/static/" :size="360" format="png" title="Empty Data" />



			<Elevation />

		</view>

	</AcmePageContainer>
</template>

<script>
	import { acmeCfg, acmeSetTheme } from '../config.js';
	import Typography from '../components/Typography.vue';
	import FormatterValue from '../components/FormatterValue.vue';
	import PresetSelector from '../components/PresetSelector.vue';


	import AcmeIcon from '../ui/common/AcmeIcon.vue';
	import AcmeSvg from '../ui/common/AcmeSvg.vue';
	import { exampleIconSvg, svgSearch } from '../utils/svg.js';
	import AcmeCopyrightVersion from '../ui/common/AcmeCopyrightVersion.vue';
	import AcmeEmptyData from '../ui/common/AcmeEmptyData.vue';

	import AcmeInputText from '../ui/form/AcmeInputText.vue';
	import AcmeInputPassword from '../ui/form/AcmeInputPassword.vue';
	import AcmeInputSearch from '../ui/form/AcmeInputSearch.vue';
	import AcmeInputFiat from '../ui/form/AcmeInputFiat.vue';
	import AcmeInputInteger from '../ui/form/AcmeInputInteger.vue';

	import AcmeCheckbox from '../ui/form/AcmeCheckbox.vue';
	import AcmeUpload from '../ui/form/AcmeUpload.vue';
	import AcmeTabsFixed from '../ui/nav/AcmeTabsFixed.vue';

	import Elevation from '../components/Elevation.vue';
	import { formatterFiat, formatterInteger } from '../utils/formatter';
	export default {
		components: {
			Typography,
			FormatterValue,
			PresetSelector,

			AcmeIcon,
			AcmeSvg,
			AcmeCopyrightVersion,
			AcmeEmptyData,
			AcmeInputText,
			AcmeInputPassword,
			AcmeInputSearch,
			AcmeInputFiat,
			AcmeInputInteger,

			Elevation,
			AcmeCheckbox,
			AcmeUpload,
			AcmeTabsFixed,
		},
		data() {
			return {
				title: 'Acme',
				isChecked: false,
				formData: {
					account: '',
					password: '',
					keyword: '',
					amount: '',
					quantity: '',
					curFiat: '',
					lever: 1,
					imgSrc: '',
				},
				isChooseImg: false,
				curTab: null,
				tabs: { 'dark': `Dark`, 'light': `Light` },
				curTab1: null,
				tabs1: { 'one': `Tab One`, 'two': `Tab Two`, 'three': `Tab Three`, 'four': `Tab Four` },
			}
		},
		computed: {
			setColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); },
			svgData() { return exampleIconSvg(this.setColor) },
			svgDataSearch() { return svgSearch(this.setColor) },

		},
		onLoad() {},
		onShow() {
			if (this.curTab) this.onTab(this.curTab);
		},
		methods: {
			onTab(val) {
				this.curTab = val;
				acmeSetTheme(this.curTab);
				uni.navigateTo({
					url: `/pages/index`
				})
			},
			onTab1(val) {
				this.curTab1 = val;
			},
			onCheck(val) { this.isChecked = val },

			onUploadSuccess(val) {
				console.log('imgSrc 上传成功，URL:', val);
				// this.isChooseImg = false;
				this.formData.imgSrc = val;
			},
			onStartUpload() {
				this.isChooseImg = true;
			},
			onEndUpload() {
				this.isChooseImg = false;
			},
			async uploadImage(filePath) {
				// try {
				// 	// 这里调用主项目 Vue 原型上的 $api 服务
				// 	const imageUrl = await this.$api.uploadImage(filePath);
				// 	console.log('图片上传成功，URL:', imageUrl);
				// 	return imageUrl; // 返回图片的 URL
				// } catch (error) {
				// 	console.error('上传头像失败:', error);
				// 	// 根据您的错误处理策略，可以显示用户友好的提示
				// 	// uni.showToast({ title: '上传失败', icon: 'none' });
				// 	throw error; // 重新抛出错误，让 WtfUpload 也能捕获到
				// }
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>