import {NetInfo} from "react-native";
import _ from "lodash";
import Config from "../Config.js";
import Storage from "../tool/Storage.js";
import Safe from "./Safe.js";
import MyNativeMoudles from "../myNativeModules.js";

let os = MyNativeMoudles.platform + "_" + MyNativeMoudles.versionName; //'android_0.0.1'
let userAgent = MyNativeMoudles.platform + "_" + "3.0.0" + "_" + "" + "_" + MyNativeMoudles.productName.replace(/_/g, ""); // do not change it unless identify devices
let un_id = "_" + MyNativeMoudles.deviceId + "_" + MyNativeMoudles.productName.replace(/_/g, "");

let localSafe = null;
let spEvtCb = null;
let authCookieName = "_at"; // default Authorize storage key Name
let authHeader; // orignial auth header
let authMirror; // auth header mirror

if (typeof window !== "undefined") {
    ["log", "warn", "error"].forEach(val => {
        window[val] =
            window[val] ||
            function () {
                let args = [].slice.call(arguments);
                console[val](...args);
            };
    });
}

let typeEnum = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE"
};

let HttpTool = {
    /**
     * set auth header
     * @param val authorize header object
     * @param cookieName(optional) storage cookie name
     */
    setAuthHeader(val, cookieName, callback) {
        authHeader = val;
        if (cookieName) {
            return Storage.saveInfo(cookieName, val, callback);
        } else {
            return Storage.saveInfo(authCookieName, val, callback);
        }
    },

    getAuthHeader(cb, cookieName) {
        if (!authHeader) {
            return Storage.getInfo(cookieName || authCookieName, (err, result) => {
                // maybe slow than request
                if (!err && result) {
                    authHeader = result;
                } else {
                    authHeader = null;
                }
                cb && cb(authHeader);
            });
        } else {
            cb && cb(authHeader);
        }
    },

    setEncrypt(key) {
        localSafe = new Safe(key);
    },

    setSpecialCodeEvent(cb) {
        spEvtCb = (code, suc, fail) => {
            if (typeof cb === "function") {
                return cb(code, suc, fail);
            } else {
                return true; // true means continue to normal steps;
            }
        };
    },

    // clearOS() {
    // 	os = "web_0.0.1";
    // },

    clearAuthHeader(cookieName) {
        authHeader = null;

        if (cookieName) {
            return Storage.removeInfo(cookieName);
        } else {
            return Storage.removeInfo(authCookieName);
        }
    },

    clearEncrypt() {
        localSafe = null;
    },

    clearSpecialCodeEvent() {
        spEvtCb = null;
    },

    /**
     *
     * @param key
     * @param param _开始参数,为不用参数
     * @returns {{key: (string|*|WordArray), data: *}}
     */
    formatBody(key, param = {}) {
        return {
            key: localSafe.encryptForRSA(key),
            data: localSafe.AESEncryption(
                key,
                JSON.stringify({
                    os: os + "_" + MyNativeMoudles.deviceId + "_" + MyNativeMoudles.productName.replace(/_/g, ""),
                    param: param
                })
            )
        };
    },

    formatParamsTools(params) {
        let paramsBody = "";
        let i = 0;
        for (let key in params) {
            let v = params[key];
            if (v === undefined) {
                continue;
            }
            paramsBody += (i === 0 ? "?" : "&") + (key + "=" + encodeURIComponent(v)); // get request start with '?', form-data start with ''
            ++i;
        }
        return paramsBody;
    },

    clearParam(param = {}) {
        if (param) {
            delete param.navigator;
            delete param.callBack;
            //POST请求,用来跨域
        }
    },
    changeEncryptOpt(url, other, noEncryptArr) {
        if (!url) {
            return other;
        }
        // url is a String
        if (noEncryptArr instanceof Array) {
            for (let value of noEncryptArr) {
                if (url.slice(0, value.length) === value) {
                    other["safe"] = false;
                    break;
                }
            }
        }
        return other;
    },
    getRequestHeader(other) {
        return authHeader || authMirror // if one exist use target one
            ? _.merge({}, authHeader || authMirror, {
                "Content-Type": other.contentType,
                "User-Agent": userAgent,
                os: os
            })
            : {
                "Content-Type": other.contentType,
                "User-Agent": userAgent,
                os: os
            };
    }
};

