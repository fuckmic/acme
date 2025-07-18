<template>
	<AcmePageContainer>
		<AcmeAppBarSub :title="$nav.keys.presetSelector" />
		<AcmeBottomNav :code="$nav.keys.presetSelector"></AcmeBottomNav>

		<view style="padding: 160rpx 40rpx 240rpx;">
			<view class="acme-h6">{{`PresetSelector`}}</view>
			<AcmePresetSelector v-model="formData.fiat" :list="optsFiat" @select="onSelected" />
			<AcmeDivider />
			<view class="acme-h6">{{`PresetSelector column`}}</view>
			<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="4" />
			<AcmeDivider />
			<view class="acme-h6">{{`PresetSelector column variant`}}</view>
			<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="5"
				variant="variant" />
			<AcmeDivider />
			<view class="acme-h6">{{`PresetSelector column`}}</view>
			<AcmePresetSelector v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="8" />

		</view>

	</AcmePageContainer>
</template>

<script>
	import AcmeAppBarSub from '../ui/nav/AcmeAppBarSub.vue';
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';

	import { acmeCfg } from '../config.js';
	import AcmePresetSelector from '../ui/form/AcmePresetSelector.vue';
	import { formatterFiat, formatterInteger } from '../utils/formatter';
	export default {
		components: {
			AcmeBottomNav,
			AcmeAppBarSub,
			AcmePresetSelector,
			AcmeDivider,
		},
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