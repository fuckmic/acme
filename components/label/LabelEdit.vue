<template>
	<view>
		<AcmeModal :show="true" :title="`修改翻译`" @cancel="onCancel" @confirm="onConfirm" :cancelText="`cancel`"
			:confirmText="`confirm`">
			<view style="display: flex;align-items: center;gap:24rpx;">
				<view class="acme-body1">当前语言代码:</view>
				<view class="acme-body1" style="color: var(--acme-primary-color);">{{ currentLgre }}</view>
			</view>
			<view style="display: flex;align-items: center;gap:24rpx;padding: 24rpx 0;">
				<view class="acme-body1">当前字段Key:</view>
				<view class="acme-body1" style="color: var(--acme-primary-color);">{{ transKey }}</view>
			</view>
			<view class="acme-body1" style="padding-bottom: 24rpx;">明文内容:</view>
			<AcmeInputText v-model="formData.editedLabel" :placeholder="`Enter Text`" />
		</AcmeModal>
	</view>
</template>


<script>
	import { acmeCfg } from '../../config.js';
	import AcmeModal from '../../ui/feedback/AcmeModal.vue';
	import AcmeInputText from '../../ui/form/AcmeInputText.vue';
	export default {
		name: "AcmeLabelEdit",
		components: { AcmeModal, AcmeInputText },
		props: {
			// 要修改的翻译键
			transKey: { type: String, required: true },
			// 当前翻译的明文内容（用于初始化编辑框）
			initialLabel: { type: String, default: '' },
			// 接收一个回调函数，用于关闭模态框 确保父组件会传递这个函数
			closeModalCallback: { type: Function, required: true }
		},
		data() {
			return {
				formData: {
					editedLabel: this.initialLabel, // 编辑框内容初始化为当前明文
				},
				currentLgre: acmeCfg.lgre, // 从配置中获取当前语言代码
			};
		},
		methods: {
			onCancel() {
				// 通知父组件关闭模态框
				if (typeof this.closeModalCallback === 'function') {
					this.closeModalCallback();
				}
			},
			onConfirm() {
				// 假设 API 调用成功后，调用回调关闭模态框
				if (typeof this.closeModalCallback === 'function') {
					this.closeModalCallback();
				}
			},
			// handleSave() {
			// 	// 向上抛出事件，携带要更新的数据
			// 	// 主项目会监听这个事件，然后调用自己的POST接口
			// 	this.$emit('update-translation', {
			// 		key: this.transKey,
			// 		value: this.editedLabel,
			// 		locale: this.currentLgre // 传递语言代码
			// 	});
			// 	// 无论如何，保存后都关闭模态框
			// 	this.$emit('close-modal');
			// },
		}
	}
</script>

<style lang="scss" scoped>

</style>