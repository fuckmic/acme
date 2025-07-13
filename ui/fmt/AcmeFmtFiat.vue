<template>
	<view :class="[`acme-fmt-fiat`,setClass]">
		<view v-if="$slots.prefix" class="prefix-slot">
			<slot name="prefix"></slot>
		</view>
		<text>{{ formattedValue }}</text>
		<view v-if="$slots.suffix" class="suffix-slot">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import { formatterFiat } from '../../utils/formatter';
	export default {
		name: "AcmeFmtFiat",
		props: {
			value: { type: [String, Number], default: 0 },
			locale: { type: String, default: '' },
			// 用于 'fiat' 类型，如 'USD', 'EUR'
			currency: { type: String, default: '' },
			showSign: {
				type: String,
				default: 'auto', // 默认自动显示，负数显示负号，正数不显示
				validator: (val) => ['auto', 'always', 'exceptZero', 'never'].includes(val),
			},
			color: { type: String, default: '' },
			bg: { type: String, default: '' },
		},
		computed: {
			curLgre() { return this.locale.length > 0 ? this.locale : acmeCfg.lgre; },
			curCurrency() { return this.currency.length > 0 ? this.currency : acmeCfg.currency; },
			formattedValue() {
				return formatterFiat(this.value, this.curLgre, this.curCurrency, this.showSign);
			},
			setClass() {
				const _color = this.color && this.color.length > 0 ? this.color : `var(--acme-fmt-color)`;
				const _bg = this.bg && this.bg.length > 0 ? this.bg : `transparent`;
				return { color: _color, backgroundColor: _bg };
			},
		},
	}
</script>

<style lang="scss" scoped>
	.acme-fmt-fiat {
		display: inline-flex;
		align-items: baseline;
		gap: 8rpx;
		white-space: nowrap;

		.prefix-slot,
		.suffix-slot {
			display: inline-flex;
			align-items: baseline;
		}
	}
</style>