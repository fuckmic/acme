<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.format}}</view>
			</view>
		</AcmeAppBar>
		<BottomNav :code="$nav.keys.format" />

		<view style="padding: 160rpx 40rpx 240rpx;">
			<view class="acme-h6">{{`AcmeFmtFiat`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`标准法币：`}}</view>
				<AcmeFmtFiat :value="setFiatNoml" />
				<AcmeFmtFiat :value="setFiatNoml" currency="EUR" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`不限位数：`}}</view>
				<AcmeFmtFiat :value="fiatValue" />
				<AcmeFmtFiat :value="fiatValue" currency="EUR" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`限定4位：`}}</view>
				<AcmeFmtFiat :value="setFiat" />
				<AcmeFmtFiat :value="setFiat" currency="EUR" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`variant 样式：`}}</view>
				<AcmeFmtFiat :value="setFiatNoml" variant="variant-bold" />
				<AcmeFmtFiat :value="setFiatNoml" variant="variant-large" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`动态variant：`}}</view>
				<AcmeFmtFiat :value="setFiatNoml" :variant="getTextColor(setFiatNoml)" />
				<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColor(-setFiatNoml)" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`动态variant 反转：`}}</view>
				<AcmeFmtFiat :value="setFiatNoml" :variant="getTextColor(setFiatNoml,true)" />
				<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColor(-setFiatNoml,true)" />
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColorRgba(setFiatNoml)" />
				<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColorRgba(0)" />
				<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColorRgba(-setFiatNoml)" />
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtKMB`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeFmtKMB :value="kmbValue" />
				<AcmeFmtKMB :value="kmbValue" :variant="getTextColor(-kmbValue)" />
				<AcmeFmtKMB :value="kmbValue" :variant="getBgColorRgba(kmbValue)" />
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtInteger`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeFmtInteger :value="integerValue">
					<template #suffix>
						<text style="font-size: 24rpx;color:var(--acme-info);">{{`KM`}}</text>
					</template>
				</AcmeFmtInteger>
				<AcmeFmtInteger :value="integerValue" locale="de-DE" :variant="getTextColor(integerValue)" />
				<AcmeFmtInteger :value="integerValue" locale="de-DE" :variant="getBgColorRgba(integerValue)" />
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtPercent`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeFmtPercent :value="percentValue" />
				<AcmeFmtPercent :value="percentValue" locale="de-DE" :variant="getTextColor(percentValue)" />
				<AcmeFmtPercent :value="percentValue" locale="de-DE" :variant="getBgColorRgba(-percentValue)" />
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtCrypto`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeFmtCrypto :value="cryptoValue" />
				<AcmeFmtCrypto :value="cryptoValue" locale="de-DE" :variant="getTextColor(cryptoValue)" />
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtStable`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeFmtStable :value="stableValue" />
				<AcmeFmtStable :value="stableValue" locale="de-DE" :variant="getTextColor(-stableValue)" />
			</view>

			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeFmtCrypto :value="cryptoValue" locale="de-DE" :variant="getBgColorRgba(-cryptoValue)" />
				<AcmeFmtStable :value="stableValue" locale="de-DE" :variant="getBgColorRgba(stableValue)" />
			</view>
		</view>

	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';

	import { acmeCfg } from '../config.js';
	import { formatterFiat, formatterInteger, formatNumberToPrecision } from '../utils/formatter';
	import AcmeFmtFiat from '../ui/fmt/AcmeFmtFiat.vue';
	import AcmeFmtInteger from '../ui/fmt/AcmeFmtInteger.vue';
	import AcmeFmtPercent from '../ui/fmt/AcmeFmtPercent.vue';
	import AcmeFmtKMB from '../ui/fmt/AcmeFmtKMB.vue';
	import AcmeFmtCrypto from '../ui/fmt/AcmeFmtCrypto.vue';
	import AcmeFmtStable from '../ui/fmt/AcmeFmtStable.vue';
	export default {
		components: {
			BottomNav,
			AcmeAppBar,
			AcmeIconBack,
			AcmeDivider,
			AcmeFmtFiat,
			AcmeFmtInteger,
			AcmeFmtPercent,
			AcmeFmtKMB,
			AcmeFmtCrypto,
			AcmeFmtStable,
		},
		data() {
			return {
				fiatValue: 123456.78901,
				integerValue: 123456,
				kmbValue: 987654321987.999,
				percentValue: 123.45,
				cryptoValue: 123456.78901234,
				stableValue: 123456.78901234,
			}
		},
		computed: {
			// 标准法币
			setFiatNoml() {
				console.log(formatNumberToPrecision(this.fiatValue, acmeCfg.currency))
				return formatNumberToPrecision(this.fiatValue, acmeCfg.currency)
			},
			// 自定义小数位
			setFiat() {
				console.log(formatNumberToPrecision(this.fiatValue, acmeCfg.currency, { decimal: 4 }))
				return formatNumberToPrecision(this.fiatValue, acmeCfg.currency, { decimal: 4 })
			},
		},
		methods: {
			// 根据数字获取对应的索引 (0: 跌/亏, 1: 平, 2: 涨/盈)
			getSignIndex(num) {
				return num === 0 ? 1 : (num < 0 ? 0 : 2); // 调整索引顺序为 [跌, 平, 涨]
			},

			// 获取盈亏/涨跌文字颜色  (传入值，是否倒转)
			getTextColor(num, isRevse) {
				let index = this.getSignIndex(num);
				index = isRevse ? (index === 0 ? 2 : (index === 2 ? 0 : index)) : index;
				const tmp = [`acme-text-fall`, `acme-text-flat`, `acme-text-profit`];
				return tmp[index];
			},
			// 获取盈亏/涨跌背景颜色  (传入值，是否倒转)
			getBgColor(num, isRevse) {
				let index = this.getSignIndex(num);
				index = isRevse ? (index === 0 ? 2 : (index === 2 ? 0 : index)) : index;
				const tmp = [`acme-bg-fall`, `acme-bg-flat`, `acme-bg-profit`];
				return tmp[index];
			},
			getBgColorRgba(num, isRevse) {
				let index = this.getSignIndex(num);
				index = isRevse ? (index === 0 ? 2 : (index === 2 ? 0 : index)) : index;
				const tmp = [`acme-bg-fall-rgba`, `acme-bg-flat-rgba`, `acme-bg-profit-rgba`];
				return tmp[index];
			},
		}
	}
</script>

<style lang="scss" scoped>
	.variant-bold {
		--acme-fmt-font-weight: 900;
	}

	.variant-large {
		--acme-fmt-font-size: 40rpx;
		--acme-fmt-space: 30rpx;
		--acme-fmt-color: teal;
		--acme-fmt-font-weight: 500;
		background-color: #444444 !important;
		padding: var(--acme-spacing-sm);
		border-radius: var(--acme-border-radius-sm);
	}

	.my-custom-red-text {
		--acme-fmt-color: red;
		--acme-fmt-font-weight: 900;
		--acme-fmt-font-size: 80rpx;
	}
</style>