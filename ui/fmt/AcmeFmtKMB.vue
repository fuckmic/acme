<template>
	<view :class="[`acme-fmt-value`,variant]">
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
	import { acmeConfig } from '../../config.js';
	import { formatterKMB } from '../../utils/formatter';
	export default {
		name: "AcmeFmtKMB",
		props: {
			value: { type: [String, Number], default: 0 },
			lgre: { type: String, default: () => acmeConfig.lgre },
			maxFractionDigits: { type: Number, default: 2 }, // KMB通常保留2位小数
			showSign: { type: String, default: 'auto' },
			// 控制紧凑型显示方式  'short' (默认，如 1M, 1B), 'long' (如 1 million, 1 billion)
			compactDisplay: {
				type: String,
				default: 'short',
				validator: (val) => ['short', 'long'].includes(val),
			},
			variant: { type: String, default: '' },
		},
		computed: {
			formattedValue() {
				return formatterKMB(this.value, this.lgre, { signDisplay: this.showSign, compact: this.compactDisplay });
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_format-base.scss';
</style>