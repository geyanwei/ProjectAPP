/**
 * Created by lixifeng on 16/11/4.
 */

let APILXF = {

    /**
     *   请求方式 POST
     *  选择年月
     *
     */
    api_route_getYYYYMMV2: "/api/route/getYYYYMMV2",//
    /**
     *   请求方式 POST
     *   登录
     *
     */
    api_user_accountLogin: "/api/user/loginByAccount",//

    /**
     * 请求方式 POST
     * 退出登录
     */
    api_user_loginOut : "/api/user/loginOut",

    /**
     * 请求方式 POST
     * keyword		string
     * 模糊搜索城市(不传值则表示获取全部城市)
     */
    api_common_gitCityList : "/api/common/gitCityList",

    /**
     * 请求方式 POST
     * lat	经纬度	number
     * lnt	经纬度	number
     * maxCount	获取城市数
     * * 周边城市列表
     */
    api_route_getNearCities : "/api/route/getNearCities",

    /**
     * 请求方式 POST
     * lat	经纬度	number
     * lnt	经纬度	number
     * maxCount	获取城市数
     * * 获取热门城市
     */
    api_route_getHotCities : "/api/route/getHotCities",


    /**
     * 请求方式 POST
     * 获取用户当前位置行政区划
     * lat		string	不传值，取ip
     * lng		string	不传值，取ip
     */
    api_common_gitCityName : "/api/common/gitCityName",
    /**
     * 请求方式 POST
     * payTrip 生成支付订单
     * pay_type	订单类型: 1-定金 2-尾款 3-全款 11-退定金 12-退尾款 13-退全款	string
     * pay_way	支付方式，ALIPAY或者WECHAR	string
     * trip_id	行程报名id	string
     */
    api_pay_payTrip : "/api/pay/payTrip",

    /**
     * 请求方式 POST
     * payTrip 查询复核支付结果
     * pay_type	订单类型: 1-定金 2-尾款 3-全款 11-退定金 12-退尾款 13-退全款	string
     * trip_id	行程报名id	string
     */
    api_pay_queryPayResult : "/api/pay/queryPayResult",

    /**
     * 请求方式 POST
     * 获取尾款支付金额
     */
    api_pay_getMoneyByTrip : "/api/pay/getMoneyByTrip",


    /**
     * 图片上传
     * image:base64图片
     */
    api_common_uploadImage : "/api/common/uploadImage",
    /**
     * 获取行程热门标签
     */
    api_route_getRouteTags : "/api/route/getRouteTags",

    /**
     * 获取自定义标签
     */
    api_user_getUserTags: "/api/user/getUserTags",
    /**
     * 更新用户自定义标签
     */
    api_user_updateUserTags: "/api/user/updateUserTags",
    /**
     * 选择可出行天数
     */
    api_route_getDayNightV2: "/api/route/getDayNightV2",
    /**
     * 航线列表
     */
    api_route_getRouteListForJoinV2: "/api/route/getRouteListForJoinV2",
    /**
     * 可加入航线列表
     */
    api_route_getFlightListForPublishV2: "/api/route/getFlightListForPublishV2",
    /**
     * 发布航线
     */
    api_route_publishRouteV2: "/api/route/publishRouteV2",

    /**
     * 添加乘机人
     */
    api_passenger_addPassenger: "/api/passenger/addPassenger",

    /**
     * 编辑乘机人
     */
    api_passenger_editPassenger: "/api/passenger/editPassenger",
    /**
     * 删除乘机人
     */
    api_passenger_delPassenger: "/api/passenger/delPassenger",
    /**
     * 乘机人列表
     */
    api_passenger_getPassengerList: "/api/passenger/getPassengerList",



    /**
     * 查询绑定银联列表
     */
    api_unionpay_getInUsedCards: "/api/unionpay/getInUsedCards",
    /**
     * 查询银联卡是否开通
     */
    api_unionpay_isOpen: "/api/unionpay/isOpen",
    /**
     * 银联支付 token无跳转支付接口 无需跳转到银联支付界面
     */
    api_unionpay_consume: "/api/unionpay/consume",
    /**
     * 银联支付 删除常用卡
     */
    api_unionpay_delUserCard: "/api/unionpay/delUserCard",

    /**
     * 根据输入的userUUID和cardNo，绑定用户和卡的关系（添加到用户常用卡列表）
     */
    api_unionpay_addToInUsedCards: "/api/unionpay/addToInUsedCards",
    /**
     * 支付-获取验证码
     */
    api_unionpay_consumeSMSBackToken: "/api/unionpay/consumeSMSBackToken",
    /**
     * 获取支付信息
     */
    api_order_paymentOrder: "/api/order/paymentOrder",
    /**
     * 轮询是否支付成功
     */
    api_order_checkOrderPay: "/api/order/checkOrderPayStatus",



    /**
     * 生成支付订单
     */
    api_pay_payTrip: "/api/pay/payTrip",
    /**
     * 获取订金
     */
    api_common_getDeposit: "/api/common/getDeposit",
    /**
     * 加入行程
     */
    api_route_joinRouteV2: "/api/route/joinRouteV2",
    /**
     * 退款
     */
    api_pay_refundTrip: "/api/pay/refundTrip",
    /**
     * 支付尾款
     */
    api_pay_refundTrip2: "/api/pay/refundTrip",
    /**
     * 获取行程 描述详情
     */
    api_route_getRouteDesc: "/api/route/getRouteDesc",
    /**
     * 修改行程信息
     */
    api_route_modifyRoute: "/api/route/modifyRoute",


};

module.exports = APILXF;