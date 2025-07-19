<template>
	<view :class="['acme-input-base', variant]">
		<view v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</view>
		<input :value="value" type="text" :placeholder="placeholder" placeholder-class="placeholder" @input="onInput"
			autocomplete="off"></input>
		<view class="clear" @tap="onClear">
			<AcmeIconClose v-show="showDel" :size="32" />
		</view>
		<view v-if="$slots.suffix" class="suffix">
			<slot name="suffix"></slot>
		</view>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import AcmeIconClose from '../icons/AcmeIconClose.vue';
	export default {
		name: "AcmeInputSearch",
		components: { AcmeIconClose },
		props: {
			value: { type: [String, Number], default: '' },
			placeholder: { type: String, default: '' },
			showClearIcon: { type: Boolean, default: true },
			variant: { type: String, default: 'custom_class' },
		},
		computed: {
			showDel() {
				return (this.value !== null && this.value !== '' && String(this.value).length > 0) && this.showClearIcon
			},
		},
		methods: {
			onInput(event) {
				console.log(`event:`, event);
				const inputValue = event.detail.value.trim();
				// const filteredValue = inputValue.replace(/\s/g, '');
				// this.$emit('input', filteredValue);
				this.$emit('input', inputValue);
			},
			onClear() { this.$emit('input', ''); },
		},
	}
</script>


<style lang="scss" scoped>
	.placeholder {
		color: var(--acme-input-placeholder-color);
		font-size: var(--acme-input-placeholder-size);
		font-weight: 300;
		line-height: inherit;
	}

	.acme-input-base {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: 20rpx;
		padding: 28rpx 0;
		height: 100rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
	}

	/* input 元素样式 */
	.acme-input-base input {
		flex: 1;
		color: var(--acme-input-color);
		height: 100%;
		line-height: 1;
		min-height: unset;
		border: none;
		outline: none;
		font-size: 28rpx;
		background-color: transparent !important;
		appearance: none !important;
		padding: 0;
	}

	.suffix {
		margin-left: auto;
	}

	.clear {
		cursor: pointer;
		margin-left: auto;
	}

	.custom_class {
		border: 1rpx solid var(--acme-input-border-color);
		background-color: transparent;
		border-radius: 20rpx;
	}
</style>