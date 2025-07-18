<template>
	<LabelEvent v-if="isEditable" :label="translatedLabel" :translationKey="transKey" :lgre="lgre" :variant="variant"
		v-bind="$attrs" v-on="$listeners" />
	<LableStatic v-else :label="translatedLabel" :variant="variant" v-bind="$attrs" />
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import LableStatic from './LableStatic.vue';
	import LabelEvent from './LabelEvent.vue';
	export default {
		name: "AcmeLabel",
		// 阻止组件将未声明的属性自动添加到根元素上 使得 `$attrs` 能够“干净地”传递给子组件。
		inheritAttrs: false,
		components: {
			LableStatic,
			LabelEvent,
		},
		props: {
			// 传入 JSON 的 key，这是必须的，因为 AcmeLabel 负责查找翻译
			transKey: { type: String, required: true },
			// 用于控制是否启用编辑模式的标志
			isEditable: { type: Boolean, default: false },
			// 外部样式变体
			variant: { type: String, default: '' },
			// 翻译不存在时的备用文本，直接在 AcmeLabel 内部处理
			fallbackText: { type: String, default: '' }
		},
		computed: {
			// 计算属性：根据 transKey 获取最终的翻译文本
			translatedLabel() {
				// 假设 $t 已经挂载到 Vue.prototype，并且能够正确查找翻译
				// return this.$t(this.transKey, this.fallbackText || this.transKey); // 如果 fallbackText 为空，则回退到 transKey 本身作为最终回退
			}
		}
	}
</script>

<style>
</style>