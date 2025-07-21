<template>
	<view :class="[`acme-select-option`,variant, { 'selected': curSelected }]" @tap="onTap">
		<AcmeCheckbox v-model="curSelected" @change="onCheck" />
		<image :src="option.icon" mode="heightFix" class="option-logo"></image>
		<view class="acme-caption opticon-code">
			{{option.code}}
		</view>
		<view class="acme-caption option-value">{{option.value}}</view>
	</view>
</template>

<script>
	import AcmeCheckbox from '../form/AcmeCheckbox.vue';
	export default {
		name: 'AcmeSelectorOption',
		components: { AcmeCheckbox },
		props: {
			option: { type: Object, default: undefined },
			variant: { type: String, default: '' },
			isSelected: { type: Boolean, default: false },
		},
		data() {
			return {
				curSelected: this.isSelected,
			}
		},
		methods: {
			onTap() {
				this.$emit('click', this.option);
			},
			onCheck(val) {
				this.curSelected = true;
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

		.option-logo {
			width: auto;
			height: 64rpx;
		}

		.opticon-code {
			flex: 1;
			color: var(--acme-text-color-primary);
		}

		.option-value {
			flex: 1;
			min-width: max-content;
		}

		// 选中状态的样式
		&.selected {
			.opticon-code {
				font-weight: bold; // 选中时的字体加粗
				color: var(--acme-success); // 选中时的文字颜色，可以使用你预设的成功色
			}

			.option-value {
				color: var(--acme-success); // 选中时的文字颜色，可以使用你预设的成功色
			}
		}
	}
</style>