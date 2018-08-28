/**
 * Created by lixifeng on 16/11/4.
 */

let APILQ = {
    /**
     *   请求方式 POST
     *  待接订单列表
     *
     */
    api_orderlist_getPendingOrder: "/driver/orderlist/getPendingOrder",
    /**
     *   请求方式 POST
     *  车队下的司导订单列表
     *
     */
    api_orderlist_driverOrderList: "/driver/orderlist/driverOrderList",
    /**
     *   请求方式 POST
     *  订单详情
     *
     */
    api_orderlist_getOrderDetail: "/driver/orderlist/getOrderDetail",
    /**
     *   请求方式 POST
     *  订单流
     *
     */
    api_orderlist_getOrderFlow: "/driver/orderlist/getOrderFlow",
    /**
     *   请求方式 POST
     *  新增待接订单条数列表
     *
     */
    api_orderlist_getNewPendingOrder: "/driver/orderlist/getNewPendingOrder",
    /**
     *   请求方式 POST
     *  订单指派司机查询
     *
     */
    api_orderlist_getOrderDriverId: "/driver/orderlist/getOrderDriverId",

    /**
     *   请求方式 POST
     *  取消订单的原因
     *
     */
    api_orderservice_cancelOrderConfirm: "/driver/orderservice/cancelOrderConfirm",
    /**
     *   请求方式 POST
     *  取消订单
     *
     */
    api_orderservice_cancelOrder: "/driver/orderservice/cancelOrder",
    /**
     *   请求方式 POST
     *  车辆变更
     *
     */
    api_orderservice_changeCar: "/driver/orderservice/changeCar",
    /**
     *   请求方式 POST
     *  批量设置订单状态 （仅支持签约车队）
     *
     */
    api_orderservice_batchSetOrderStatus: "/driver/orderservice/batchSetOrderStatus",
    /**
     *   请求方式 POST
     *  抢接订单后的车辆与加价券返回
     *
     */
    api_orderservice_getCarAndCoupon: "/driver/orderservice/getCarAndCoupon",
    /**
     *   请求方式 POST
     *  设置订单状态 （人个司导、车队、地接社）
     *
     */
    api_orderservice_setOrderStatus: "/driver/orderservice/setOrderStatus",
    /**
     *   请求方式 POST
     *  抢接订单
     *
     */
    api_orderservice_acceptOrder: "/driver/orderservice/acceptOrder",
    /**
     *   请求方式 POST
     *  车队下的司导列表
     *
     */
    api_driverteam_driverList: "/driver/driverteam/driverList",
    /**
     *   请求方式 POST
     *  车队下的车辆列表
     *
     */
    api_driverteam_carList: "/driver/driverteam/carList",
    /**
     *   请求方式 POST
     *  添加车队下的司导
     *
     */
    api_driverteam_addDriver: "/driver/driverteam/addDriver",
    /**
     *   请求方式 POST
     *  更新车队下的司导
     *
     */
    api_driverteam_updateDriver: "/driver/driverteam/updateDriver",
    /**
     *   请求方式 POST
     *  车队或车队下的司导 详情
     *
     */
    api_driverteam_driverDetail: "/driver/driverteam/driverDetail",
    /**
     *   请求方式 POST
     *  车队下的司导 订单（0全部，2服务中，3已完成）
     *
     */
    api_driverteam_driverOrderList: "/driver/driverteam/driverOrderList",
    /**
     *   请求方式 POST
     *  司导认证步骤1
     *
     */api_authentication_driverApplyStep1V2: "/driver/authentication/driverApplyStep1V2",
    /**
     *   请求方式 POST
     *  司导认证步骤2
     *
     */
    api_authentication_driverApplyStep2V2: "/driver/authentication/driverApplyStep2V2",
    /**
     *   请求方式 POST
     *  司导认证步骤3
     *
     */
    api_authentication_driverApplyStep3V2: "/driver/authentication/driverApplyStep3V2",
    /**
     *   请求方式 POST
     *  证件类型列表
     *
     */
    api_authentication_cardTypeList: "/driver/authentication/cardTypeList",
    /**
     *   请求方式 POST
     *  车辆添加
     *
     */
    api_car_addCar: "/driver/car/addCar",
    /**
     *   请求方式 POST
     *  车辆修改
     *
     */
    api_car_updateCar: "/driver/car/updateCar",
    /**
     *   请求方式 POST
     *  车辆状态修改
     *
     */
    api_car_updateCarStatus: "/driver/car/updateCarStatus",
    /**
     *   请求方式 POST
     *  车型和颜色列表
     *
     */
    api_car_getBrandColorList: "/driver/car/getBrandColorList",
    /**
     *   请求方式 POST
     *  更新用户信息
     *
     */
    driver_usercenter_getDriverInfo: "/driver/usercenter/getDriverInfo",
    /**
     * ======================================================================
     *   请求方式 POST
     *  钱包余额查询
     *
     */
    withdrawapi_accounts_getMoneyInfo: "/base-wallet/withdrawapi/accounts/getMoneyInfo",
    /**
     *   请求方式 POST
     *  提现账户列表
     *
     */
    accountapi_accounts_query: "/base-wallet/accountapi/accounts/3.1/query",
    /**
     *   请求方式 POST
     *  提现申请
     *
     */
    withdrawapi_accounts_addWithdraw: "/base-wallet/withdrawapi/accounts/addWithdraw",
    /**
     *   请求方式 POST
     *  提现账户列表
     *
     */
    accounts_query_walletRecords: "/base-wallet/withdrawapi/accounts/query/walletRecords",
    /**
     *   请求方式 POST
     *  司导认证步骤1
     *
     */
    app_driver_applyBaseData: "/driver/app/driver/applyBaseData",
    /**
     *   请求方式 POST
     *  司导认证步骤2
     *
     */
    app_driver_applyLocalIdentity: "/driver/app/driver/applyLocalIdentity",
    /**
     *   请求方式 POST
     *  司导认证步骤3
     *
     */
    app_driver_applyDriverLicense: "/driver/app/driver/applyDriverLicense",
    /**
     *   请求方式 POST
     *  获取司导所有信息
     *
     */
    app_driver_getDriverAllInfo: "/driver/app/driver/getDriverAllInfo",
    /**
     *   请求方式 POST
     *  车辆添加
     *
     */
    app_car_addCar: "/car/app/car/addCar",
    /**
     *   请求方式 POST
     *  编辑车辆
     *
     */
    app_car_updateCar: "/car/app/car/updateCar",
    /**
     *  车辆列表
     */
    app_car_getCarList: "/car/app/car/getCarList",

    /**
     *  车辆删除
     */
    app_car_delCar: "/car/app/car/delCar",

    /**
     *  车辆详情
     */
    app_car_getCarDetail: "/car/app/car/getCarDetail",
    /**
     *   请求方式 POST
     *  车辆状态修改
     *
     */
    app_car_updateCarStatus: "/car/app/car/updateCarStatus",
    /**
     *   请求方式 POST
     *  车型和颜色列表
     *
     */
    app_car_getCarBrandsColors: "/car/app/car/getCarBrandsColors",
    /**
     *   请求方式 POST
     *  字典
     *
     */
    dictionarys_get_dict: "/base-basedata/dataapi/dictionarys/get/dict",
    /**
     *   请求方式 POST
     *  新增境内银行卡账户
     *
     */
    accountapi_accounts_addAccountInternal: "/base-wallet/accountapi/accounts/3.1/addAccountInternal",
    /**
     *   请求方式 POST
     *  编辑境内银行卡账户
     *
     */
    accountapi_accounts_editAccountInternal: "/base-wallet/accountapi/accounts/3.1/editAccountInternal",
    /**
     *   请求方式 POST
     *  境内银行卡账户详情
     *
     */
    accountapi_accounts_getAccountInternal: "/base-wallet/accountapi/accounts/getAccountInternal",
    /**
     *   请求方式 POST
     *  删除提现账户
     *
     */
    accountapi_accounts_delete: "/base-wallet/accountapi/accounts/delete",
    /**
     *   请求方式 POST
     *  微信授权接口
     *
     */
    accountapi_accounts_getWechatUserInfo: "/base-wallet/accountapi/accounts/getWechatUserInfo",


    /**
     *   请求方式 POST
     *  提现记录
     *
     */
    accounts_query_withdraws: "/base-wallet/withdrawapi/accounts/query/withdraws",
    /**
     *   请求方式 POST
     *  验证提现密码
     *
     */
    authapi_tokens_paypw: "/base-usercenter/authapi/v1.1/tokens/paypw",
    /**
     *   请求方式 POST
     *  新增支付宝/微信账户
     *
     */
    accountapi_accounts_addAccountNet: "/base-wallet/accountapi/accounts/3.1/addAccountNet",
    /**
     *   请求方式 POST
     *  编辑支付宝/微信账户
     *
     */
    accountapi_accounts_editAccountNet: "/base-wallet/accountapi/accounts/editAccountNet",
    /**
     *   请求方式 POST
     *  支付宝/微信账户详情
     *
     */
    accountapi_accounts_getAccountNet: "/base-wallet/accountapi/accounts/getAccountNet",
};

module.exports = APILQ;