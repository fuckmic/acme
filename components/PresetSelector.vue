<template>
	<view>
		<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>
		<view class="acme-h3 acme-text-success">{{`PresetSelector`}}</view>
		<AcmePresetSelector v-model="formData.fiat" :list="optsFiat" @select="onSelected" />
		<view style="margin-bottom: 36rpx;"></view>
		<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="4" />
		<view style="margin-bottom: 36rpx;"></view>
		<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="5"
			variant="variant" />
		<view style="margin-bottom: 36rpx;"></view>
		<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="8" />
	</view>
</template>

<script>
	import { acmeCfg } from '../config.js';
	import AcmePresetSelector from '../ui/form/AcmePresetSelector.vue';
	import { formatterFiat, formatterInteger } from '../utils/formatter';
	export default {
		name: "PresetSelector",
		components: { AcmePresetSelector, },
		data() {
			return {
				formData: {
					fiat: '',
					lever: 1,
				}
			}
		},
		computed: {
			// 法比选项组
			optsFiat() {
				const tmp = [100, 500, 1000, 3000, 5000, 10000];
				return tmp.map(v => {
					const _label = formatterFiat(v, acmeCfg.lgre, acmeCfg.currency);
					return { key: v, label: _label }
				})
			},
			// 杠杆选项组
			optLevers() {
				const tmp = [1, 5, 10, 30, 50, 100, 300, 800];
				return tmp.map(v => {
					const _label = formatterInteger(v, acmeCfg.lgre);
					return { key: v, label: _label }
				})
			},
		},
		methods: {
			onSelected(val) {
				console.log(`val:`, val);
				this.formData.fiat = val;
			},
			onSelectedLever(val) {
				console.log(`val:`, val);
				this.formData.lever = val;
			},
		}
	}
</script>

<style>
</style>