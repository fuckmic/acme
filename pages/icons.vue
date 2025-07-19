<template>
	<AcmePageContainer>
		<AcmeAppBar elevation="6">
			<view style="padding:40rpx 32rpx 24rpx; display: flex;align-items: center;gap:24rpx;">
				<AcmeIconBack @click="$nav.navBack" />
				<view class="acme-h5">{{$nav.keys.icons}}</view>
				<view style="margin-left: auto;">
					<AcmeInputSearchExpand v-model="formData.keyword" :placeholder="`Search...`" @click="onSearch" />
				</view>
			</view>
		</AcmeAppBar>
		<BottomNav :code="$nav.keys.icons" />
		<view style="padding: 160rpx 40rpx;display: flex;align-items: center;flex-wrap: wrap;gap:24rpx;">
			<template v-for="(IconComponent, iconName) in iconComponents">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<component :is="iconName" :key="iconName" />
					<view class="acme-body1">{{getShortComponentName(iconName)}}</view>
				</view>
			</template>
		</view>
	</AcmePageContainer>
</template>

<script>
	import AcmeAppBar from '../ui/nav/AcmeAppBar.vue';
	import BottomNav from '../components/BottomNav.vue';
	import AcmeIconBack from '../ui/icons/AcmeIconBack.vue';
	import AcmeInputSearchExpand from '../ui/inputs/AcmeInputSearchExpand.vue';

	// 批量导入图标组件
	const iconContext = require.context(
		'../ui/icons/', // 图标组件所在的目录
		false, // 是否查找子目录
		/\.vue$/ // 匹配所有 .vue 文件
	);

	const iconComponents = {};
	iconContext.keys().forEach(filePath => {
		const component = iconContext(filePath).default || iconContext(filePath);
		// 从文件路径中提取组件名，例如 './AcmeIconSearch.vue' -> 'AcmeIconSearch'
		const componentName = filePath.replace(/^\.\/(.*)\.vue$/, '$1');
		iconComponents[componentName] = component;
	});
	export default {
		components: {
			BottomNav,
			AcmeAppBar,
			AcmeIconBack,
			AcmeInputSearchExpand,
			...iconComponents
		},
		data() {
			return {
				iconComponents: iconComponents, // 将导入的组件对象暴露给模板，用于动态渲染
				formData: {
					keyword: ''
				}
			}
		},
		methods: {
			onSearch() {
				console.log(this.formData.keyword);
			},
			/**
			 * 从组件的全名中提取最后一个部分作为其简称。
			 * 例如：'AcmeIconSearch' -> 'Search'
			 * 'MyButton' -> 'MyButton'
			 * 'SomeComponent' -> 'Component'
			 *
			 * @param {string} componentName - 组件的全名字符串。
			 * @returns {string} - 提取出的组件简称。
			 */
			getShortComponentName(componentName) {
				if (typeof componentName !== 'string' || componentName.length === 0) {
					return '';
				}

				// 尝试匹配以大写字母开头的后缀（假设组件名遵循驼峰命名法）
				// 例如：AcmeIconSearch -> Search
				// AcmeButton -> Button
				// 如果没有匹配到，则返回原始名称
				const match = componentName.match(/[A-Z][a-z0-9]*$/);

				if (match) {
					return match[0]; // 返回匹配到的最后一个大写字母开头的单词
				} else {
					return componentName; // 如果没有匹配到特定模式，返回原始名称
				}
			}
		}
	}
</script>

<style>
</style>