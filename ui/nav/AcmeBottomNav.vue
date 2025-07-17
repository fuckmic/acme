<template>
	<AcmePaper elevation="4" :sx="setSx">
		<view :class="[`acme-bottom-fixed`,variant]">
			<block v-for="(v,k) in tabs" :key="k">
				<view class="bottom-item" :class="{ 'is-active': curActive === k }" @tap="$nav.comLink(k)">
					<AcmeIcon :icon="`${k}${curActive === k?`_act`:``}`" path="/static/" :size="48" format="png" />
					<slot name="bottom-label" :tab-key="k" :tab-value="v" :is-active="curActive === k">
						<text class="acme-button-text">{{ v }}</text>
					</slot>
				</view>
			</block>
		</view>
	</AcmePaper>
</template>

<script>
	import AcmePaper from '../common/AcmePaper.vue';
	import AcmeIcon from '../common/AcmeIcon.vue';
	export default {
		name: "AcmeBottomNav",
		components: { AcmePaper, AcmeIcon, },
		props: {
			// v-model 绑定的当前选中 Tab 的值
			code: { type: String, default: null },
			tabs: {
				type: Object,
				default: () => ({
					'index': `Home`,
					'components': `Compontnes`,
					'elevation': `Elevation`,
					'input': `Input`,
					'doc': `Readme`,
				})
			},
			// 外部组件样式覆盖
			variant: { type: String, default: '' },
		},
		data() {
			return {
				curActive: this.code, // 当前激活按钮的 key 值
			};
		},
		computed: {
			setSx() {
				return {
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,

					zIndex: 9, // 引用 z-index 变量
					backgroundImage: 'none'
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.acme-bottom-fixed {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--acme-bg-card);
		height: 100%;
		width: 100%;
		padding: 24rpx 0 40rpx;

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
	}
</style>