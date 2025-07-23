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
			<AcmeDivider leftLineRatio="80rpx">
				<view class="acme-h6">{{`Dropdown`}}</view>
			</AcmeDivider>
			<view style="display: flex;align-items: center;gap:24rpx;">
				<view style="position: relative;">
					<AcmeIconLang @click="openDropdown('lang')" :size="64" />
					<template v-if="activeDropdownName === 'lang'">
						<AcmeDropdown name="lang" :show="activeDropdownName === 'lang'" :options="langOpts" :active="selectedLang"
							:elevation="6" @select="onSelectedLang" @cancel="onCancel" :title="`Choose Lang`" :position="{left:0}" />
					</template>
				</view>

				<view style="position: relative;border-radius: 100%;width: 64rpx;height: 64rpx;">
					<image :src="selectedLang.icon" mode="scaleToFill" style="width: 100%;height: 100%;border-radius: 100%;"
						@tap="openDropdown('flag')">
					</image>
					<template v-if="activeDropdownName === 'flag'">
						<AcmeDropdown name="flag" :show="activeDropdownName === 'flag'" :options="flagOpts" :active="selectedFlag"
							:elevation="6" @select="onSelectedFlag" @cancel="onCancel" :title="`Choose Flag`" :position="{left:0}" />
					</template>
				</view>
			</view>

			<view style="position: relative;">
				<text class="acme-h6" @tap="openDropdown('country')">
					{{`Dropdown Country:`+ selectedCountry.value }}</text>
				<template v-if="activeDropdownName === 'country'">
					<AcmeDropdown name="country" :show="activeDropdownName === 'country'" :options="countryOpts"
						:active="selectedCountry" :elevation="6" @select="onSelectedCountry" @cancel="onCancel"
						:title="`Choose Country`" :position="{right:0}" />
				</template>
			</view>

			<view style="position: relative;">
				<text class="acme-h6" @tap="openDropdown('currency')">
					{{`Dropdown Currency:`+ selectedCurrency.value }}</text>
				<template v-if="activeDropdownName === 'currency'">
					<AcmeDropdown name="currency" :show="activeDropdownName === 'currency'" :options="currencyOpts"
						:active="selectedCurrency" :elevation="6" @select="onSelectedCurrency" @cancel="onCancel"
						:title="`Choose Currency`" :position="{left:0}" />
				</template>
			</view>

			<AcmeDivider leftLineRatio="80rpx">
				<view class="acme-h6">{{`Dropdown`}}</view>
			</AcmeDivider>

			<view style="position: relative;">
				<AcmeInputText v-model="formData.keyword" :placeholder="`Enter keyword`" variant="variant-bordered" isSpace
					@focus="onFocus" @blur="onBlur" />
				<template v-if="showDropdown">
					<AcmeDropdown name="currency" :show="showDropdown" :options="currencyOpts" :active="selectedCurrency"
						:elevation="6" @select="onSelectedCurrencyAuto" @cancel="onCancel" :title="`Choose Currency`"
						:position="{left:0}" />
				</template>
			</view>


		</view>

	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';
	import AcmeDivider from '../ui/common/AcmeDivider.vue';
	import AcmeDropdown from '../ui/selectors/AcmeDropdown.vue';
	import AcmeIconLang from '../ui/icons/AcmeIconLang.vue';
	import { setLgres } from '../intl/index.js';
	import AcmeInputText from '../ui/inputs/AcmeInputText.vue';
	export default {
		components: {
			BottomNav,
			AcmeAppBar,
			AcmeIconBack,
			AcmeDivider,
			AcmeDropdown,
			AcmeIconLang,
			AcmeInputText,
		},
		data() {
			return {
				activeDropdownName: null, //  记录当前打开的 dropdown 的名字 (string: 'lang', 'country', 'currency' 或 null)
				selectedLang: null,
				selectedCountry: null,
				selectedCurrency: null,
				selectedFlag: null,
				curLgres: setLgres(['en-US', 'de-DE']),
				formData: {
					keyword: ''
				},
				showDropdown: false,
			};
		},
		computed: {
			langOpts() {
				const result = Object.values(this.curLgres['en-US']).map(v => {
					return { icon: v.flag, code: v.code, value: v.lang }
				});
				console.log(`langOpts:`, result);
				return result;
			},
			countryOpts() {
				const result = Object.values(this.curLgres['en-US']).map(v => {
					return { icon: v.flag, code: v.code, value: v.country }
				});
				console.log(`setOpts:`, result);
				return result;
			},
			currencyOpts() {
				const result = Object.values(this.curLgres['en-US']).map(v => {
					return { icon: v.flag, code: v.code, value: v.currency }
				});
				console.log(`setOpts:`, result);
				return result;
			},
			flagOpts() {
				const result = Object.values(this.curLgres['en-US']).map(v => {
					return { icon: v.flag, code: v.code, value: v.country }
				});
				console.log(`setOpts:`, result);
				return result;
			}
		},
		onShow() {
			this.selectedLang = this.langOpts[0];
			this.selectedCountry = this.countryOpts[0];
			this.selectedCurrency = this.currencyOpts[0];
			this.selectedFlag = this.flagOpts[0];
		},
		methods: {
			onFocus() {
				// this.activeDropdownName = (this.activeDropdownName === dropdownName) ? null : dropdownName;
				this.showDropdown = true;
			},
			onSelectedCurrencyAuto(opt) {
				this.selectedCurrency = opt;
				this.formData.keyword = opt.value;

				this.showDropdown = false;
			},

			// 统一的打开 Dropdown 方法
			openDropdown(dropdownName) {
				// 如果点击的是当前已打开的 dropdown，则关闭
				// 否则，打开新的 dropdown 并关闭其他所有
				this.activeDropdownName = (this.activeDropdownName === dropdownName) ? null : dropdownName;
			},

			// 统一的取消/关闭方法
			// AcmeDropdown 应该在 @cancel 事件中传递其 name
			onCancel(dropdownName) {
				if (this.activeDropdownName === dropdownName) {
					this.activeDropdownName = null;
				}
				console.log(`Canceled: ${dropdownName}`);
			},

			// 各自的选中方法保持不变，但选中后也应该关闭当前的 dropdown
			onSelectedLang(opt) {
				this.selectedLang = opt;
				console.log('Selected Lang:', opt);
				this.activeDropdownName = null; // 选中后关闭当前的 dropdown
			},
			onSelectedCountry(opt) {
				this.selectedCountry = opt;
				console.log('Selected Country:', opt);
				this.activeDropdownName = null; // 选中后关闭当前的 dropdown
			},
			onSelectedCurrency(opt) {
				this.selectedCurrency = opt;
				this.activeDropdownName = null;
			},
			onSelectedFlag(opt) {
				this.selectedFlag = opt;
				this.activeDropdownName = null;
			},
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