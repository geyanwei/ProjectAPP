import React, {Component} from "react";
import {
    View,
    BackHandler,
    Platform,
    StatusBar,
    AppState,
    DeviceEventEmitter, NativeModules
} from "react-native";
// import PushView from './main/push/PushView';
import UpdateSplash from './update/component/UpdateSplash'

import {AppInit, ModalBox, Toast} from "myapplib";

import routeList from "./route";
import HttpTool from "./http/HttpTool";
import Config from "./Config";
import Storage from "./tool/Storage";
import RegisterSuccess from "./main/login/RegisterSuccess";

import UMUtils from './tool/UMUtils'; // UMeng track
import ErrorUtils from 'ErrorUtils'; // red box catcher

import './tool/OverrideDefaultProps';
import './tool/ClickEventList'; // 全局点击埋点列表
import Orientation from "react-native-orientation";


let routeMain = AppInit.initRoute(routeList);
const WhiteBarPage = [
    "Main",
    "Login",
    "MyWallet",
    "BondManagement",
    "RegisterAccount",
    "TripList",
    "MyLevel",
];
const excludeBarPage = [

    "RobbingDetail",

    "TripDetail"
];

let RouteStack = AppInit.initApp(routeMain, {
    onTransitionStart: () => {
        let routes = AppInit.ref.state.nav.routes, routeName = routes[routes.length - 1]['routeName'];
        AppInit.routeName = routeName;

        log("当前页面----------------：" + AppInit.routeName);
        log(routes);
        if (Platform.OS === "ios" && excludeBarPage.indexOf(routeName) < 0) {
            if (WhiteBarPage.indexOf(routeName) >= 0) {
                StatusBar.setBarStyle(Platform.select({
                    ios: "light-content"
                }), true);
            } else {
                StatusBar.setBarStyle(Platform.select({
                    ios: "dark-content"
                }), true);
            }
        }

    },
    onTransitionEnd: () => {


        //页面动画完成之后才行
        let routes = AppInit.ref.state.nav.routes, routeName = routes[routes.length - 1]['routeName'];
        if (routeName === "RegisterSuccess") {
            //在注册成功页面，返回页面镜像要求是主页
            //方案1：更新登录页为主页，删除中间不必要页面
            AppInit.upDateMain();
            AppInit.saveRoutes(AppInit.ref, ["Main", "RegisterSuccess"]);
        } else if (routeName === "AccountResult") {
            AppInit.removeRoutes(AppInit.ref, ["AccountCash", "AccountAdd", "AccountAddDetail"])
        }
        else if (routeName === "AccountAddWXResult") {
            AppInit.removeRoutes(AppInit.ref, ["AccountCash", "AccountAdd", "AccountAddWX"])
        }
        else if (routeName === "AccountCash") {
            AppInit.removeRoutes(AppInit.ref, ["AccountResult", "AccountAddWXResult"])
        } else if (routeName === "PutForwardResult") {
            AppInit.removeRoutes(AppInit.ref, ["MyWallet", "BondPutForward"])
        } else if (routeName === "MyWallet") {
            AppInit.removeRoutes(AppInit.ref, ["PutForwardResult"])
        } else if (routeName === "PutForwardResult_Bond") {
            AppInit.removeRoutes(AppInit.ref, ["BondManagement", "BondPutForward"])
        } else if (routeName === "BondManagement") {
            AppInit.removeRoutes(AppInit.ref, ["PutForwardResult_Bond"])
        } else if (routeName === "Main") {
            AppInit.toMainForLast(AppInit.ref);
        } else if (routeName === "CarManagerList") {
            // AppInit.saveRoutes(AppInit.ref, ["Main", "CarManagerList"]);
            AppInit.removeRoutes(AppInit.ref, ["CarResult"])
        } else if (routeName === "CarResult") {
            // AppInit.saveRoutes(AppInit.ref, ["Main", "CarResult"]);
            AppInit.removeRoutes(AppInit.ref, ["CarManagerList", "CarAdd", "CarAdd_Enabled", "CarAddNext"])
        } else if (routeName === "GuideResult") {
            // AppInit.saveRoutes(AppInit.ref, ["Main", "GuideResult"]);
            AppInit.removeRoutes(AppInit.ref, ["GuideVerShow", "GuideIdentification", "GuideSecondIdentification", "GuideVerNext"])
        } else if (routeName === "CarAdd_Enabled") {
            // AppInit.saveRoutes(AppInit.ref, ["Main", "CarAdd_Enabled"]);
            AppInit.removeRoutes(AppInit.ref, ["GuideVerShow", "GuideIdentification", "GuideSecondIdentification", "GuideVerNext"])
        }


        else {
            //其他页面相关配置

            //GuideIdentification
        }
    }
});
//需要禁用页面
//在路由表在配置  "RegisterSuccess":  {screen: RegisterSuccess, navigationOptions: {gesturesEnabled: false}},
// 注册成功，销毁除成功与主页外所有 无返回功能
// 我的车辆结果页面，不去销毁任何 无返回功能 只能去我的车辆页面（禁用版）
// 我的车辆 不禁，销毁除我的车辆与主页外所有
//需要禁用页面 ，添加车辆，条件禁用。


