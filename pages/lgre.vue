<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.lgre}}</view>
				<view style="margin-left: auto;">
					<AcmeInputSearchExpand v-model="formData.keyword" :placeholder="`Search...`" @click="onSearch" />
				</view>
			</view>
		</AcmeAppBar>
		<view style="padding: 160rpx 40rpx; ">
			<AcmeDivider leftLineRatio="40rpx">
				<view class="acme-h6">{{`All Intl`}}</view>
			</AcmeDivider>

			<block v-for="(v,k) in localeCfg" :key="k">
				<view style="border-bottom: 3rpx solid #FFFFFF;display: flex;align-items: center;gap:24rpx;padding: 24rpx 0;">
					<image :src="v.flag" mode="heightFix" style="width: auto;height: 120rpx;"></image>
					<view style="flex:1;">
						<view style="display: flex;align-items: center;gap:24rpx;">
							<view class="acme-caption" style="width:124rpx;">{{`Code:`}}</view>
							<view class="acme-caption">{{v.code}}</view>
						</view>
						<view style="display: flex;align-items: center;gap:24rpx;">
							<view class="acme-caption" style="width:124rpx;">{{`Timezone:`}}</view>
							<view class="acme-caption">{{v.tz}}</view>
						</view>
						<view style="display: flex;align-items: center;gap:24rpx;">
							<view class="acme-caption" style="width:124rpx;">{{`Currency:`}}</view>
							<view class="acme-caption">{{v.currency}}</view>
						</view>
						<view style="display: flex;align-items: center;gap:24rpx;">
							<view class="acme-caption" style="width:124rpx;">{{`Lang:`}}</view>
							<view class="acme-caption">{{v.lang}}</view>
						</view>
						<view style="display: flex;align-items: center;gap:24rpx;">
							<view class="acme-caption" style="width:124rpx;">{{`ID Code:`}}</view>
							<view class="acme-caption">{{v.idc}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</AcmePageContainer>
</template>

<script>
	import * as locales from '../utils/locales.js';
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';
	import AcmeInputSearchExpand from '../ui/inputs/AcmeInputSearchExpand.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';
	export default {
		components: {
			BottomNav,
			AcmeAppBar,
			AcmeIconBack,
			AcmeInputSearchExpand,
			AcmeDivider,
		},
		data() {
			return {
				localeCfg: locales,
				formData: {
					keyword: ''
				}
			}
		},
		methods: {
			onSearch() {
				console.log(this.formData.keyword);
			},
		}
	}
</script>

<style>
</style>