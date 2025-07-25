import { acmeConfig } from "../../config";

/**
 * 将时间戳格式化为指定国家时区易读日期字符串。
 * 使用 Intl.DateTimeFormat 进行本地化和时区处理。
 * @param {number | Date} timestamp - 需要格式化的时间戳（毫秒）或 Date 对象。
 * @returns {string} 格式化后的日期时间字符串。
 */
export function fmtTimestampLocaleDateTime(timestamp, opt = {}) {
	// 确保时间戳是数字或有效的 Date 对象
	let date;
	if (typeof timestamp === 'number') {
		date = new Date(timestamp);
	} else if (timestamp instanceof Date) {
		date = timestamp;
	} else {
		console.error('Invalid timestamp provided. Must be a number or Date object.');
		return ''; // 或者抛出错误
	}
	const { lgre = acmeConfig.lgre, timeZone = acmeConfig.tz } = opt;
	// 设置默认的格式化选项，如果用户没有提供或提供的 options 不包含关键信息
	const options = {
		year: 'numeric', // 2000
		month: '2-digit', // 01-12 (数字月)
		day: '2-digit', // 01-31 (数字日)
		hour: '2-digit', // 00-23 (小时)
		minute: '2-digit', // 00-59 (分钟)
		second: '2-digit', // 00-59 (秒)
		hour12: false, // 使用24小时制
		timeZone: timeZone, // 必须在这里设置时区
	};

	try {
		const formatter = new Intl.DateTimeFormat(lgre, options);
		return formatter.format(date);
	} catch (error) {
		console.error(`Error formatting date for lgre '${lgre}' and timeZone '${timeZone}':`, error);
		// Fallback to a simpler format or return an error message
		return date.toLocaleString(lgre, { timeZone: timeZone }); // Fallback to basic toLocaleString
	}
}