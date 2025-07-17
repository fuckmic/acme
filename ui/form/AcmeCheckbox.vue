<template>
	<view style="display: flex;align-items: center; gap:6px;" @tap="onSwitch()">
		<view v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</view>
		<AcmeIconChecked v-if="isChecked" />
		<AcmeIconUncheck v-else />
		<view v-if="$slots.suffix">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import AcmeIconChecked from '../icons/AcmeIconChecked.vue';
	import AcmeIconUncheck from '../icons/AcmeIconUncheck.vue';
	export default {
		name: "AcmeCheckbox",
		components: { AcmeIconChecked, AcmeIconUncheck },
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