import Storage from '../../../tool/Storage.js'
import APIGYW from '../../../http/APIGYW.js'
import HttpTool from "../../../http/HttpTool";

module.exports = {
    getGuiderInfor(cb) {
        let params = {};
        let successCallback = (code, message, json, option) => {
            let obj = {
                name: json.name,
                type: json.type,
                isbanned: json.isbanned,
                status: json.status,
                is_trained: json.is_trained,
                bannedSecond: json.bannedSecond,
                citys: json.citys
            };
            if (cb) {
                cb(code, message, obj);
            }
        };
        let failCallback = (code, message) => {
            if (cb) {
                cb(code, message, {});
            }
        };
        HttpTool.post(APIGYW.driver_app_driver_getDriverAllInfo, successCallback, failCallback, params);
    },
};