<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.input}}</view>
			</view>
		</AcmeAppBar>

		<AcmeBottomNav :code="$nav.keys.input"></AcmeBottomNav>

		<view style="padding:160rpx 40rpx;">
			<view class="acme-h6">{{`Form Input`}}</view>
			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`">
				<!-- <template #prefix>
				<AcmeSvg :svgString="svgDataSearch" :size="48" />
			</template>
			<template #suffix>
				<view style="font-size: 28rpx;color:var(--acme-primary-color);">{{`Search`}}</view>
			</template> -->
			</AcmeInputText>
			<view style="margin-bottom: 36rpx;"></view>

			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`" variant="variant-bordered" />
			<view style="margin-bottom: 36rpx;"></view>

			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`" variant="variant-filled" />
			<view style="margin-bottom: 36rpx;"></view>

			<AcmeInputText v-model="formData.account" :placeholder="`Enter account`" variant="variant-underline" />
			<view style="margin-bottom: 36rpx;"></view>

			<AcmeInputPassword v-model="formData.password" :placeholder="`Enter password`" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmeInputSearch v-model="formData.keyword" :placeholder="`Enter keyword`">
				<template #prefix>
					<!-- <AcmeSvg :svgString="svgDataSearch" :size="48" /> -->
				</template>
				<template #suffix>
					<view style="font-size: 28rpx;color:var(--acme-primary-color);">{{`Search`}}</view>
				</template>
			</AcmeInputSearch>
			<view style="margin-bottom: 36rpx;"></view>
			<AcmeInputFiat v-model="formData.amount" :placeholder="`Enter amount`" />
			<view style="margin-bottom: 36rpx;"></view>
			<AcmeInputInteger v-model="formData.quantity" :placeholder="`Enter quantity`" />
			<view style="margin-bottom: 36rpx;"></view>
			<view class="acme-h6">{{`Current curFiat:`}}</view>
			<AcmeInputFiat v-model="formData.curFiat" :placeholder="`Enter curFiat`" />

			<view class="acme-h6">{{`Current Lever:`}}</view>
			<AcmeInputInteger v-model="formData.lever" :placeholder="`Enter Lever`" />

			<AcmeDivider />
			<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
				<AcmeInputSearchExpand :placeholder="`Search...`">
					<!-- <template #prefix>
					<AcmeSvg :svgString="svgDataSearch" :size="24" />
				</template> -->
				</AcmeInputSearchExpand>
				<AcmeInputSearchExpand :placeholder="`Search...`" variant="search-expand">
					<!-- <template #prefix>
					<AcmeSvg :svgString="svgDataSearch" :size="24" />
				</template> -->
				</AcmeInputSearchExpand>
			</view>
			<view style="margin-bottom: 36rpx;"></view>
		</view>
	</AcmePageContainer>
</template>

<script>
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';

	import AcmeInputText from '../ui/inputs/AcmeInputText.vue';
	import AcmeInputPassword from '../ui/inputs/AcmeInputPassword.vue';
	import AcmeInputSearch from '../ui/inputs/AcmeInputSearch.vue';
	import AcmeInputFiat from '../ui/inputs/AcmeInputFiat.vue';
	import AcmeInputInteger from '../ui/inputs/AcmeInputInteger.vue';
	import AcmeInputSearchExpand from '../ui/inputs/AcmeInputSearchExpand.vue';
	export default {
		components: {
			AcmeAppBar,
			AcmeBottomNav,
			AcmeDivider,
			AcmeIconBack,

			AcmeInputText,
			AcmeInputPassword,
			AcmeInputSearch,
			AcmeInputFiat,
			AcmeInputInteger,
			AcmeInputSearchExpand,
		},
		data() {
			return {
				isChecked: false,
				formData: {
					account: '',
					password: '',
					keyword: '',
					amount: '',
					quantity: '',
					curFiat: '',
					lever: 1,
				},
			}
		},
		computed: {},
	}
</script>

<style>
</style>