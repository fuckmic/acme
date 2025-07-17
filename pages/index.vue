<template>
	<AcmePageContainer>
		<view style="padding: 40rpx;">
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Acme`}}</view>
				<AcmeIcon icon="account" path="/static/" />
			</view>
			<AcmeDivider />
			<AcmeTabsFixed v-model="curTab" :tabs="tabs" @change="onTab" />
			<AcmeTabsFixed v-model="curTab1" :tabs="tabs1" @change="onTab1" variant="variant-pill" />
			<view style="font-size: 28rpx;color:var(--acme-primary-color);">{{curTab1}}</view>
			<AcmeDivider />
			<view style="display: flex;align-items: center;gap:12rpx;flex-wrap: wrap;">
				<block v-for="(v,k) in setNavs" :key="k">
					<view class="acme-button-text"
						style="padding: var(--acme-spacing-sm);border: 1px solid var(--acme-primary-color);text-align: center;"
						@tap="$nav.comLink(v)">
						{{v}}
					</view>
				</block>
			</view>

			<AcmeDivider />
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeSvg :svgString="svgData" :size="128" customClass="my-custom-icon" />
				<AcmeSvg :svgString="svgData" :size="64" sizeMode="heightFix" />
				<AcmeSvg :svgString="svgData" :size="48" />
				<AcmeSvg :svgString="svgData" :size="32" />
				<view @tap="onTheme(`dark`)" style="cursor: pointer;">
					<AcmeSvg :svgString="svgDataDark" :size="48" customClass="my-custom-icon" />
				</view>
				<view @tap="onTheme(`light`)" style="cursor: pointer;color:var(--acme-primary-color);">
					<AcmeSvg :svgString="svgDataLight" :size="48" customClass="my-custom-icon" />
				</view>
			</view>
			<AcmeDivider />

			<AcmeCopyrightVersion appName="Acme" version="V 0.0.1" />
			<AcmeCopyrightVersion appName="Acme" />
			<AcmeDivider />

			<AcmePaper>
				<view class="acme-h3" style="padding: var(--acme-spacing-lg);">{{`AcmePaper`}}</view>
			</AcmePaper>
			<AcmeDivider />
			<AcmePaper elevation="16">
				<view class="acme-h2" style="padding: var(--acme-spacing-lg);">{{`AcmePaper`}}</view>
			</AcmePaper>

			<AcmeBottomNav :code="`index`"></AcmeBottomNav>

			<AcmePaper elevation="4" :sx="{ 
							position: 'fixed', 
							top: 0, 
							left: 0, 
							right: 0, 
							height: '80rpx',
							zIndex: 9, // 引用 z-index 变量
						}">
				<view style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">
					<text class="acme-caption">这是一个顶部通知！</text>
				</view>
			</AcmePaper>

			<view
				style="position: relative; height: 500rpx; width: 100%; display: flex; justify-content: center; align-items: center;">
				<AcmePaper elevation="6" :sx="{ 
								position: 'absolute', // 或 'fixed'
								top: '50%', 
								left: '50%', 
								transform: 'translate(-50%, -50%)', 
								width: '600rpx', 
								height: '400rpx',
								zIndex: 6, // 引用 z-index 变量
							}">
					<view style="padding: 40rpx; text-align: center;">
						<text class="acme-h5">居中卡片</text>
						<text class="acme-body2">这是一个使用 absolute 和 center 放置的浮动容器。</text>
					</view>
				</AcmePaper>
			</view>


			<AcmePaper elevation="2" :sx="{ margin: '60rpx', padding: '30rpx' }">
				<text class="acme-body1">这是一个默认流布局的 Paper。</text>
			</AcmePaper>


			<AcmeDivider leftLineRatio="40rpx">
				<view class="acme-h6">{{`Form Checkbox`}}</view>
			</AcmeDivider>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Checkbox:`}}</view>
				<AcmeCheckbox v-model="isChecked" @change="onCheck" />
			</view>
			<AcmeDivider />



			<AcmeUpload v-model="formData.imgSrc" :tip="`Upload`" :upload="uploadImage" @uploaded="onUploadSuccess"
				@start="onStartUpload" @end="onEndUpload" />


			<AcmeEmptyData icon="empty_data" path="/static/" :size="360" format="png" title="Empty Data" />





		</view>

	</AcmePageContainer>
</template>

<script>
	import { acmeSetTheme } from '../config.js';
	import AcmePaper from '../ui/common/AcmePaper.vue';
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';

	import AcmeIcon from '../ui/common/AcmeIcon.vue';
	import AcmeSvg from '../ui/common/AcmeSvg.vue';
	import { exampleIconSvg, svgSearch, svgDark, svgLight } from '../utils/svg.js';
	import AcmeCopyrightVersion from '../ui/common/AcmeCopyrightVersion.vue';
	import AcmeEmptyData from '../ui/common/AcmeEmptyData.vue';
	import AcmeCheckbox from '../ui/form/AcmeCheckbox.vue';
	import AcmeUpload from '../ui/form/AcmeUpload.vue';
	import AcmeTabsFixed from '../ui/nav/AcmeTabsFixed.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';

	export default {
		components: {
			AcmePaper,
			AcmeBottomNav,

			AcmeIcon,
			AcmeSvg,
			AcmeCopyrightVersion,
			AcmeEmptyData,
			AcmeCheckbox,
			AcmeUpload,
			AcmeTabsFixed,
			AcmeDivider,
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
				curNav: null,
			}
		},
		computed: {
			setColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); },
			svgData() { return exampleIconSvg(this.setColor) },
			svgDataDark() { return svgDark(this.setColor) },
			svgDataLight() { return svgLight(this.setColor) },
			setNavs() {
				return [
					this.$nav.keys.typography,
					this.$nav.keys.format,
					this.$nav.keys.elevation,
					this.$nav.keys.presetSelector,
					this.$nav.keys.input,
				]
			},

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