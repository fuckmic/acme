import Vue from 'vue';
import lgreKeys from './lgres.js';
import currencys from './currencys.js';
import countryFlag from './countryFlag.js';
import timezones from './timezones.js';
import idcodes from './idcodes.js';
import fiatCodes from './fiatCodes.js';

import locales from './locale/index.js';


// 只引入客户指定所需语言.js文件 主项目改为接口拉取
import { enUS } from './en-US/index.js';

console.log(`enUS:`, enUS, lgreKeys);

/**
 * 根据指定的翻译语言，格式化所有区域设置对象。
 * 返回一个对象，键是区域设置代码 (e.g., 'en-US', 'de-DE')，值是该区域设置的详细配置，
 * 其中国家、时区、语言名称已翻译为指定的 `translationLocale`。
 * @param {string} translationLocale - 用于翻译国家、时区、语言名称的目标语言代码 (e.g., 'en-US', 'de-DE')。
 * @returns {Object} - 包含所有区域设置对象的格式化集合。
 */
/**
 * 根据指定的翻译语言，返回每个区域设置的翻译文本。
 * @param {string} translationLocale - 用于翻译国家、时区、语言名称的目标语言代码 (e.g., 'en-US', 'de-DE')。
 * @returns {Object} - 包含所有区域设置翻译文本的集合。
 */
export function fmtLocales(translationLocale = 'en-US') {
	const translatedTexts = Object.create(null);

	const currentTranslationData = locales[translationLocale];
	if (!currentTranslationData) {
		console.warn(`fmtLocales: 未找到语言 ${translationLocale} 的翻译数据。`);
		return translatedTexts;
	}

	Object.keys(lgreKeys).forEach(localeCode => {
		translatedTexts[localeCode] = {
			country: currentTranslationData.country[localeCode],
			tzValue: currentTranslationData.timezone[localeCode],
			lang: currentTranslationData.lang[localeCode],
		};
	});

	console.log(`fmtLocales(${translationLocale}) 返回翻译文本:`, translatedTexts);
	return translatedTexts;
}

/**
 * 设置和返回指定语言的所选国家的区域化配置项。
 * 外层键是翻译的目标语言，内层键是被描述的区域设置代码。
 * 静态字段（如货币、时区ID等）只会计算一次。
 * @param {string[]} desiredLocaleCodes - 需要包含在最终输出中的区域设置代码数组 (e.g., ['en-US', 'de-DE'])。
 * 这些代码也作为外层键，表示翻译目标语言。
 * @returns {Object} - 包含多语言和多区域设置的嵌套对象。
 */
export function setLgres(desiredLocaleCodes) {
	const finalOutput = Object.create(null);

	// 预先计算所有所需区域设置的静态属性，只计算一次
	const staticLocaleData = Object.create(null);
	desiredLocaleCodes.forEach(localeCode => {
		staticLocaleData[localeCode] = {
			code: localeCode,
			currency: currencys[localeCode],
			flag: countryFlag[localeCode], // 确保 countryFlag 的键是国家简码
			tz: timezones[localeCode],
			idCode: idcodes[localeCode],
			fiat: fiatCodes[localeCode],
		};
	});

	// 遍历作为“翻译目标语言”的每个 Locale Code
	desiredLocaleCodes.forEach(translationTargetLocale => {
		const translatedLocaleDataForTarget = Object.create(null);

		// 获取所有区域设置的翻译文本，这些文本已翻译为当前的 `translationTargetLocale`
		const allTranslatedTextsInTargetLang = fmtLocales(translationTargetLocale);

		// 遍历需要包含在最终输出中的每个区域设置代码
		desiredLocaleCodes.forEach(localeCodeToInclude => {
			// 合并静态数据和翻译文本
			const combinedData = {
				...staticLocaleData[localeCodeToInclude], // 静态数据
				...allTranslatedTextsInTargetLang[localeCodeToInclude], // 翻译文本
			};
			translatedLocaleDataForTarget[localeCodeToInclude] = combinedData;
		});

		finalOutput[translationTargetLocale] = translatedLocaleDataForTarget;
	});

	console.log(`setLgres 返回:`, finalOutput);
	return finalOutput;
}

// 示例调用 拿到所有当前语言的配置项后，可以在选择器使用时，根据传入的setLgres()返回对象，和当前程式的语言代码，格式化出来易读数据。
setLgres(['en-US', 'de-DE']);

