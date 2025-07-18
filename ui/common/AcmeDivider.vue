<template>
	<view :class="[`acme-divider`,variant]">
		<view class="divider-line" :style="leftLineStyle"></view>
		<view v-if="$slots.default" class="divider-content">
			<slot></slot>
		</view>
		<view class="divider-line" :style="rightLineStyle"></view>
	</view>
</template>

<script>
	export default {
		name: "AcmeDivider",
		props: {
			leftLineRatio: { type: String, default: '' },
			variant: { type: String, default: '' },
		},
		computed: {
			/**
			 * 计算左侧线条的动态样式。
			 * - 如果 leftLineRatio 存在，则左线固定宽度，不拉伸。
			 * - 否则，左线拉伸。
			 */
			leftLineStyle() {
				const style = {};
				if (this.leftLineRatio) {
					style.width = this.leftLineRatio;
					style.flexGrow = 0; // 固定宽度，不拉伸
				} else {
					style.flexGrow = 1; // 默认拉伸，与右线平分空间
				}
				return style;
			},
			/**
			 * 计算右侧线条的动态样式。
			 * - 无论 leftLineRatio 是否存在，右线都拉伸以填充剩余空间。
			 */
			rightLineStyle() {
				// 右线总是拉伸以填充剩余空间
				return { flexGrow: 1 };
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 导入全局变量文件，以便使用所有设计令牌和主题变量
	@import '../../styles/_variables.scss';
	@import '../../styles/vars/_typography.scss'; // 导入排版类

	.acme-divider {
		display: flex;
		align-items: center;
		// 分割线和内容之间的间距，仅当有内容时生效，否则 gap 仅在左右线之间
		gap: 0;
		width: 100%; // 占据父容器全部宽度
		margin: var(--acme-divider-margin-y, var(--acme-spacing-sm)) 0; // 上下外边距
	}

	.divider-line {
		height: var(--acme-divider-line-thickness, 1rpx); // 线条粗细
		background-color: var(--acme-divider-line-color, var(--acme-border-color)); // 线条颜色
		flex-shrink: 1; // 默认可收缩，防止内容过多时挤压线条
		// flex-grow 和 width 将由计算属性动态设置，这里不再需要默认的 flex-grow: 1;
	}

	.divider-content {
		flex-shrink: 0; // 内容不收缩，保持其自然宽度
		padding: 0 var(--acme-divider-content-padding, var(--acme-spacing-xs)); // 内容左右内边距
		color: var(--acme-divider-content-color, var(--acme-text-color-secondary)); // 内容文本颜色
		font-size: var(--acme-divider-content-font-size, var(--acme-typography-caption-font-size)); // 内容字体大小
		white-space: nowrap; // 防止内容换行
		text-align: center; // 确保插槽内文本居中
	}
</style>