// post: (url, successCallback, failCallback, param, other) => {
// 	request('post', url, successCallback, failCallback, param, other)
// },
HttpTool["init"] = function init(options) {
    if (options) {
        Object.keys(options).forEach(val => {
            switch (val) {
                case "authCookieName":
                    let cookieVal = JSON.parse(
                        Storage.getCookieInfo(options[val]) || "{}"
                    );
                    HttpTool.setAuthHeader(cookieVal, options[val]);
                    break;
                case "os":
                    HttpTool.setOS(options[val]);
                    break;
                case "safeKey":
                    HttpTool.setEncrypt(options[val]);
                    break;
            }
        });
    }
};

/**
 *
 * @param reqType 请求类型 put/get/post/delete
 * @param url 请求URL
 * @param successCallback 成功返回:包含 code, message, json, option
 * @param failCallback 失败返回:code, message, option
 * @param param 请求参数 例:{id:1}
 * @param other 其他参数  {safa:booble类型 true/加密(默认) false/不加密}
 */
function mainReq(reqType, url, successCallback, failCallback, param, other) {
    //option 参数必须是对象,里面包括 (type 请求方式,url 请求路径,param 请求参数)

    // if (process.env.NODE_ENV === 'development') {
    // 	warn('You are in Development Mode');
    // }

    if (!url) {
        log("Can't Request API with url: ", url);
        return;
    }

    other = _.merge(
        {
            safe: true,
            // contentType: "application/x-www-form-urlencoded;charset=utf-8"
            contentType: "application/json;charset=utf-8",
            host: Config.url,
            timeout: 20
        },
        other || {}
    );

    HttpTool.clearParam(param);
    other = HttpTool.changeEncryptOpt(url, other, ["/base-usercenter/"]);

    let host = other.host + url;
    let headers = HttpTool.getRequestHeader(other);
    let key = (localSafe && localSafe.getRandomStr(16)) || "";
    let body = localSafe && other.safe ? HttpTool.formatBody(key, param) : param;
    // body =
    // 	other.contentType.indexOf("json") === -1
    // 		? HttpTool.formatParamsTools(body)
    // 		: body;

    let reqOptions = {
        method: reqType,
        headers,
        timeout: 11000
    };
    reqType === typeEnum.GET
        ? (host += HttpTool.formatParamsTools(param))
        : (reqOptions["body"] = JSON.stringify(body)); // body need to be string
    log("请求header: ");
    log(headers);
    log("请求param: ");
    log(param);
    log("请求host: ");
    log(host);
    log("请求body: ");
    log(reqOptions["body"]);
    let truePromise = new Promise((resolve, reject) => {
        fetch(host, reqOptions)
            .then(res => res.json())
            .then(data => {
                let json = data;
                //解密
                if (other.safe && json.isSafe && localSafe) {
                    json = localSafe.AESDecrypt(key, json.data);
                    if (!json) {
                        let option = {
                            code: -998,
                            message: "系统繁忙,请稍候再试",
                            host: host,
                            option: {}
                        };
                        // failCallback(option.code, option.message, option);
                        reject({
                            code: option.code,
                            message: option.message,
                            option: option
                        });
                        return;
                    } else {
                        try {
                            json = JSON.parse(json);
                        } catch (e) {
                            let option = {
                                code: -997,
                                message: "返回数据格式化失败",
                                host: host,
                                option: {}
                            };
                            // failCallback(option.code, option.message, option);
                            reject({
                                code: option.code,
                                message: option.message,
                                option: option
                            });
                            return;
                        }
                    }
                }

                // json = HttpTool.removeEmpty();
                var retOpts = {
                    code:
                        json.code === 1 || (200 <= json.code && json.code < 300)
                            ? 1
                            : -json.code, // json.code === 1 is for hot update api
                    message: json.message,
                    host: host,
                    option: json['option']
                };

                log(retOpts['option']);
                log(json);

                if (spEvtCb) {
                    if (
                        !spEvtCb(
                            retOpts.code,
                            () => {
                                successCallback(
                                    retOpts.code,
                                    retOpts.message,
                                    json.data,
                                    retOpts.option
                                );
                                resolve({
                                    code: retOpts.code,
                                    message: retOpts.message,
                                    data: json.data,
                                    option: retOpts
                                });
                            },
                            () => {
                                failCallback(retOpts.code, retOpts.message, retOpts.option);
                                reject({
                                    code: retOpts.code,
                                    message: retOpts.message,
                                    option: retOpts
                                });
                            }
                        )
                    ) {
                        return;
                    }
                }

                if (retOpts.code > 0) {
                    log("------success--------");
                    // successCallback(retOpts.code, retOpts.message, json.data, retOpts);
                    resolve({
                        code: retOpts.code,
                        message: retOpts.message,
                        data: json.data,
                        option: retOpts
                    });
                } else {
                    log("------fail--------");
                    // failCallback(retOpts.code, retOpts.message, retOpts);
                    reject({
                        code: retOpts.code,
                        message: retOpts.message,
                        option: retOpts
                    });
                }
            })
            .catch(error => {
                log("-----error---------");
                log(error);
                try {
                    if (error.response) {
                        let option = {
                            code: error.response.status,
                            message: error.message,
                            host: host,
                            option: {}
                        };
                        log(option);

                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        log(error.response.data);
                        log(error.response.headers);
                        // failCallback(error.response.status, error.message, option);
                        reject({
                            code: error.response.status,
                            message: error.message,
                            option: option
                        });
                    } else if (error.request) {
                        let option = {
                            code: error.request.status,
                            message: "请检查网络连接",
                            host: host,
                            option: {}
                        };
                        log(option);
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        // failCallback(error.request.status, option.message, option);
                        reject({
                            code: option.code,
                            message: option.message,
                            option: option
                        });
                    } else {
                        // failCallback(-999, "网络错误", {});
                        reject({code: -999, message: "网络错误", option: {}});
                    }
                } catch (err) {
                    // failCallback(-999, err.message, {});
                    reject({code: -999, message: err.message, option: {}});
                }
                // log(error.config);
            });
    });
    let fakePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({code: -999, message: "请求超时", option: {}});
        }, other.timeout * 1000);
    });
    let racePromise = Promise.race([truePromise, fakePromise]);

    racePromise
        .then(retOpts => {
            successCallback(retOpts.code, retOpts.message, retOpts.data, retOpts.option['option']);
        })
        .catch(retOpts => {
            // console.warn(retOpts);
            failCallback(retOpts.code, retOpts.message, retOpts.option['option']);
        });

    authMirror = null; // clean mirror
    return racePromise;
}

