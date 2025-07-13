<template>
	<image :src="computedSvgSrc" :style="computedStyle" :mode="mode" :class="customClass"></image>
</template>

<script>
	export default {
		name: "AcmeSvg",
		props: {
			// 接收完整的 SVG 字符串作为 prop
			svgString: { type: String, required: true },
			// 尺寸，单位 rpx 以下 props 与 <image> 标签的渲染和样式相关
			size: { type: [Number, String], default: 32 },
			sizeMode: { // 尺寸模式，例如 'square', 'heightFix', 'widthFix'
				type: String,
				default: 'square',
				validator: (val) => ['square', 'heightFix', 'widthFix'].includes(val)
			},
			mode: { // Uni-app image 组件的 mode 属性
				type: String,
				default: 'scaleToFill'
			},
			customClass: { type: String, default: '' }
		},
		computed: {
			// 动态生成 Base64 Data URL
			computedSvgSrc() {
				if (!this.svgString) {
					console.warn("AcmeSvg: svgString prop is empty.");
					return '';
				}
				// 对 SVG 字符串进行编码和 Base64 转换
				const svgData = encodeURIComponent(this.svgString)
					.replace(/'/g, '%27') // 替换单引号
					.replace(/"/g, '%22'); // 替换双引号
				return `data:image/svg+xml;charset=utf-8,${svgData}`;
			},
			// 计算图片尺寸样式
			computedStyle() {
				let style = {};
				const sizeInRpx = typeof this.size === 'number' ? `${this.size}rpx` : this.size;

				switch (this.sizeMode) {
					case 'square':
						style.width = sizeInRpx;
						style.height = sizeInRpx;
						break;
					case 'heightFix':
						style.height = sizeInRpx;
						style.width = 'auto'; // 宽度自适应
						break;
					case 'widthFix':
						style.width = sizeInRpx;
						style.height = 'auto'; // 高度自适应
						break;
				}
				return style;
			}
		}
	}
</script>

<style>

</style>