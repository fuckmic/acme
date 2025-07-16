<template>
	<view>
		<view style="font-size: 40rpx;font-weight: 900;text-align: center;color:var(--acme-primary-color);">
			{{`Form Input`}}
		</view>
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
				<AcmeSvg :svgString="svgDataSearch" :size="48" />
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
		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<view style="color:var(--acme-primary-color);">{{`Current curFiat:`}}</view>
			<AcmeInputFiat v-model="formData.curFiat" :placeholder="`Enter curFiat`" />
		</view>
		<view style="margin: 16rpx 0; border: 1rpx dashed var(--acme-fmt-color);"></view>

		<view style="margin-bottom: 36rpx;"></view>

		<view style="display: flex;align-items: center;justify-content: space-between;gap:12rpx;">
			<view style="color:var(--acme-primary-color);">{{`Current Lever:`}}</view>
			<AcmeInputInteger v-model="formData.lever" :placeholder="`Enter Lever`" />
		</view>
		<view style="margin-bottom: 36rpx;"></view>
	</view>
</template>

<script>
	import AcmeSvg from '../ui/common/AcmeSvg.vue';
	import AcmeInputText from '../ui/form/AcmeInputText.vue';
	import AcmeInputPassword from '../ui/form/AcmeInputPassword.vue';
	import AcmeInputSearch from '../ui/form/AcmeInputSearch.vue';
	import AcmeInputFiat from '../ui/form/AcmeInputFiat.vue';
	import AcmeInputInteger from '../ui/form/AcmeInputInteger.vue';
	import { formatterFiat, formatterInteger } from '../utils/formatter';
	export default {
		components: {
			AcmeSvg,
			AcmeInputText,
			AcmeInputPassword,
			AcmeInputSearch,
			AcmeInputFiat,
			AcmeInputInteger,
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
		computed: {
			setColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); },
			svgData() { return exampleIconSvg(this.setColor) },
			svgDataSearch() { return svgSearch(this.setColor) },
		},
	}
</script>

<style>
</style>