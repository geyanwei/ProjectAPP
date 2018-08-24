/**
 * Created by lixifeng on 17/6/30.
 * Modified by oliver on 18/05/12.
 */
import { AsyncStorage } from "react-native";

let _userInfo = null // memory for quick index

class StorageHelp {
	// constructor() {
	// 	StorageHelp.clearFlag = "none";
	// 	StorageHelp.getUserInfo();
	// }
	static clearFlag = "none";
	//获取用户信息
	static getUserInfo(callBack) {
		if (_userInfo) {
			callBack && callBack(_userInfo);
		} else {
			StorageHelp.getInfo(StorageHelp.getUserKey(), (error, result) => {
				if (!error && StorageHelp.clearFlag != result && result) {
					// if not error & not cleared & not null
					try {
						_userInfo = result;
					} catch (e) {
						_userInfo = result;
					} finally {
						callBack && callBack(_userInfo);
					}
				} else {
					callBack &&	callBack(null);
				}
			});
		}
		return _userInfo;
	}

	/*
    * saveType  存在去  代表登录；默认  为不更新
    *           不存在代表只是更新用户信息；
    *      更新config配置信息
    *
    * */
	static saveUserInfo(userinfo, callBack, saveType) {
		_userInfo = null; // clear memory info first in case of failure save
		return StorageHelp.saveInfo(StorageHelp.getUserKey(), userinfo, error => {
			if (!error) {
				// if (StorageHelp.clearFlag != userinfo) {
					_userInfo = userinfo;
					if (saveType) {
						let login = YITU.getActionMap("login");
						if (login) {
							for (let fun of login) {
								fun();
							}
						}
					}
				// } else {
				// 	_userInfo = null;
				// }
			}
			callBack && callBack(error);
		});
	}
	static getUserKey() {
		return "USERINFO";
	}

	static clearUserInfo(callBack) {
		// StorageHelp.saveUserInfo(StorageHelp.clearFlag, callBack);
		_userInfo = null;
		return StorageHelp.removeInfo(StorageHelp.getUserKey(), callBack);
	}

	//获取某个cookie的值
	static getInfo(key, callBack) {
		return AsyncStorage.getItem(key, (error, result) => {
			if (callBack) {
				callBack(error, result&&JSON.parse(result)||result);
			}
		});
	}

	static saveInfo(key, value, callBack) {
		var v = "";
		// if (typeof value === "string") {
		// 	v = value;
		// } else {
		// }
		v = JSON.stringify(value);

		return AsyncStorage.setItem(key, v, error => {
			if (callBack) {
				callBack(error);
			}
		});
	}

	static removeInfo(key,callBack) {
		return AsyncStorage.removeItem(key, callBack);
	}
}

StorageHelp.getUserInfo(); // try to get memory first
module.exports = StorageHelp;
