<template>
	<view :class="[`acme-fmt-value`,variant]" :style="{backgroundColor:setBg}">
		<view v-if="$slots.prefix" class="prefix-slot">
			<slot name="prefix"></slot>
		</view>
		<text :style="{color:setColor}">{{ formattedValue }}</text>
		<view v-if="$slots.suffix" class="suffix-slot">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import { formatterKMB } from '../../utils/formatter';
	export default {
		name: "AcmeFmtKMB",
		props: {
			value: { type: [String, Number], default: 0 },
			locale: { type: String, default: () => acmeCfg.lgre },
			currency: { type: String, default: () => acmeCfg.currency },
			maxFractionDigits: { type: Number, default: 2 }, // KMB通常保留2位小数
			showSign: { type: String, default: 'auto' },
			// 控制紧凑型显示方式  'short' (默认，如 1M, 1B), 'long' (如 1 million, 1 billion)
			compactDisplay: {
				type: String,
				default: 'short',
				validator: (val) => ['short', 'long'].includes(val),
			},
			color: { type: String, default: undefined },
			bg: { type: String, default: undefined },
			variant: { type: String, default: '' },
		},
		computed: {
			formattedValue() {
				return formatterKMB(this.value, this.locale, { signDisplay: this.showSign, compact: this.compactDisplay });
			},
			setColor() { return this.color || `var(--acme-fmt-color)` },
			setBg() { return this.bg || `var(--acme-fmt-bg)` },
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_format-base.scss';
</style>