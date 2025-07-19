import Vue from 'vue';
import { EN_US } from '../utils/locales.js';

// 只引入客户指定所需语言.js文件
import { enUS } from './en-US/index.js';

console.log(`enUS:`, enUS);

// 构建语言包对象。注意：此处只罗列客户指定所需语言，注意key与lgreCnf的key保持一致
export const messages = {
	'en-US': enUS,
}

// 注意：此对象只保留客户指定所需语言，按照客户要求调整语言顺序， 将其它语言注释。
export const lgreCnf = {
	'en-US': EN_US,
}

// 整理一份keys映射。
export const keys = Object.create(null);
for (const key in lgreCnf) {
	if (Object.prototype.hasOwnProperty.call(lgreCnf, key)) {
		// 将 'en-US' 转换为 'enUS'
		const formattedKey = key.replace(/-/g, ''); // 移除连字符
		keys[formattedKey] = key;
	}
}
console.log(`keys:`, keys);

export const currencyOpts = () => {
	return Object.values(lgreCnf).map(v => {
		return {
			code: v.code,
			name: v.currency,
			// logo: `/static/logo/${v.code}.svg`,
		}
	})
};

export const langOpts = () => {
	return Object.values(lgreCnf).map(v => {
		return {
			code: v.code,
			name: v.lang,
		}
	})
};


export let msg = Object.create(null);
export const setLocale = (locale) => {
	console.log(`setLocale called with locale:`, locale);
	const defLgre = Vue.prototype.$appCfg.defLgre;
	if (!locale) locale = defLgre;

	const selectedMessages = messages[locale];
	if (selectedMessages) msg = selectedMessages; // 更新 msg 变量
	// 如果请求的语言翻译不存在，回退到默认语言的翻译
	else msg = messages[defLgre] || {};
	console.log(msg)
}

// export const getTimeZone = (val) => { return lgreCnf[val].tz }
// export const getCurrency = (val) => { return lgreCnf[val].currency }
// export const getLang = (val) => { return lgreCnf[val].lang }

// // 设置缓存 lgre
// export const setLgre = (locale) => {
// 	console.log(`setLgre:`, setLgre);
// 	locale = !locale ? Vue.prototype.$appCfg.defLgre : locale;

// 	uni.setStorageSync('lgre', locale);
// 	Vue.prototype.$appCfg.lgre = locale;
// 	Vue.prototype.$appCfg.lang = getLang(locale);
// 	Vue.prototype.$appCfg.tz = getTimeZone(locale);
// 	Vue.prototype.$appCfg.currency = getCurrency(locale);
// 	setLocale(locale);
// 	settingWtfUi();
// }
// // 获取缓存 lgre
// export const getLgre = () => {
// 	const locale = uni.getStorageSync('lgre');
// 	Vue.prototype.$appCfg.lgre = locale;
// 	Vue.prototype.$appCfg.lang = getLang(locale);
// 	Vue.prototype.$appCfg.tz = getTimeZone(locale);
// 	Vue.prototype.$appCfg.currency = getCurrency(locale);
// 	settingWtfUi();
// 	return locale;
// }

// // 清楚缓存的lgre
// export const clearLgre = () => { return uni.removeStorageSync('lgre') }

// // settings default lgre and currency for wtf-ui
// export function settingWtfUi() {
// 	wtfSetLgre(Vue.prototype.$appCfg.lgre);
// 	wtfSetCurrency(Vue.prototype.$appCfg.currency);
// }