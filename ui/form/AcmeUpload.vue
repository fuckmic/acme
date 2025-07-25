<template>
	<view :class="[customClass]" @tap="chooseAndUpload()">
		<template v-if="!currentImageUrl">
			<view class="no_img">
				<AcmeIcon icon="upload" :size="100" format="png" sizeMode="heightFix" />
				<view class="tip"> {{tip}} </view>
			</view>
		</template>
		<template v-else>
			<image :src="currentImageUrl" style="margin:20rpx;width:200px;height:160px;">
			</image>
		</template>
	</view>
</template>

<script>
	import { acmeConfig } from '../../config.js';
	import AcmeIcon from '../common/AcmeIcon.vue';
	export default {
		name: 'AcmeUpload',
		components: { AcmeIcon },
		props: {
			// v-model 的值，用于接收和更新图片 URL
			value: { type: String, default: '' },
			tip: { type: String, default: '' },
			// uni.chooseImage 的 sourceType 参数
			sourceType: { type: Array, default: () => ['album', 'camera'] },
			// 用于阻止重复点击和控制内部上传状态  // 外部可控制组件的上传状态
			isUploading: { type: Boolean, default: false },
			customClass: { type: String, default: 'acme-upload' },
			// 这个 prop 应该是一个函数，接收文件路径作为参数，并返回一个 Promise，Promise 解析为图片的 URL
			upload: {
				type: Function,
				required: true, // 强烈建议设置为 true，强制使用者提供上传逻辑
				default: () => {
					console.error('WtfUpload: upload prop is required!');
					return Promise.reject('upload not provided');
				}
			}
		},
		data() {
			return {
				// 内部维护的图片 URL，与 value prop 同步
				currentImageUrl: this.value,
			};
		},
		computed: {},
		watch: {
			value(newVal) {
				this.currentImageUrl = newVal;
			}
		},
		methods: {
			async chooseAndUpload() {
				// 告知父组件，图片选择/上传过程即将开始
				this.$emit('start');
				if (this.isUploading) return;
				try {
					const result = await uni.chooseImage({
						count: 1,
						sizeType: ['compressed'],
						sourceType: this.sourceType,
					});

					// uni.chooseImage 在成功时，iOS返回 [tempFilePaths], Android返回 [tempFilePaths, tempFiles]
					// 确保能拿到 tempFiles[0]
					const imageFile = result[1] && result[1].tempFiles && result[1].tempFiles[0] ?
						result[1].tempFiles[0] : result[0][0];

					if (!imageFile || !imageFile.path) {
						console.warn('未选择图片或选择图片失败');
						return;
					}

					const reultURL = await this.upload(imageFile.path);
					if (reultURL) {
						this.currentImageUrl = reultURL;
						// 通过 v-model 语法糖更新父组件的 value
						this.$emit('input', reultURL);
						// 同时也可以发射一个更明确的事件
						this.$emit('uploaded', reultURL);
					} else {
						console.error('图片上传失败，未返回URL');
					}
				} catch (err) {
					// 用户取消选择图片也会进入这里，需要判断
					if (err.errMsg && err.errMsg.includes('cancel')) {
						console.log('用户取消选择图片');
					} else {
						console.error('选择图片或上传过程中发生错误:', err);
					}
				} finally { this.$emit('end'); }
			},
		}
	}
</script>

<style lang="scss" scoped>
	.acme-upload {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12rpx;
		border-radius: 28rpx;
		background-color: transparent;
		border: 1rpx solid var(--acme-upload-border-color);
	}

	.no_img {
		margin: 20rpx;
		width: 400rpx;
		height: 320rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.tip {
		text-align: center;
		padding-top: 40rpx;
		color: var(--info);
		font-size: 22rpx;
	}
</style>