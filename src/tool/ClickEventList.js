/**
 * 首页（完成）
 */
let Main = {
	/**
	 * 接单tab
	 */
	tab_takeorder: "tab_takeorder",
	/**
	 * 行程tab
	 */
	tab_schedule: "tab_schedule",
	/**
	 * 消息tab
	 */
	tab_message: "tab_message",
	/**
	 * 我的tab
	 */
	tab_mine: "tab_mine"
};

/**
 * 「我的」页面（完成）
 */
let UserCenter = {
	/**
	 * 我的页面-设置
	 */
	mine_set: "mine_set",
	/**
	 * 我的页面-个人资料
	 */
	mine_profile: "mine_profile",
	/**
	 * 我的页面-司导星级
	 */
	mine_grade: "mine_grade",
	/**
	 * 我的页面-司导服务分
	 */
	mine_score: "mine_score",
	/**
	 * 我的页面-司导认证
	 */
	mine_driverauditing: "mine_driverauditing",
	/**
	 * 我的页面-我的车辆
	 */
	mine_mycar: "mine_mycar",
	/**
	 * 我的页面-我的订单
	 */
	mine_myorderlist: "mine_myorderlist",
	/**
	 * 我的页面-我的钱包
	 */
	mine_mywallet: "mine_mywallet",
	/**
	 * 我的页面-账户安全
	 */
	mine_accountssafe: "mine_accountssafe",
	/**
	 * 我的页面-司导指南
	 */
	mine_driverguide: "mine_driverguide"
};

/**
 * 接单页（完成）
 */
let OrderList = {
	/**
	 * 接单页筛选内
	 */
	filter: {
		/**
		 * 接单页产品类型
		 */
		takeorder_filter_producttypeList: [
			/**
			 * 接单页筛选接机
			 */
			"takeorder_filter_producttype_jieji",
			/**
			 * 接单页筛选送机
			 */
			"takeorder_filter_producttype_songji",
			/**
			 * 接单页筛选市内包车
			 */
			"takeorder_filter_producttype_shinei",
			/**
			 * 接单页筛选跨城包车
			 */
			"takeorder_filter_producttype_kuacheng",
			/**
			 * 接单页筛选单次接送
			 */
			"takeorder_filter_producttype_danci",
			/**
			 * 接单页筛选线路包车
			 */
			"takeorder_filter_producttype_xianlu",
			/**
			 * 接单页筛选自由包车
			 */
			"takeorder_filter_producttype_ziyou"
		],
		/**
		 * 接单页筛选接单车型
		 */
		takeorder_filter_cartype: "takeorder_filter_cartype",
		/**
		 * 接单页筛选所在城市
		 */
		takeorder_filter_city: "takeorder_filter_city",
		/**
		 * 接单页筛选用车时间
		 */
		takeorder_filter_usetime: "takeorder_filter_usetime",
		/**
		 * 接单页筛选重置
		 */
		takeorder_filter_resetting: "takeorder_filter_resetting",
		/**
		 * 接单页筛选确定
		 */
		takeorder_filter_done: "takeorder_filter_done"
	},
	/**
	 * 接单页筛选
	 */
	takeorder_filter: "takeorder_filter",
	/**
	 * 接单页tabs
	 */
	takeorder_tabs: [
		/**
		 * 接单页可接订单tab
		 */
		"takeorder_cantake",
		/**
		 * 接单页不可接订单tab
		 */
		"takeorder_cannottake"
	],
	/**
	 * 接单页点击可接订单
	 */
	takeorder_cantake_clickorder: "takeorder_cantake_clickorder",
	/**
	 * 接单页点击不可接订单
	 */
	takeorder_cannottake_clickorder: "takeorder_cannottake_clickorder",
	/**
	 * 接单页封号提示确定按钮
	 */
	takeorder_closure: "takeorder_closure",
	/**
	 * 接单页可接单下拉刷新
	 */
	takeorder_refresh: "takeorder_refresh",
	/**
	 * 接单页去完成培训
	 */
	gostudy: "gostudy",
	/**
	 * 接单页查看认证
	 */
	godriverauditing: "godriverauditing"
};

/**
 * 行程&我的订单（完成）
 */
