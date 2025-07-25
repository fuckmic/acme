import { acmeConfig } from '../../config';

// 法币默认小数位配置
const fiatDecimalConfig = {
	'JPY': 0,
	'VND': 0,
	'ISK': 0,
	// ... 其他特殊货币
	'DEFAULT': 2 // 默认值
};

/**
 * 获取指定语言环境的数字分隔符
 * @param {string} lgre
 * @returns {decimal: string, thousand: string} - 包含小数点和千分符的对象
 */
export function getLocaleSeparators(lgre) {
	try {
		const formatter = new Intl.NumberFormat(lgre);
		// [{"type":"integer","value":"12"},{"type":"group","value":"."},{"type":"integer","value":"345"},{"type":"decimal","value":","},{"type":"fraction","value":"67"}]
		const parts = formatter.formatToParts(12345.67);
		let decimal = '.'; // 默认小数符号
		let thousand = ','; // 默认分组符号
		for (const part of parts) {
			if (part.type === 'decimal') {
				decimal = part.value;
			} else if (part.type === 'group') {
				thousand = part.value;
			}
		}
		return { decimal, thousand };
	} catch (e) {
		console.warn(`getLocaleSeparators - ${lgre} 的兼容性回退`, e);
		return { decimal: decimal, thousand: thousand }; // 兼容性回退
	}
}

/**
 * 将输入的字符串解析为纯数字字符串 (例如 "123456.789")
 * 规则：最后一个句点或逗号被视为小数点，其余的句点或逗号被移除 (视为千分符)
 * @param {string} displayStr - 在输入框中输入的原始字符串
 * @returns {string} - 清理后的纯数字字符串，小数点为 '.'。如果无法解析为有效数字，返回空字符串。
 */
export function parseFormattedNumber(displayStr) {
	if (!displayStr) return '';

	// 1. 移除所有非数字、非句点、非逗号的字符
	let cleanedStr = displayStr.replace(/[^0-9.,]/g, '');

	// 2. 找到最后一个句点或逗号的索引
	const lastDotIndex = cleanedStr.lastIndexOf('.');
	const lastCommaIndex = cleanedStr.lastIndexOf(',');

	let decimalSeparatorIndex = -1;
	if (lastDotIndex !== -1 && lastCommaIndex !== -1) {
		decimalSeparatorIndex = Math.max(lastDotIndex, lastCommaIndex);
	} else if (lastDotIndex !== -1) {
		decimalSeparatorIndex = lastDotIndex;
	} else if (lastCommaIndex !== -1) {
		decimalSeparatorIndex = lastCommaIndex;
	}

	let integerPart = '';
	let decimalPart = '';

	if (decimalSeparatorIndex !== -1) {
		// 拆分整数部分和小数部分
		integerPart = cleanedStr.substring(0, decimalSeparatorIndex);
		decimalPart = cleanedStr.substring(decimalSeparatorIndex + 1);

		// 移除整数部分和小数部分中所有剩余的句点和逗号（它们是千分符）
		integerPart = integerPart.replace(/[\.,]/g, '');
		// 确保小数部分没有其他分隔符，因为它们应该已经被处理或忽略
		decimalPart = decimalPart.replace(/[\.,]/g, '');

		// 组合成标准格式的数字字符串，小数点为 '.'
		return integerPart + (decimalPart ? '.' + decimalPart : '');
	} else {
		// 没有小数点，直接移除所有句点和逗号（它们是千分符）
		return cleanedStr.replace(/[\.,]/g, '');
	}
}

/**
 * 将纯数字值格式化为不带千分符，但带正确小数点的字符串。
 * 主要用于输入框聚焦时显示，保留用户输入的完整小数部分。
 * @param {number|string} rawValue - 原始数字值 (Number 或 Number字符串)
 * @param {string} locale - 语言环境字符串
 * @returns {string}
 */
export function formatCleanNumber(rawValue, locale) {
	const num = parseFloat(rawValue);
	if (isNaN(num)) return '';

	const { decimal: localeDecimalSeparator } = getLocaleSeparators(locale);

	// 转换为字符串，并替换小数点
	let strNum = num.toString();

	// 如果是整数，直接返回
	if (!strNum.includes('.')) return strNum;

	// 分割整数部分和小数部分
	const parts = strNum.split('.');
	const integerPart = parts[0];
	const decimalPart = parts[1] || '';

	// 组合，使用本地化的小数点
	return integerPart + localeDecimalSeparator + decimalPart;
}

/**
 * 手动格式化数字为字符串，包含千分位和小数位处理，不处理货币符号。
 * 主要用作 Intl.NumberFormat 的回退方案，或在需要自定义格式时使用。
 * @param {number|string} numValue - 要格式化的数字值。
 * @param {string} locale - 语言环境字符串，用于获取小数点和千分符。
 * @param {number} fixedDigits - 小数位数 (toFixed)。
 * @returns {string} - 格式化后的数字字符串。
 */
