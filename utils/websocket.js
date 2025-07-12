// websocket.js

export function createWebSocket(url, onMessageCallback, symbolsToSubscribe = []) {
	let wsClient = null;
	let isConnected = false;
	// 用于存储重连的定时器ID，避免重复设置
	let reconnectionTimer = null;
	// 重连间隔时间（毫秒）
	const reconnectInterval = 1000;
	// 标记是否是用户手动关闭
	let isManualClose = false;

	function send(data) {
		if (isConnected) {
			// uni.sendSocketMessage 要求 data 是字符串或 ArrayBuffer
			const messageData = typeof data === 'string' ? data : JSON.stringify(data);
			uni.sendSocketMessage({
				data: messageData,
				success: () => {
					// console.log('WebSocket message sent successfully'); // 成功发送日志，可选
				},
				fail: (err) => {
					console.error('WebSocket message sending failed:', err);
				}
			});
		} else {
			console.warn('WebSocket is not connected, cannot send message:', data);
			// 可选：可以将待发送的消息暂存到一个队列中，等连接成功后再发送
		}
	}

	// 初始化webSocket
	function initWebSocket() {
		// 在尝试新连接前，确保清理旧的定时器和实例，避免重复连接
		clearTimeout(reconnectionTimer);
		reconnectionTimer = null; // 清除重连定时器

		if (wsClient) {
			// 如果已有实例，先尝试关闭，但这里可能需要更复杂的逻辑
			// uni.connectSocket 会返回一个新的 WebSocketTask，旧的如果没关会浪费资源
			// 简单起见，如果wsClient不是null，我们就认为它可能处于某种不健康状态，尝试重新连接
			console.log('Existing wsClient found, closing before re-initialization.');
			wsClient.offOpen(); // 移除旧的监听器
			wsClient.offClose();
			wsClient.offError();
			wsClient.offMessage();
			// uni.closeSocket({ code: 1000, reason: 'Re-initializing' }); // 可能会导致无限循环，谨慎使用
			wsClient = null; // 直接清空引用，让GC处理
		}

		wsClient = uni.connectSocket({
			url,
			header: { 'content-type': 'application/json' },
			success(res) { console.info(`WebSocket connected successfully:`, res); },
			fail(res) { console.info(`WebSocket connection failed:`, res); }
		});

		wsClient.onOpen(() => {
			isConnected = true;
			isManualClose = false; // 重置手动关闭标记
			console.log('WebSocket connection opened');
			// 连接成功时清除任何待执行的重连定时器
			clearTimeout(reconnectionTimer);
			reconnectionTimer = null;

			// *** 新增：在连接成功后发送订阅消息 ***
			if (symbolsToSubscribe && symbolsToSubscribe.length > 0) {
				symbolsToSubscribe.forEach(v => {
					const subscribeMessage = {
						// method: 'SUBSCRIBE', // 消息类型或方法
						// params: [ // 参数列表，通常是频道名
						// 	`${symbol.toLowerCase()}@trade` // 例如：币种符号小写 + @trade
						// 	// 更多频道可以在这里添加，如 `${symbol.toLowerCase()}@kline_1m`
						// ],
						// id: Date.now() // 请求 ID，用于匹配响应
						// // 其他字段根据 API 文档确定
						type: 'ping',
						action: "subscribe",
						symbol: v.symbol,
						time: v.time,
					};
					console.log('Sending subscription message on open:', subscribeMessage);
					send(subscribeMessage); // 调用上面定义的 send 方法发送消息
				});
			}
		});

		wsClient.onClose((res) => {
			console.log(`WebSocket connection closed:`, res);
			isConnected = false;
			// if (res.code !== 1000) reconnectWebSocket(); // 非手动关闭，重连
			wsClient = null; // 关闭后清空客户端实例引用
			clearTimeout(reconnectionTimer); // 清除任何待执行的重连定时器
			// 只有当不是手动关闭且关闭码不是正常关闭（1000）时才尝试重连
			if (!isManualClose && res.code !== 1000) {
				console.log(
					`WebSocket closed unexpectedly (code: ${res.code}), attempting to reconnect in ${reconnectInterval}ms...`
				);
				scheduleReconnect(); // 调度重连
			} else {
				console.log('WebSocket closed normally or manually disconnected.');
				// 正常关闭或手动关闭，清除定时器，确保不重连
				clearTimeout(reconnectionTimer);
				reconnectionTimer = null;
			}
			wsClient = null; // 关闭后清空客户端实例引用
		});

		wsClient.onError((err) => {
			console.error(`WebSocket error:`, err);
			isConnected = false; // 更新连接状态
			isManualClose = false; // 错误发生时，通常不是手动关闭
			console.log(`WebSocket error, attempting to reconnect in ${reconnectInterval}ms...`);
			scheduleReconnect(); // 调度重连
		});

		wsClient.onMessage((res) => {
			// 调用传入的消息处理函数
			if (onMessageCallback && res.data) {
				// onMessageCallback(JSON.parse(res.data));
				try {
					// 尝试解析接收到的数据，假设是 JSON 字符串
					const parsedData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
					onMessageCallback(parsedData); // 调用外部传入的回调函数处理解析后的数据
				} catch (e) {
					console.error('Error parsing WebSocket message:', e, 'Raw data:', res.data);
					// 可选：处理解析错误，例如显示提示
				}
			}
		});
	}

	// 调度重连
	function scheduleReconnect() {
		// 只有当没有重连定时器在运行时才设置新的定时器
		if (reconnectionTimer === null) {
			console.log(`Scheduling WebSocket reconnection in ${reconnectInterval}ms...`);
			reconnectionTimer = setTimeout(reconnectWebSocket, reconnectInterval);
		} else {
			console.log('Reconnect attempt already scheduled.');
		}
	}

	// 实际执行重连
	function reconnectWebSocket() {
		// 在这里不再检查 reconnectionTimer，因为 scheduleReconnect 已经保证了唯一性
		if (isConnected) {
			console.log('Reconnect attempt cancelled, already connected.');
			clearTimeout(reconnectionTimer); // 已经连接，清除定时器
			reconnectionTimer = null;
			return;
		}
		console.log('Attempting WebSocket reconnection...');
		// 重新调用初始化函数，它会创建新的连接并设置监听器
		initWebSocket();
	}

	// 关闭 websocket链接
	function disconnect() {
		// 只有当客户端存在且已连接时才执行关闭
		if (wsClient && isConnected) {
			console.log('Manually disconnecting WebSocket...');
			isManualClose = true; // 设置手动关闭标记
			wsClient.close({ code: 1000, reason: 'Manual disconnect' });
			// 由于 wsClient.close() 会触发 onClose，所以大部分清理工作都在 onClose 中完成
			// 这里只需要确保手动关闭标记被设置即可
		} else {
			console.log('WebSocket is not connected or already disconnected.');
			// 即使不处于连接状态，也确保状态和引用正确
			isConnected = false;
			wsClient = null;
			clearTimeout(reconnectionTimer);
			reconnectionTimer = null;
			isManualClose = true; // 确保清除重连意图
		}
	}

	// 调用初始化
	initWebSocket();

	// 返回控制函数
	return {
		disconnect,
		isConnected: () => isConnected,
		send,
		// 可以添加一个手动重连的方法
		reconnect: () => {
			if (!isConnected) { // 只有在未连接时才允许手动重连
				isManualClose = false; // 如果是手动重连，取消手动关闭标记
				scheduleReconnect(); // 调度重连
			} else {
				console.log('Already connected, no need to manually reconnect.');
			}
		}
	};
}