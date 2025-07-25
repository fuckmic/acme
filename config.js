// 引入 Vue 的响应式 API
import Vue from 'vue';

// 将 acmeConfig 声明为 Vue 的响应式对象
export const acmeConfig = Vue.observable({
	theme: 'dark', // 默认主题为 'dark'
	lgre: 'en-US', // 默认国际化代码
	currency: 'USD', // 默认法币代码
	tz: 'America/New_York', // 默认时区
	isEditLabel: false, // 是否启动编辑label
	// 鉴权 等待主项目注入具体的函数
	_checkEditPermissionFn: null,
	// 当前语言对应的涨跌平基色，此处直接根据语言设置Boolan值
	isRevse: false,
});

// 是否反转涨跌平基色
export function acmeSetIsRevse() {
	const tmp = acmeConfig.lgre;
	acmeConfig.isRevse = [`ko-KR`, `zh-TW`, `zh-CN`].includes(tmp);
	console.log(`[acme] isRevse set to: ${tmp}`);
}

// 设置是否可以编辑label
export const acmeSetEditable = (val) => {
	acmeConfig.isEditLabel = val;
	console.log(`[acme] isEditLabel set to: ${val}`);
}

// 用于主项目注入服务的回调函数
export function setAcmeServices(checkPermissionFn) {
	acmeConfig._checkEditPermissionFn = checkPermissionFn; // 注入鉴权函数
}

// 设置默认时区
export const acmeSetTZ = (val) => {
	acmeConfig.tz = val;
	console.log(`[acme] timezone set to: ${val}`);
}

// 导出设置默认国际化代码的函数
export const acmeSetLgre = (val) => {
	acmeConfig.lgre = val;
	console.log(`[acme] lgre set to: ${val}`);
}
// 导出设置默认货币代码的函数
export const acmeSetCurrency = (val) => {
	acmeConfig.currency = val;
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
	if (acmeConfig.theme === newTheme) return;
	acmeConfig.theme = newTheme;
	console.log(`[acme] theme set to: ${newTheme}`);
}