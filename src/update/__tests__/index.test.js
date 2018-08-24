let HotUpdateIdx = require.requireActual('../index.js');
let HotUpdate = require.requireMock('react-native').NativeModules.HotUpdate;
jest.mock('../../http/HttpTool.js', () => {
	let json = {
		data: {
			updates: true,
			package: "com.android.apin",
			pname: '1.0.3-rc',
			phash: 'hash',
			descs: '添加聊天功能\n修复商城页面BUG',
			isup: 1,
			url: 'http://update-packages.reactnative.cn/hash',
			pdiffUrl: 'http://update-packages.reactnative.cn/hash', // un-defined
			diffUrl: 'http://update-packages.reactnative.cn/hash' // un-defined
		},
		code: 1
	};
	function post(api, resolve, reject, params) {
		resolve(1, 'success', json, {});
	}
	return { post: post };
});

describe('test hot update index', () => {
	it('Assert isFirstTime to be TRUE', () => {
		expect(HotUpdateIdx.isFirstTime).toMatchSnapshot();
	});
	it('Assert isRolledBack to be FALSE', () => {
		expect(HotUpdateIdx.isRolledBack).toMatchSnapshot();
	});
	it('Assert packageVersion to be 1.0', () => {
		expect(HotUpdateIdx.packageVersion).toMatchSnapshot();
	});
	it('Assert currentVersion to be empty', () => {
		expect(HotUpdateIdx.currentVersion).toEqual('');
	});
	it('Assert getOption exists', () => {
		expect(HotUpdateIdx.getOption()).toMatchSnapshot();
	});
	it('Assert checkUpdate return data', () => {
		expect(HotUpdate.checkUpdate({ phash: '123' })).resolves.toMatchSnapshot();
	});
	it('Assert checkUpdate return error with empty param', () => {
		expect(HotUpdate.checkUpdate()).rejects.toMatchSnapshot();
	});
	it('Assert Success Download return hash', async () => {
		const data = {
				updates: true,
				pname: '1.0.3-rc',
				phash: 'hash',
				descs: '添加聊天功能\n修复商城页面BUG',
				isup: 1,
				url: 'http://update-packages.reactnative.cn/hash',
				pdiffUrl: 'http://update-packages.reactnative.cn/hash', // un-defined
				diffUrl: 'http://update-packages.reactnative.cn/hash' // un-defined
			};
		expect(HotUpdateIdx.downloadUpdate(data)).resolves.toEqual(data.phash);
	});
});
