let APIGYW = {

        /**
         *  获取国家区号列表（action=getAreaCode
         */

        driver_commons_getAreaCode: "/driver/commons/getAreaCode",

        /**
         *  用户登录（action = userLogin ）
         */

        driver_user_userLogin: "/driver/user/userLogin",

        /**
         * 境外国家地区和城市（action=getCountryAndCityAbroad）
         */

        driver_commons_getCountryAndCityAbroad: "/driver/commons/getCountryAndCityAbroad",

        /**
         * 获取验证码（action = getMobileCode ）
         */

        driver_commons_getMobileCode: "/driver/commons/getMobileCode",

        /**
         * 用户注册（action = userRegister ）
         */

        driver_user_userRegister: "/driver/user/userRegister",

        /**
         *  用户密码取回（action=userForgetPassword）
         */

        driver_user_userForgetPassword: "/driver/user/userForgetPassword",

        /////////////////
        /**
         * 接单列表
         */
        travel_app_trip_toBeReceivedList: "/travel/app/trip/toBeReceivedList",

        /**
         * 城市服务列表
         */
        base_basedata_dataapi_areas_search: "/base-basedata/dataapi/areas/search",

        /**
         * 行程列表
         */
        travel_app_trip_tripServiceList: "/travel/app/trip/tripServiceList",

        /**
         *接单详情
         */
        travel_app_trip_toBeReceivedDetail: "/travel/app/trip/toBeReceivedDetail",

        /**
         * 抢单
         */

        travel_app_trip_acceptorder: "/travel/app/trip/acceptorder",

        /**
         * 行程详情接口
         */
        travel_app_trip_tripServiceDetail: "/travel/app/trip/tripServiceDetail",

        /**
         * 行程列表接口
         */
        travel_app_trip_tripServiceList: "/travel/app/trip/tripServiceList",

        /**
         *取消订单计算代价
         */

        travel_app_trip_getCancelOrderFee: "/travel/app/trip/getCancelOrderFee",

        /**
         * 取消订单
         */

        travel_app_trip_cancelOrderSubmit: "/travel/app/trip/cancelOrderSubmit",

        /**
         *订单状态改变
         */
        travel_app_trip_setServiceStatus: "/travel/app/trip/setServiceStatus",

        /**
         * 获取服务城市列表
         */
        base_basedata_dataapi_areas_search_cities: "/base-basedata/dataapi/areas/search/cities",

        /**
         * 15分钟刷新抢单详情
         */
        travel_app_trip_refreshReceivedDetail: "/travel/app/trip/refreshReceivedDetail",

        /**
         * 修改行程页面 订单处理状态
         */
        travel_app_trip_updateProcess: "/travel/app/trip/updateProcess",

        /**
         * 添加备注
         */
        travel_app_trip_addRemark: "/travel/app/trip/addRemark",



    }
;

module.exports = APIGYW;