<template>
	<!-- 需要绑定组合热键，鉴权 -->
	<view :class="[`label-event`,variant]" @click.stop.prevent="handleEditHotKey" class="editable-label-highlight">
		<view class="acme-body1"> {{label}} </view>
		<template v-if="showModal">
			<slot :transKey="translationKey" :initialLabel="label" @close-modal="showModal = false"></slot>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'AcmeLabelEvent',
		props: {
			label: { type: String, default: '' }, // 最终明文
			translationKey: { type: String, required: true }, // JSON Key
			variant: { type: String, default: '' }, // 样式变体
		},
		data() {
			return {
				showModal: false,
			}
		},
		methods: {
			handleEditHotKey(event) {
				console.log(`event:`, event);
				// #ifdef H5
				if (event.altKey) {
					if (!this.checkPermission()) {
						uni.showToast({ title: '您没有权限修改翻译', icon: 'none', duration: 2000 });
						return;
					}
					this.showModal = true;
					event.stopPropagation();
					event.preventDefault();
				}
				// #endif
				// #ifndef H5
				uni.showToast({ title: '此功能仅限PC浏览器使用', icon: 'none', duration: 2000 });
				// #endif
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