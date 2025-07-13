/* Maybe only map svg color */
const themeColorsMap = {
	'dark': {
		'acme-svg-del': `#CDCDCD`,
	},
	'light': {
		'acme-svg-del': `#CDCDCD`,
	}
}

/**
 * css variable to color
 * @param {string} cssVarString - CSS 变量字符串，例如 'var(--acme-success-color)' 或 '#FF0000'。
 * @param {string} theme - 当前主题，'light' 或 'dark'。
 * @returns {string} 解析后的颜色值（例如 '#0CF49B'），如果不是识别的变量则返回原始字符串。
 */
export function cssVariableColor(cssVarString, theme) {
	// 如果不是字符串，直接返回
	if (typeof cssVarString !== 'string') return cssVarString;

	// 检查是否是 'var(--variable-name)' 格式
	const match = cssVarString.match(/^var\(--([^)]+)\)$/);
	if (match) {
		const varName = match[1]; // 提取变量名，例如 'acme-success-color'
		const colorsForTheme = themeColorsMap[theme];
		if (colorsForTheme && colorsForTheme[varName]) {
			return colorsForTheme[varName];
		}
	}
	return cssVarString; // 如果不是 CSS 变量格式，或者在映射中未找到，则返回原始字符串
}