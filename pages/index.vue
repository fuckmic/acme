<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:12rpx;">
				<AcmeIcon icon="sun" :size="64" />
				<view class="acme-h5" style="flex:1;">{{`Name`}}</view>
				<view style="margin-left: auto;" @tap="onTheme()">
					<AcmeIconDark v-if="isDark" />
					<AcmeIconLight v-else />
				</view>
			</view>
		</AcmeAppBar>

		<BottomNav :code="$nav.keys.index" />

		<view style="padding: 40rpx;padding-top: 160rpx;">
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
			<view style="display: flex;align-items: center;justify-content: space-between; gap:24rpx;">
				<AcmeAvatar src="/static/plat.png" :size="120"></AcmeAvatar>
				<AcmeAvatar :size="100" bgColor="var(--acme-primary-color)">
					<text class="acme-h3">{{`A`}}</text>
				</AcmeAvatar>
				<AcmeAvatar :size="80" bgColor="var(--acme-success)" shape="0">
					<text class="acme-h4">{{`C`}}</text>
				</AcmeAvatar>
				<AcmeAvatar :size="64" bgColor="var(--acme-info)" shape="8rpx">
					<text class="acme-h5">{{`M`}}</text>
				</AcmeAvatar>
				<AcmeAvatar :size="48" bgColor="var(--acme-error)">
					<text class="acme-h6">{{`E`}}</text>
				</AcmeAvatar>
			</view>

			<AcmeDivider />
			<view style="display: flex;align-items: center;justify-content: space-between; gap:24rpx;">
				<AcmeBadge dot bgColor="var(--acme-success)" :anchor="{ vert: 'bottom', horz: 'right' }">
					<AcmeAvatar src="/static/plat.png" :size="120"></AcmeAvatar>
				</AcmeBadge>

				<!-- dot 模式：小圆点 -->
				<AcmeBadge count="3" :anchor="{ vert: 'bottom', horz: 'right' }">
					<AcmeAvatar :size="100" bgColor="var(--acme-primary-color)">
						<text class="acme-h3" style="color: white;">A</text>
					</AcmeAvatar>
				</AcmeBadge>

				<!-- count=0，不显示 (默认 showZero: false) -->
				<AcmeBadge count="0">
					<AcmeAvatar :size="80" bgColor="var(--acme-info)">
						<text class="acme-h4" style="color: white;">0</text>
					</AcmeAvatar>
				</AcmeBadge>

				<!-- count=0，显示 (showZero: true) -->
				<AcmeBadge count="0" :showZero="true">
					<AcmeAvatar :size="80" bgColor="var(--acme-info)">
						<text class="acme-h4" style="color: white;">0</text>
					</AcmeAvatar>
				</AcmeBadge>
			</view>

			<AcmeDivider />
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view class="acme-body1">{{`Label Edit`}}</view>
				<DisplayLabel label="Home" transKey="home.title" variant="" fallbackText="回退文本" />
			</view>
			<AcmeDivider />

			<AcmeCopyrightVersion appName="Acme" version="V 0.0.1" />
			<AcmeCopyrightVersion appName="Acme" />
			<AcmeDivider />

			<AcmeDivider />

			<!-- 	<AcmePaper elevation="4" :sx="{ 
							position: 'fixed', 
							top: `160rpx`, 
							left: 0, 
							right: 0, 
							height: '80rpx',
							zIndex: 9, // 引用 z-index 变量
						}">
				<view style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">
					<text class="acme-caption">这是一个顶部通知！</text>
				</view>
			</AcmePaper> -->

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
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import AcmeAvatar from '../ui/common/AcmeAvatar.vue';
	import AcmeBadge from '../ui/common/AcmeBadge.vue';

	import AcmeIconDark from '../ui/icons/AcmeIconDark.vue';
	import AcmeIconLight from '../ui/icons/AcmeIconLight.vue';


	import AcmeIcon from '../ui/common/AcmeIcon.vue';
	import AcmeSvg from '../ui/common/AcmeSvg.vue';
	import AcmeCopyrightVersion from '../ui/common/AcmeCopyrightVersion.vue';
	import AcmeEmptyData from '../ui/common/AcmeEmptyData.vue';
	import AcmeCheckbox from '../ui/form/AcmeCheckbox.vue';
	import AcmeUpload from '../ui/form/AcmeUpload.vue';
	import AcmeTabsFixed from '../ui/nav/AcmeTabsFixed.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';

	import BottomNav from '../components/BottomNav.vue';

	export default {
		components: {
			AcmePaper,
			AcmeAppBar,
			BottomNav,

			AcmeAvatar,
			AcmeBadge,
			AcmeIconDark,
			AcmeIconLight,

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
				isDark: true,
				title: 'Acme',
				isChecked: false,
				formData: {
					imgSrc: '',
				},
				isChooseImg: false,
				curTab: null,
				tabs: {
					[this.$nav.keys.typography]: this.$nav.keys.typography,
					[this.$nav.keys.elevation]: this.$nav.keys.elevation,
				},
				curTab1: null,
				tabs1: { 'four': `Tab Four` },
				curNav: null,
				setColor: '',
			}
		},
		computed: {
			svgData() { return exampleIconSvg(this.setColor) },
			setNavs() {
				return [
					this.$nav.keys.format,
					this.$nav.keys.presetSelector,
					this.$nav.keys.input,
					this.$nav.keys.icons
				]
			},

		},
		onLoad() {},
		onShow() {
			if (this.curTab) this.onTab(this.curTab);
			this.calColor();
		},
		onPullDownRefresh() {
			this.calColor();
			uni.stopPullDownRefresh();
		},
		methods: {
			onTheme() {
				this.isDark = !this.isDark;
				const tmp = this.isDark ? `dark` : `light`;
				acmeSetTheme(tmp);
				uni.navigateTo({
					url: `/pages/index`
				})
			},
			calColor() {
				this.setColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
			},

			onTab(val) {
				this.curTab = val;
				// this.$nav.comLink(this.curTab);
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
	.search-expand {
		background-color: transparent;
		border-radius: 0;
		border: none;
		border-bottom: 1rpx solid var(--acme-bg-card);
	}

	.search-expand:focus-within {
		box-shadow: none;
	}

	/* 可以添加聚焦时的样式，例如边框、阴影等 */
	.search-expand.is-active {
		border: none;
		border-bottom: 1rpx solid var(--acme-primary-color); // 活跃时边框
		outline: none;
		// box-shadow: 0 0 8rpx rgba(0, 123, 255, 0.2); // 活跃时阴影
		// background-color: rgba(255, 255, 255, 0.25); // 活跃时背景可以更亮
	}
</style>