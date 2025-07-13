<template>
	<view class="acme-fmt-value" :style="setStyle">
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
	import { formatterPercent } from '../../utils/formatter';
	export default {
		name: "AcmeFmtPercent",
		props: {
			value: { type: [String, Number], default: 0 },
			locale: { type: String, default: () => acmeCfg.lgre },
			showSign: { type: String, default: 'exceptZero' },
			color: { type: String, default: '' },
			bg: { type: String, default: '' },
		},
		computed: {
			formattedValue() {
				return formatterPercent(this.value, this.locale);
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

		.prefix-slot,
		.suffix-slot {
			display: inline-flex;
			align-items: baseline;
		}
	}
</style>