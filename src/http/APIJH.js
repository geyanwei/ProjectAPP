let APIJH = {

    /**
     *  退出登录（action=userLogout）
     */
    driver_user_userLogout: "/driver/user/userLogout",


    /**
     *  提现帐户列表（action=getAccountList）
     */
    driver_finance_getAccountList: "/driver/finance/getAccountList",


    /**
     *  加价券（action=getDriverCouponKeyList）
     */
    driver_usercenter_getDriverCouponKeyList: "/driver/usercenter/getDriverCouponKeyList",


    /**
     *  修改登录密码（action=setLoginPassword）
     */
    driver_usercenter_setLoginPassword: "/driver/usercenter/setLoginPassword",

    /**
     *  获取验证码（action = getMobileCode ）
     */
    driver_commons_getMobileCode: "/driver/commons/getMobileCode",

    /**
     *  验证验证码（action=verifyMobileCode）
     */
    driver_commons_verifyMobileCode: "/driver/commons/verifyMobileCode",

    /**
     *  更换手机号（action=changeMobile）
     */
    driver_usercenter_changeMobile: "/driver/usercenter/changeMobile",


    /**
     *  首页消息列表（action=getMessageIndex）
     */
    driver_message_getMessageIndex: "/driver/message/getMessageIndex",

    /**
     *  消息列表（action=getMessageList）
     */
    driver_message_getMessageList: "/driver/message/getMessageList",

    /**
     *  消息详情（action=getMessageDetail）
     */
    driver_message_getMessageDetail: "/driver/message/getMessageDetail",

    /**
     *  代下单成就统计（action = getDriverTakeOrderStatistics ）
     */
    driver_order_getDriverTakeOrderStatistics: "/driver/order/getDriverTakeOrderStatistics",

    /**
     *  司导代下单访问url（action=getDriverTakeUrl)
     */
    driver_order_getDriverTakeUrl: "/driver/order/getDriverTakeUrl",


    //财务   finance
    /**
     *  添加账户（action=addAccount)
     */
    driver_finance_addAccount: "/driver/finance/addAccount",



};

module.exports = APIJH;
