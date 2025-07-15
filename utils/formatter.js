/**
 * 获取指定语言环境的数字分隔符
 * @param {string} locale - 语言环境字符串，例如 'en-US', 'de-DE'
 * @returns {{decimal: string, thousand: string}} - 包含小数点和千分符的对象
 */
export function getLocaleSeparators(locale) {
	try {
		const formatter = new Intl.NumberFormat(locale);
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
		console.warn(`getLocaleSeparators 无法获取语言环境 ${locale} 的分隔符，使用默认值：小数点 '.'，千分符 ','`, e);
		return { decimal: '.', thousand: ',' }; // 兼容性回退
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

/**
 * 根据货币代码获取默认小数位数，或根据传入的 desiredDecimalPlaces 返回指定位数。
 * @param {string} currency - 货币代码 (如 'USD', 'EUR', 'JPY')。
 * @param {number} [desiredDecimalPlaces] - 可选参数，如果提供，则覆盖默认值。
 * @returns {number} - 最终确定的小数位数。
 */
export function getFiatDecimalPlaces(currency, desiredDecimalPlaces) {
	// 如果 desiredDecimalPlaces 明确提供且有效，则优先使用它
	if (typeof desiredDecimalPlaces === 'number' && desiredDecimalPlaces >= 0 && Number.isInteger(desiredDecimalPlaces)) {
		return desiredDecimalPlaces;
	}
}

/**
 * 根据货币代码获取默认小数位数。
 * @param {string} currency - 货币代码 (如 'USD', 'EUR', 'JPY')。
 * @returns {number} - 默认小数位数。
 */
export function getDefaultFiatDecimalPlaces(currency) {
	if (currency === 'JPY' || currency === 'VND' || currency === 'ISK') return 0;
	else return 2; // 默认两位小数
}

/**
 * 将数值格式化到指定的小数位数，并返回一个数字。
 * 此函数不进行货币符号、千位分隔符等格式化，只处理数值的精度。
 * 可作用于：法币、加密币等所有数值。
 * @param {number|string} rawValue - 原始数值。
 * @param {string} currency - 货币代码，用于在未指定 decimal 时确定默认小数位数。
 * @param {object} opt[decimal] - 可选参数，指定最终的小数位数。如果未提供，则使用货币的默认小数位数。
 * @returns {number} - 格式化到指定小数位数后的数值。如果原始值无法解析为数字，则返回 NaN。
 */
export function formatNumberToPrecision(rawValue, currency, opt = {}) {
	const { decimal } = opt;
	const num = parseFloat(rawValue);
	if (isNaN(num)) return NaN; // 返回 NaN，让调用者处理无效输入

	// 确定最终的小数位数：优先使用传入的 decimal，否则使用货币默认值
	const finalDecimalDigits = typeof decimal === 'number' && decimal >= 0 &&
		Number.isInteger(decimal) ? decimal :
		getDefaultFiatDecimalPlaces(currency);

	// 使用 toFixed 进行格式化和四舍五入，然后转换回数字
	// toFixed() 返回字符串，需要 parseFloat() 转换回数字，以确保后续 Intl.NumberFormat 接收的是数字
	// return parseFloat(num.toFixed(finalDecimalDigits));
	return num.toFixed(finalDecimalDigits);
}

/**
 * 从原始数值的字符串表示中获取小数位数。所有数值可通用
 * 例如：123 -> 0, 123.4 -> 1, 123.456 -> 3
 * 注意：此函数处理的是字符串表示的小数位数，对于浮点数精度问题需谨慎。
 * @param {number|string} rawValue - 原始数值。
 * @returns {number} - 原始数值字符串表示的小数位数。如果不是有效数字，返回 0。
 */
export function getDecimalPlacesFromRawString(rawValue) {
	// 将数值转换为字符串，以处理其字符串表示的小数点
	const valueString = String(rawValue);

	const parts = valueString.split('.');
	if (parts.length === 2) return parts[1].length;
	// 如果没有小数点或不是有效数字，则为 0 位小数
	return 0;
}

/**
 * 法币格式化 12345.67 -> 12,345.67|12.345,67
 * @param {number|string} rawValue 原始数值
 * @param {string} locale 语言代码
 * @param {string} currency 货币代码。以此确定小数位数
 * @param {object} opt 其他配置
 * @returns {string} - 格式化后的字符串
 */
export function formatterFiat(rawValue, locale, currency, opt = {}) {
	// 解构 opt 对象，并为 signDisplay 提供默认值
	const { signDisplay = 'auto' } = opt;

	const num = parseFloat(rawValue);
	if (isNaN(num)) return '';
	// 真实的小数位数
	const _decimal = getDecimalPlacesFromRawString(rawValue);

	const options = {
		style: "currency",
		currency: currency,
		useGrouping: true, // 使用千位分隔符
		signDisplay: signDisplay,
		minimumFractionDigits: _decimal, // 最少显示的小数位数
		maximumFractionDigits: _decimal, // 最多显示的小数位数
	}
	try {
		return new Intl.NumberFormat(locale, options).format(num);
	} catch (e) {
		console.warn(`formatterFiat 格式化数字 ${rawValue} 失败，使用默认格式化。`, e);
		const formattedNum = formatNumberManually(num, locale, _decimal);
		// return `${formattedNum} ${currency}`;
		return formattedNum;
	}
}

export function formatterInteger(rawValue, locale) {
	const num = parseFloat(rawValue);
	if (isNaN(num)) return '';
	const options = {
		style: "decimal",
		useGrouping: true,
		signDisplay: 'auto',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}
	try {
		return new Intl.NumberFormat(locale, options).format(num);
	} catch (e) {
		console.warn(`formatterInteger 格式化数字 ${rawValue} 失败，使用默认格式化。`, e);
		const formattedNum = formatNumberManually(num, locale, 0);
		// return `${formattedNum} ${currency}`;
		return formattedNum;
	}
}

export function formatterPercent(rawValue, locale, signDisplay = 'auto') {
	const num = parseFloat(rawValue);
	if (isNaN(num)) return '';
	let defDigit = 2; // %值通常两位小数
	const options = {
		style: "percent",
		useGrouping: true,
		signDisplay: signDisplay,
		minimumFractionDigits: defDigit,
		maximumFractionDigits: defDigit,
	};
	try {
		// Intl.NumberFormat percent style 期望0-1的数值，所以需要除以100
		return new Intl.NumberFormat(locale, options).format(num / 100);
	} catch (e) {
		console.warn(`formatterPercent 格式化数字 ${rawValue} 失败，使用默认格式化。`, e);
		// const formattedNum = formatNumberManually(num, locale, 0);
		// // return `${formattedNum} ${currency}`;
		// return formattedNum;
		return `${num.toFixed(defDigit)}%`; // 回退方案
	}
}