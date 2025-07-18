<template>
	<view>
		<AcmeModal>
			<view class="edit-content">
				<view class="info-row">
					<text class="label">语言代码:</text>
					<text class="value">{{ currentLgre }}</text>
				</view>
				<view class="info-row">
					<text class="label">字段Key:</text>
					<text class="value">{{ transKey }}</text>
				</view>
				<view class="input-row">
					<text class="label">明文内容:</text>
					<textarea class="edit-textarea" v-model="editedLabel" auto-height />
				</view>
			</view>

			<template v-slot:footer>
				<button @click="handleSave">保存</button>
				<button @click="handleCancel">取消</button>
			</template>
		</AcmeModal>
	</view>
</template>


<script>
	import AcmeModal from '../feedback/AcmeModal.vue';
	export default {
		name: "AcmeLabelEdit",
		components: { AcmeModal },
		props: {
			// 要修改的翻译键
			transKey: { type: String, required: true },
			// 当前翻译的明文内容（用于初始化编辑框）
			initialLabel: { type: String, default: '' }
		},
		data() {
			return {
				editedLabel: this.initialLabel, // 编辑框内容初始化为当前明文
				currentLgre: acmeCfg.lgre, // 从配置中获取当前语言代码
			};
		},
		methods: {
			handleSave() {
				// 向上抛出事件，携带要更新的数据
				// 主项目会监听这个事件，然后调用自己的POST接口
				this.$emit('update-translation', {
					key: this.transKey,
					value: this.editedLabel,
					locale: this.currentLgre // 传递语言代码
				});
				// 无论如何，保存后都关闭模态框
				this.$emit('close-modal');
			},
			handleCancel() {
				// 关闭模态框
				this.$emit('close-modal');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-content {
		padding: 20rpx;
	}

	.info-row,
	.input-row {
		display: flex;
		margin-bottom: 15rpx;
		align-items: flex-start;
	}

	.label {
		font-weight: bold;
		margin-right: 15rpx;
		min-width: 120rpx;
		text-align: right;
	}

	.value {
		flex: 1;
		word-break: break-all;
	}

	.edit-textarea {
		flex: 1;
		border: 1px solid #eee;
		padding: 10rpx;
		border-radius: 4rpx;
		min-height: 150rpx;
		width: 100%;
		box-sizing: border-box;
	}

	button {
		margin-left: 20rpx;
	}
</style>

<!-- 
好的，我们来完善 LabelEvent.vue 组件。你希望它能在 PC 端通过热键触发对话框，并需要我帮你考虑未尽事宜。

uni-app 在 PC 端支持热键吗？
简短回答：支持，但有一些限制和兼容性考量。

浏览器环境（H5）: uni-app 编译到 H5 时，实际上就是标准的 Web 应用。因此，你可以使用 JavaScript 的 keydown 事件监听来实现组合热键。这是最常用的方式，且兼容性最好。

小程序/App (原生应用): 小程序和 App 端通常不直接支持全局热键监听。uni-app 在编译到这些平台时，桌面端的热键功能将不会生效。你的热键功能主要适用于 PC 浏览器环境下的 H5 版本。

PC 版 App（如通过 Electron 封装）: 如果你的 uni-app 项目最终是通过 Electron 等工具封装成 PC 桌面应用，那么你可以利用 Electron 的 API 或 Node.js 模块来实现更强大的全局热键监听。但对于纯 uni-app 框架本身，其主要热键支持集中在 H5 端。

因此，你的热键功能将主要在 uni-app 编译为 H5 时可用，这与你部署到 PC 浏览器进行测试交付的场景是吻合的。

完善 LabelEvent.vue 组件代码
现在，我们来完善 LabelEvent.vue 的代码，考虑到你提到的热键绑定、鉴权，以及其他未考虑到的细节。

需要考虑的方面：

热键监听： 如何绑定 Alt + 鼠标右键 事件。

事件作用域： 热键是全局监听，还是只对当前组件有效？通常希望是对当前 LabelEvent 组件实例有效。

权限校验： 在触发对话框前进行用户权限检查。

transKey 的传递： AcmeLabelEdit 需要知道要修改哪个 key。

label 的获取： LabelEvent 依然应该只接收最终的 label 字符串，就像 LabelStatic.vue 一样。查找 key 并获取 label 的逻辑应放在 AcmeLabel.vue 或更上层。

模态框的显示与隐藏： 如何控制 AcmeLabelEdit 的可见性。

模态框的数据回传： AcmeLabelEdit 修改完成后，如何通知 LabelEvent 或更上层重新加载翻译。

提示用户： 给用户提供视觉提示，告知某个文本是可编辑的。

Code snippet

<template>
	<view 
		:class="[`label-event`, variant]"
		@contextmenu.prevent="handleEditHotKey" 
		class="editable-label-highlight" 
	>
		<view class="acme-body1"> {{ label }} </view>

		<template v-if="showModal">
			<AcmeLabelEdit 
				:lgre="lgre" 
				:transKey="translationKey" 
				@close-modal="showModal = false"
				@translation-updated="handleTranslationUpdated"
			/>
		</template>
	</view>
</template>

<script>
	import { acmeCfg } from '../../config.js';
	import AcmeLabelEdit from './AcmeLabelEdit.vue';

	export default {
		name: 'LabelEvent',
		components: { AcmeLabelEdit },
		props: {
			// label: 最终要显示的明文字符串，由父组件 $t(key) 获取后传入
			label: { type: String, default: '' },
			// translationKey: 对应的 JSON key，这是 AcmeLabelEdit 修改时需要的
			translationKey: { type: String, required: true }, 
			// lgre: 语言代码，用于传递给 AcmeLabelEdit
			lgre: { type: String, default: () => acmeCfg.lgre },
			// variant: 外部传入的CSS变体类名
			variant: { type: String, default: '' },
		},
		data() {
			return {
				showModal: false,
			};
		},
		methods: {
			// 鉴权方法：检查当前用户是否有修改翻译的权限
			// 这里假设你有一个全局的权限检查方法或用户信息
			checkPermission() {
				// 这是一个示例鉴权逻辑。你需要根据你的实际用户权限系统来修改。
				// 比如：return this.$auth.hasPermission('edit_translations');
				// 或者：return this.$store.getters.isAdmin; // 如果你后面考虑引入状态管理
				
				// 鉴于你目前不使用状态管理，权限信息可能需要从某个全局注入的对象获取
				// 或在 App.vue 初始化时挂载到 Vue.prototype 上
				if (typeof Vue.prototype.$userPermissions !== 'undefined' && Vue.prototype.$userPermissions.canEditTranslations) {
					return true;
				}
				// 简单示例：只允许管理员编辑（需要你自行定义 $isUserAdmin）
				// if (Vue.prototype.$isUserAdmin) { 
				// 	return true; 
				// }
				console.warn('当前用户无权修改翻译。');
				return false;
			},

			// 处理热键和鼠标右键事件
			handleEditHotKey(event) {
				// 仅在 H5 环境下生效，因为 uni-app 的 App/小程序 不支持这种热键
				// #ifdef H5
				// 检查是否按下了 Alt 键（Windows/Linux 下为 Alt，Mac 下为 Option）
				// event.altKey 会检测 Alt 键是否按下
				if (event.altKey) {
					// 1. 进行权限校验
					if (!this.checkPermission()) {
						uni.showToast({
							title: '您没有权限修改翻译',
							icon: 'none',
							duration: 2000
						});
						return;
					}

					// 2. 显示模态框
					this.showModal = true;
					// 阻止事件冒泡，避免影响父元素或页面上的其他右键事件
					event.stopPropagation(); 
				} else {
					// 如果没有按下 Alt 键，则不处理，允许默认右键行为或其它自定义逻辑
					// 可以在这里根据你的需求决定是否阻止默认行为
					// event.preventDefault(); // 如果你希望始终阻止右键菜单，即使没有Alt
				}
				// #endif

				// #ifndef H5
				// 非 H5 环境下的提示（例如在小程序或App中运行，但尝试触发热键）
				console.warn('热键功能仅在 H5 (PC浏览器) 环境下可用。');
				// 可以给用户一个提示
				// uni.showToast({
				// 	title: '该功能仅支持PC浏览器',
				// 	icon: 'none',
				// 	duration: 2000
				// });
				// #endif
			},

			// 处理 AcmeLabelEdit 组件发出的翻译更新事件
			handleTranslationUpdated() {
				// AcmeLabelEdit 成功修改翻译后，会触发这个事件。
				// 我们需要通知 App.vue (或其他顶层组件) 重新加载翻译数据。
				// 由于不使用状态管理，这里可以利用 Vue 的事件总线 (uni-app 中通常使用 uni.$emit/uni.$on)
				uni.$emit('refreshTranslations'); 
				// 或者直接调用 Vue.prototype.$switchLanguage 来刷新当前语言的翻译
				// this.$switchLanguage(this.lgre); // 假设 lgre 是当前语言
				uni.showToast({
					title: '翻译已更新',
					icon: 'success',
					duration: 1500
				});
			}
		},
		mounted() {
			// 在组件挂载时，可以考虑在这里绑定一些额外的全局事件监听器
			// 但对于 Alt + 右键，直接在 template 上绑定 @contextmenu.prevent 结合事件内判断 altKey 更简洁
		},
		beforeDestroy() {
			// 在组件销毁前，如果绑定了任何全局事件监听器，请务必在这里移除，防止内存泄漏。
			// 例如：uni.$off('refreshTranslations', this.handleTranslationUpdated); // 如果有监听器在当前组件
		}
	}
</script>

<style lang="scss" scoped>
	.label-event {
		position: relative;
		/* 添加视觉提示，表明这是一个可交互的文本 */
		border-bottom: 1px dashed blue; /* 虚线下划线 */
		cursor: pointer; /* 鼠标悬停时显示手型光标 */
		padding-bottom: 2px; /* 留出下划线的空间 */
		display: inline-block; /* 确保下划线只在文本下方 */
	}

	/* 可以在 hover 时提供更明显的提示 */
	.label-event:hover {
		border-color: red; /* 悬停时下划线变色 */
	}

	/* 你可能需要调整 .acme-body1 的样式，确保它不会覆盖父元素的边框和光标样式 */
	.acme-body1 {
		display: inline; /* 确保文本在父元素内正确布局 */
	}
</style>
关于 AcmeLabelEdit.vue 的交互
AcmeLabelEdit.vue 在完成编辑（保存或取消）后，需要通知 LabelEvent.vue 关闭模态框，并在保存成功后通知顶层（App.vue）刷新翻译数据。

AcmeLabelEdit.vue 内部的关键点：

接收 transKey 和 lgre 作为 props。

内部有文本输入框和提交/取消按钮。

提交成功后：

调用你的 /api/translations POST 接口更新后端数据。

触发事件通知 LabelEvent.vue： this.$emit('translation-updated');

触发事件通知 LabelEvent.vue 关闭模态框： this.$emit('close-modal');

取消时： this.$emit('close-modal'); 
 -->