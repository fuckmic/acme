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
	import { acmeCfg } from '../../config.js';
	import { formatterCrypto } from '../../utils/formatter';
	export default {
		name: "AcmeFmtCrypto",
		props: {
			value: { type: [String, Number], default: 0 },
			lgre: { type: String, default: () => acmeCfg.lgre },
			showSign: {
				type: String,
				default: 'auto', // 默认自动显示，负数显示负号，正数不显示
				validator: (val) => ['auto', 'always', 'exceptZero', 'never'].includes(val),
			},
			// 外部组件样式覆盖
			variant: { type: String, default: '' },
		},
		computed: {
			formattedValue() {
				return formatterCrypto(this.value, this.lgre, { signDisplay: this.showSign });
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_format-base.scss';
</style>