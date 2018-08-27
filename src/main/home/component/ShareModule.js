import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    View,
    Image
} from 'react-native';
import {ModalBox,Toast} from "myapplib";

class ShareModule extends Component {
    static show(data, cb) {
        let mb = ModalBox.showConfig({
            modal: <ShareModule
                data={data}
                onClose={(item) => {
                    cb && cb(item);
                    mb.close();
                }}
            />,
            modalConfig: {
                animationDuration: 0,
                backdropOpacity: 0,
                clickToClose: false,
                swipeToClose: false,
            }
        });
    }

    constructor(props) {
        super(props);
        this.fadeInOpacity = new Animated.Value(0); // 初始值
    }

    componentDidMount() {
        this.setValue(1);
    }

    setValue(value, item) {
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value === 0) {
                this.props.onClose && this.props.onClose(item);
            }
        });
    }

    render() {
        let opacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        let {data} = this.props;
        //要不要加动画右上角收起
        // let opacity1 = this.fadeInOpacity.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, YITU.screenWidth],
        // });
        // let opacity2 = this.fadeInOpacity.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, YITU.screenHeight],
        // });

        return (<Animated.View style={[styles.bg, {opacity: opacity}]}>
            <TouchableOpacity
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                }}
                activeOpacity={1}
                onPress={() => {
                    this.setValue(0);
                }}>

                <View style={{backgroundColor: YITU.backgroundColor_1,}}>
                    <View style={{
                        flexDirection: "row",
                        marginHorizontal: YITU.space_5,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: YITU.backgroundColor_Line
                    }}>
                        <View style={{width: 35, height: 35}}/>
                        <Text style={{
                            flex: 1,
                            textAlign: "center",
                            color: YITU.textColor_0,
                            fontSize: YITU.fontSize_3
                        }}>分享</Text>
                        <TouchableOpacity
                            style={{width: 35, height: 35, alignItems: "center", justifyContent: "center"}}
                            onPress={() => {
                                this.setValue(0);
                            }}>
                            <Image resizeMode={"contain"} style={{width: 20, height: 20}}
                                   source={require("./image/close.png")}/>
                        </TouchableOpacity>
                    </View>

                    <MyItem data={this.getData()}/>
                </View>
            </TouchableOpacity>
        </Animated.View>);
    }

    getData(){
        return [{
            title: "微信好友",
            icon: require("./image/icon_weChat.png"),
            onPress:()=>{
                this.setValue(0);
                Toast.show("分享成功");
            }
        }, {
            title: "朋友圈",
            icon: require("./image/icon_weChat.png"),
            onPress:()=>{
                this.setValue(0);
                alert("朋友圈")
            }
        }, {
            title: "新浪微博",
            icon: require("./image/icon_weibo.png"),
            onPress:()=>{
                this.setValue(0);
                alert("新浪微博")
            }
        }, {
            title: "QQ空间",
            icon: require("./image/icon_qq.png"),
            onPress:()=>{
                this.setValue(0);
                alert("QQ空间")
            }
        }, {
            title: "QQ好友",
            icon: require("./image/icon_qq.png"),
            onPress:()=>{
                this.setValue(0);
                alert("QQ好友")
            }
        }];
    }
}

class MyItem extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = [];
        props.data && props.data.map((item, index) => {
            this.animatedValue[index] = new Animated.Value(0);
        });
    }

    componentDidMount() {
        this.setValue(1);
    }

    setValue(value) {
        const animations = this.animatedValue.map((item, index) => {
            return Animated.timing(
                this.animatedValue[index],
                {
                    toValue: value,
                    duration: 300,
                    easing: Easing.linear
                });
        });
        Animated.stagger(50, animations).start();
    }

    render() {
        let {data} = this.props;
        return (<View style={{
            flexDirection: "row",
            height: 80,
            marginTop: 10
        }}>
            {this.createShareItem(data)}
        </View>);
    }

    createShareItem(data) {
        return data.map((item, index) => {
            let animatedValue = this.animatedValue[index];
            let myHeight = animatedValue.interpolate({
                inputRange: [0, 0.67, 0.95, 1],
                outputRange: [110, -8, 3, 0],
            });
            return (<Animated.View
                key={index}
                style={{flex: 1, marginTop: myHeight}}>
                <TouchableOpacity
                    style={{alignItems: "center", justifyContent: "center"}}
                    onPress={() => {
                        item.onPress&&item.onPress();
                    }}>
                    <Image style={{width: 40, height: 40}} source={item.icon}/>
                    <Text style={{marginTop: 5, color: "#999", fontSize: 12}}>{item.title}</Text>
                </TouchableOpacity>
            </Animated.View>);
        });
    }
}

module.exports = ShareModule;

const styles = StyleSheet.create({
    bg: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        paddingHorizontal: YITU.space_5,
        paddingVertical: YITU.space_2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: YITU.backgroundColor_Line,
        borderStyle: "solid"
    }
});