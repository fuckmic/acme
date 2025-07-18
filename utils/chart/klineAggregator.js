export function parseTimePeriodToMs(period) {
	const unit = period.slice(-1);
	const value = parseInt(period.slice(0, -1));
	switch (unit) {
		case 'm':
			return value * 60 * 1000;
		case 'H':
			return value * 60 * 60 * 1000;
		case 'D':
			return value * 24 * 60 * 60 * 1000;
		case 'W':
			return value * 7 * 24 * 60 * 60 * 1000;
		case 'M':
			return value * 30 * 24 * 60 * 60 * 1000; // rough month calculation (e.g., 30 days)
		default:
			return 60 * 1000; // default to 1m
	}
}

/**
 * 创建一个前端 K线聚合器实例。
 * 这个函数返回一个对象，包含用于管理 K 线聚合状态的方法。
 *
 * @returns {Object} 包含 setActivePeriod 和 aggregate 方法的对象。
 */
export function createKlineAggregator() {
	// 存储当前周期内正在聚合的 K 线 (私有状态)
	let currentAggregatedCandles = {};
	// 当前图表正在显示的周期 (私有状态)
	let activePeriod = '';

	/**
	 * 设置当前活跃的 K 线周期。
	 * @param {string} period - '1m', '5m', '1H' 等周期字符串。
	 */
	const setActivePeriod = (period) => {
		// console.log(`setActivePeriod:`, period);
		activePeriod = period;
		// 切换周期时，清空旧的聚合状态，防止数据混淆
		currentAggregatedCandles = {};
	};

	/**
	 * 根据当前活跃周期，聚合或更新 K 线数据。
	 * @param {Object} incomingData - 传入的实时 K 线数据（假设是 1m 数据或 tick 数据）。
	 * { timestamp: number (ms), open: number, high: number, low: number, close: number, volume: number }
	 * @returns {Object|null} - 返回当前周期下聚合后的 K 线数据，如果不需要更新则返回 null。
	 */
	const aggregate = (incomingData) => {
		// console.log(`??`, incomingData);
		if (!activePeriod) return null;

		const periodMs = parseTimePeriodToMs(activePeriod);

		// 计算当前周期 K 线的起始时间戳
		const currentKlineTimestamp = Math.floor(incomingData.timestamp / periodMs) * periodMs;
		// console.log(currentKlineTimestamp);

		let aggregatedCandle = currentAggregatedCandles[activePeriod];

		if (!aggregatedCandle || aggregatedCandle.timestamp !== currentKlineTimestamp) {
			// 这是新的一根 K 线，或者周期刚刚切换
			// 创建新的聚合 K 线
			aggregatedCandle = {
				timestamp: currentKlineTimestamp,
				open: incomingData.open,
				high: incomingData.high,
				low: incomingData.low,
				close: incomingData.close,
				volume: incomingData.volume,
			};
			currentAggregatedCandles[activePeriod] = aggregatedCandle;
			return aggregatedCandle; // 这是一根新的 K 线，通知图表追加
		} else {
			// console.log(`???????????`, incomingData);
			// 仍然是同一根 K 线，更新其 OHLCV
			aggregatedCandle.high = Math.max(aggregatedCandle.high, incomingData.high);
			aggregatedCandle.low = Math.min(aggregatedCandle.low, incomingData.low);
			aggregatedCandle.close = incomingData.close;
			// 假设 incomingData.volume 是增量。如果 incomingData.volume 是总成交量，则直接赋值。
			// 请根据你的WebSocket数据实际情况来判断是 += 还是 =
			aggregatedCandle.volume += incomingData.volume;

			return aggregatedCandle; // 返回更新后的 K 线，通知图表覆盖
		}
	};

	// 返回包含公共方法的对象
	return {
		setActivePeriod,
		aggregate
	};
}