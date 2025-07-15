<template>
	<view style="display: flex;align-items: center; gap:6px;" @tap="onSwitch()">
		<view v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</view>
		<AcmeSvg :svgString="isChecked?setIconChecked:setIconUncheck" :size="40" />
		<view v-if="$slots.suffix">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import AcmeSvg from '../common/AcmeSvg.vue';
	import { svgChecked, svgUncheck } from '../../utils/svg.js';
	import { cssVariableColor } from '../../utils/theme.js';
	export default {
		name: "AcmeCheckbox",
		components: { AcmeSvg },
		props: {
			value: { type: Boolean, default: false },
			// 如果是主项目传入，则是已经设置好颜色码的svg文件字符串
			iconChecked: { type: String, default: undefined },
			iconUncheck: { type: String, default: undefined },
		},
		data() {
			return {
				isChecked: this.value,
			}
		},
		computed: {
			setCheckColor() { return cssVariableColor(`acme-svg-checkbox`, acmeCfg.theme) },
			setIconChecked() { return this.iconChecked || svgChecked(this.setCheckColor) },
			setIconUncheck() { return this.iconUncheck || svgUncheck(this.setCheckColor) }
		},
		watch: {
			// 监听外部 value 变化，同步内部状态
			value(newVal) {
				this.isChecked = newVal;
			},
			// 当内部状态改变时，通知父组件
			isChecked(newVal) {
				this.$emit('input', newVal); // 用于 v-model
				this.$emit('change', newVal); // 标准的 change 事件
			}
		},
		methods: {
			onSwitch() {
				this.isChecked = !this.isChecked;
				console.log('Custom Switch state:', this.isChecked);
			}
		}
	}
</script>

<style>
</style>