<template>
	<AcmeLabelEvent v-if="isEditable" :label="translatedLabel" :translationKey="transKey" :variant="variant"
		v-bind="$attrs" v-on="$listeners">
		<view>{{isEditable}}</view>
		<template v-slot="slotProps">
			<AcmeLabelEdit :transKey="slotProps.transKey" :initialLabel="slotProps.initialLabel"
				:closeModalCallback="slotProps.closeModalCallback" />
		</template>
	</AcmeLabelEvent>

	<AcmeLabelStatic v-else :label="translatedLabel" :variant="variant" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import AcmeLabelStatic from '../../ui/label/AcmeLabelStatic.vue';
	import AcmeLabelEvent from '../../ui/label/AcmeLabelEvent.vue';
	import AcmeLabelEdit from '../../ui/label/AcmeLabelEdit.vue';
	export default {
		name: "DisplayLabel",
		// 阻止组件将未声明的属性自动添加到根元素上 使得 `$attrs` 能够“干净地”传递给子组件。
		inheritAttrs: false,
		components: {
			AcmeLabelStatic,
			AcmeLabelEvent,
			AcmeLabelEdit,
		},
		props: {
			// 传入 JSON 的 key，这是必须的，因为本组件负责查找翻译
			transKey: { type: String, required: true },
			// 外部样式变体
			variant: { type: String, default: '' },
			// 翻译不存在时的备用文本
			fallbackText: { type: String, default: '' }
		},
		computed: {
			// 是否启用编辑模式的标志
			isEditable() {
				console.log(acmeCfg.isEditLabel);
				return acmeCfg.isEditLabel;
			},
			// 计算属性：根据 transKey 获取最终的翻译文本
			translatedLabel() {
				// 假设 $intl 已经挂载到 Vue.prototype，并且能够正确查找翻译
				if (!this.$intl || !this.$intl.msg || !this.$intl.msg[this.transKey]) return this.fallbackText;
				return this.$intl.msg[this.transKey];
			}
		}
	}
</script>

<style>
</style>