let TripList = {
	/**
	 * 行程
	 */
	xingcheng: {
		/**
		 * 筛选
		 */
		filter: {
			schedule_filter_producttypeList: [
				/**
				 * 接单页筛选接机
				 */
				"schedule_filter_producttype_jieji",
				/**
				 * 接单页筛选送机
				 */
				"schedule_filter_producttype_songji",
				/**
				 * 接单页筛选市内包车
				 */
				"schedule_filter_producttype_shinei",
				/**
				 * 接单页筛选跨城包车
				 */
				"schedule_filter_producttype_kuacheng",
				/**
				 * 接单页筛选单次接送
				 */
				"schedule_filter_producttype_danci",
				/**
				 * 接单页筛选线路包车
				 */
				"schedule_filter_producttype_xianlu",
				/**
				 * 接单页筛选自由包车
				 */
				"schedule_filter_producttype_ziyou"
			],
			/**
			 * 接单页筛选接单车型
			 */
			schedule_filter_cartype: "schedule_filter_cartype",
			/**
			 * 接单页筛选所在城市
			 */
			schedule_filter_city: "schedule_filter_city",
			/**
			 * 接单页筛选用车时间
			 */
			schedule_filter_usetime: "schedule_filter_usetime",
			/**
			 * 接单页筛选重置
			 */
			schedule_filter_resetting: "schedule_filter_resetting",
			/**
			 * 接单页筛选确定
			 */
			schedule_filter_done: "schedule_filter_done"
		},
		/**
		 * 行程下拉刷新
		 */
		schedule_refresh: "schedule_refresh",
		/**
		 * 行程页筛选
		 */
		schedule_filter: "schedule_filter",
		/**
		 * 行程页tabs
		 */
		schedule_tabs: [
			/**
			 * 行程页"全部"tab【待服务tab】
			 */
			"schedule_waitservice",
			/**
			 * 行程页待联系乘客tab
			 */
			"schedule_waitcontact"
		],
		/**
		 * 行程页点击待联系乘客订单
		 */
		schedule_waitcontact_clickorder: "schedule_waitcontact_clickorder",
		/**
		 * 行程页点击待服务订单
		 */
		schedule_waitservice_clickorder: "schedule_waitservice_clickorder"
	},
	/**
	 * 我的订单（完成）
	 */
	wodedingdan: {
		filter: {
			myorderlist_filter_producttypeList: [
				/**
				 * 接单页筛选接机
				 */
				"myorderlist_filter_producttype_jieji",
				/**
				 * 接单页筛选送机
				 */
				"myorderlist_filter_producttype_songji",
				/**
				 * 接单页筛选市内包车
				 */
				"myorderlist_filter_producttype_shinei",
				/**
				 * 接单页筛选跨城包车
				 */
				"myorderlist_filter_producttype_kuacheng",
				/**
				 * 接单页筛选单次接送
				 */
				"myorderlist_filter_producttype_danci",
				/**
				 * 接单页筛选线路包车
				 */
				"myorderlist_filter_producttype_xianlu",
				/**
				 * 接单页筛选自由包车
				 */
				"myorderlist_filter_producttype_ziyou"
			],
			/**
			 * 接单页筛选接单车型
			 */
			myorderlist_filter_cartype: "myorderlist_filter_cartype",
			/**
			 * 接单页筛选所在城市
			 */
			myorderlist_filter_city: "myorderlist_filter_city",
			/**
			 * 接单页筛选用车时间
			 */
			myorderlist_filter_usetime: "myorderlist_filter_usetime",
			/**
			 * 接单页筛选重置
			 */
			myorderlist_filter_resetting: "myorderlist_filter_resetting",
			/**
			 * 接单页筛选确定
			 */
			myorderlist_filter_done: "myorderlist_filter_done"
		},
		/**
		 * 我的订单下拉刷新
		 */
		mine_myorderlist_refresh: "mine_myorderlist_refresh",
		/**
		 * 我的订单筛选
		 */
		mine_myorderlist_filter: "mine_myorderlist_filter",
		/**
		 * 我的订单页面tabs
		 */
		mine_myorderlist_tabs: [
			/**
			 * 我的订单页面-全部tab
			 */
			"mine_myorderlist_all",
			/**
			 * 我的订单页面-待服务tab
			 */
			"mine_myorderlist_waitservice",
			/**
			 * 我的订单页面-被取消tab
			 */
			"mine_myorderlist_cancelled",
			/**
			 * 我的订单页面-待结算tab
			 */
			"mine_myorderlist_waitsettle",
			/**
			 * 我的订单页面-结算完成tab
			 */
			"mine_myorderlist_settled"
		],
		/**
		 * 我的订单-页面订单
		 */
		mine_myorderlist_order: "mine_myorderlist_order"
	}
};

/**
 * 订单详情（完成）
 */
