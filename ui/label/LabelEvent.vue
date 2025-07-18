<template>
	<!-- 需要绑定组合热键，鉴权 -->
	<view :class="[`label-event`,variant]" @contextmenu.prevent="handleEditHotKey" class="editable-label-highlight">
		<view class="acme-body1"> {{label}} </view>
		<template v-if="showModal">
			<AcmeLabelEdit :transKey="translationKey" :initialLabel="label" @close-modal="showModal = false"
				@update-translation="handleUpdateTranslation" />
		</template>
	</view>
</template>

<script>
	import AcmeLabelEdit from './AcmeLabelEdit.vue';
	export default {
		name: 'LabelEvent',
		components: { AcmeLabelEdit },
		props: {
			label: { type: String, default: '' },
			// translationKey: 对应的 JSON key，这是 AcmeLabelEdit 修改时需要的
			translationKey: { type: String, required: true },
			// 外部变体
			variant: { type: String, default: '' },
		},
		data() {
			return {
				showModal: false,
			}
		},
		mounted() {},
		beforeDestroy() {},
		methods: {
			// 鉴权方法：检查当前用户是否有修改翻译的权限
			// 这个方法应该由主项目提供或在 Vue.prototype 上挂载
			checkPermission() {
				// 假设主项目在 Vue.prototype 上挂载了一个 $checkEditPermission 方法
				if (typeof this.$checkEditPermission === 'function') {
					return this.$checkEditPermission();
				}
				console.warn('权限检查方法 ($checkEditPermission) 未定义或无权。');
				return false; // 默认无权
			},

			handleEditHotKey(event) {
				// #ifdef H5
				// 检查是否按下了 Alt 键（Windows/Linux 下为 Alt，Mac 下为 Option）
				if (event.altKey) {
					// 1. 进行权限校验
					if (!this.checkPermission()) {
						uni.showToast({
							title: '您没有权限修改翻译',
							icon: 'none',
							duration: 2000
						});
						return;
					}

					// 2. 显示模态框
					this.showModal = true;
					// 阻止事件冒泡和默认右键菜单
					event.stopPropagation();
				} else {
					// 如果没有按下 Alt 键，则不处理，允许默认右键行为
				}
				// #endif

				// #ifndef H5
				// 非 H5 环境下的提示，避免用户困惑
				console.warn('热键功能仅在 H5 (PC浏览器) 环境下可用。');
				uni.showToast({
					title: '此功能仅限PC浏览器使用',
					icon: 'none',
					duration: 2000
				});
				// #endif
			},

			// 监听 AcmeLabelEdit 抛出的 'update-translation' 事件
			handleUpdateTranslation(data) {
				// 这里 LabelEvent 并不直接调用 POST 接口
				// 而是再次向上抛出，让 AcmeLabel (或其父组件) 处理
				this.$emit('translation-updated', data);
			}
		}

	}
</script>

<style lang="scss" scoped>
	.label-event {
		position: relative;
		border-bottom: 1px dashed var(--acme-border-color);
		cursor: pointer;
		padding-bottom: 2px;
		display: inline-block;
	}

	/* 可以在 hover 时提供更明显的提示 */
	.label-event:hover {
		border-color: var(--acme-primary-color);
	}

	.acme-body1 {
		display: inline;
	}
</style>