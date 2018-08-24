import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    DeviceEventEmitter
} from 'react-native';

import Message from "./message/Message";

import {PageView, TabBar} from 'myapplib';
import SplashScreen from "react-native-splash-screen";
import Orientation from "react-native-orientation";
import UnReadView from './message/MessageCell/UnReadView.js'
import {navigation} from 'myapplib';


import DistPlace from "./distPlace/DistPlace.js";
import Recommend from "./home/Recommend.js";
import UUserCenter from "./center/UserCenter.js";
export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    componentWillUnmount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
            return true;
        } else {
            return false;
        }
        if (JSON.stringify(this.props) === JSON.stringify(this.props)) {
            return false;
        } else {
            return true;
        }
    }

    initState() {
        let tab=[];
        let recommendObj = {
            screen: Recommend,
            label: '推荐',
            labelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.textColor_2,
                fontWeight: YITU.font_weidth_0,
            },
            ClickLabelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.c_tab,
                fontWeight: YITU.font_weidth_0
            },
            imageStyle: styles.imageStyle,
            clickIcon: require("../image/tab/tab_1_sel.png"),
            icon: require("../image/tab/tab_1_def.png")
        };

        let placeObj = {
            screen: DistPlace,
            label: '地点',
            labelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.textColor_2,
                fontWeight: YITU.font_weidth_0
            },
            ClickLabelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.c_tab,
                fontWeight: YITU.font_weidth_0
            },
            imageStyle: [styles.imageStyle, {width: 22, height: 21}],
            clickIcon: require("../image/tab/tab_2_sel.png"),
            icon: require("../image/tab/tab_2_def.png"),
            params: this.props.params
        };

        let messageObj = {
            screen: Message,
            label: '消息',
            labelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.textColor_2,
                fontWeight: YITU.font_weidth_0
            },
            ClickLabelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.c_tab,
                fontWeight: YITU.font_weidth_0
            },
            messageView: () => {
                return <UnReadView/>
            },
            imageStyle: [styles.imageStyle, {width: 21, height: 20}],
            clickIcon: require("../image/tab/tab_4_sel.png"),
            icon: require("../image/tab/tab_4_def.png"),
        };

        let UUserObj = {
            screen: UUserCenter,
            label: '我的管理',
            labelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.textColor_2,
                fontWeight: YITU.font_weidth_0
            },
            ClickLabelStyle: {
                fontSize: YITU.fontSize_1,
                color: YITU.c_tab,
                fontWeight: YITU.font_weidth_0
            },
            imageStyle: styles.imageStyle2,
            clickIcon: require("../image/tab/tab_5_sel.png"),
            icon: require("../image/tab/tab_5_def.png")
        };
        tab.push(recommendObj);
        tab.push(placeObj);
        tab.push(messageObj);
        tab.push(UUserObj);
        return {
            index: this.props.index || 0,
            tabs: tab,
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        SplashScreen.hide();
    }

    render() {
        let {index, tabs} = this.state;
        let main = (
            <View style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}>
                <TabBar
                    index={index}
                    tabs={tabs}
                    navigation={this.props.navigation}
                    tabBarContainer={{
                        backgroundColor: YITU.backgroundColorTab,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: YITU.backgroundColor_Line
                    }}
                />
            </View>
        );
        return main;
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: YITU.d_icon,
        height: YITU.d_icon,
        marginBottom: YITU.space_0,
        marginTop: 2
    },
    imageStyle2: {
        width: YITU.d_icon_center,
        height: 22,
        marginBottom: YITU.space_0,
        marginTop: 2
    },
});
