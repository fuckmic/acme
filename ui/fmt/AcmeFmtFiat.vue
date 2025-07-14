<template>
	<view :class="[`acme-fmt-value`,customClass]" :style="setStyle">
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
			locale: { type: String, default: () => acmeCfg.lgre },
			// 用于 'fiat' 类型，如 'USD', 'EUR'
			currency: { type: String, default: () => acmeCfg.currency },
			showSign: {
				type: String,
				default: 'auto', // 默认自动显示，负数显示负号，正数不显示
				validator: (val) => ['auto', 'always', 'exceptZero', 'never'].includes(val),
			},
			color: { type: String, default: '' },
			bg: { type: String, default: '' },
			customClass: { type: String, default: '' },
		},
		computed: {
			formattedValue() {
				return formatterFiat(this.value, this.locale, this.currency, this.showSign);
			},
			setStyle() {
				const _color = this.color && this.color.length > 0 ? this.color : `var(--acme-fmt-color)`;
				const _bg = this.bg && this.bg.length > 0 ? this.bg : `transparent`;
				return { color: _color, backgroundColor: _bg };
			},
		},
	}
</script>

<style lang="scss" scoped>
	.acme-fmt-value {
		display: inline-flex;
		align-items: baseline;
		gap: 8rpx;
		white-space: nowrap;
		font-size: var(--acme-fmt-size);

		.prefix-slot,
		.suffix-slot {
			display: inline-flex;
			align-items: baseline;
		}
	}
</style>