export function formatNumberManually(numValue, locale, fixedDigits = 0) {
	const num = parseFloat(numValue);
	if (isNaN(num)) return '';

	const { decimal, thousand } = getLocaleSeparators(locale);

	// 将数字四舍五入到指定小数位数，得到字符串
	let parts = num.toFixed(fixedDigits).split('.'); // 例如 "12345.67" -> ["12345", "67"]
	let integerPart = parts[0];
	let fractionalPart = parts[1] || ''; // 小数部分，如果没有则为空

	// 处理负号：如果为负数，先保存负号，对绝对值部分进行处理
	const isNegative = integerPart.startsWith('-');
	if (isNegative) {
		integerPart = integerPart.substring(1); // 移除负号
	}

	// 格式化整数部分（添加千分符）
	let formattedIntegerPart = '';
	for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
		formattedIntegerPart = integerPart[i] + formattedIntegerPart;
		// 每三位添加千分符，但不在字符串开头（i === 0 表示当前处理的是整数部分的第一个数字）添加
		if (count % 3 === 2 && i !== 0) {
			formattedIntegerPart = thousand + formattedIntegerPart;
		}
	}
	// 重新添加负号
	if (isNegative) {
		formattedIntegerPart = '-' + formattedIntegerPart;
	}

	// 组合整数部分、小数部分和本地化分隔符
	let formattedNum = formattedIntegerPart;
	// 只有当 fixedDigits > 0 且有小数部分时才添加小数点和分数部分
	// 注意：toFixed 会自动处理小数部分的补零和截断
	if (fixedDigits > 0 && fractionalPart.length > 0) {
		formattedNum += decimal + fractionalPart;
	}
	// 如果 fixedDigits > 0 但 fractionalPart 为空（例如 num = 123.00，fixedDigits = 2），
	// toFixed 会返回 "123.00"，因此 fractionalPart 会有内容。
	// 只有在 num 是整数但 fixedDigits > 0 时 (例如 123 toFixed(2) -> "123.00")，才需要确保 fractionalPart 有效。
	// 当前 toFixed 后的 split 已经包含了这些情况。

	return formattedNum;
}




// 数值为数字类型
export function parseToNumer(rawValue) {
	const num = parseFloat(rawValue);
	return isNaN(num) ? null : num;
}

// 获取真实小数位
export function getRawDecimal(rawValue) {
	const valueString = String(rawValue);
	const parts = valueString.split('.');
	return parts.length === 2 ? parts[1].length : 0;
}

// 获取法币默认小数位
export function getDefFiatDecimal(currency) {
	return fiatDecimalConfig[currency.toUpperCase()] !== undefined ?
		fiatDecimalConfig[currency.toUpperCase()] :
		fiatDecimalConfig.DEFAULT;
}



/**
 * 法币格式化 12345.67 -> 12,345.67|12.345,67
 * @param {number|string} rawValue 原始数值 
 * @param {object} [opt] - 选项对象。
 * @param {string} [opt.lgre] - 语言代码，覆盖默认。
 * @param {string} [opt.currency] - 货币代码，覆盖默认。
 * @param {string} [opt.signDisplay='auto'] - 符号显示方式 ('auto', 'always', 'exceptZero', 'never')。
 * @param {number} [opt.decimal] - 明确指定小数位数。
 * @returns {string} - 格式化后的字符串
 */
export function fmtFiat(rawValue, opt = {}) {
	const { lgre = acmeConfig.lgre, currency = acmeConfig.currency, signDisplay = 'auto', decimal } = opt;
	// 优先处理传入的decimal
	let _decimal;
	// 如果decimal有值
	if (typeof decimal === 'number' && decimal >= 0 && Number.isInteger(decimal)) _decimal = decimal;
	// 否则，使用默认的法币值方案
	else _decimal = getDefFiatDecimal(currency);
	// console.log(_decimal);
	const num = parseToNumer(rawValue);
	if (!num) return '';

	const options = {
		style: "currency",
		currency: currency,
		useGrouping: true, // 使用千位分隔符
		signDisplay: signDisplay,
		minimumFractionDigits: _decimal,
		maximumFractionDigits: _decimal,
	}
	try {
		return new Intl.NumberFormat(lgre, options).format(num);
	} catch (e) {
		console.warn(`fmtFiat 格式化数字 ${rawValue} 失败，使用默认格式化。`, e);
		const formattedNum = formatNumberManually(num, lgre, _decimal);
		// return `${formattedNum} ${currency}`;
		return formattedNum;
	}
}