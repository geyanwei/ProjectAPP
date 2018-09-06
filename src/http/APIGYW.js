let APIGYW = {
    /**
     *  用户登录第一步 get
     */
    base_usercenter_authapi_v1_1_tokens_codes: "/base-usercenter/authapi/v1.1/tokens/codes",

    /**
     *  用户登录第二步 获取访问令牌 接口
     */
    base_usercenter_authapi_v1_1_tokens: "/base-usercenter/authapi/v1.1/tokens",

    /**
     *  用户退出接口 delete
     */
    base_usercenter_delete_authapi_v1_1_tokens: "/base-usercenter/authapi/v1.1/tokens",

    /**
     *  注册(前端调用) POST
     */
    driverapp_user_register: "/driverapp/user/register",

    /**
     *  各类短信验证码发送接口 GET
     */
    base_usercenter_authapi_v1_1_smscodes: "/base-usercenter/authapi/v1.1/smscodes",

    /**
     *  忘记密码 put
     */
    base_usercenter_userapi_v1_1_users_sign: "/base-usercenter/userapi/v1.1/users/sign",

    /**
     *  获取访问者的用户信息接口 GET
     */
    base_usercenter_userapi_v1_1_users_myself: "/base-usercenter/userapi/v1.1/users/myself",

    /**
     *  修改提示音 和修改用户头像 PUT
     */
    base_usercenter_userapi_v1_1_users: "/base-usercenter/userapi/v1.1/users/",

    /**
     *  获取司导所有信息 POST
     */
    driver_app_driver_getDriverAllInfo: "/driver/app/driver/getDriverAllInfo",

    /**
     *  修改司导联系方式  post
     */
    driver_app_driver_updateContact: "/driver/app/driver/updateContact",

    /**
     *  国家或城市搜索接口 模糊搜索国家电话代码 、模糊搜索城市 post
     */
    base_basedata_dataapi_areas_search: "/base-basedata/dataapi/areas/search",





    /**
     *  个人中心信息获取（action=getDriverInfo）
     */
    driver_usercenter_getDriverInfo: "/driver/usercenter/getDriverInfo",

    /**
     *  服务信息修改（action=updateDriverInfo）
     */
    driver_usercenter_updateDriverInfo: "/driver/usercenter/updateDriverInfo",

    /**
     *  司导头像修改（action=updateDriverFace）
     */
    driver_usercenter_updateDriverFace: "/driver/usercenter/updateDriverFace",


    /**
     *  获取数据字典的有效值（action=getDictionaryValueByKey）job,education,lifeyear 等等.......(具体参考数据库表：yt8_dictionary_key)
     */
    driver_usercenter_getDictionaryValueByKey: "/driver/usercenter/getDictionaryValueByKey",

    /**
     *  我的积分（action=getDriverPoints）
     */
    driver_usercenter_getDriverPoints: "/driver/usercenter/getDriverPoints",

    /**
     *  我的司导等级（action=getDriverClass）
     */
    driver_usercenter_getDriverClass: "/driver/usercenter/getDriverClass",

    /**
     *  8、获取司机评价（action=getCommentForDriver）
     */
    driver_usercenter_getCommentForDriver: "/driver/usercenter/getCommentForDriver",

    /**
     *  20、修改支付密码(记得原密码)（action=setPayPassword）
     */
    driver_usercenter_setPayPassword: "/driver/usercenter/setPayPassword",

    /**
     *  20、忘记支付密码（action=forGetPayPasswordDriver）
     */
    driver_usercenter_forGetPayPasswordDriver: "/driver/usercenter/forGetPayPasswordDriver",


    /**
     *  获取国家区号列表（action=getAreaCode）
     */
    driver_commons_getAreaCode: "/driver/commons/getAreaCode",


    //车辆管理(controller =car )
    /**
     *  获取国家区号列表（action=getLanguage）
     */
    driver_car_getLanguage: "/driver/car/getLanguage",

    /**
     *  车辆列表（action=getCarList）
     */
    driver_car_getCarList: "/driver/car/getCarList",

    /**
     *  车辆删除（action=deleteCar）
     */
    driver_car_deleteCar: "/driver/car/deleteCar",

    /**
     *  车辆详情（action=getCarDetail）
     */
    driver_car_getCarDetail: "/driver/car/getCarDetail",

    /**
     *  载客规格（action=getSeatType）
     */
    driver_car_getSeatType: "/driver/car/getSeatType",


    /**
     *  可提现金额（action=getMoneyInfo）
     */
    driver_finance_getMoneyInfo: "/driver/finance/getMoneyInfo",

    /**
     *  可提现金额（action=getFinanceWater）
     */
    driver_finance_getFinanceWater: "/driver/finance/getFinanceWater",

    /**
     *  帐户明细详情（action=getFinanceWaterDetail）
     */
    driver_finance_getFinanceWaterDetail: "/driver/finance/getFinanceWaterDetail",

    /**
     *  资金提现（action=drawMoney）
     */
    driver_finance_drawMoney: "/driver/finance/drawMoney",

    /**
     *  提现帐户列表（action=getAccountList）
     */
    driver_finance_getAccountList: "/driver/finance/getAccountList",

    /**
     *  （删除提现帐户（action=deleteAccount）
     */
    driver_finance_deleteAccount: "/driver/finance/deleteAccount",


    //人车分离(controller = driverteam )
    /**
     *  车队下的司导列表（action = driverList）
     */
    driver_driverteam_driverList: "/driver/driverteam/driverList",


    //人车分离(controller = authentication )
    /**
     *  司导认证展示界面（action = viewAuthInfo）
     */
    driver_authentication_viewAuthInfo: "/driver/authentication/viewAuthInfo",


    //消息界面
    /**
     *  系统消息界面
     */
    msgcenter_msgapi_messages_app_query: "/base-msgcenter/msgapi/messages/app/query",


    /**
     *  意见或建议
     */
    driver_usercenter_contactUsForDriver: "/driver/usercenter/contactUsForDriver",

};

module.exports = APIGYW;