//无返回功能页面
//注册成功页面 RegisterSuccess
//车辆添加成功页面 CarResult


AppInit.saveRoutes = (that, routeNameArr) => {
    let routes = that._navigation.state.routes;
    let removeName = [];
    for (let {routeName} of routes) {
        //存在，不记录
        if (routeNameArr.indexOf(routeName) < 0) {
            //不存在
            removeName.push(routeName);
        }
    }
    if (removeName.length > 0) {
        AppInit.removeRoutes(that, removeName);
    }

};

/**
 * 将最后一个，做为主页
 * @param that
 * @param type last first
 */
AppInit.toMainForType = (that, type = "last") => {
    if (!that) {
        console.error("这是错误的一个ref对像");
        return
    }
    let routes = that._navigation.state.routes;
    //最后一个，
    let size = routes.length;

    let index = 0;
    if (type === "last") {
        if (size < 2) {
            return;
        }
        routes.splice(0, size - 1);
        index = 0;
    } else if (type === "first") {
        if (size < 2) {
            return;
        }
        routes.splice(1, size);
        index = 0;
    } else if (type === "currentAndmain") {
        if (size < 3) {
            return;
        }
        index = 1;
        routes.splice(1, size - 1);
    }

    that._navigation.state.index = index;
    that._navigation.state.isChange = true;
    that.setState({}, () => {
        that._navigation.state.isChange = undefined;
    })
};
AppInit.toMainForLast = (that) => {
    AppInit.toMainForType(that, "last");
};
AppInit.toMainForFirst = (that) => {
    AppInit.toMainForType(that, "first");
};
AppInit.toMainForCurrentAndMain = (that) => {
    AppInit.toMainForType(that, "currentAndmain");
};

let exitTime = 0;


