<template>
	<view :class="[`label-event`,variant]" @click.stop.prevent="handleEditHotKey" class="editable-label-highlight">
		<view class="acme-body1"> {{label}} </view>
		<template v-if="showModal">
			<slot :transKey="translationKey" :initialLabel="label" :closeModalCallback="handleCloseModalFromSlot"></slot>
		</template>
	</view>
</template>

<script>
	import { acmeConfig } from '../../config.js';
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
			handleCloseModalFromSlot() {
				this.showModal = false;
			},
			checkPermission() {
				// 调用由主项目注入的鉴权函数
				if (typeof acmeConfig._checkEditPermissionFn === 'function') {
					return acmeConfig._checkEditPermissionFn();
				}
				// 如果没有注入，或者不是函数，则默认无权限并给出警告
				console.warn('权限检查函数 (acmeConfig._checkEditPermissionFn) 未在主项目或正确注入！默认无权限。');
				return false;
			},
			handleEditHotKey(event) {
				console.log(`event:`, event);
				// #ifdef H5 
				// if (!this.checkPermission()) {
				// 	uni.showToast({ title: '您没有权限修改翻译', icon: 'none', duration: 2000 });
				// 	return;
				// }
				this.showModal = true;
				event.stopPropagation();
				event.preventDefault();
				console.log(`showModal:`, this.showModal);
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