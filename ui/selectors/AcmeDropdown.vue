<template>
	<view v-if="isVisible" class="acme-dropdown-box" :style="position">
		<view class="overlay" @tap.stop="cancel()" :style="{ backgroundColor:`rgba(0,0,0,0.5)`}"></view>
		<AcmePaper :elevation="elevation" :sx="setSx" @tap.stop>
			<view style="padding: 24rpx;">
				<!-- <AcmeInputSearchExpand v-model="formData.keyword" :placeholder="`Search...`" @input="onSearchInput">
				</AcmeInputSearchExpand> -->
				<block v-for="(v,k) in filterList" :key="k">
					<AcmeSelectorOption :option="v" :isSelected="v.code === curActive.code" @click="onSelected" />
				</block>
				<view v-if="filterList.length === 0" class="no-results">
					No results found.
				</view>
			</view>
		</AcmePaper>
	</view>
</template>

<script>
	import AcmeSelectorOption from './AcmeSelectorOption.vue';
	import AcmePaper from '../common/AcmePaper.vue';
	import AcmeInputSearchExpand from '../inputs/AcmeInputSearchExpand.vue';
	export default {
		name: "AcmeDropdown",
		components: { AcmeSelectorOption, AcmePaper, AcmeInputSearchExpand },
		props: {
			show: { type: Boolean, default: false },
			options: { type: Array, default: () => [] },
			active: { type: Object, default: null },
			variant: { type: String, default: '' },
			elevation: { type: [Number, String], default: 6 },
			position: { type: Object, default: null },
		},
		data() {
			return {
				isVisible: this.show,
				curActive: this.active || (this.options.length > 0 ? this.options[0] : {}),
				formData: {
					keyword: ''
				}
			}
		},
		computed: {
			filterList() {
				const keyword = this.formData.keyword.toLowerCase().trim();
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
					zIndex: 13,
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
			onSearchInput() {
				// 搜索输入时触发
			},
			onSelected(val) {
				console.log(`val:`, val);
				this.curActive = val;
				this.$emit('select', val); // 向上通知选中了哪个选项
			},
			cancel() {
				this.$emit('cancel');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.acme-dropdown-box {
		// position: fixed;
		// top: 0;
		// left: 0;
		// right: 0;
		// bottom: 0;
		position: absolute;
		background-color: transparent;
		z-index: 10;
		pointer-events: auto;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--acme-modal-mask);
		z-index: 11;
		width: 100%;
		height: 100%;
	}

	// .com_choose {
	// 	position: absolute;
	// 	z-index: 3;
	// 	padding: 15px 20px;
	// 	background-color: var(--acme-bg-card);
	// 	border: 0;
	// 	width: max-content;
	// 	border-radius: 16px;
	// 	box-shadow: 0rpx 8rpx 35rpx 0rpx rgba(0, 0, 0, 0.3);
	// }
</style>