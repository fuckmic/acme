import { registerStyles } from './klinecharts.min.js';
/**
 * 注册 klinecharts.js 的所有样式主题。
 */
export function setupKlinechartsStyles() {
	// 亮色主题
	registerStyles('only_area', {
		grid: { show: false, },
		candle: {
			type: "area",
			tooltip: {
				showRule: "none",
			},
			// 面积图，只有当type为'area'时，当有效
			area: {
				lineSize: 2,
				lineColor: `teal`,
				value: 'close',
				backgroundColor: [{
					offset: 0, //下半区颜色
					color: 'rgba(33, 150, 243, 0.01)'
				}, {
					offset: 1, //上半区颜色
					color: 'rgba(33, 150, 243, 0.5)'
				}],
				point: {
					// show: true,
					show: false,
					color: `#FD1050`,
					radius: 4,
					rippleColor: 'rgba(255,255,255,0)',
					rippleRadius: 8,
					animation: false,
					animationDuration: 1000
				},
			},
			priceMark: {
				display: false,
				high: { show: false, color: '#FD1050' }, // 阳线高点
				low: { show: false, color: '#0CF49B' }, // 阴线低点
				last: { show: false, color: '#999999' }
			},
			// tooltip: {
			// 	text: { color: '#333' },
			// 	rect: { borderColor: '#ccc', fillColor: '#fff' }
			// }
		},
		separator: { color: '#eee' },
		xAxis: {
			show: false,
			// axisLine: { color: '#ccc' },
			// tickText: { color: '#666' },
			// splitLine: { color: '#eee' },
			// 如果只隐藏文本，不隐藏轴线本身，则设置 tickText: { display: false }
			tickText: { show: false },
			axisLine: { show: false }, // 隐藏轴线
			splitLine: { show: false }, // 隐藏分割线
		},
		yAxis: {
			show: false,
			// axisLine: { color: '#ccc' },
			// tickText: { color: '#666' },
			// splitLine: { color: '#eee' }
			// 如果只隐藏文本，不隐藏轴线本身，则设置 tickText: { display: false }
			tickText: { show: false },
			axisLine: { show: false }, // 隐藏轴线
			splitLine: { show: false }, // 隐藏分割线
		},
		dataZoom: {
			show: false, // 隐藏整个数据缩放区域
			// 如果只想隐藏滑块，保留背景，可以设置 handle: { display: false }
			// handle: {
			//     display: false,
			// },
			// background: {
			//     display: false,
			// },
		},

		// === 额外优化：隐藏所有可能的多余 UI 元素 ===
		// 这通常是针对整个图表的全局设置
		// 顶部工具栏 (topBar)
		indicator: { // 指标面板，如果不需要显示指标
			// 如果您在组件中不创建任何技术指标，这个可能不需要
			// 但如果创建了，且不想显示其面板，可以设置
			show: false,
		},
		crosshair: { // 隐藏十字光标，如果迷你图不需要
			show: false,
			// horizontal: { line: { show: false, size: 0, }, text: { show: false } },
			// vertical: { line: { show: false, size: 0, }, text: { show: false } }
		},
		// crosshair.horizontal.line
		// ... 更多 light 主题样式
	});

	// 暗色主题
	registerStyles('dark', {
		candle: {
			// 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
			type: "candle_solid",
			tooltip: {
				// 'always' | 'follow_cross' | 'none'
				showRule: "always",
			},
			priceMark: {
				high: { color: '#FD1050' },
				low: { color: '#0CF49B' },
			},
			tooltip: {
				showRule: 'rect',
				position: 'fixed',
				text: { color: '#eee' },
				rect: { borderColor: '#555', fillColor: '#222' }
			}
		},
		separator: { color: '#444' },
		xAxis: {
			size: 'auto',
			axisLine: { color: '#555' },
			tickText: { color: '#aaa' },
			splitLine: { color: '#333' }
		},
		yAxis: {
			inside: true,
			size: 'auto',
			axisLine: { color: '#555' },
			tickText: { color: '#aaa' },
			splitLine: { color: '#333' }
		},
		// ... 更多 dark 主题样式
	});

	console.log('klinecharts.js styles registered.');
}