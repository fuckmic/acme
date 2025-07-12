import {
	getDistance
} from '../utils.js';

// circle
const circle = {
	name: "circle",
	totalStep: 3,
	needDefaultPointFigure: true,
	needDefaultXAxisFigure: true,
	needDefaultYAxisFigure: true,
	styles: {
		circle: {
			color: 'rgba(22, 119, 255, 0.15)'
		}
	},
	createPointFigures: ({
		coordinates
	}) => {
		if (coordinates.length > 1) {
			// 圆半径
			const radius = getDistance(coordinates[0], coordinates[1])
			return {
				type: 'circle',
				attrs: {
					...coordinates[0],
					r: radius
				},
				styles: {
					style: 'stroke_fill'
				}
			}
		}
		return [];
	},
};

export default circle;