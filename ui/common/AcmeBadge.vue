<template>
	<view :class="[`acme-badge`,variant]">
		<slot></slot>
		<view v-if="showBadge" :class="['acme-badge-anchor', 'acme-caption', { 'is-dot': isDot }]" :style="badgeStyle">
			<text v-if="!isDot" class="acme-badge-text">{{ displayCount }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "AcmeBadge",
		props: {
			/**
			 * 徽章显示的数量或文本。
			 * 如果为 0 或空字符串，且 `showZero` 为 false，则显示为点。
			 */
			count: {
				type: [String, Number],
				default: ''
			},
			/**
			 * 徽章的锚点位置。
			 * { vert: 'top' | 'bottom', horz: 'left' | 'right' }
			 */
			anchor: {
				type: Object,
				default: () => ({ vert: 'top', horz: 'right' }),
				validator: (val) => {
					return ['top', 'bottom'].includes(val.vert) && ['left', 'right'].includes(val.horz);
				}
			},
			/**
			 * 徽章的背景颜色。
			 * 默认为主题的错误色 (通常是红色)。
			 */
			bgColor: {
				type: String,
				default: 'var(--acme-badge-bg)'
			},
			/**
			 * 是否在 count 为 0 时也显示徽章（而不是点）。
			 */
			showZero: {
				type: Boolean,
				default: false
			},
			/**
			 * 徽章是否显示为点（忽略 count 值）。
			 */
			dot: {
				type: Boolean,
				default: false
			},
			/**
			 * 徽章的最大显示数字。
			 * 如果 count 超过此值，将显示为 'max+'。
			 */
			max: {
				type: Number,
				default: 99
			},
			/**
			 * 徽章的变体，可用于定制不同风格的徽章。
			 */
			variant: {
				type: String,
				default: ''
			},
		},
		computed: {
			// 是否显示为点模式
			isDot() {
				return this.dot || (this.count === '' || (typeof this.count === 'number' && this.count === 0 && !this.showZero));
			},
			// 徽章是否应该显示
			showBadge() {
				if (this.isDot) {
					return true; // 点模式总是显示
				}
				// 非点模式，只有当 count 有效且不为 0 (除非 showZero 为 true) 时显示
				const numCount = parseFloat(this.count);
				return !isNaN(numCount) && (numCount !== 0 || this.showZero);
			},
			// 显示的数字或文本
			displayCount() {
				if (this.dot) return ''; // 点模式不显示数字

				const numCount = parseFloat(this.count);
				if (isNaN(numCount)) {
					return this.count; // 如果不是数字，直接显示原始文本
				}
				return numCount > this.max ? `${this.max}+` : String(numCount);
			},
			// 计算徽章的动态样式
			badgeStyle() {
				const style = {
					backgroundColor: this.bgColor,
				};

				// 根据 anchor 计算定位
				if (this.anchor.vert === 'top') {
					style.top = 'var(--acme-badge-vert-offset)'; // 使用新的垂直偏移变量
					style.transform = 'translateY(var(--acme-badge-translate-y-top))'; // 向上偏移
				} else { // bottom
					style.bottom = 'var(--acme-badge-vert-offset)'; // 使用新的垂直偏移变量
					style.transform = 'translateY(var(--acme-badge-translate-y-bottom))'; // 向下偏移
				}

				if (this.anchor.horz === 'right') {
					style.right = 'var(--acme-badge-horz-offset)'; // 使用新的水平偏移变量
					style.transform += ' translateX(var(--acme-badge-translate-x-right))'; // 向右偏移
				} else { // left
					style.left = 'var(--acme-badge-horz-offset)'; // 使用新的水平偏移变量
					style.transform += ' translateX(var(--acme-badge-translate-x-left))'; // 向左偏移
				}

				// 如果是点模式，固定尺寸
				if (this.isDot) {
					style.width = 'var(--acme-badge-min-size)';
					style.height = 'var(--acme-badge-min-size)';
					style.padding = '0'; // 点模式无内边距
				} else {
					// 根据内容自适应宽度，保持高度为最小尺寸
					style.minWidth = 'var(--acme-badge-min-size)';
					style.height = 'var(--acme-badge-min-size)';
					style.padding = `0 var(--acme-badge-padding-x)`;
				}

				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_variables.scss';

	.acme-badge {
		position: relative;
		display: inline-flex; // 确保内容和徽章都在同一行
		vertical-align: middle; // 垂直居中对齐父级行内元素
		flex-shrink: 0; // 防止徽章容器在 flex 布局中收缩
	}

	.acme-badge-anchor {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap; // 内容不换行
		justify-content: center;
		align-content: center;
		align-items: center;
		position: absolute; // 绝对定位
		box-sizing: border-box;
		line-height: 1; // 确保文本行高不影响徽章高度
		z-index: var(--acme-z-index-tooltip, 1500); // 确保徽章在内容之上
		color: var(--acme-badge-color); // 徽章文字颜色
		border-radius: 100%; // 确保是圆形
		white-space: nowrap; // 防止数字换行

		font-size: var(--acme-badge-font-size); // 引用排版变量
		font-weight: var(--acme-badge-font-weight); // 引用字重变量

		// 默认过渡效果
		transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

		&.is-dot {
			// 点模式下的样式
			min-width: var(--acme-badge-min-size); // 最小尺寸
			height: var(--acme-badge-min-size);
			padding: 0; // 点模式无内边距
		}
	}

	.acme-badge-text {
		// 文本本身没有额外样式，继承父级 .acme-badge-anchor 的样式
	}
</style>