<template>
	<image :src="setSrc" :style="[computedStyle, customStyle]" :mode="imageMode" />
</template>
<script>
	export default {
		name: "AcmeIcon",
		props: {
			icon: { type: String, required: true },
			size: { type: Number, default: 32, }, // 默认尺寸为 32rpx 
			format: {
				type: String,
				default: 'svg',
				validator: (val) => ['png', 'svg', 'webp', 'jpg', 'gif'].includes(val)
			},
			path: { type: String, default: '/static/' },
			// 尺寸模式
			// 'square': 默认，宽高相等，由 size 决定 (例如 32x32rpx)
			// 'heightFix': 高度固定，宽度自适应 (例如 height: 100rpx, width: auto)
			// 'widthFix': 宽度固定，高度自适应 (例如 width: 100rpx, height: auto)
			// 'full': 宽高都为 100% (适用于父容器已定尺寸)
			sizeMode: {
				type: String,
				default: 'square',
				validator: (val) => ['square', 'heightFix', 'widthFix', 'full'].includes(val)
			},
			// uni-app image 组件的原生 mode 属性，默认为 scaleToFill
			// 根据 sizeMode，可能需要调整此属性。例如 heightFix/widthFix 对应 image mode 也是 heightFix/widthFix
			mode: { type: String, default: 'scaleToFill' },
			// 允许外部传入自定义样式，会合并到组件内部计算的样式之后
			customStyle: { type: Object, default: () => ({}) }
		},
		computed: {
			setSrc() {
				// 确保路径拼接是正确 /static/icons/my-icon.svg 
				// 注意：这里需要处理路径是否有尾部斜杠的问题，或者约定 config.ASSETS_ROOT_PATH 不带尾部斜杠
				const rootPath = this.path.endsWith('/') ? this.path : `${this.path}/`;
				return `${rootPath}${this.icon}.${this.format}`;
			},
			// 根据 sizeMode 计算最终的样式
			computedStyle() {
				const style = {};
				switch (this.sizeMode) {
					case 'square':
						style.width = `${this.size}rpx`;
						style.height = `${this.size}rpx`;
						break;
					case 'heightFix':
						style.height = `${this.size}rpx`;
						style.width = 'auto'; // 或 'unset'
						break;
					case 'widthFix':
						style.width = `${this.size}rpx`;
						style.height = 'auto'; // 或 'unset'
						break;
					case 'full':
						style.width = '100%';
						style.height = '100%';
						break;
				}
				return style;
			},
			// 根据 sizeMode 确定 image 组件的 mode
			imageMode() {
				switch (this.sizeMode) {
					case 'heightFix':
						return 'heightFix';
					case 'widthFix':
						return 'widthFix';
					case 'full':
						// 对于 full 模式，可能希望图片填充，但又保持比例，通常用 aspectFit 或 aspectFill
						// 但如果父容器本身是固定比例，scaleToFill 也行。保留用户传入的 mode
						return this.mode;
					default: // square 模式
						return this.mode; // 默认 scaleToFill
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ui-icon {
		display: block;
		// 防止在flex布局中被压缩
		flex-shrink: 0;
	}
</style>