/**
 * 辅助函数：只返回指定语言的国家和时区翻译文本。
 * 与原始 fmtLocales 不同，它不涉及 lang 字段。
 * @param {string} translationLocale - 用于翻译国家和时区名称的目标语言代码。
 * @returns {Object} - 包含所有区域设置的国家和时区翻译文本的集合。
 */
function getCountryAndTimezoneTranslations(translationLocale = 'en-US') {
	const translatedParts = Object.create(null);

	const currentTranslationData = locales[translationLocale];
	if (!currentTranslationData) {
		console.warn(`getCountryAndTimezoneTranslations: 未找到语言 ${translationLocale} 的翻译数据。`);
		return translatedParts;
	}

	Object.keys(lgreKeys).forEach(localeCode => {
		translatedParts[localeCode] = {
			country: currentTranslationData.country[localeCode],
			tzValue: currentTranslationData.timezone[localeCode],
		};
	});
	return translatedParts;
}

/**
 * 设置和返回指定语言的所选国家的区域化配置项。
 * 外层键是翻译的目标语言，内层键是被描述的区域设置代码。
 * 语言名称将始终显示其自身语言的名称 (例如，'en-US' 显示 'American English', 'de-DE' 显示 'Deutsch (Deutschland)')。
 * @param {string[]} desiredLocaleCodes - 需要包含在最终输出中的区域设置代码数组 (e.g., ['en-US', 'de-DE'])。
 * 这些代码也作为外层键，表示翻译目标语言。
 * @returns {Object} - 包含多语言和多区域设置的嵌套对象。
 */
export function setLgresSelfNamed(desiredLocaleCodes) {
	const finalOutput = Object.create(null);

	// 预先计算所有所需区域设置的静态属性和其自身的语言名称，只计算一次
	const baseLocaleData = Object.create(null);
	desiredLocaleCodes.forEach(localeCode => {
		const countryShortCode = localeCode.split('-')[1]; // 假设 countryFlag 的键是国家简码

		baseLocaleData[localeCode] = {
			code: localeCode,
			currency: currencys[localeCode],
			flag: countryFlag[localeCode],
			tz: timezones[localeCode],
			idCode: idcodes[localeCode],
			fiat: fiatCodes[localeCode],
			// 关键不同：直接从该 localeCode 对应的原始语言文件中获取其自身的语言名称
			// 例如，对于 'en-US'，它会从 locales['en-US'].lang['en-US'] 获取 'American English'
			// 对于 'de-DE'，它会从 locales['de-DE'].lang['de-DE'] 获取 'Deutsch (Deutschland)'
			lang: locales[localeCode].lang[localeCode],
		};
	});

	// 遍历作为“翻译目标语言”的每个 Locale Code
	desiredLocaleCodes.forEach(translationTargetLocale => {
		const translatedLocaleDataForTarget = Object.create(null);

		// 获取所有区域设置的国家和时区翻译文本，这些文本已翻译为当前的 `translationTargetLocale`
		// 这里使用新的辅助函数，因为它不处理 'lang' 字段
		const countryTzTranslationsInTargetLang = getCountryAndTimezoneTranslations(translationTargetLocale);

		// 遍历需要包含在最终输出中的每个区域设置代码
		desiredLocaleCodes.forEach(localeCodeToInclude => {
			// 合并基础数据（静态属性 + 自身语言名称）和动态翻译文本（国家 + 时区）
			const combinedData = {
				...baseLocaleData[localeCodeToInclude], // 静态数据 + 自身语言名称 (lang 字段)
				...countryTzTranslationsInTargetLang[localeCodeToInclude], // 翻译过的国家和时区名称
			};

			translatedLocaleDataForTarget[localeCodeToInclude] = combinedData;
		});

		finalOutput[translationTargetLocale] = translatedLocaleDataForTarget;
	});

	console.log(`setLgresSelfNamed (语言名称不翻译) 返回:`, finalOutput);
	return finalOutput;
}

// --- 示例调用 ---
// 假设你想获取英文和德文语境下的数据，并且语言名称不翻译
const selfNamedLgres = setLgresSelfNamed(['en-US', 'de-DE']);
console.log(selfNamedLgres);


// 构建语言包对象。注意：此处只罗列客户指定所需语言，注意key与lgreCnf的key保持一致
export const messages = {
	'en-US': enUS,
}

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