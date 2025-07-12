function kline_opt() {
	return {
		timing: "easeOut",
		duration: 1000,
		rotate: false,
		rotateLock: false,
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
			"#ea7ccc"
		],
		padding: [15, 15, 15, 15],
		fontSize: 13,
		fontColor: "#666666",
		dataLabel: true,
		dataPointShape: true,
		dataPointShapeType: "solid",
		touchMoveLimit: 60,
		enableScroll: true,
		enableMarkLine: true,
		legend: {
			show: false,
			position: "bottom",
			float: "center",
			padding: 5,
			margin: 5,
			backgroundColor: "rgba(0,0,0,0)",
			borderColor: "rgba(0,0,0,0)",
			borderWidth: 0,
			fontSize: 13,
			fontColor: "#666666",
			lineHeight: 11,
			hiddenColor: "#CECECE",
			itemGap: 10
		},
		xAxis: {
			labelCount: 4,
			itemCount: 1000,
			disableGrid: true,
			gridColor: "#CCCCCC",
			gridType: "solid",
			dashLength: 4,
			scrollShow: true,
			scrollAlign: "left",
			scrollColor: "#A6A6A6",
			scrollBackgroundColor: "#EFEBEF",
			disabled: false,
			axisLine: true,
			axisLineColor: "#CCCCCC",
			calibration: false,
			fontColor: "#666666",
			fontSize: 13,
			lineHeight: 20,
			marginTop: 0,
			rotateLabel: false,
			rotateAngle: 45,
			boundaryGap: "center",
			splitNumber: 5,
			gridEval: 1,
			title: "",
			titleFontSize: 13,
			titleOffsetY: 0,
			titleOffsetX: 0,
			titleFontColor: "#666666",
			format: ""
		},
		yAxis: {
			disabled: false,
			disableGrid: false,
			splitNumber: 5,
			gridType: "solid",
			dashLength: 8,
			gridColor: "#CCCCCC",
			padding: 10,
			showTitle: false,
			data: []
		},
		extra: {
			candle: {
				color: {
					upLine: "#2fc25b",
					upFill: "#2fc25b",
					downLine: "#f04864",
					downFill: "#f04864"
				},
				average: {
					show: true,
					name: [
						"MA5",
						"MA10",
						"MA30"
					],
					day: [
						5,
						10,
						20
					],
					color: [
						"#1890ff",
						"#2fc25b",
						"#facc14"
					]
				}
			},
			markLine: {
				type: "dash",
				dashLength: 5,
				data: [{
						value: 2150,
						lineColor: "#f04864",
						showLabel: true
					},
					{
						value: 2350,
						lineColor: "#f04864",
						showLabel: true
					}
				]
			},
			tooltip: {
				showBox: true,
				showArrow: true,
				showCategory: true,
				borderWidth: 0,
				borderRadius: 0,
				borderColor: "#000000",
				borderOpacity: 0.7,
				bgColor: "#000000",
				bgOpacity: 0.7,
				gridType: "solid",
				dashLength: 4,
				gridColor: "#CCCCCC",
				boxPadding: 3,
				fontSize: 13,
				lineHeight: 20,
				fontColor: "#FFFFFF",
				legendShow: true,
				legendShape: "auto",
				splitLine: true,
				horizentalLine: false,
				xAxisLabel: false,
				yAxisLabel: false,
				labelBgColor: "#FFFFFF",
				labelBgOpacity: 0.7,
				labelFontColor: "#666666"
			}
		}
	};
}

module.exports = {
	kline_opt: kline_opt
}