<template>
	<AcmePageContainer>
		<view style="padding: 40rpx;">
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Acme`}}</view>
				<view @tap="onTheme(`dark`)" style="color:var(--acme-primary-color);">
					{{`Dark`}}
				</view>
				<view @tap="onTheme(`light`)" style="color:var(--acme-primary-color);">
					{{`Light`}}
				</view>
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
				<view style="color:var(--acme-primary-color);">{{`AcmeFmtFiat:`}}</view>
				<AcmeFmtFiat :value="setFiatNoml" />
				<AcmeFmtFiat :value="setFiatNoml" currency="EUR" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`AcmeFmtFiat:`}}</view>
				<AcmeFmtFiat :value="123456.789" color="var(--acme-success)" />
				<AcmeFmtFiat :value="123456.789" currency="EUR" bg="var(--acme-success)" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`AcmeFmtFiat:`}}</view>
				<AcmeFmtFiat :value="setFiat" color="var(--acme-success)" />
				<AcmeFmtFiat :value="setFiat" currency="EUR" bg="var(--acme-success)" />
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
			<AcmeInputFiat v-model="formData.amount" :placeholder="`Enter amount`" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmeInputInteger v-model="formData.quantity" :placeholder="`Enter quantity`" />
			<view style="margin-bottom: 36rpx;"></view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Current curFiat:`}}</view>
				<AcmeInputFiat v-model="formData.curFiat" :placeholder="`Enter curFiat`" />
			</view>
			<view style="margin-bottom: 36rpx;"></view>
			<AcmePresetSelector v-model="formData.curFiat" :list="optsFiat" @select="onSelected" />
			<view style="margin-bottom: 36rpx;"></view>

			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="color:var(--acme-primary-color);">{{`Current Lever:`}}</view>
				<AcmeInputInteger v-model="formData.lever" :placeholder="`Enter Lever`" />
			</view>
			<view style="margin-bottom: 36rpx;"></view>
			<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="4" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="5" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="8" />

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
	import AcmeInputFiat from '../ui/form/AcmeInputFiat.vue';
	import AcmeInputInteger from '../ui/form/AcmeInputInteger.vue';
	import AcmePresetSelector from '../ui/form/AcmePresetSelector.vue';
	import AcmeCheckbox from '../ui/form/AcmeCheckbox.vue';
	import AcmeUpload from '../ui/form/AcmeUpload.vue';

	import Elevation from '../components/Elevation.vue';
	import { formatterFiat, formatterInteger, formatNumberToPrecision } from '../utils/formatter';
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
			AcmeInputFiat,
			AcmeInputInteger,
			AcmePresetSelector,
			Elevation,
			AcmeCheckbox,
			AcmeUpload,
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
			}
		},
		computed: {
			// 计算主题类名，用于绑定到根 view 元素
			curTheme() { return `${acmeCfg.theme}-theme`; },
			setColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); },
			svgData() { return exampleIconSvg(this.setColor) },
			svgDataSearch() { return svgSearch(this.setColor) },
			// 法比选项组
			optsFiat() {
				const tmp = [100, 500, 1000, 3000, 5000, 10000];
				return tmp.map(v => {
					const _label = formatterFiat(v, acmeCfg.lgre, acmeCfg.currency);
					return { key: v, label: _label }
				})
			},
			// 杠杆选项组
			optLevers() {
				const tmp = [1, 5, 10, 30, 50, 100, 300, 800];
				return tmp.map(v => {
					const _label = formatterInteger(v, acmeCfg.lgre);
					return { key: v, label: _label }
				})
			},
			// 标准法币
			setFiatNoml() {
				console.log(formatNumberToPrecision(123456.78901, acmeCfg.currency))
				return formatNumberToPrecision(123456.78901, acmeCfg.currency)
			},
			// 自定义小数位
			setFiat() {
				console.log(formatNumberToPrecision(123456.78901, acmeCfg.currency, { decimal: 4 }))
				return formatNumberToPrecision(123456.78901, acmeCfg.currency, { decimal: 4 })
			},
		},
		onLoad() {},
		onShow() {

		},
		methods: {
			onCheck(val) { this.isChecked = val },
			onTheme(val) {
				acmeSetTheme(val);
				uni.navigateTo({
					url: `/pages/index`
				})
			},
			onSelected(val) {
				console.log(`val:`, val);
				this.formData.curFiat = val;
			},
			onSelectedLever(val) {
				console.log(`val:`, val);
				this.formData.lever = val;
			},
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