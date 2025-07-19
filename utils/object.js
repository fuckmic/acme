// object  path
export function getNestedValue(obj, path) {
	if (!obj || !path) return undefined;
	const parts = path.split('.');
	let current = obj;
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (current === null || typeof current !== 'object' || !current.hasOwnProperty(part)) {
			return undefined; // 路径中断
		}
		current = current[part];
	}
	return current;
}