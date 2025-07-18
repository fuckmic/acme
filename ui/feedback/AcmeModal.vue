<template>
	<view v-if="isVisible" :class="[`modal_container`,`pos_${position}`]">
		<view class="overlay" @tap="cancel()" :style="{ backgroundColor:bgColor}"></view>
		<view :class="['modal_wrapper', `modal_wrapper_${position}`]" :style="modalWrapperStyle">
			<!-- 			<AcmePaper elevation="6" :sx="{ 
								position: 'absolute', // 或 'fixed'
								top: '50%', 
								left: '50%', 
								transform: 'translate(-50%, -50%)', 
								width: '100%', 
								height: '100%',
								zIndex: 19, // 引用 z-index 变量
							}"> -->
			<header class="header_wrapper">
				<view style="width: 32rpx;height: 32rpx;"></view>
				<view class="acme-h6 title">{{title}}</view>
				<view @tap.stop="cancel()">
					<!-- <WtfIcon icon="del"></WtfIcon> -->
					<AcmeIconClose :size="32" />
				</view>
			</header>
			<view style="margin-top: -32rpx;"></view>
			<AcmeDivider />
			<view class="body_wrapper">
				<slot></slot>
			</view>
			<AcmeDivider />
			<view style="margin-bottom: -32rpx;"></view>
			<footer class="footer_wrapper" v-if="showFooter">
				<view class="acme-button-text cancel" @tap="cancel()">{{cancelText}}</view>
				<view class="line_v"></view>
				<view class="acme-button-text confirm" @tap="confirm()">{{confirmText}}</view>
			</footer>
			<!-- </AcmePaper> -->
		</view>
	</view>
</template>

<script>
	import AcmePaper from '../common/AcmePaper.vue';
	import AcmeDivider from '../common/AcmeDivider.vue';
	import AcmeIconClose from '../icons/AcmeIconClose.vue';
	export default {
		name: "AcmeModal",
		components: { AcmePaper, AcmeDivider, AcmeIconClose },
		props: {
			show: { type: Boolean, default: false },
			title: { type: String, default: '' },
			showFooter: { type: Boolean, default: true },
			cancelText: { type: String, default: '' },
			confirmText: { type: String, default: '' },
			maxWidth: { type: Number, default: 700 },
			bgColor: { type: String, default: '' },
			// 弹层出现的位置，只允许 'bottom' 或 'center'
			position: {
				type: String,
				default: 'center', // 默认居中
				validator: (value) => ['bottom', 'center'].includes(value)
			},
		},
		data() {
			return {
				isVisible: this.show,
			};
		},
		computed: {
			// 动态计算 modal_wrapper 的样式
			modalWrapperStyle() {
				console.log(`ModalStyle:`, this.isVisible);
				const style = {};
				// 只有在 center 模式下才应用 maxWidth
				if (this.position === 'center') {
					style.maxWidth = `${this.maxWidth}px`;
				}
				// 在 bottom 模式下，宽度通常是 100%，不需要 maxWidth
				return style;
			}
		},
		watch: {
			show(newVal) {
				if (newVal) {
					this.isVisible = true; // 立即渲染容器
				} else {
					// 等待动画结束后再销毁容器
					setTimeout(() => {
						this.isVisible = false;
					}, 300);
				}
			}
		},
		methods: {
			cancel() { this.$emit('cancel'); },
			confirm() { this.$emit('confirm'); }
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/_variables.scss';

	.modal_container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
		pointer-events: auto;
		pointer-events: auto;

		/* 根据 position prop 调整内容对齐方式 */
		&.pos_center {
			align-items: center;
			justify-content: center;
		}

		&.pos_bottom {
			align-items: flex-end;
			justify-content: center;
		}
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--acme-modal-mask);
		z-index: 10;
	}

	/* 模态框内容包装器 */
	.modal_wrapper {
		z-index: 15;
		width: 90%;
		border-radius: 6rpx;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-sizing: border-box;
		background-color: var(--acme-bg-card);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		position: relative;
		min-height: 720rpx;
	}

	/* 居中弹层特有样式 */
	.modal_wrapper_center {
		max-height: 80vh;
	}

	/* 底部弹层特有样式 */
	.modal_wrapper_bottom {
		width: 100%;
		border-radius: var(--amce-border-radius-xs);
		max-height: 80vh;
	}

	.header_wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px;
	}

	.header_wrapper>.title {
		flex: 1;
		text-align: center;
		word-break: break-word;
		color: var(--acme-primary-color);
	}

	.body_wrapper {
		padding: var(--acme-spacing-sm);
		flex-grow: 1;
		overflow-y: auto;
	}

	.footer_wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24rpx;
		width: 100%;
		height: 100rpx;
		background-color: transparent;
	}

	.footer_wrapper>.cancel,
	.footer_wrapper>.confirm {
		flex: 1;
		text-align: center;
		cursor: pointer;
	}

	.footer_wrapper>.confirm {
		color: var(--acme-primary-color);
	}

	.footer_wrapper>.cancel,
	.footer_wrapper>.line {
		color: var(--acme-text-color-primary);
	}
</style>