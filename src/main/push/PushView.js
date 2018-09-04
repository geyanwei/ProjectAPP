import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Platform,
    NativeModules
} from 'react-native';
import JPushModule from 'jpush-react-native';
// import MyNativeMoudles from '../../myNativeModules';
import Storage from '../../tool/Storage';

class PushView extends Component {

    constructor(props) {
        super(props);
        this.launchAppState=false;
    }

    componentWillMount() {

    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            JPushModule.initPush();
            JPushModule.getInfo(map => {
                log(map)
            });
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            });
            JPushModule.getRegistrationID((registrationId) => {
                log("================registrationId " + registrationId);
                // MyNativeMoudles.registrationId = registrationId;
            })
        } else {
            JPushModule.setupPush();
                    //监听极光注册成功
            JPushModule.addnetworkDidLoginListener((rep) => {
                //iOS获取registrationId
                JPushModule.getRegistrationID((registrationId) => {
                    log("================registrationId " + registrationId);
                    // MyNativeMoudles.registrationId = registrationId;
                })
            });
        }

        //收到推送
        JPushModule.addReceiveNotificationListener((map) => {

        });

        //点击推送
        JPushModule.addReceiveOpenNotificationListener((map) => {
            this.jump(map);
        });

        //进程杀死状态下点击推送
        if (Platform.OS === 'ios'){
            JPushModule.getLaunchAppNotification((map)=>{
                if (map){
                    this.launchAppState=true;
                    this.jump(map);
                }
            })
        }

    }

    jump(map) {
        if (map) {
            let data = {}, extras = {};
            if (Platform.OS === 'android') {
                if (map.extras) {
                    extras = JSON.parse(map.extras);
                    data = JSON.parse(extras["ex"]||'{}');
                }
            }else if(Platform.OS === 'ios'){
                if (map.ex) {
                    data = JSON.parse(map.ex);
                }
            }
            let open = data.open || {};
            let uid = data["uid"];
            Storage.getUserInfo((uInfo) => {
                let userInfo = uInfo['userInfo'];
                if (open && userInfo) {
                    if (!uid) {
                        this.props.action(open.path, open.parame);
                    } else if( uid === userInfo['id']) {
                        this.props.action(open.path, open.parame);
                    }
                }
            });
        }
    }

    componentWillUnmount() {
        JPushModule.clearAllNotifications()
    }

    render() {
        return null;
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
});

module.exports = PushView;