let OrderDetail = {
	/**
	 * 订单详情页抢单按钮
	 */
	orderdetail_takeorder: "orderdetail_takeorder",
	/**
	 * 订单详情选确定抢单按钮
	 */
	orderdetail_ensuretake: "orderdetail_ensuretake",
	/**
	 * 订单详情页已联系乘客
	 */
	orderdetail_contacted: "orderdetail_contacted",
	/**
	 * 订单详情页服务完成
	 */
	orderdetail_completed: "orderdetail_completed",
	/**
	 * 订单详情页功能入口（三个点）
	 */
	orderdetail_function: "orderdetail_function",
	/**
	 * 订单详情页订单动态
	 */
	orderdetail_movement: "orderdetail_movement",
	/**
	 * 订单详情页导航
	 */
	orderdetail_gohere: "orderdetail_gohere",
	/**
	 * 订单详情页电话联系
	 */
	orderdetail_call: "orderdetail_call",
	/**
	 * 订单详情页发短信
	 */
	orderdetail_message: "orderdetail_message",
	/**
	 * 订单详情页微信联系
	 */
	orderdetail_wechat: "orderdetail_wechat",
	/**
	 * 订单详情页酒店电话
	 */
	orderdetail_hotelphone: "orderdetail_hotelphone",
	/**
	 * 订单详情页复制订单号
	 */
	orderdetail_copynumber: "orderdetail_copynumber",
	/**
	 * 订单详情页html tabs
	 */
	orderdetail_html_tabs: [
			/**
	 * 订单详情页注意事项
	 */
	 "orderdetail_attention",
	/**
	 * 订单详情页费用说明
	 */
	"orderdetail_expenses",
	/**
	 * 订单详情页退改补偿
	 */
	"orderdetail_retreating",
	],
	/**
	 * 订单详情页取消订单
	 */
	orderdetail_cancelorder: "orderdetail_cancelorder",
	/**
	 * 订单详情页复制订单
	 */
	orderdetail_copydetail: "orderdetail_copydetail",
	/**
	 * 订单详情页联系客服
	 */
	orderdetail_customservice: "orderdetail_customservice"
};

/**
 * 消息页（完成）
 */
let Message = [
	/**
	 * 消息页订单消息
	 */
	"message_ordermessage",
	/**
	 * 消息页平台通知
	 */
	"message_notice",
	/**
	 * 消息页活动推荐
	 */
	"message_activity",
	/**
	 * 消息页联系客服
	 */
	"message_customservice"
];

/**
 * 设置（完成）
 */
let Setting = {
	/**
	 * 设置页面退出登录
	 */
	mine_set_quit: "mine_set_quit"
};

/**
 * 司导星级页（完成）
 */
let GuidStarLevel = {
	/**
	 * 司导星级页星级规则
	 */
	mine_grade_rule: "mine_grade_rule",
	/**
	 * 司导星级页可接单类型
	 */
	mine_grade_cantaketype: "mine_grade_cantaketype"
};

/**
 * 司导服务分（完成）
 */
let GuidPointRule = {
	/**
	 * 司导服务分页规则
	 */
	mine_score_rule: "mine_score_rule"
};

/**
 * 司导认证结果页（完成）
 */
let GuidVerificationResult = {
	/**
	 * 司导认证页立即认证
	 */
	mine_driverauditing_goauditing: "mine_driverauditing_goauditing",
	/**
	 * 司导认证页重新认证
	 */
	mine_driverauditing_again: "mine_driverauditing_again"
};

/**
 * 司导认证页（完成）
 */
let GuidVerification = {
	/**
	 * 司导认证页-基本资料-下一步
	 */
	driverauditing_firststep_next: "driverauditing_firststep_next",
	/**
	 * 司导认证页-当地身份-下一步
	 */
	driverauditing_secondstep_next: "driverauditing_secondstep_next",
	/**
	 * 司导认证页-当地驾驶证件-添加车辆
	 */
	driverauditing_thirdstep_addcar: "driverauditing_thirdstep_addcar",
	/**
	 * 司导认证页-当地驾驶证件-提交审核
	 */
	driverauditing_thirdstep_submit: "driverauditing_thirdstep_submit"
};

/**
 * 我的车辆列表（完成）
 */
let MyCarList = {
	/**
	 * 我的页面-点击车辆
	 */
	mycar_click: "mycar_click",
	/**
	 * 我的页面-添加车辆
	 */
	mycar_add: "mycar_add",
	/**
	 * 我的页面-删除车辆
	 */
	mycar_delete: "mycar_delete"
};

/**
 * 车辆资料页（完成）
 */
let MyCar = {
	/**
	 * 车辆资料页-基本资料-下一步
	 */
	mycar_firststep_next: "mycar_firststep_next",
	/**
	 * 车辆资料页-车辆照片-提交审核
	 */
	mycar_secondstep_submit: "mycar_secondstep_submit"
};

/**
 * 账户安全页（完成）
 */
let AccountSecurity = {
	/**
	 * 账户安全页面修改登录密码
	 */
	mine_accountssafe_modifypassword: "mine_accountssafe_modifypassword",
	/**
	 * 账户安全页面设置提现密码
	 */
	mine_accountssafe_setwalletpassword: "mine_accountssafe_setwalletpassword"
};

