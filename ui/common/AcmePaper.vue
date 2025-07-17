<template>
	<view class="acme-paper" :style="componentStyles">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "AcmePaper",
		props: {
			elevation: {
				type: [Number, String],
				default: 1, // 默认海拔
				validator: (val) => val >= 0 && val <= 24, // 确保海拔值在有效范围内
			},
			sx: { type: Object, default: () => ({}), },
		},
		computed: {
			componentStyles() {
				const elevationSpecificStyles = {
					'box-shadow': `var(--acme-shadow-elevation-${this.elevation})`,
					'background-image': `var(--acme-overlay-elevation-${this.elevation})`,
					// background-color 可以在 .acme-paper 类中设置默认值，
					// 或者如果 sx 传入了 background-color，则会被覆盖。
				};
				return {
					...elevationSpecificStyles,
					...this.sx,
				};
			},
		},
	}
</script>

<style lang="scss" scoped>
	// 导入主变量文件，它会间接导入 elevation.scss 
	@import '../../styles/_variables.scss';

	.acme-paper {
		background-color: var(--acme-bg-card);
		// border-radius: var(--acme-border-radius-md);
		transition: box-shadow 0.3s ease-in-out,
			background-image 0.3s ease-in-out,
			background-color 0.3s ease-in-out,
			// 以下是可能通过 sx 设置的定位和尺寸属性
			position 0.3s ease-in-out,
			top 0.3s ease-in-out,
			bottom 0.3s ease-in-out,
			left 0.3s ease-in-out,
			right 0.3s ease-in-out,
			width 0.3s ease-in-out,
			height 0.3s ease-in-out,
			transform 0.3s ease-in-out, // 针对 center 定位
			z-index 0.3s ease-in-out;
	}
</style>