<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.doc}}</view>
				<view style="margin-left: auto;">
					<AcmeInputSearchExpand v-model="formData.keyword" :placeholder="`Search...`" @click="onSearch">
						<!-- <template #suffix>
							<view @tap="onSearch">{{`Search`}}</view>
						</template> -->
					</AcmeInputSearchExpand>
				</view>
			</view>
		</AcmeAppBar>
		<AcmeBottomNav :code="$nav.keys.doc"></AcmeBottomNav>

		<view style="padding: 160rpx 40rpx;">

		</view>
	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	import AcmeInputSearchExpand from '../ui/inputs/AcmeInputSearchExpand.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';
	export default {
		components: {
			AcmeBottomNav,
			AcmeAppBar,
			AcmeInputSearchExpand,
			AcmeIconBack
		},
		data() {
			return {
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