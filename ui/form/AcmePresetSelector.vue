<template>
	<view class="acme-preset-selector-group">
		<view :class="[`acme-preset-selector`,customClass]" v-for="(row, rowIndex) in optsRows" :key="rowIndex">
			<view v-for="(item,index) in row" :key="item[keyField]" class="acme-preset-selector-item"
				:class="[itemClass,internalValue==item[keyField] ?selectedClass:unSelectedClass]" :style="curWidth"
				@tap="onSelected(item[keyField])">
				{{ item[labelField] }}
			</view>
		</view>


		<!-- <view v-for="(row, rowIndex) in optsRows" :key="rowIndex" class="btn_row">
					<UIButton v-for="(btn, colIndex) in row" :key="colIndex" v-if="btn" :value="btn.key" :name="btn.name"
						:icon="btn.icon" :color="btn.color || '#FFFFFF'" :size="btn.size || 120" @click="onTap"></UIButton>
				</view> -->

	</view>
</template>

<script>
	export default {
		name: "AcmePresetSelector",
		props: {
			// 允许字符串以更好地与输入框 v-model 兼容 当前选中的项。可以是完整的对象，也可以是其 keyField 的值。
			value: { type: [String, Number], default: 0 },
			// 选项列表，每个对象应包含 keyField 和 labelField 指定的属性
			list: { type: Array, required: true, default: () => [] },
			// 列表中作为唯一标识的属性名 (例如 'id', 'key')
			keyField: { type: String, default: 'key' },
			// 列表中作为显示文本的属性名 (例如 'label', 'name')
			labelField: { type: String, default: 'label' },
			// 网格的列数
			column: { type: Number, default: 3 },

			customClass: { type: String, default: 'custom_class' },
			itemClass: { type: String, default: '' },
			selectedClass: { type: String, default: 'selected' },
			unSelectedClass: { type: String, default: 'unselected' },
		},
		data() {
			return {
				internalValue: this.value,
			}
		},
		computed: {
			optsRows() {
				const rows = [];
				const itemsPerRow = this.column; // 每行显示的按钮数量
				for (let i = 0; i < this.list.length; i += itemsPerRow) {
					rows.push(this.list.slice(i, i + itemsPerRow));
				}
				return rows;
			},
			// 计算行上单元格占宽
			curWidth() { return { flex: `0 0 calc(${100 / this.column}% - 16rpx)` } }
		},
		watch: {
			// 监听 value prop 的变化，保持 internalValue 同步
			value(newVal) {
				console.log(`newVal:`, newVal);
				this.internalValue = Number(newVal);
			}
		},
		methods: {
			onSelected(val) {
				console.log(`onSelected val:`, val);
				this.internalValue = val;
				// 使用 update:value 配合 .sync 修饰符或直接 v-model
				this.$emit('update:value', val);
				// 如果还想保留 @select 事件，也可以继续触发
				this.$emit('select', val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.acme-preset-selector-group {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.acme-preset-selector {
		display: flex;
		flex-wrap: nowrap;
		// justify-content: space-between;
		width: 100%;
		gap: 16rpx;

		// 行之间需要额外间距
		&:not(:last-child) {
			margin-bottom: 24rpx;
		}
	}

	.acme-preset-selector-item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 28rpx 0;
		border-radius: 16rpx;
		font-size: var(--acme-preset-selector-size);
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		box-sizing: border-box;
	}

	.acme-preset-selector-item.selected {
		background-color: var(--acme-preset-selector-active-bg);
		color: var(--acme-preset-selector-active);
	}

	.acme-preset-selector-item.unselected {
		background-color: var(--acme-preset-selector-unactive-bg);
		color: var(--acme-preset-selector-unactive);
	}
</style>