function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState
        };
    }

    _handleHardwareBackPress() {
        let routes = AppInit.ref.state.nav.routes;
        if (!routes) {
            return
        }
        let routeName = routes[routes.length - 1]['routeName'];


        let back = YITU.getAction("ANDROIDBACK_" + routeName);
        if (back && back()) {
            return true;
        }
        if (AppInit.ref) {
            if (AppInit.ref.state.nav.routes.length > 1) {
                // go normal back steps
                const disableRouteName = ['Main', "RegisterSuccess", "CarResult", "CarAdd", "CarAdd_Enabled", "AccountResult", "AccountAddWXResult", "PutForwardResult", "PutForwardResult_Bond", "GuideIdentification", "GuideIdentification_Enabled", "GuideResult"];

                if (disableRouteName.indexOf(routeName) === -1) {
                    AppInit.ref.dispatch({
                        type: "Navigation/BACK"
                    });
                }
                //通知监听返回键盘的事件
                return true;
            }
        }
        let time = new Date().getTime();
        if (time - exitTime > 2000) {
            exitTime = time;
            Toast && Toast.show("再按一次退出程序");
            return true;
        } else {
            BackHandler.exitApp();
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            // UMUtils.onResume();
        } else {
            // UMUtils.onPause();
        }
        this.setState({appState: nextAppState});
    };

    componentWillUnmount() {
        // UMUtils.onPageEnd("Main");
        AppState.removeEventListener('change', this._handleAppStateChange);
        if (Platform.OS == "android") {
            this.handleHardwareBackPress &&
            BackHandler.removeEventListener(
                "hardwareBackPress",
                this.handleHardwareBackPress
            );
        }
    }

    componentDidMount() {

        Orientation.lockToPortrait();
        AppState.addEventListener('change', this._handleAppStateChange);
        // UMUtils.onPageBegin("Main");
        HttpTool.setSpecialCodeEvent((code, succ, fail) => {

            // 判断code==-421||code==-422
            // clear storage
            // clear http authorization
            // navigate to main page
            if (code === -421 || code === -422 || code === -423) {
                fail();
                if (code === -421) {
                    this.skipLogin("登录信息已失效，请重新登录");
                } else if (code === -422) {
                    this.skipLogin("登录信息已过期，请重新登录");
                } else if (code === -423) {
                    this.skipLogin("您的账号已在其他设备上登录");
                }
            } else {
                return true;
            }
        });
        if (Platform.OS === "android") {
            this.handleHardwareBackPress = this._handleHardwareBackPress.bind(this);
            BackHandler.addEventListener(
                "hardwareBackPress",
                this.handleHardwareBackPress
            );
        }
    }

    //跳转登录页
    skipLogin(msg) {
        if (AppInit.ref && (Storage.getUserInfo() && Storage.getUserInfo() != {})) {
            HttpTool.clearAuthHeader();
            Storage.clearUserInfo();
            NativeModules.ChatNativeModule.deleteBadgeNumber();
            NativeModules.ChatNativeModule.logout();
            //清除所有弹框
            for (let r of ModalBox.triggers) {
                if (r) {
                    r.destroy()
                }
            }
            ModalBox.showDescCustom({
                desc: msg,
                btnTitle: "重新登录"
            }, () => {
                AppInit.ref.dispatch({
                    type: "Navigation/NAVIGATE",
                    routeName: "Main",
                });
            });
        } else {
            return true;
        }
    }

    //极光推送 单点登录 跳转指定界面
    getPush() {
        return <PushView
            ref={(ref) => {
                this.pushView = ref;
            }}
            action={(path, par) => {
                if (!Storage.getUserInfo()) {
                    return;
                }
                //打开指定页面
                log(path);
                log(par);
                log("open " + path);
                if (path === "/") {
                    //回到登录页
                    this.skipLogin("您的账号已在其他设备上登录");
                } else {
                    if (!this.pushView.launchAppState) {
                        AppInit.ref.dispatch({
                            type: "Navigation/NAVIGATE",
                            routeName: path,
                            params: par
                        });
                    } else {
                        DeviceEventEmitter.addListener('loadingEnd', () => {
                            AppInit.ref.dispatch({
                                type: "Navigation/NAVIGATE",
                                routeName: path,
                                params: par
                            });
                            this.pushView.launchAppState = false;
                        });
                    }
                }
            }}/>
    }


    getUpdateView() {
        return <UpdateSplash/>
    }

    getMainView() {
        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <StatusBar
                    barStyle={
                        Platform.select({
                            ios: "light-content"
                        })}
                    backgroundColor={Platform.select({
                        ios: "#fff"
                    })}
                />
                <View style={{flex: 1, backgroundColor: "white"}}>
                    <RouteStack ref={(ref) => {
                        AppInit.ref = ref;
                    }}
                                onNavigationStateChange={(prevState, currentState) => {
                                    const currentScreen = getCurrentRouteName(currentState);
                                    const prevScreen = getCurrentRouteName(prevState);
                                    log('prevState:' + JSON.stringify(prevScreen));
                                    log('currentState:' + JSON.stringify(currentScreen));
                                    if (prevState.index > currentState.index) {
                                        // UMUtils.onPageEnd(prevScreen);
                                        // UMUtils.onPageBegin(currentScreen);
                                    } else if (prevState.index < currentState.index) {
                                        // UMUtils.onPageEnd(prevScreen);
                                        // UMUtils.onPageBegin(currentScreen);
                                        // } else {
                                        // UMUtils.onPageEnd(prevScreen);
                                    }
                                }}/>
                </View>
                {/*{this.getPush()}*/}
                {this.getUpdateView()}
            </View>
        );
    }

    render() {
        return this.getMainView();
    }


}

export default App;
