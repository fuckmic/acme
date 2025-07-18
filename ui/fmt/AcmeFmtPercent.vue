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
	import { formatterPercent } from '../../utils/formatter';
	export default {
		name: "AcmeFmtPercent",
		props: {
			value: { type: [String, Number], default: 0 },
			lgre: { type: String, default: () => acmeCfg.lgre },
			showSign: { type: String, default: 'exceptZero' },
			color: { type: String, default: undefined },
			bg: { type: String, default: undefined },
			variant: { type: String, default: '' },
		},
		computed: {
			formattedValue() {
				return formatterPercent(this.value, this.lgre);
			},
			setColor() { return this.color || `var(--acme-fmt-color)` },
			setBg() { return this.bg || `var(--acme-fmt-bg)` },
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_format-base.scss';
</style>