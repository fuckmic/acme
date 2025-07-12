import { registerOverlay } from './klinecharts.min.js';
import circle from "./extension/circle.js";
import rect from './extension/rect.js';
import parallelogram from './extension/parallelogram.js';
import triangle from './extension/triangle.js';
import abcd from "./extension/abcd.js";
import anyWaves from './extension/anyWaves.js';
import arrow from './extension/arrow.js';
import eightWaves from './extension/eightWaves.js';
import fibonacciCircle from './extension/fibonacciCircle.js';
import fibonacciExtension from './extension/fibonacciExtension.js';
import fibonacciSegment from './extension/fibonacciSegment.js';
import fibonacciSpeedResistanceFan from './extension/fibonacciSpeedResistanceFan.js';
import fibonacciSpiral from './extension/fibonacciSpiral.js';
import fiveWaves from './extension/fiveWaves.js';
import gannBox from './extension/gannBox.js';
import threeWaves from './extension/threeWaves.js';
import xabcd from './extension/xabcd.js';

const overlays = [
	circle,
	rect,
	parallelogram,
	triangle,
	abcd,
	anyWaves,
	arrow,
	eightWaves,
	fibonacciCircle,
	fibonacciExtension,
	fibonacciSegment,
	fibonacciSpeedResistanceFan,
	fibonacciSpiral,
	fiveWaves,
	gannBox,
	threeWaves,
	xabcd,
];

export function setupKlinechartsOverlay() {
	// 将定义好的扩展覆盖物绘制，逐一注册到klinechart中
	overlays.forEach(item => registerOverlay(item));
}