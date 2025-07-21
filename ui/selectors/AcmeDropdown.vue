<template>
	<view v-if="isVisible" class="acme-dropdown-box" :style="position">
		<view class="overlay" @tap="cancel()"></view>
		<AcmePaper :elevation="elevation" :sx="setSx">
			<AcmeDivider leftLineRatio="40rpx">
				<view class="acme-caption">{{title}}</view>
			</AcmeDivider>
			<block v-for="(v,k) in filterList" :key="k">
				<AcmeSelectorOption :option="v" :isSelected="v.code === curActive.code" @click="onSelected" />
			</block>
			<view v-if="filterList.length === 0" class="no-results">
				No results found.
			</view>
		</AcmePaper>
	</view>
</template>

<script>
	import AcmeSelectorOption from './AcmeSelectorOption.vue';
	import AcmePaper from '../common/AcmePaper.vue';
	import AcmeDivider from '../common/AcmeDivider.vue';
	export default {
		name: "AcmeDropdown",
		components: { AcmeSelectorOption, AcmePaper, AcmeDivider },
		props: {
			show: { type: Boolean, default: false },
			title: { type: String, default: '' },
			options: { type: Array, default: () => [] },
			active: { type: Object, default: null },
			variant: { type: String, default: '' },
			elevation: { type: [Number, String], default: 6 },
			position: { type: Object, default: null },
			keyword: { type: String, default: '' },
		},
		data() {
			return {
				isVisible: this.show,
				curActive: this.active || (this.options.length > 0 ? this.options[0] : {}),
			}
		},
		computed: {
			filterList() {
				const keyword = this.keyword.toLowerCase().trim();
				if (!keyword) {
					return this.options;
				}
				return this.options.filter(v => {
					// 确保 value 存在且是字符串，进行安全过滤
					const value = v.value ? String(v.value) : '';
					return value.toLowerCase().includes(keyword);
				});
			},
			setSx() {
				return {
					width: '100%',
					height: '100%',
					borderRadius: '6rpx',
					overflow: 'hidden',
					position: 'relative',
					zIndex: 5,
					backgroundImage: 'none',
					backgroundColor: `var(--acme-bg-card)`,
				}
			}
		},
		watch: {
			show(newVal) {
				console.log(`show newVal:`, newVal);
				if (newVal) {
					this.isVisible = true; // 立即渲染容器
				} else {
					// 等待动画结束后再销毁容器
					setTimeout(() => {
						this.isVisible = false;
					}, 300);
				}
			},
			active: {
				handler(newVal) {
					if (newVal) {
						this.curActive = newVal;
					}
				},
			},
			options: {
				handler(newOptions) {
					if (this.active === null && newOptions && newOptions.length > 0 && Object.keys(this.curActive).length === 0) {
						this.curActive = newOptions[0];
					}
				},
			}
		},
		methods: {
			onSelected(val) {
				console.log(`val:`, val);
				this.curActive = val;
				this.$emit('select', val); // 向上通知选中了哪个选项
				// 选项被选中后，通常会关闭下拉菜单，也可能需要让 input 失去焦点
				this.cancel();
			},
			cancel() {
				console.log('Dropdown closed by overlay');
				this.$emit('cancel');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.acme-dropdown-box {
		position: absolute;
		background-color: transparent;
		z-index: 80;

		.overlay {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: transparent;
			z-index: 3;
			width: 100%;
			height: 100%;
		}
	}
</style>