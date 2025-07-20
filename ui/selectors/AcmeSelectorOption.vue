<template>
	<view :class="[`acme-select-option`,variant, { 'selected': isSelected }]" @tap="onTap">
		<view v-show="isSelected" class="selected-icon">
			{{`✔`}}
		</view>
		<image :src="option.icon" mode="heightFix" class="option-logo"></image>
		<view class="acme-caption opticon-code">
			{{option.code}}
		</view>
		<view class="acme-caption option-value">{{option.value}}</view>

	</view>
</template>

<script>
	export default {
		name: 'AcmeSelectorOption',
		props: {
			option: { type: Object, default: undefined },
			variant: { type: String, default: '' },
			isSelected: { type: Boolean, default: false },
		},
		methods: {
			onTap() {
				this.$emit('click', this.option);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-select-option {
		display: flex;
		align-items: center;
		gap: 24rpx;
		padding: 16rpx 24rpx; // 添加一些内边距，使点击区域更舒适
		cursor: pointer; // 添加手型光标

		&:hover {
			background-color: var(--acme-bg-card-rgba); // 鼠标悬停效果
		}

		.option-logo {
			width: auto;
			height: 64rpx;
		}

		.opticon-code {
			flex: 1;
			color: var(--amce-primary-color);
		}

		.option-value {
			flex: 1;
			min-width: max-content;
		}

		// 选中状态的样式
		&.selected {
			background-color: var(--acme-bg-card); // 选中时的背景色
			font-weight: bold; // 选中时的字体加粗
			color: var(--acme-success); // 选中时的文字颜色，可以使用你预设的成功色
		}

		.selected-icon {
			margin-left: auto; // 将选中图标推到最右边
			color: var(--acme-success); // 选中图标的颜色
			font-size: 36rpx;
		}
	}
</style>