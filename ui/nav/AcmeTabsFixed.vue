<template>
	<view :class="[`acme-tabs-fixed`,variant]">
		<block v-for="(v,k) in normalizedTabs" :key="k">
			<view class="tab-item" :class="{ 'is-active': currentTab === k }" @tap="onTabTap(k)">
				<slot name="tab-content" :tab-key="k" :tab-value="v" :is-active="currentTab === k">
					<text class="tab-text">{{ v }}</text>
				</slot>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "AcmeTabsFixed",
		props: {
			// v-model 绑定的当前选中 Tab 的值
			value: { type: [String, Number], default: null },
			tabs: { type: Object, default: () => ({}) },
			// 外部组件样式覆盖
			variant: { type: String, default: '' },
		},
		data() {
			return {
				currentTab: null, // 内部维护的当前选中 Tab
			};
		},
		computed: {
			// 规范化 tabs 数据，确保总是对象形式，方便遍历
			normalizedTabs() {
				if (Array.isArray(this.tabs)) {
					const obj = {};
					this.tabs.forEach((item, index) => {
						obj[index] = item;
					});
					return obj;
				}
				return this.tabs;
			}
		},
		watch: {
			// 监听 value prop 的变化，同步内部 currentTab
			value: {
				immediate: true, // 立即执行一次，确保初始化
				handler(newVal) {
					// 只有当 newVal 与内部 currentTab 不一致时才更新
					// 并且确保 newVal 是 normalizedTabs 中的一个有效 key
					if (newVal !== this.currentTab && Object.keys(this.normalizedTabs).includes(String(newVal))) {
						this.currentTab = newVal;
					}
				}
			},
			// 监听 tabs prop 的变化，如果 tabs 变了且当前选中项不在新 tabs 里，则重置
			tabs: {
				deep: true,
				handler(newTabs) {
					// 如果当前选中的 tab 不在新的 tabs 列表中，则重置为第一个
					if (this.currentTab === null || !Object.keys(newTabs).includes(String(this.currentTab))) {
						this.setDefaultTab();
					}
				}
			}
		},
		mounted() {
			// 组件挂载时，如果没有通过 value prop 明确指定，则默认选中第一个
			if (this.value === null && Object.keys(this.normalizedTabs).length > 0) {
				this.setDefaultTab();
			} else if (this.value !== null) {
				// 如果 value 有值，但不是 normalizedTabs 的一个 key，也重置为第一个
				if (!Object.keys(this.normalizedTabs).includes(String(this.value))) {
					this.setDefaultTab();
				} else {
					this.currentTab = this.value; // 确保在mounted时也同步
				}
			}
		},
		methods: {
			setDefaultTab() {
				const firstKey = Object.keys(this.normalizedTabs)[0];
				if (firstKey !== undefined && firstKey !== null) {
					this.currentTab = firstKey;
					this.$emit('input', this.currentTab); // 通知父组件默认选中
					this.$emit('change', this.currentTab); // 额外发射 change 事件
				}
			},
			onTabTap(key) {
				// 点击当前已选中项，不做处理
				if (this.currentTab === key) return;
				this.currentTab = key;
				// 使用 v-model，通过 'input' 事件通知父组件更新
				this.$emit('input', key);
				// 也可以发射一个自定义的 'change' 事件，提供更多信息
				this.$emit('change', key);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.acme-tabs-fixed {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--acme-tabs-gap, 16px);
		background-color: var(--acme-tabs-bg, transparent);
		border-radius: var(--acme-tabs-border-radius, 10rpx);
		padding: var(--acme-tabs-padding, 0);
		box-sizing: border-box;
		width: 100%;
	}

	.tab-item {
		flex: 1;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease;
		box-sizing: border-box;

		.tab-text {
			// 默认 Tab 项文本样式
			font-size: var(--acme-tabs-font-size, 28rpx);
			font-weight: var(--acme-tabs-font-weight, 700);
			padding: var(--acme-tabs-item-padding, 20rpx);
			border-radius: var(--acme-tabs-item-border-radius, 10rpx);

			// 默认失活状态颜色
			color: var(--acme-tabs-unactive-color);
			background-color: var(--acme-tabs-unactive-bg, transparent);

			// 继承父容器的过渡，确保文本和背景颜色变化平滑
			transition: inherit;
			text-align: center;
			width: 100%;
		}

		// 激活状态样式
		&.is-active {
			.tab-text {
				background-color: var(--acme-tabs-active-bg);
				color: var(--acme-tabs-active-color);
			}
		}

		// 鼠标悬停效果 (主要在 H5/PC 端生效)
		&:hover {
			.tab-text {
				background-color: var(--acme-tabs-hover-bg, rgba(0, 0, 0, 0.05));
			}
		}

		&.is-active:hover {
			.tab-text {
				background-color: var(--acme-tabs-active-hover-bg, var(--acme-primary-color));
			}
		}
	}
</style>