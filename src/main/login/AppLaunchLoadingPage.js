import React, {Component, PropTypes} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Easing,
    Animated,
    ImageBackground,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import Storage from "../../tool/Storage";
import SplashScreen from "react-native-splash-screen";
import {navigation, PageView, AppInit, ModalBox, Loading} from "myapplib";
import ConfigHelp from "./tool/ConfigHelp.js";
import Login from "./Login";
import Main from "../Main.js";
import ErrorPage from "./component/ErrorPage.js";
import Video from "react-native-video";
import Orientation from "react-native-orientation";

class AppLaunchLoadingPage extends Component {
    constructor(props) {
        super(props);
        this.playVideoAnim = new Animated.Value(1);

        //showBody 如果项目内回退，不进行视频播放
        //判定项目内，全局第一次进入

        this.state = {type: !!AppInit.isFirst ? (Storage.getUserInfo() ? 2 : 1) : 0, showBody: !!AppInit.isFirst};
        if (!AppInit.isFirst) {
            AppInit.isFirst = true;
            AppInit.upDateMain = () => {
                this.setState({
                    type: !!Storage.getUserInfo() ? 2 : 1
                })
            }
        }
        //type 0 无内容
        //type 1 登录
        //type 2 主页
        //type 3 加载错误界面
    }

    componentDidMount() {
        //原生只有文字 js加载出来，关闭原生，开启视频动画
        Orientation.lockToPortrait();

        //开启视频动画
        if (!this.state.showBody) {
            SplashScreen.hide();
            this.playVideo.start();
            this.getConfigInfo();
        }
    }

    render() {
        return (<View style={{width: "100%", height: "100%"}}>
            {this.getMainView()}
            {this.getVideoView()}
        </View>);
    }

    getVideoView() {
        if (this.state.showBody) {
            return null;
        }
        //播放视频实现视频播放完成
        return (
            <Animated.View
                style={[styles.video, {opacity: this.playVideoAnim}]}>
                <PlayVideo
                    loadEnd={() => {
                        //视频播放完成 显示主内容
                        this.playEnd = true;
                        this.closePlayVideo();
                    }}
                    ref={(ref) => {
                        this.playVideo = ref;
                    }}
                />
            </Animated.View>);
    }

    closePlayVideo(callBack) {
        if (this.state.showBody) {
            //已经处理的，不再处理
            return;
        }
        if (!this.callBackArray) {
            this.callBackArray = [];
            this.callBackArray.push(callBack)
        }
        // 判定配置文件与用户信息是否拉取
        if (this.state.type === 0 || !this.playEnd) {
            //任一条件不瞒住，不进行关闭视频
            //配置先请求完毕，需等待视频播放完成
            //视频先播放完毕，需等待配置网络延时
            return;
        }
        //开启隐藏视频动画
        Animated.timing(
            this.playVideoAnim,
            {
                toValue: 0,
            }
        ).start(() => {
            // console.log("完全进入主体，销毁self");
            this.setState({showBody: true}, () => {
                for (let cb of this.callBackArray) {
                    cb && cb();
                }
                DeviceEventEmitter.emit('loadingEnd');
                DeviceEventEmitter.removeListener('loadingEnd');
            });
        });
    }

    getConfigInfo() {
        // 获取配置文件
        ConfigHelp.initConfigInfo((code, msg) => {
            let type = 0;
            if (code === -3) {//错误页面
                type = 3;
            } else if (code === 1) {//主页
                type = 2;
            } else { //登录 code ===-1 本地没有登录信息的Cookie || code ===-2 本地有登录信息的Cookie 但此时登录信息(accessToken)已失效
                type = 1;
            }
            this.setState({type: type}, () => {
                this.closePlayVideo(() => {
                    // if(code===-2){
                    //     //判断登录是否有效 无效提示 点击登录
                    //     ModalBox.showDescCustom({
                    //         desc:msg
                    //     });
                    // }
                });
            });
        });
    }

    getMainView() {
        switch (this.state.type) {
            case 1:
                return <Login {...this.props} login={() => {
                    Loading.hide();
                    this.setState({type: 2}); //login to main
                }}/>;
            case 2:
                return <Main {...this.props}/>;
            case 3:
                return <ErrorPage callBack={() => {
                    this.setState({
                        type: 0,
                        showBody: false
                    }, () => {
                        this.playVideoAnim.setValue(1);
                        this.getConfigInfo();
                    });
                }}/>;
            default:
                return null;
        }
    }
}

module.exports = AppLaunchLoadingPage;

class PlayVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBottom: false,
        }
    }

    componentDidMount() {
        //5秒后，强制退出播放
        this.autoTime = setTimeout(() => {
            this.end();
        }, 5000);
    }

    start() {
        //start play anim
    }

    end() {
        if (this.isEnd) {
            return;
        }
        this.isEnd = true;
        if (this.props.loadEnd) {
            this.props.loadEnd();
        }
    }

    componentWillUnmount() {
        if (this.autoTime) {
            clearTimeout(this.autoTime);
            this.autoTime = null;
        }
    }

    render() {
        return (
            <View style={{
                backgroundColor: YITU.backgroundColor_0,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}>
                <Video
                    resizeMode={"contain"}
                    source={require('../../image/login/start_original.mp4')}
                    style={{
                        backgroundColor: "white",
                        width: YITU.screenWidth,
                        height: "100%",
                    }}
                    rate={1}
                    volume={1}
                    onEnd={() => {
                        this.end();
                    }}
                    onLoadStart={() => {
                        //开始播放,视频正常，给予播放，体验完整视频
                        if (this.autoTime) {
                            clearTimeout(this.autoTime);
                            this.autoTime = null;
                        }
                        //万一，开始播放，也挂掉，再次计时
                        this.autoTime = setTimeout(() => {
                            this.end();
                        }, 5000)

                    }}
                    onError={(value) => {
                        log("视频错误" + JSON.stringify(value));
                        this.end();
                    }}
                    repeat={false}
                    {...this.props}
                />
                <View style={styles.bottom}>
                    <View style={{width: 47, backgroundColor: YITU.backgroundColor_Line, height: 1}}/>
                    <Text style={{
                        marginHorizontal: YITU.space_2,
                        color: YITU.textColor_3,
                        fontSize: YITU.fontSize_7
                    }}>司导端</Text>
                    <View style={{width: 47, backgroundColor: YITU.backgroundColor_Line, height: 1}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    video: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#00000000"
    },
    bottom: {
        position: "absolute",
        bottom: YITU.IPHONEX_BOTTOM + 30,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    }
});
