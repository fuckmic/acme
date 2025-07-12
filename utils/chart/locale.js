import { registerLocale } from './klinecharts.min.js';

const objIndicator = {
	ma: 'MA',
	ema: 'EMA',
	vol: 'VOL',
	macd: 'MACD',
	kdj: 'KDJ',
	rsi: 'RSI',
	boll: 'BOLL',
	cci: 'CCI',
	atr: 'ATR',
	bias: 'BIAS',
	br: 'BR',
	cr: 'CR',
	dma: 'DMA',
	emv: 'EMV',
	fibo: 'FIBO',
	trix: 'TRIX',
	wr: 'WR',
	ao: 'AO',
}

/**
 * 注册 klinecharts.js 的所有语言包。
 */
export function setupKlinechartsLocales() {
	// 德语语言包
	registerLocale('de-DE', {
		time: 'Zeit',
		open: 'Eröffnen',
		high: 'Hoch',
		low: 'Tief',
		close: 'Schließen',
		volume: 'Volumen',
		// --- 指标名称 ---
		technicalIndicator: {
			title: 'Technische Indikatoren',
			// 主要图表指标
			...objIndicator,
			// ... 更多指标的德语名称
		},
		// --- K 线图 UI 文本 ---
		area: '面积',
		line: '线',
		candle: '蜡烛',
		ohlc: 'OHLC',
		timeline: 'Zeitachse',
		settings: 'Einstellungen',
		indicator: 'Indikator',
		main: 'Haupt',
		// ... 更多 UI 文本
		noData: 'Keine Daten verfügbar', // 无数据提示
	});

	// 英语语言包 (作为默认或备用)
	registerLocale('en-US', {
		time: 'Time',
		open: 'Open',
		high: 'High',
		low: 'Low',
		close: 'Close',
		volume: 'Volume',
		technicalIndicator: {
			title: 'Technical Indicators',
			...objIndicator,
		},
		area: 'Area',
		line: 'Line',
		candle: 'Candle',
		ohlc: 'OHLC',
		timeline: 'Timeline',
		settings: 'Settings',
		indicator: 'Indicator',
		main: 'Main',
		noData: 'No Data Available',
	});

	// 简体中文语言包 (作为备用)
	registerLocale('zh-CN', {
		time: '时间',
		open: '开',
		high: '高',
		low: '低',
		close: '收',
		volume: '量',
		technicalIndicator: {
			title: '技术指标',
			...objIndicator,
		},
		area: '面积',
		line: '线',
		candle: '蜡烛',
		ohlc: 'OHLC',
		timeline: '时间轴',
		settings: '设置',
		indicator: '指标',
		main: '主图',
		noData: '暂时没有数据',
	});

	console.log('klinecharts.js locales registered.');
}