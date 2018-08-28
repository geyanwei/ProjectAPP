import react from "react";
import { NativeModules, Platform } from "react-native";

let exportModule = {
	StartMap: () => { },
	installedMapApps: {}
};

const AllMapList = Platform.select({
	android: {
		GOOGLE: "com.google.android.apps.maps",
		WAZE: "com.waze",
		YAHOO: "jp.co.yahoo.android.apps.map",
		NAVER: "com.nhn.android.nmap"
	},
	ios: [

	]
});

let objectCreater = Platform.select({
	android: function() {
		const MapModule = NativeModules.CustomMapNativeModule;
		const installedMapAppsArr = MapModule.installedMap;
		let installedMapApps = {};

		if (installedMapAppsArr.length > 0) {
			Object.keys(AllMapList).forEach(key => {
				let value = AllMapList[key];
				installedMapAppsArr.indexOf(value) > -1 && (installedMapApps[key] = value);
			});
		}

		/**
		 *
		 * @param {Number} lat 纬度
		 * @param {Number} lng 经度
		 * @param {Function} callback 开启地图失败的回调
		 */
		function StartMap(lat, lng, callback) {
			let cb = () => {};
			MapModule.startMapApp({ lat, lng }, callback || cb);
		}

		return {
			StartMap,
			installedMapApps
		};
	},
	ios: () => {
		return {
			StartMap: () => { },
			installedMapApps: {}
		}
	}
});

exportModule = objectCreater();

module.exports = exportModule;
