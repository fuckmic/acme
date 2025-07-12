// 引入 Vue 的响应式 API
import Vue from 'vue';

// 定义一个响应式对象来存储配置
// 使用 Vue.observable() 或 new Vue() 都可以创建响应式对象
// 这里使用 Vue.observable() 更简洁，它在 Vue 2.6+ 可用
const reactiveConfig = Vue.observable({
	theme: 'light', // 默认主题为 'light'
	assetsRootPath: '/static', // 默认资源根路径，也可通过 setter 设置
	lgre: 'en-US', // 默认国际化代码
	currency: 'USD', // 默认法币代码
});

// 导出配置对象供组件读取
export const wtfConfig = reactiveConfig;

// 导出设置默认国际化代码的函数
export const wtfSetLgre = (val) => {
	reactiveConfig.lgre = val;
	console.log(`[acme] lgre set to: ${val}`);
}
// 导出设置默认货币代码的函数
export const wtfSetCurrency = (val) => {
	reactiveConfig.currency = val;
	console.log(`[acme] currency set to: ${val}`);
}

// 导出设置主题的函数，供主项目调用
export const wtfSetTheme = (themeName) => {
	if (['light', 'dark'].includes(themeName)) {
		reactiveConfig.theme = themeName;
		console.log(`[acme] Theme set to: ${themeName}`);
	} else {
		console.warn(`[acme] Invalid theme name: ${themeName}. Defaulting to 'light'.`);
		reactiveConfig.theme = 'light';
	}
};

// 导出设置资源根路径的函数，供主项目调用
export const wtfSetAssetsRootPath = (path) => {
	if (typeof path === 'string' && path.startsWith('/')) {
		reactiveConfig.assetsRootPath = path;
		console.log(`[acme] Assets root path set to: ${path}`);
	} else {
		console.warn('Invalid ASSETS_ROOT_PATH provided. Must be a string starting with "/".');
	}
};