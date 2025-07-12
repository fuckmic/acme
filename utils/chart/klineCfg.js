import { setupKlinechartsLocales } from './locale.js';
import { setupKlinechartsStyles } from './style.js';
import { setupKlinechartsOverlay } from './overlay.js';

import * as icons from './icons.js';


/**
 * 初始化 klinecharts.js 的所有全局设置（语言和样式）。
 * 应该在应用启动时调用一次。
 */
export function setupKlinechartsGlobalConfig() {
	setupKlinechartsLocales();
	setupKlinechartsStyles();
	setupKlinechartsOverlay();
}

export const singleLine = [
	`horizontalStraightLine`,
	`horizontalRayLine`,
	`horizontalSegment`,
	`verticalStraightLine`,
	`verticalRayLine`,
	`verticalSegment`,
	`straightLine`,
	`rayLine`,
	`segment`,
	`arrow`,
	`priceLine`,
];

export const moreLine = [
	`priceChannelLine`,
	`parallelStraightLine`,
];

export const polygon = [
	`circle`,
	`rect`,
	`parallelogram`,
	`triangle`,
];

export const fibonacci = [
	`fibonacciLine`,
	`fibonacciSegment`,
	`fibonacciCircle`,
	`fibonacciSpiral`,
	`fibonacciSpeedResistanceFan`,
	`fibonacciExtension`,
	`gannBox`,
]

export const wave = [
	`xabcd`,
	`abcd`,
	`threeWaves`,
	`fiveWaves`,
	`eightWaves`,
	`anyWaves`,
]

// 笔刷 绘制 覆盖物
export const brushs = () => {
	const singleLineOptions = singleLine.map(item => {
		return {
			key: item,
			icon: icons[item],
		}
	});
	const moreLineOptions = moreLine.map(item => {
		return {
			key: item,
			icon: icons[item],
		}
	});
	const polygonOptions = polygon.map(item => {
		return {
			key: item,
			icon: icons[item],
		}
	});
	const fibonacciOptions = fibonacci.map(item => {
		return {
			key: item,
			icon: icons[item],
		}
	});
	const waveOptions = wave.map(item => {
		return {
			key: item,
			icon: icons[item],
		}
	});

	return [
		...singleLineOptions,
		...moreLineOptions,
		...polygonOptions,
		...fibonacciOptions,
		...waveOptions
	];

	// return [{
	// 	group: `single`,
	// 	key: singleLine[0],
	// 	icon: icons[singleLine[0]],
	// 	child: singleLine
	// }, {
	// 	group: `more`,
	// 	key: moreLine[0],
	// 	icon: icons[moreLine[0]],
	// 	child: moreLine
	// }, {
	// 	group: `polygon`,
	// 	key: polygon[0],
	// 	icon: icons[polygon[0]],
	// 	child: polygon
	// }, {
	// 	group: `fibonacci`,
	// 	key: fibonacci[0],
	// 	icon: icons[fibonacci[0]],
	// 	child: fibonacci
	// }, {
	// 	group: `wave`,
	// 	key: wave[0],
	// 	icon: icons[wave[0]],
	// 	child: wave
	// }];
};

// // 蜡烛图设置
// export const klineCandle = {
// 	bar: {
// 		upColor: Vue.prototype.$theme.RISE,
// 		downColor: Vue.prototype.$theme.FALL,
// 		noChangeColor: Vue.prototype.$theme.FLAT,
// 		upBorderColor: Vue.prototype.$theme.RISE,
// 		downBorderColor: Vue.prototype.$theme.FALL,
// 		noChangeBorderColor: Vue.prototype.$theme.FLAT,
// 		upWickColor: Vue.prototype.$theme.RISE,
// 		downWickColor: Vue.prototype.$theme.FALL,
// 		noChangeWickColor: Vue.prototype.$theme.FLAT
// 	},
// };

// 主题配置，留口给外部覆盖
export const theme = {
	gird: `#302f311a`,
}

// 图标网格设置
export const klineGird = {
	show: true, // 不显示网格
	horizontal: {
		show: true,
		size: 1,
		color: theme.gird,
		style: 'dashed',
		dashedValue: [2, 2], // 虚线时的紧密程度
	},
	vertical: {
		show: true,
		size: 1,
		color: theme.gird,
		style: 'dashed',
		dashedValue: [2, 2], // 虚线时的紧密程度
	}
};