import pages from '@/pages.json';

export const RELAUNCH = `reLaunch`;
export const NAVIGATETO = `navigateTo`;

export const keys = Object.create(null);

export const paths = Object.create(null);
pages.pages.forEach(v => {
	// 使用v.name作为key。在pages.json中定义时，保证name唯一性
	// console.log(v.meta);
	const { name, auth, mode = '' } = v.meta;
	paths[name] = { name, path: `/${v.path}`, auth, mode };
	keys[name] = name;
})
console.log(`paths:`, paths);
console.log(`keys:`, keys);

// 将params对象拼接为查询字符串
export const fmtQueryParams = (params) => {
	const queryString = Object.keys(params)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		.join('&'); // 用 & 连接所有键值对
	return `?${queryString}`;
}

export const comLink = (key, params = {}) => {
	console.log(`--- comLink Start ---`);
	console.log(`Params:`, params);
	const obj = paths[key] || null;
	if (!obj) {
		console.warn(`!!! comLink executing obj : ${path + temp} !!!`);
		const loginPath = paths.login?.path;
		if (loginPath) uni.reLaunch({ url: loginPath });
		return;
	}
	const { path, auth = false, mode = '' } = obj;
	console.log(`obj:`, path, auth, mode);
	const temp = Object.keys(params).length > 0 ? fmtQueryParams(params) : ``;

	const navigateToPage = () => {
		if (mode && mode.trim() === RELAUNCH) {
			console.warn(`!!! comLink executing uni.reLaunch to: ${path + temp} !!!`);
			uni.reLaunch({ url: path + temp });
		}
		// 其它一律视为 navigateTo
		else {
			console.log(`comLink executing uni.navigateTo to: ${path + temp}`);
			uni.navigateTo({ url: path + temp });
		}
	};

	navigateToPage();
}