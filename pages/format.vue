<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.format}}</view>
			</view>
		</AcmeAppBar>
		<BottomNav :code="$nav.keys.format" />

		<view style="padding: 160rpx 40rpx 240rpx;color: var(--acme-fmt-text-color);">
			<view class="acme-h6">{{`FmtFiat`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`标准法币：`}}</view>
				<view> {{$fmt.fmtFiat( fiatValue )}} </view>
				<view>{{$fmt.fmtFiat( fiatValue, {currency: 'EUR'})}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`限定4位：`}}</view>
				<view> {{$fmt.fmtFiat( fiatValue ,{decimal: 4})}} </view>
				<view>{{$fmt.fmtFiat( fiatValue, {currency: 'EUR',decimal: 4})}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`不限位数：`}}</view>
				<view> {{$fmt.fmtFiat( fiatValue,{decimal:$fmt.getRawDecimal(fiatValue)})}} </view>
				<view>{{$fmt.fmtFiat( fiatValue, {currency: 'EUR',decimal:$fmt.getRawDecimal(fiatValue)})}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`variant 样式：`}}</view>
				<view class="variant-bold" style="font-weight: 900;">
					{{$fmt.fmtFiat( fiatValue )}}
				</view>
				<view class="variant-large">{{$fmt.fmtFiat( fiatValue, {currency: 'EUR'})}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`动态variant：`}}</view>
				<view :class="getTextColor(fiatValue)">
					{{$fmt.fmtFiat( fiatValue)}}
				</view>
				<view :class="getBgColor(-fiatValue)">{{$fmt.fmtFiat( fiatValue, {currency: 'EUR'})}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view class="acme-body1">{{`动态variant 反转：`}}</view>
				<view :class="getTextColor(fiatValue,true)">
					{{$fmt.fmtFiat( fiatValue )}}
				</view>
				<view :class="getBgColor(-fiatValue,true)">{{$fmt.fmtFiat( fiatValue, {currency: 'EUR'})}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;padding-bottom: 12rpx;">
				<view :class="getBgColorRgba(fiatValue)">
					{{$fmt.fmtFiat( fiatValue )}}
				</view>
				<view :class="getBgColorRgba(0)">
					{{$fmt.fmtFiat( fiatValue )}}
				</view>
				<view :class="getBgColorRgba(-fiatValue)">
					{{$fmt.fmtFiat( fiatValue )}}
				</view>
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtKMB`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view>{{$fmt.fmtCompact(kmbValue)}}</view>
				<view>{{$fmt.fmtCompact(kmbValue, { decimal: 4,lgre:'de-DE' })}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view :class="getTextColor(kmbValue)">{{$fmt.fmtCompact(kmbValue, {lgre:'de-DE' })}}</view>
				<view :class="getBgColorRgba(-kmbValue)">{{$fmt.fmtCompact(kmbValue, { decimal: 4 })}}</view>
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtInteger`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view>{{$fmt.fmtInteger(integerValue )}}</view>
				<view style="display: flex;align-items: center;gap:4rpx;">
					<view>{{$fmt.fmtInteger(integerValue )}}</view>
					<text style="font-size: 24rpx;color:var(--acme-info);">{{`KM`}}</text>
				</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view :class="getTextColor(integerValue)">{{$fmt.fmtInteger(integerValue ,{lgre:'de-DE'})}}</view>
				<view :class="getBgColorRgba(integerValue)" style="display: flex;align-items: center;gap:4rpx;">
					<view>{{$fmt.fmtInteger(integerValue ,{lgre:'de-DE'})}}</view>
					<text style="font-size: 24rpx;">{{`KM`}}</text>
				</view>
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtPercent`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view>{{$fmt.fmtPercent(percentValue )}}</view>
				<view :class="getTextColor(percentValue)">{{$fmt.fmtPercent(percentValue,{lgre:'de-DE'} )}}</view>
				<view :class="getBgColorRgba(-percentValue)">
					{{$fmt.fmtPercent(percentValue,{lgre:'de-DE',decimal:4} )}}
				</view>
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtCrypto`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view>{{$fmt.fmtCrypto(cryptoValue )}}</view>
				<view :class="getTextColor(cryptoValue)">{{$fmt.fmtCrypto(cryptoValue,{lgre:'de-DE',decimal:6} )}}</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view style="display: flex;align-items: center;gap:4rpx;">
					<view>{{$fmt.fmtCrypto(cryptoValue )}}</view>
					<text style="font-size: 24rpx;color:var(--acme-info);">{{`BTC`}}</text>
				</view>
				<view style="display: flex;align-items: center;gap:4rpx;">
					<view :class="getTextColor(cryptoValue)">{{$fmt.fmtCrypto(cryptoValue,{lgre:'de-DE',decimal:6} )}}</view>
					<text style="font-size: 24rpx;color:var(--acme-info);">{{`BTC`}}</text>
				</view>
			</view>

			<AcmeDivider />
			<view class="acme-h6 ">{{`AcmeFmtStable`}}</view>
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view>{{$fmt.fmtCrypto(stableValue )}}</view>
				<view :class="getTextColor(-stableValue)">
					{{$fmt.fmtCrypto(stableValue,{lgre:'de-DE',decimal:6} )}}
				</view>
			</view>

			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<view :class="getBgColorRgba(-stableValue)">{{$fmt.fmtCrypto(stableValue,{lgre:'de-DE' } )}}</view>
				<view :class="getBgColorRgba(stableValue)">{{$fmt.fmtCrypto(stableValue,{lgre:'de-DE' } )}}</view>
			</view>
		</view>

	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';
	export default {
		components: {
			BottomNav,
			AcmeAppBar,
			AcmeIconBack,
			AcmeDivider,
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

	.acme-text-profit {
		color: var(--acme-success);
	}

	.acme-text-flat {
		color: var(--acme-info);
	}

	.acme-text-fall {
		color: var(--acme-error)
	}

	.acme-bg-profit {
		background-color: var(--acme-success);
		padding: var(--acme-spacing-xs);
		border-radius: var(--acme-border-radius-sm);
	}

	.acme-bg-flat {
		background-color: var(--acme-info);
		padding: var(--acme-spacing-xs);
		border-radius: var(--acme-border-radius-sm);
	}

	.acme-bg-fall {
		background-color: var(--acme-error);
		padding: var(--acme-spacing-xs);
		border-radius: var(--acme-border-radius-sm);
	}

	.acme-bg-profit-rgba {
		color: var(--acme-success);
		background-color: rgba(var(--acme-success-rgb), var(--acme-opacity-medium));
		padding: var(--acme-spacing-xs);
		border-radius: var(--acme-border-radius-sm);
	}

	.acme-bg-flat-rgba {
		color: var(--acme-info);
		background-color: rgba(var(--acme-info-rgb), var(--acme-opacity-medium));
		padding: var(--acme-spacing-xs);
		border-radius: var(--acme-border-radius-sm);
	}

	.acme-bg-fall-rgba {
		color: var(--acme-error);
		background-color: rgba(var(--acme-error-rgb), var(--acme-opacity-medium));
		padding: var(--acme-spacing-xs);
		border-radius: var(--acme-border-radius-sm);
	}
</style>