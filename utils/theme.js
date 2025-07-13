/* Maybe only map svg color */
// 默认的全局主题颜色映射表 初始为空，由主项目通过 setGlobalThemeColorsMap 函数来填充。
let _globalThemeColorsMap = { 'light': {}, 'dark': {} };

/**
 * 设置全局主题颜色映射表。
 * 这个函数应该由主项目在应用启动时调用，以提供 SVG 颜色变量的实际值。
 * @param {object} newMap - 新的映射表对象，例如：
 * {
 * 'light': { 'acme-svg-close': '#333333', 'acme-mask-color': '#007bff' },
 * 'dark': { 'acme-svg-close': '#CCCCCC', 'acme-mask-color': '#66b3ff' }
 * }
 */
export function setGlobalThemeColorsMap(newMap) {
	// 深度合并新的映射表，确保不会覆盖整个对象，而是合并内部属性
	_globalThemeColorsMap.light = { ..._globalThemeColorsMap.light, ...(newMap.light || {}) };
	_globalThemeColorsMap.dark = { ..._globalThemeColorsMap.dark, ...(newMap.dark || {}) };
	console.log("Global theme colors map updated by main project:", _globalThemeColorsMap);
}

/**
 * css variable to color
 * @param {string} cssVarString - 字符串，例如 'acme-success-color' 。
 * @param {string} theme - 当前主题，'light' 或 'dark'。
 * @returns {string} 颜色值（例如 '#0CF49B'），如果不是识别的变量则返回原始字符串。
 */
export function cssVariableColor(cssVarString, theme) {
	// 如果不是字符串，直接返回
	if (typeof cssVarString !== 'string') return cssVarString;
	const colorsForTheme = _globalThemeColorsMap[theme];
	if (colorsForTheme && colorsForTheme[cssVarString]) return colorsForTheme[cssVarString];
	return cssVarString; // 如果不是 CSS 变量格式，或者在映射中未找到，则返回原始字符串
}