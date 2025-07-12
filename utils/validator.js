// utils/validator.js
// 这个函数只负责执行规则，不负责显示 Toast

/**
 * @function 传入值是否为数字 
 */
export const isNumber = (val) => {
	return !isNaN(parseFloat(val)) && isFinite(val);
};

/**
 * @function 将传入值输出为数字 
 */
export const numer = (val) => {
	// console.log(val)
	return isNumber(val) ? Number(val) : 0;
}

/**
 * 检查值是否为空 (null, undefined, 空字符串)
 * 对于数字 0 和 boolean false，不认为是空
 * @param {*} value
 * @returns {boolean}
 */
function isEmpty(value) {
	// console.log('val111:', value);
	if (typeof value === 'string') {
		value = value.replace(/\s/g, '')
	}
	return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
	// 注意：这里不认为 数字0 和 boolean false 是空
}

/**
 * 检查值是否满足最小长度
 * @param {string | Array} value
 * @param {number} min
 * @returns {boolean}
 */
function checkMinLength(value, min) {
	if (typeof value !== 'string' && !Array.isArray(value)) {
		return false; // 只能检查字符串或数组长度
	}
	return value.length >= min;
}
// 检查最小值
function checkMinValue(value, min) {
	if (typeof value !== 'number' || isNaN(value)) {
		return false;
	}
	return value > min;
}

// 检查值是否匹配另一个字段的值
function checkMatch(value, compareValue) {
	return value === compareValue;
}

// **通用验证函数**
/**
 * 根据规则验证数据
 * @param {Object} data 要验证的数据对象 (如 this.formData)
 * @param {Object} rules 验证规则对象 (如 this.formRules)
 * @returns {Array<Object>} 返回错误信息数组，如果验证通过则返回空数组
 */
export function validateForm(data, rules) {
	const errors = [];

	// 遍历所有字段的规则
	for (const field in rules) {
		const fieldRules = rules[field]; // 当前字段的所有规则
		const value = data[field]; // 当前字段的值

		// 遍历当前字段的所有规则
		for (const rule of fieldRules) {
			let failed = false; // 标记当前规则是否失败

			if (rule.required) {
				if (isEmpty(value) || (typeof value === 'boolean' && value === false)) {
					failed = true;
				}
			}

			// 这里假设必填失败就立即跳过其他规则
			if (failed && rule.required) {
				errors.push({ field: field, message: rule.message });
				break; // 必填失败后，跳过该字段的其余规则
			}

			if (rule.minLength !== undefined && !isEmpty(value)) {
				if (!checkMinLength(value, rule.minLength)) {
					failed = true;
				}
			}

			// **添加检查数字最小值 (非空且是数字时才检查)**  
			if (rule.minValue !== undefined && !isEmpty(value)) {
				const numericValue = numer(value);
				if (isNaN(numericValue) || !checkMinValue(numericValue, rule.minValue)) {
					failed = true;
				}
			}

			if (rule.match) {
				const compareValue = data[rule.match];
				if (!checkMatch(value, compareValue)) {
					failed = true;
				}
			}

			if (rule.validator && typeof rule.validator === 'function') {
				if (!rule.validator(value, data)) { failed = true; }
			}

			if (failed) {
				errors.push({ field: field, message: rule.message });
				break;
			}
		}
	}

	return errors; // 返回所有错误信息
}