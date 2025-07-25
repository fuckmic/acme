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
	import { formatterPercent } from '../../utils/formatter';
	export default {
		name: "AcmeFmtPercent",
		props: {
			value: { type: [String, Number], default: 0 },
			lgre: { type: String, default: () => acmeConfig.lgre },
			showSign: { type: String, default: 'exceptZero' },
			variant: { type: String, default: '' },
		},
		computed: {
			formattedValue() {
				return formatterPercent(this.value, this.lgre);
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_format-base.scss';
</style>