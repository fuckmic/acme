<template>
	<AcmeLabelEvent v-if="isEditable" :label="translatedLabel" :translationKey="transKey" :variant="variant"
		v-bind="$attrs" v-on="$listeners">
		<view>{{isEditable}}</view>
		<template v-slot="slotProps">
			<LabelEdit :transKey="slotProps.transKey" :initialLabel="slotProps.initialLabel"
				:closeModalCallback="slotProps.closeModalCallback" />
		</template>
	</AcmeLabelEvent>

	<AcmeLabelStatic v-else :label="translatedLabel" :variant="variant" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
	import { acmeConfig } from '../../config.js';
	import AcmeLabelStatic from '../../ui/label/AcmeLabelStatic.vue';
	import AcmeLabelEvent from '../../ui/label/AcmeLabelEvent.vue';
	import LabelEdit from '../label/LabelEdit.vue';
	export default {
		name: "DisplayLabel",
		// 阻止组件将未声明的属性自动添加到根元素上 使得 `$attrs` 能够“干净地”传递给子组件。
		inheritAttrs: false,
		components: {
			AcmeLabelStatic,
			AcmeLabelEvent,
			LabelEdit,
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
				console.log(acmeConfig.isEditLabel);
				return acmeConfig.isEditLabel;
			},
			// 计算属性：根据 transKey 获取最终的翻译文本
			translatedLabel() {
				if (!this.$intl || !this.$intl.msg) return this.fallbackText;
				const translation = this.$intl.msg[this.transKey];
				if (translation === undefined) return this.fallbackText;
				return translation;
			}
		},
		created() {
			console.log(`transKey:`, this.transKey, this.$intl.msg[this.transKey]);
		},
	}
</script>

<style>
</style>