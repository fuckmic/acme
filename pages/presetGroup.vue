<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.presetSelector}}</view>
			</view>
		</AcmeAppBar>
		<BottomNav :code="$nav.keys.presetSelector" />

		<view style="padding: 160rpx 40rpx 240rpx;">
			<view class="acme-h6">{{`PresetSelector`}}</view>
			<AcmePresetGroup v-model="formData.fiat" :list="optsFiat" @select="onSelected" />
			<AcmeDivider />
			<view class="acme-h6">{{`PresetSelector column`}}</view>
			<AcmePresetGroup v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="4" />
			<AcmeDivider />
			<view class="acme-h6">{{`PresetSelector column variant`}}</view>
			<AcmePresetGroup v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="5"
				variant="variant" />
			<AcmeDivider />
			<view class="acme-h6">{{`PresetSelector column`}}</view>
			<AcmePresetGroup v-model="formData.lever" :list="optLevers" @select="onSelectedLever" :column="8" />
			<view class="acme-h6">{{`Current Lever:`}}</view>
			<AcmeInputInteger v-model="formData.lever" :placeholder="`Enter Lever`" />
		</view>

	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';
	import AcmeInputInteger from '../ui/inputs/AcmeInputInteger.vue';
	import { acmeConfig } from '../config.js';
	import AcmePresetGroup from '../ui/selectors/AcmePresetGroup.vue';
	export default {
		components: {
			BottomNav,
			AcmeAppBar,
			AcmeIconBack,
			AcmePresetGroup,
			AcmeDivider,
			AcmeInputInteger,
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
					const _label = this.$fmt.fmtFiat(v);
					return { key: v, label: _label }
				})
			},
			// 杠杆选项组
			optLevers() {
				const tmp = [1, 5, 10, 30, 50, 100, 300, 800];
				return tmp.map(v => {
					const _label = this.$fmt.fmtInteger(v);
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