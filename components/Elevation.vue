<template>
	<!-- <view>
		<view style="padding: 16px;
		border-radius: 8px;
		background-color: #121212;">
			<view v-for="(v,k) in [0,1,2,3,4,5,6,7,8,9]" :key="k" style="    background-color: #121212;
		color: #fff;
		-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		border-radius: 4px;
		font-weight: 400;
		font-size: 0.875rem;
		line-height: 60px;
		letter-spacing: 0.01071em;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);margin-bottom: 40rpx;
		height: 60px;"
				:style="{boxShadow:`var(--acme-shadow-elevation-${v})`,backgroundImage:`var(--acme-overlay-elevation-${v})`}">
				{{`--acme-shadow-`+v}}
			</view>
		</view>

		<view style="padding: 16px;
		border-radius: 8px;
		background-color: #FFF;">
			<view v-for="(v,k) in [0,1,2,3,4,5,6,7,8,9]" :key="k" style="background-color: #fff;
		color: rgba(0, 0, 0, 0.87);
		-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		border-radius: 4px;
		font-weight: 400;
		font-size: 0.875rem;
		line-height: 60px;
		letter-spacing: 0.01071em;
		text-align: center;
		color: rgba(0, 0, 0, 0.6);margin-bottom: 40rpx;
		height: 60px;" :style="{boxShadow:`var(--acme-shadow-elevation-${v})`}">
				{{`--acme-shadow-`+v}}
			</view>
		</view>
	</view> -->

	<view class="elevation-container">
		<!-- 暗色模式示例 -->
		<view class="elevation-group dark-mode-preview">
			<!-- 循环从 0 到 9 -->
			<view v-for="v in 10" :key="v - 1" class="elevation-item" :style="{
						boxShadow: `var(--acme-shadow-elevation-${v - 1})`,
						// 如果需要叠加背景叠加层，可以使用这个变量
						backgroundImage: `var(--acme-overlay-elevation-${v - 1})` 
					}">
				<text class="elevation-text">
					{{ `--acme-shadow-elevation-${v - 1}` }}
				</text>
			</view>
		</view>

		<!-- 亮色模式示例 -->
		<view class="elevation-group light-mode-preview">
			<!-- 循环从 0 到 9 -->
			<view v-for="v in 10" :key="v - 1" class="elevation-item"
				:style="{boxShadow:`var(--acme-shadow-elevation-${v - 1})`}">
				<text class="elevation-text">
					{{ `--acme-shadow-elevation-${v - 1}` }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Elevation",
	}
</script>

<style lang="scss" scoped>
	// 导入全局变量文件，以便使用所有设计令牌和主题变量
	@import '../styles/_variables.scss';
	@import '../styles/vars/_typography.scss'; // 导入排版类

	.elevation-container {
		padding: var(--acme-spacing-md); // 页面整体内边距
		background-color: var(--acme-bg-page); // 使用页面背景色变量
		min-height: 100vh; // 确保高度
	}

	.elevation-group {
		padding: var(--acme-spacing-md);
		border-radius: var(--acme-border-radius-md);
		margin-bottom: var(--acme-spacing-lg); // 组之间间距
		display: flex;
		flex-direction: column;
		gap: var(--acme-spacing-md); // 阴影项之间的间距
	}

	.dark-mode-preview {
		background-color: var(--acme-bg-card-dark); // 直接使用暗色卡片背景色
		color: var(--acme-text-color-primary-dark); // 暗色文本色
	}

	.light-mode-preview {
		background-color: var(--acme-bg-card); // 亮色卡片背景色
		color: var(--acme-text-color-primary); // 亮色文本色
	}

	.elevation-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 120rpx; // 对应 60px -> 120rpx
		border-radius: var(--acme-border-radius-sm); // 使用圆角变量
		font-weight: var(--acme-font-weight-regular); // 使用字重变量
		font-size: var(--acme-typography-body2-font-size); // 使用排版变量 (0.875rem 对应 body2)
		line-height: var(--acme-typography-body2-line-height); // 使用排版变量
		letter-spacing: var(--acme-typography-body2-letter-spacing); // 使用排版变量
		text-align: center;

		// 统一过渡效果，使用 CSS 变量
		transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

		.elevation-text {
			// 文本颜色会由父级 .elevation-group 的 color 属性继承
			// 或者可以明确设置：color: var(--acme-text-color-secondary);
			// 这里使用 rgba(0,0,0,0.6) 或 rgba(255,255,255,0.7) 可能是为了对比度，
			// 建议在 _variables.scss 中定义好这些文本颜色变量
			color: inherit; // 继承父容器的颜色
		}
	}
</style>