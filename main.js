import Vue from 'vue';
import App from './App';
import AcmePageContainer from '@/ui/common/AcmePageContainer.vue';
import DisplayLabel from '@/components/label/DisplayLabel.vue';
import * as navigation from './utils/navigation.js';
import * as intl from './intl/index.js';
import { setGlobalThemeColorsMap } from '@/utils/theme.js';
import { acmeSetEditable } from './config.js';

Vue.component('AcmePageContainer', AcmePageContainer); // 全局注册
Vue.component('DisplayLabel', DisplayLabel); // 全局注册

// 导入 acme 库的 CSS 变量定义
import '@/styles/_variables.scss';

// 从 wtf-ui 库导入配置对象和设置函数
// import { wtfConfig, wtfSetAssetsRootPath, wtfSetLgre, wtfSetCurrency, wtfSetTheme } from './config.js';



// === 关键：定义主项目自己的 SVG 颜色映射并注入到 acme 库 ===
// 这些颜色值应该与您主项目 styles/_variables.scss 中定义的实际颜色值保持一致
const myProjectSvgColors = {
	'light': {
		'acme-svg-close': '#333333', // 亮色模式下关闭图标的颜色
		'acme-mask-color': `teal`,
		'acme-svg-checkbox': `teal`,
		'acme-theme-color': `teal`,
	},
	'dark': {
		'acme-svg-close': '#CCCCCC', // 暗色模式下关闭图标的颜色
		'acme-mask-color': `teal`,
		'acme-svg-checkbox': `teal`,
		'acme-theme-color': `#66b3ff`,
	}
};

// 在应用启动时，将主项目的颜色映射注入到 acme 库
setGlobalThemeColorsMap(myProjectSvgColors);
// 是否启用label可编辑
acmeSetEditable(true);

Vue.prototype.$appCfg = {
	appName: null, // 应用名称
	version: null, // 应用版本号
	width: null, // 当前屏宽
	height: null, // 当前屏高
	theme: null, // 当前主题方案
	layout: null, // 当前布局方案
	defLgre: "en-US", // 默认语言代码
}

Vue.prototype.$nav = navigation;
Vue.prototype.$intl = intl;

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