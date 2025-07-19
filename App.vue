<script>
	import Vue from 'vue';
	export default {
		onLaunch: async function() {
			console.log('App Launch');
			uni.hideTabBar();
			// 获取系统信息
			const systemInfo = uni.getSystemInfoSync();
			this.$appCfg.appName = systemInfo.appName;
			this.$appCfg.version = systemInfo.appVersion;
			this.$appCfg.width = systemInfo.windowWidth;
			this.$appCfg.height = systemInfo.windowHeight;

			console.log('App Launch', systemInfo);
			// 根据缓存的语言设置 intl 的当前 locale，填充 msg
			this.$intl.setLocale(this.$appCfg.lgre);
			// 在设置完成语言代码，并拉取接口语言js后，设置底导航
			this.$appCfg.bottomNavCfg = {
				[this.$nav.keys.home]: this.$intl.msg.nav.home,
				[this.$nav.keys.kline]: this.$intl.msg.nav.kline,
				[this.$nav.keys.chart]: this.$intl.msg.nav.chart,
				[this.$nav.keys.inputs]: this.$intl.msg.nav.inputs,
				[this.$nav.keys.doc]: this.$intl.msg.nav.doc,
			};
		},
		onShow: function(opt) {
			console.log('App Show', opt)
			uni.hideTabBar();
			// --- 应用进入前台时执行的逻辑 ---
			// 重新获取可能在前后台切换中变化的系统信息 (如屏幕旋转)
			const systemInfo = uni.getSystemInfoSync();
			this.$appCfg.width = systemInfo.windowWidth;
			this.$appCfg.height = systemInfo.windowHeight;
			console.log('App Show', systemInfo)
		},
		onHide: function() {
			console.log('App Hide');
			uni.hideTabBar();
		}
	}
</script>

<style lang="scss">
	@import "@/styles/_variables.scss";
	@import '@/styles/_acme-typography.scss';
	@import '@/styles/_acme-input.scss';

	// @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
	// @import url('https://fonts.googleapis.com/css2?family=Roboto:wdth,wght@75..100,100..900&display=swap');
	// @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');


	// @media screen and (max-device-width:375px) {
	// 	page {
	// 		width: 100vw;
	// 	}
	// }

	// @media screen and (min-device-width:376px) and (max-device-width:750px) {
	// 	page {
	// 		width: 100vw;
	// 		margin: 0 auto;
	// 	}
	// }

	// @media screen and (min-device-width:751px) {
	// 	page {
	// 		width: 750px;
	// 		margin: 0 auto;
	// 	}
	// }


	* {
		font-family: "Open Sans", serif;
		font-style: normal;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	page {
		background-color: var(--acme-bg-page);
		color: var(--acme-text-color-primary);
	}

	/* --- 变体特定样式 --- */

	/* 'pill' 变体 */
	.acme-tabs-fixed.variant-pill {
		border-bottom: 1rpx solid #444444;

		.tab-item {
			.tab-text {
				color: #121212;
				background-color: var(--acme-tabs-pill-unactive-bg, transparent);
				padding-bottom: 12rpx;
				border-bottom: 6rpx solid transparent;
			}

			&.is-active {
				.tab-text {
					color: var(--acme-primary-color);
					background-color: transparent;
					border-bottom-color: var(--acme-primary-color);
				}
			}

			&:hover {
				.tab-text {
					background-color: var(--acme-tabs-pill-hover-bg, rgba(0, 0, 0, 0.05));
				}
			}

			&.is-active:hover {
				.tab-text {
					background-color: transparent;
				}
			}
		}
	}

	/* acme-preset-selector variant */
	.acme-preset-selector.variant {
		--acme-preset-selector-size: 40rpx;

		::v-deep .selector-item {
			font-weight: 900;
		}

		::v-deep .selector-item.is-selected {
			background-color: royalblue;
			color: lemonchiffon;
		}
	}
</style>