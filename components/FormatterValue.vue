<template>
	<view>
		<view class="acme-h3 acme-text-success">{{`Formatter value`}}</view>
		<view class="acme-h5">{{`AcmeFmtFiat`}}</view>
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiatNoml" />
			<AcmeFmtFiat :value="setFiatNoml" currency="EUR" />
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="fiatValue" color="var(--acme-success)" />
			<AcmeFmtFiat :value="fiatValue" currency="EUR" bg="var(--acme-success)" />
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiat" color="var(--acme-success)" />
			<AcmeFmtFiat :value="setFiat" currency="EUR" bg="var(--acme-success)" />
		</view>

		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiatNoml" variant="variant-bold" />
			<AcmeFmtFiat :value="setFiatNoml" variant="variant-large" />
		</view>

		<AcmeFmtFiat :value="setFiatNoml" variant="my-custom-red-text" />

		<view class="acme-h3 acme-text-success">{{`AcmeFmtKMB`}}</view>
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtKMB :value="kmbValue" />
		</view>

		<view class="acme-h3 acme-text-success">{{`AcmeFmtInteger`}}</view>
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtInteger :value="integerValue">
				<template #suffix>
					<text style="font-size: 24rpx;color:var(--acme-info);">{{`KM`}}</text>
				</template>
			</AcmeFmtInteger>
			<AcmeFmtInteger :value="integerValue" locale="de-DE" />
		</view>

		<view class="acme-h3 acme-text-success">{{`AcmeFmtPercent`}}</view>
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtPercent :value="percentValue" />
			<AcmeFmtPercent :value="percentValue" locale="de-DE" />
		</view>
		<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>
	</view>
</template>

<script>
	import { acmeCfg } from '../config.js';
	import { formatterFiat, formatterInteger, formatNumberToPrecision } from '../utils/formatter';
	import AcmeFmtFiat from '../ui/fmt/AcmeFmtFiat.vue';
	import AcmeFmtInteger from '../ui/fmt/AcmeFmtInteger.vue';
	import AcmeFmtPercent from '../ui/fmt/AcmeFmtPercent.vue';
	import AcmeFmtKMB from '../ui/fmt/AcmeFmtKMB.vue';
	export default {
		name: "FormatterValue",
		components: {
			AcmeFmtFiat,
			AcmeFmtInteger,
			AcmeFmtPercent,
			AcmeFmtKMB,
		},
		data() {
			return {
				fiatValue: 123456.78901,
				integerValue: 123456,
				kmbValue: 987654321987.999,
				percentValue: 123.45,
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
		padding: var(--acme-space-sm);
		border-radius: var(--acme-border-radius-sm);
	}

	.my-custom-red-text {
		--acme-fmt-color: red;
		--acme-fmt-font-weight: 900;
		--acme-fmt-font-size: 80rpx;
	}
</style>