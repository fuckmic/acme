<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.selectors}}</view>
			</view>
		</AcmeAppBar>
		<BottomNav :code="$nav.keys.selectors" />

		<view style="padding: 160rpx 40rpx 240rpx;">
			<view style="margin-left: auto;position: relative;" @tap="openCountryDropdown()">
				<text>选择国家: {{ selectedCountry.value }}</text>
				<template v-if="showCountryDropdown">
					<AcmeDropdown :show="showCountryDropdown" :options="countryOptions" :active="selectedCountry" :elevation="6"
						@select="onCountry" @cancel="onCancel" />
				</template>
			</view>

			<!-- 	<view class="my-trigger-element" @click="toggleCountryDropdown">
				<text>选择国家: {{ selectedCountry.value }}</text>
				<AcmeDropdown v-if="showCountryDropdown" :show="showCountryDropdown" :options="countryOptions"
					:active="selectedCountry" :position="{}" :elevation="6" @select="handleCountrySelect"
					@close="showCountryDropdown = false" />
			</view> -->



			<!-- <view class="another-trigger-element" @click="toggleCurrencyDropdown">
				<text>选择货币: {{ selectedCurrency.value }}</text>
				<AcmeDropdown v-if="showCurrencyDropdown" :show="showCountryDropdown" :options="currencyOptions"
					:active="selectedCurrency" :position="{}" :elevation="4" @select="handleCurrencySelect"
					@close="showCurrencyDropdown = false" />
			</view> -->






		</view>

	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';
	import AcmeDropdown from '../ui/selectors/AcmeDropdown.vue';
	export default {
		components: {
			BottomNav,
			AcmeAppBar,
			AcmeIconBack,
			AcmeDivider,
			AcmeDropdown,
		},
		data() {
			return {
				showCountryDropdown: false,
				selectedCountry: null,

				showCurrencyDropdown: false,
				currencyOptions: [
					{ code: 'USD', value: 'US Dollar', icon: '' },
					{ code: 'EUR', value: 'Euro', icon: '' },
					{ code: 'SGD', value: 'Singapore Dollar', icon: '' },
				],
				selectedCurrency: { code: 'USD', value: 'US Dollar', icon: '' },

			};
		},
		computed: {
			countryOptions() {
				// const tmp  = locales.map(v=>{
				// 	return {icon:v.flag,code:v.code,vlue:v.country}
				// })
				return [];
			}
		},
		onShow() {
			this.selectedCountry = this.countryOptions[0];
		},
		methods: {
			openCountryDropdown(event) {
				if (event) event.stopPropagation();
				this.showCountryDropdown = !this.showCountryDropdown;
			},
			onCountry(option) {
				this.selectedCountry = option;
				// `showCountryDropdown` 会在 AcmeDropdown 内部接收到 `close` 事件后自行设置为 `false`
				// 所以这里不需要再写 `this.showCountryDropdown = false;`
				console.log('Selected country:', option);
				console.log('Selected showCountryDropdown (after select):', this.showCountryDropdown);
			},
			onCancel() {
				this.showCountryDropdown = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.my-trigger-element,
	.another-trigger-element {
		position: relative;
		display: flex;
		align-items: center;
		padding: 10px 15px;
		border-bottom: 1px solid #ccc;
		border-radius: 5px;
		cursor: pointer;
		// background-color: #f9f9f9;
		min-width: 200px;
		justify-content: space-between;
		user-select: none;
		/* 防止文本被选中 */
		-webkit-tap-highlight-color: transparent;
		/* 移除点击高亮 */

		.arrow-icon {
			width: 24rpx;
			height: 24rpx;
			transition: transform 0.3s ease;
			margin-left: 10px;
		}

		.arrow-icon.open {
			transform: rotate(180deg);
		}
	}
</style>