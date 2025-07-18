// 引入 Vue 的响应式 API
import Vue from 'vue';


// 将 acmeCfg 声明为 Vue 的响应式对象
export const acmeCfg = Vue.observable({
	theme: 'dark', // 默认主题为 'dark'
	lgre: 'en-US', // 默认国际化代码
	currency: 'USD', // 默认法币代码
	isEditLabel: false, // 是否启动编辑label
	// 鉴权 等待主项目注入具体的函数
	_checkEditPermissionFn: null,
});

// 设置是否可以编辑label
export const acmeSetEditable = (val) => {
	acmeCfg.isEditLabel = val;
	console.log(`[acme] isEditLabel set to: ${val}`);
}

// 用于主项目注入服务的回调函数
export function setAcmeServices(checkPermissionFn) {
	acmeCfg._checkEditPermissionFn = checkPermissionFn; // 注入鉴权函数
}

// 导出设置默认国际化代码的函数
export const acmeSetLgre = (val) => {
	acmeCfg.lgre = val;
	console.log(`[acme] lgre set to: ${val}`);
}
// 导出设置默认货币代码的函数
export const acmeSetCurrency = (val) => {
	acmeCfg.currency = val;
	console.log(`[acme] currency set to: ${val}`);
}

/**
 * 设置应用程序的主题。
 * 此函数仅更新响应式主题状态。
 * 主题类名将由主项目的 App.vue 根组件动态绑定。
 * @param {string} newTheme - 新的主题名称，例如 'light' 或 'dark'。
 */
export function acmeSetTheme(newTheme) {
	// 如果主题未改变，则不执行任何操作
	if (acmeCfg.theme === newTheme) return;
	acmeCfg.theme = newTheme;
	console.log(`[acme] theme set to: ${newTheme}`);
}