import Vue from 'vue';
import App from './App';
import AcmePageContainer from '@/ui/common/AcmePageContainer.vue';
import DisplayLabel from '@/components/label/DisplayLabel.vue';
import * as nav from './utils/navigation.js';
import * as intl from './intl/index.js';
import { setGlobalThemeColorsMap } from '@/utils/theme.js';
import { acmeSetEditable } from './config.js';
import { setLgresSelfNamed } from './intl/index.js';
import fmt from './utils/fmt/index.js';
import * as theme from './utils/theme.js';

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

const curLgres = setLgresSelfNamed(['en-US', 'de-DE']);

Vue.prototype.$appCfg = {
	appName: null, // 应用名称
	version: null, // 应用版本号
	width: null, // 当前屏宽
	height: null, // 当前屏高
	theme: null, // 当前主题方案
	layout: null, // 当前布局方案
	defLgre: "en-US", // 默认语言代码
	lgre: null, // 当前使用的语言代码
	// 竖版底导航配置
	bottomNavCfg: null,
	curLgres: null,
	// 当前语言对应的涨跌平基色，此处直接根据语言设置Boolan值
	isRevse: false,
}
Vue.prototype.$appCfg.curLgres = curLgres[Vue.prototype.$appCfg.defLgre];
console.log(Vue.prototype.$appCfg);


Vue.prototype.$nav = nav;
Vue.prototype.$intl = intl;
console.log(`intl:`, intl);
console.log(`intl:`, intl.msg);
Vue.prototype.$fmt = fmt;
console.log(`$fmt:`, fmt);
Vue.prototype.$theme = theme;
console.log(`$theme:`, theme);



// console.log(Vue);

// // --- 1. 初始化资源根路径 ---
// setLgre('de-DE'); // 为UI库设置语言代码
// setCurrency('EUR'); // 为UI库设置货币代码
// setTheme('light'); // 为UI库设置主题

// --- 方便所有组件访问 ---
// Vue.prototype.$wtfCfg = wtfConfig;

Vue.config.productionTip = false;

App.mpType = 'app'
const app = new Vue({ ...App })
app.$mount()