let dupStupidReq = (
    val,
    url,
    successCallback,
    failCallback,
    param,
    reqOptions
) => {
    let _isExcute = false;
    const LATENCY_TIME = 11000;
    let reqSuc = false;
    let reqFinished = false;

    let internalSucc = (code, msg, data, retOpts) => {
        reqSuc = true;
        reqFinished = true;
        successCallback(code, msg, data, retOpts);
    };

    let internalFail = (code, msg, retOpts) => {
        reqSuc = false;
        reqFinished = true;
        failCallback(code, msg, retOpts);
    };

    setTimeout(() => {
        if (!_isExcute) {
            _isExcute = true;
            mainReq(val, url, internalSucc, internalFail, param, reqOptions);
        }
    }, LATENCY_TIME);

    HttpTool.getAuthHeader(() => {
        if (!_isExcute) {
            _isExcute = true;
            mainReq(val, url, internalSucc, internalFail, param, reqOptions);
        }
    });

    // mainReq(val, url, internalSucc, internalFail, param, reqOptions);

    function getStatus() {
        return {reqSuc, reqFinished};
    }

    return getStatus;
};

Object.keys(typeEnum).forEach(val => {
    HttpTool[val.toLowerCase()] = async function (
        url,
        successCallback,
        failCallback,
        param,
        reqOptions
    ) {
        if (successCallback || failCallback) {
            authMirror = _.cloneDeep(authHeader); // store authHeader for current request in case of sync clean authHeader while get network info is async
            dupStupidReq(
                val,
                url,
                successCallback,
                failCallback,
                param,
                reqOptions
            );
            // 1. check network status
            // 2. if no network, recursive request for 5 times with each request has 4 sec timeout while it success, stop the loop
            // 3. if have network, start get storage request and timeout simultaneously
            // 3.1. once one request triggered, stop another
            // NetInfo.getConnectionInfo().then(connectionInfo => {
            // 	// alert(connectionInfo.type);
            // 	if (connectionInfo.type !== "none") {
            // 		// ATTENTION: reserve this code for revert
            // 		// setTimeout(() => {
            // 		// 	if (!_isExcute) {
            // 		// 		_isExcute = true;
            // 		// 		mainReq(
            // 		// 			val,
            // 		// 			url,
            // 		// 			successCallback,
            // 		// 			failCallback,
            // 		// 			param,
            // 		// 			reqOptions
            // 		// 		);
            // 		// 	}
            // 		// }, LATENCY_TIME);
            //
            // 		// HttpTool.getAuthHeader(() => {
            // 		// 	if (!_isExcute) {
            // 		// 		_isExcute = true;
            // 		// 		mainReq(
            // 		// 			val,
            // 		// 			url,
            // 		// 			successCallback,
            // 		// 			failCallback,
            // 		// 			param,
            // 		// 			reqOptions
            // 		// 		);
            // 		// 	}
            // 		// });
            //
            // 		dupStupidReq(
            // 			val,
            // 			url,
            // 			successCallback,
            // 			failCallback,
            // 			param,
            // 			reqOptions
            // 		);
            // 	} else {
            // 		// ATTENTION: reserve this code for revert
            // 		// let reqOptions = {
            // 		// 	code: -900,
            // 		// 	message: "连接不稳定，请检查网络",
            // 		// 	host: Config.url + url,
            // 		// 	option: {}
            // 		// };
            // 		// failCallback(reqOptions.code, reqOptions.message, reqOptions);
            //
            // 		let counter = 1,
            // 			totalTimes = 6,
            // 			failTemp = () => {},
            // 			newReqOpts = Object.assign({}, reqOptions, { timeout: 4 });
            // 		let stupidReqFunc = dupStupidReq(
            // 			val,
            // 			url,
            // 			successCallback,
            // 			failTemp,
            // 			param,
            // 			reqOptions
            // 		);
            //
            // 		// recursive request every 1.5s per request while last request is failed
            // 		let interval = setInterval(() => {
            // 			counter += 1;
            // 			if (counter === totalTimes) {
            // 				failTemp = failCallback;
            // 				clearInterval(interval); // remember to clear interval flag
            // 			}
            // 			stupidReqFunc = dupStupidReq(
            // 				val,
            // 				url,
            // 				successCallback,
            // 				failTemp,
            // 				param,
            // 				reqOptions
            // 			);
            // 		}, 1500);
            // 	}
            // });
        } else {
            // function reserve() {}
            // successCallback = successCallback || reserve;
            // failCallback = failCallback || reserve;
            // await HttpTool.getAuthHeader();
            // return mainReq(
            // 	val,
            // 	url,
            // 	successCallback,
            // 	failCallback,
            // 	param,
            // 	reqOptions
            // );
        }
    };
});

module.exports = HttpTool;
