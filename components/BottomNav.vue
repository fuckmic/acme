<template>
	<AcmeBottomNav>
		<block v-for="(v,k) in internalTabs" :key="k">
			<view class="bottom-item" :class="{ 'is-active': curActive === k }" @tap="$nav.comLink(k)">
				<AcmeIcon :icon="`${k}${curActive === k?`_act`:``}`" path="/static/" :size="48" format="png" />
				<!-- {{`nav.${k}`}} -->
				<DisplayLabel :transKey="`nav.${k}`" variant="acme-button-text" :fallbackText="k" />
			</view>
		</block>
	</AcmeBottomNav>
</template>

<script>
	import AcmeBottomNav from '../ui/nav/AcmeBottomNav.vue';
	import AcmeIcon from '../ui/common/AcmeIcon.vue';
	import DisplayLabel from '../components/label/DisplayLabel.vue';
	export default {
		name: "BottomNav",
		components: { AcmeBottomNav, AcmeIcon, DisplayLabel },
		props: {
			code: { type: String, default: null },
			tabs: { type: Object, default: null },
		},
		data() {
			return {
				curActive: this.code, // 当前激活按钮的 key 值
				internalTabs: this.tabs || this.$appCfg.bottomNavCfg
			};
		},
	}
</script>

<style lang="scss" scoped>
	.bottom-item {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		.acme-button-text {
			font-size: 24rpx;
			text-transform: capitalize;
		}

		// 激活状态样式
		&.is-active {
			.acme-button-text {
				color: var(--acme-primary-color) !important;
			}
		}
	}
</style>