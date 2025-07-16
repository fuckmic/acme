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

			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>
			<view class="acme-button-text"
				style="padding: var(--acme-spacing-md);border: 1px solid var(--acme-primary-color);text-align: center;"
				@tap="$nav.comLink($nav.keys.typography)">
				{{`Typography`}}
			</view>
			<view style="margin-bottom: 36rpx;"></view>
			<view class="acme-button-text"
				style="padding: var(--acme-spacing-md);border: 1px solid var(--acme-primary-color);text-align: center;"
				@tap="$nav.comLink($nav.keys.format)">
				{{`Formatter Value`}}
			</view>
			<view style="margin-bottom: 36rpx;"></view>
			<view class="acme-button-text"
				style="padding: var(--acme-spacing-md);border: 1px solid var(--acme-primary-color);text-align: center;"
				@tap="$nav.comLink($nav.keys.elevation)">
				{{`Elevation`}}
			</view>
			<view style="margin-bottom: 36rpx;"></view>
			<view class="acme-button-text"
				style="padding: var(--acme-spacing-md);border: 1px solid var(--acme-primary-color);text-align: center;"
				@tap="$nav.comLink($nav.keys.presetSelector)">
				{{`PresetSelector`}}
			</view>
			<view style="margin-bottom: 36rpx;"></view>
			<view class="acme-button-text"
				style="padding: var(--acme-spacing-md);border: 1px solid var(--acme-primary-color);text-align: center;"
				@tap="$nav.comLink($nav.keys.input)">
				{{`PresetSelector`}}
			</view>
			<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>








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




			<AcmeUpload v-model="formData.imgSrc" :tip="`Upload`" :upload="uploadImage" @uploaded="onUploadSuccess"
				@start="onStartUpload" @end="onEndUpload" />


			<AcmeEmptyData icon="empty_data" path="/static/" :size="360" format="png" title="Empty Data" />





		</view>

	</AcmePageContainer>
</template>

<script>
	import { acmeSetTheme } from '../config.js';
	import AcmeIcon from '../ui/common/AcmeIcon.vue';
	import AcmeSvg from '../ui/common/AcmeSvg.vue';
	import { exampleIconSvg, svgSearch } from '../utils/svg.js';
	import AcmeCopyrightVersion from '../ui/common/AcmeCopyrightVersion.vue';
	import AcmeEmptyData from '../ui/common/AcmeEmptyData.vue';
	import AcmeCheckbox from '../ui/form/AcmeCheckbox.vue';
	import AcmeUpload from '../ui/form/AcmeUpload.vue';
	import AcmeTabsFixed from '../ui/nav/AcmeTabsFixed.vue';

	export default {
		components: {
			AcmeIcon,
			AcmeSvg,
			AcmeCopyrightVersion,
			AcmeEmptyData,
			AcmeCheckbox,
			AcmeUpload,
			AcmeTabsFixed,
		},
		data() {
			return {
				title: 'Acme',
				isChecked: false,
				formData: {
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