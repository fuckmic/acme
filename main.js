import Vue from 'vue';
import App from './App';

// 从 wtf-ui 库导入配置对象和设置函数
// import { wtfConfig, wtfSetAssetsRootPath, wtfSetLgre, wtfSetCurrency, wtfSetTheme } from './config.js';



Vue.prototype.$appCfg = {
	appName: null, // 应用名称
	version: null, // 应用版本号
	width: null, // 当前屏宽
	height: null, // 当前屏高
	theme: null, // 当前主题方案
	layout: null, // 当前布局方案
}

// // --- 1. 初始化资源根路径 ---
// wtfSetAssetsRootPath('/static'); // 为UI库设置资源路径
// wtfSetLgre('de-DE'); // 为UI库设置语言代码
// wtfSetCurrency('EUR'); // 为UI库设置货币代码
// wtfSetTheme('light'); // 为UI库设置主题

// --- 方便所有组件访问 ---
// Vue.prototype.$wtfCfg = wtfConfig;

Vue.config.productionTip = false;

App.mpType = 'app'
const app = new Vue({ ...App })
app.$mount()