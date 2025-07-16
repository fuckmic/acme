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

		<AcmeFmtFiat :value="setFiatNoml" />

		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiatNoml" :variant="getTextColor(setFiatNoml)" />
			<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColor(-setFiatNoml)" />
		</view>

		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColor(setFiatNoml)" />
			<AcmeFmtFiat :value="setFiatNoml" :variant="getTextColor(-setFiatNoml)" />
		</view>

		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiatNoml" :variant="getTextColor(setFiatNoml,true)" />
			<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColor(-setFiatNoml,true)" />
		</view>

		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColor(setFiatNoml,true)" />
			<AcmeFmtFiat :value="setFiatNoml" :variant="getTextColor(-setFiatNoml,true)" />
		</view>

		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColorRgba(setFiatNoml)" />
			<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColorRgba(0)" />
			<AcmeFmtFiat :value="setFiatNoml" :variant="getBgColorRgba(-setFiatNoml)" />
		</view>

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