/**
 * 修改登录密码（完成）
 */
let ChangeLoginPassword = {
	/**
	 * 账户安全页面修改登录密码完成
	 */
	mine_accountssafe_modifypassword_done: "mine_accountssafe_mfodifypassword_done",
	/**
	 * 账户安全页面修改登录密码登录
	 */
	mine_accountssafe_modifypassword_login: "mine_accountssafe_modifypassword_login"
};

/**
 * 身份验证（完成）
 */
let IdentityVerification = {
	/**
	 * 身份验证页面下一步
	 */
	idvalidate_next: "idvalidate_next",
	/**
	 * 设置提现密码完成
	 */
	setwalletpassword_done: "setwalletpassword_done",
	/**
	 * 设置提现密码成功确定按钮
	 */
	setwalletpassword_successensure: "setwalletpassword_successensure"
};

/**
 * 我的钱包（完成）
 */
let MyWallet = {
	/**
	 * 我的钱包页钱包账单
	 */
	mywallet_walletbill: "mywallet_walletbill",
	/**
	 * 我的钱包页提现按钮
	 */
	mywallet_drawcash: "mywallet_drawcash",
	/**
	 * 我的钱包页提现账户管理
	 */
	mywallet_accountmanage: "mywallet_accountmanage",
	/**
	 * 我的钱包页提现记录
	 */
	mywallet_drawcashrecord: "mywallet_drawcashrecord",
	/**
	 * 我的钱包页保证金管理
	 */
	mywallet_depositmanage: "mywallet_depositmanage",
	/**
	 * 我的钱包页钱包充值
	 */
	mywallet_walletrecharge: "mywallet_walletrecharge",
	/**
	 * 我的钱包页设置提现账户取消
	 */
	mywallet_setaccount_cacel: "mywallet_setaccount_cacel",
	/**
	 * 我的钱包页设置提现账户去设置
	 */
	mywallet_setaccount_set: "mywallet_setaccount_set"
};

/**
 * 提现页（完成）
 */
let Withdraw = {
	/**
	 * 我的钱包提现选择账户
	 */
	mywallet_drawcash_selectaccount: "mywallet_drawcash_selectaccount",
	/**
	 * 我的钱包提现全部提现
	 */
	mywallet_drawcash_all: "mywallet_drawcash_all",
	/**
	 * 我的钱包提现页提现按钮
	 */
	mywallet_drawcash_drawbutton: "mywallet_drawcash_drawbutton"
};

/**
 * 提现账户列表（完成）
 */
let WithdrawAccountList = {
	/**
	 * 提现账户管理添加
	 */
	mywallet_accountmanage_add: "mywallet_accountmanage_add",
	/**
	 * 提现账户管理编辑
	 */
	mywallet_accountmanage_edit: "mywallet_accountmanage_edit",
	/**
	 * 提现账户管理删除
	 */
	mywallet_accountmanage_delete: "mywallet_accountmanage_delete",
	/**
	 * 提现账户管理设置密码
	 */
	mywallet_accountmanage_setpassword: "mywallet_accountmanage_setpassword",
	/**
	 * 提现账户管理取消设置密码
	 */
	mywallet_accountmanage_cancel: "mywallet_accountmanage_cancel"
};

/**
 * 保证金管理页（完成）
 */
let Margin = {
	/**
	 * 保证金管理页账单
	 */
	mywallet_depositmanage_bill: "mywallet_depositmanage_bill",
	/**
	 * 保证金管理页充值
	 */
	mywallet_depositmanage_recharge: "mywallet_depositmanage_recharge"
};

window.YITU.TrackMain = Main;
window.YITU.TrackUserCenter = UserCenter;
window.YITU.TrackOrderList = OrderList;
window.YITU.TrackTripList = TripList;
window.YITU.TrackOrderDetail = OrderDetail;
window.YITU.TrackMessage = Message;
window.YITU.TrackSetting = Setting;
window.YITU.TrackGuidStarLevel = GuidStarLevel;
window.YITU.TrackGuidPointRule = GuidPointRule;
window.YITU.TrackGuidVerificationResult = GuidVerificationResult;
window.YITU.TrackGuidVerification = GuidVerification;
window.YITU.TrackMyCarList = MyCarList;
window.YITU.TrackMyCar = MyCar;
window.YITU.TrackAccountSecurity = AccountSecurity;
window.YITU.TrackChangeLoginPassword = ChangeLoginPassword;
window.YITU.TrackIdentityVerification = IdentityVerification;
window.YITU.TrackMyWallet = MyWallet;
window.YITU.TrackWithdraw = Withdraw;
window.YITU.TrackWithdrawAccountList = WithdrawAccountList;
window.YITU.TrackMargin = Margin;
