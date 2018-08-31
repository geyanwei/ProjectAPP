import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    InteractionManager,
    NativeModules,
    Linking,
    Platform,
    Clipboard,
    TextInput
} from 'react-native';
import {PageView, ModalBox, Toast, navigation, Loading} from "myapplib";
import ShareHelp from '../../../share/ShareHelp.js'
import HttpTool from "../../../../http/HttpTool";
import APIPZP from "../../../../http/APIPZP";
import Storage from "../../../../tool/Storage.js"

const SIZE = 60;

class MyBottomAlert extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        ShareHelp.initShare("wx3893d2786119e0be");
    }

    /**
     * 自定义弹窗
     */
    myEditModal(money, score) {
        let option = {
            title: {
                text: "确定取消此订单",
                props: {},//标题参数 Text所有参数
                style: {},//标题样式

            },
            desc: (
                <Text style={{
                    marginTop: YITU.space_5,
                    textAlign: "center", fontSize: YITU.fontSize_4, color: YITU.textColor_3
                }}>{"取消订单违约金额："}<Text
                    style={{color: YITU.textColor_warn}}>{money + "元\n"}
                    <Text style={{textAlign: "left", color: YITU.textColor_3}}>{"取消订单扣分:"}
                        <Text style={{color: YITU.textColor_warn}}>{score + "分"}</Text>
                    </Text>
                </Text></Text>
            ),
            input: null,
            foot: {
                direction: "row",
                buttons: [
                    {
                        text: "取消订单", style: {color: YITU.textColor_1}, onPress: () => {
                            mb.close();
                            this.showModalCancleOrder()
                        }
                    },
                    {
                        text: "继续服务", style: {color: YITU.textColor_4}, onPress: () => {
                            mb.close();
                        }
                    }
                ]
            },// object or View  存在，替换modal 操作区域视图
            content: null,// View  存在，替换modal显示区域视图
            modal: null,// View  存在，替换modal视图,
            modalConfig: {
                swipeToClose: true,
                clickToClose: false,
            }

        };
        let mb = ModalBox.showConfig(option);
    }

    showModalCancleOrder() {
        let mb = ModalBox.showConfig({
            content: <MyAlert ref={(ref) => this.myAlert = ref}/>,

            foot: {
                direction: "row",
                buttons: [
                    {
                        text: "取消",
                        style: {color: YITU.textColor_0},
                        onPress: () => {
                            mb.close();
                        }
                    },
                    {
                        text: "提交",
                        style: {color: YITU.textColor_4},
                        onPress: () => {
                            let text = this.myAlert.getValue();
                            if (text) {
                                mb.close();
                                this.httpCancelOrder(text)
                            } else {
                                this.myAlert.showError(true);
                            }

                        }
                    }
                ]
            },
            modalConfig: {
                clickToClose: false,
            },
            bgStyle: {
                justifyContent: 'flex-start',
                marginTop: "30%"
            }
        })

    }

    /**
     * 请求取消订单
     */
    httpCancelOrder(text) {
        let orderMessage = this.props.orderMessage || {};
        Loading.show();
        let param = {
            acceptId: orderMessage.acceptId,
            reason: text
        };
        let successCallback = (code, message, json, option) => {
            //回退刷新
            if (this.props.obj) {
                this.props.obj.backRefresh = true;
            }
            Loading.hide();
            navigation.pop(this.props.obj);
        };

        let failCallback = (code, message, option) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.post(APIPZP.travel_app_trip_cancelOrderSubmit, successCallback, failCallback, param);
    }

    /**
     * 取消订单计算价格
     */
    cancleOrder() {
        this.httpCancelOrderSubmit();
    }

    /**
     * 请求取消订单代价
     */
    httpCancelOrderSubmit() {
        let orderMessage = this.props.orderMessage || {};
        Loading.show();
        let param = {
            acceptId: orderMessage.acceptId,
        };
        let successCallback = (code, message, json, option) => {
            Loading.hide();
            if (json) {
                this.myEditModal(json.cancelFee, json.cancelScore);
            } else {
                Toast.show(message);
            }
        };

        let failCallback = (code, message, option) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.post(APIPZP.travel_app_trip_getCancelOrderFee, successCallback, failCallback, param);
    }

    renderLine() {
        return (
            <View
                style={{backgroundColor: YITU.backgroundColor_Line, height: StyleSheet.hairlineWidth, width: "100%"}}/>
        )
    }

    /**
     * 获取时间
     * @param date
     * @returns {string}
     */
    getMyDay(date) {
        let day = new Date(date.replace(/-/g, "/"));
        let week = "";
        if (day.getDay() === 0) week = "周日";
        if (day.getDay() === 1) week = "周一";
        if (day.getDay() === 2) week = "周二";
        if (day.getDay() === 3) week = "周三";
        if (day.getDay() === 4) week = "周四";
        if (day.getDay() === 5) week = "周五";
        if (day.getDay() === 6) week = "周六";
        return date.trim().substring(0, 10) + "  " + week + date.trim().substring(10);
    }

    /**
     * 复制订单信息
     */
    copyOrderMessage(orderMessage) {
        if (!orderMessage) {
            Toast.show("订单信息复制失败");
            return;
        }
        let message = "";
        //用户信息
        let userInfo = orderMessage.passengerInfo;
        if (userInfo) {
            if (userInfo.name !== undefined) {
                message += "姓名: " + userInfo.name + '\n';
            }
            if (userInfo.phone) {
                message += "电话: +" + userInfo.areaCode + userInfo.phone + '\n';
            }
            if (userInfo.hotelPhone) {
                message += "酒店/名宿电话: +" + userInfo.hotelAreaCode + userInfo.hotelPhone + '\n';
            }
            if (userInfo.overSeasPhone) {
                message += "境外（备用）手机: +" + userInfo.overSeasAreaCode + userInfo.overSeasPhone + '\n';
            }
            if (userInfo.emergencyPhone) {
                message += "紧急联系人手机 +: " + userInfo.emergencyAreaCode + userInfo.emergencyPhone + '\n';
            }
            if (userInfo.wechat) {
                message += "微信: " + userInfo.wechat + '\n';
            }
            if (orderMessage.useTime) {
                message += "用车时间: " + orderMessage.useTime + '\n';
            }
            if (orderMessage.flightNumber) {
                message += "航班号: " + orderMessage.flightNumber + '\n';
            }
            if (orderMessage.fromAddressName) {
                message += "起点: " + orderMessage.fromAddressName + '\n';
            }
            if (orderMessage.fromAddress) {
                message += "起点详细位置: " + orderMessage.fromAddress + '\n';
            }
            if (orderMessage.toAddressName) {
                message += "终点: " + orderMessage.toAddressName + '\n';
            }
            if (orderMessage.toAddress) {
                message += "终点详细地址: " + orderMessage.toAddress + '\n';
            }
            if (orderMessage.estimatedDistance) {
                message += "预估路程: " + orderMessage.estimatedDistance + "公里" + '\n';
            }
            if (orderMessage.children || orderMessage.adults || orderMessage.luggage) {
                message += "用车人数: " + orderMessage.adults + "成人: " + orderMessage.children + "儿童: " + orderMessage.luggage + "行李: " + '\n';
            }
            if (orderMessage.carTypeName) {
                message += "要求车型: " + orderMessage.carTypeName + '\n';
            }
            if (orderMessage.remark) {
                let dd = orderMessage.remark.replace(/<\/?.+?>/g, "");
                let dds = dd.replace(/ /g, "");
                message += "额外要求: " + dds + '\n';
            }
            if (orderMessage.productName) {
                message += "产品名称: " + orderMessage.productName + '\n';
            }
            if (orderMessage.secondTypeName) {
                message += "产品类型: " + orderMessage.secondTypeName + '\n';
            }
            //举牌接机，儿童座椅
            let additionalServiceList = orderMessage.additionalServiceList;
            if (additionalServiceList && additionalServiceList.length > 0) {
                for (let i = 0; i < additionalServiceList.length; i++) {
                    let data = additionalServiceList[i];
                    if (data) {
                        if (data.sid === "PICKUPCARD") {
                            message += data.name + ": " + data.number + "个\n";
                        }
                        if (data.sid.indexOf("SEATU") > -1) {
                            message += data.name + ": " + data.number + "个\n";
                        }
                    }
                }
            }

            if (orderMessage.orderId) {
                message += "订单编号" + orderMessage.orderId + '\n';
            }
        }

        Clipboard.setString(message);
        Toast.show("订单信息已保存到剪切板");
    }

    show() {
        let orderMessage = this.props.orderMessage || {};
        let urlData = "";
        let obj = {};
        if (orderMessage.acceptId) {
            obj = {
                id: orderMessage.acceptId,
                type: 2
            };
        } else {
            obj = {
                id: orderMessage.orderId,
                type: 1
            };
        }

        urlData = "?" + "data=" + JSON.stringify(obj);

        let array1 = [
            {
                image: require("../../../../image/order/wxhy.png"),
                style: {width: 72 / 2, height: 60 / 2},
                title: "微信好友",
                onPress: () => {
                    if (cb.close) {
                        cb.close(
                            () => {
                                YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_wechatshare);
                                let titleObj = this.props.orderTypeTitle || {};
                                let title = "易途8" + titleObj.title + "订单";
                                let message = ("订单号：" + orderMessage.orderId + "，用车时间：" + (orderMessage.useTime ? this.getMyDay(orderMessage.useTime) : "") + " (当地时间)");
                                ShareHelp.openShare("WECHAR", {
                                        title: title,
                                        description: message,
                                        thumbImage: orderMessage.weixinShareImage || "https://image.pro.io.yitu8.cn/wechatshare/40@2x.png",
                                        type: 'news',
                                        webpageUrl: encodeURI(orderMessage.weixinShareUrl + urlData)
                                    }, (data) => {
                                        if (data.code === 1) {
                                            Toast.show(data.msg)
                                        } else {
                                            //错误不显示
                                            //Toast.show(data.msg)
                                        }
                                    }
                                )
                            }
                        )
                    }

                }
            },
            {
                image: require("../../../../image/order/dxfx.png"),
                style: {width: 71 / 2, height: 64 / 2},
                title: "短信分享",
                onPress: () => {
                    if (cb.close) {
                        cb.close(() => {
                            YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_messageshare);
                            Linking.canOpenURL('sms:').then(supported => {
                                let titleObj = this.props.orderTypeTitle || {};
                                let message = (titleObj.title + "订单，订单号：" + orderMessage.orderId + "，用车时间：" + (orderMessage.useTime ? this.getMyDay(orderMessage.useTime) : "") + " (当地时间)，" + encodeURI(orderMessage.smsShareUrl + urlData)) + "  请点击查看";
                                if (!supported) {
                                    Toast.show("您的设备不支持直接发送短信");
                                } else {
                                    if (Platform.OS === "ios") {
                                        return Linking.openURL("sms:&body=" + message);
                                    } else {
                                        return Linking.openURL("sms:?body=" + message);
                                    }
                                }
                            }).catch(err => Toast.show("您的设备不支持直接发送短信"));
                        })
                    }
                }
            },
            {
                image: require("../../../../image/order/lxkf.png"),
                style: {width: 68 / 2, height: 73 / 2},
                title: "联系渠道经理",
                onPress: () => {
                    if (cb.close) {
                        cb.close(() => {
                            Storage.getUserInfo((data) => {
                                let person = {
                                    targetid: "杭州易途吧",
                                    groupid: data.group_id || 0,
                                };
                            })
                        })
                    }
                }
            }
        ];

        let array2 = [
            {
                image: require("../../../../image/order/fzdd.png"),
                style: {width: 67 / 2, height: 64 / 2},
                title: "复制订单内容",
                onPress: () => {
                    if (cb.close) {
                        cb.close(
                            () => {
                                YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_copydetail);
                                this.copyOrderMessage(orderMessage)
                            }
                        )
                    }
                }
            },
            {
                image: require("../../../../image/order/qxdd.png"),
                style: {width: 52 / 2, height: 65 / 2},
                title: "取消订单",
                onPress: () => {
                    if (cb.close) {
                        cb.close(
                            () => {
                                YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_cancelorder);
                                this.cancleOrder()
                            }
                        )
                    }
                }
            }
        ];

        let cb = ModalBox.showEditModal({
            type: "bottom",
            view: (
                <View style={{marginBottom: YITU.IPHONEX_BOTTOM, backgroundColor: "#f5f5f9"}}>
                    {
                        this.renderContainer(array1)
                    }
                    {
                        this.renderLine()
                    }
                    {
                        orderMessage.status !== undefined && (orderMessage.status === 1 || orderMessage.status === 0) ?
                            <View>
                                {
                                    this.renderContainer(array2)
                                }
                                {
                                    this.renderLine()
                                }
                            </View> : null
                    }
                    {
                        this.renderClose(() => {
                            if (cb.close) {
                                cb.close(
                                    () => {
                                        if (this.props.closeCallBack) {
                                            this.props.closeCallBack();
                                        }
                                    }
                                )
                            }
                        })
                    }
                </View>
            )
        });
    }

    renderClose(close) {
        return (
            <TouchableHighlight
                activeOpacity={0.7}
                underlayColor={YITU.backgroundColor_Line}
                onPress={() => {
                    close()
                }}>
                <View style={{
                    height: 50,
                    backgroundColor: YITU.backgroundColor_0,
                    justifyContent: "center",
                    alignItems: 'center',
                    width: "100%"
                }}>
                    <Text style={{fontSize: YITU.fontSize_7, color: YITU.textColor_0}}>{"取消"}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    renderContainer(array) {
        let list = [];
        array && array.map((data, index) => {
            list.push(
                <View key={index}
                      style={{
                          marginLeft: YITU.space_5,
                          paddingRight: YITU.space_5,
                          paddingBottom: YITU.space_6,
                          flexDirection: 'row'
                      }}>
                    <TouchableOpacity onPress={() => {
                        if (data.onPress) {
                            data.onPress()
                        }
                    }} style={{alignItems: "center", justifyContent: 'center'}}>
                        <View style={{
                            backgroundColor: YITU.backgroundColor_0,
                            width: SIZE,
                            height: SIZE,
                            borderRadius: YITU.radius_1,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={data.image}
                                   style={data.style}/>
                        </View>
                        <Text
                            style={{
                                marginTop: YITU.space_2,
                                fontSize: YITU.fontSize_1,
                                color: "#888"
                            }}>{data.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
        if (list.length) {
            return (
                <View style={{flexDirection: 'row', flexWrap: "wrap", paddingTop: YITU.space_6}}>
                    {list}
                </View>
            )
        }
        return null;
    }


    render() {
        return null;


    }

}

module.exports = MyBottomAlert;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    textInput: {
        marginTop: YITU.space_5,
        padding: YITU.space_2,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ddd",
        maxHeight: 100,
        textAlign: "left"
    }
});


class MyAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            showError: false
        }
    }

    getValue() {
        return this.state.value;
    }

    showError(bool) {
        this.setState({
            showError: bool
        })
    }


    render() {
        return (
            <View style={{padding: YITU.space_6, alignItems: 'center'}}>
                <Text style={{fontSize: YITU.fontSize_7, color: YITU.textColor_0}}>{"请输入取消订单的原因"}</Text>

                <TextInput
                    placeholder={"输入您的原因"}
                    placeholderTextColor={YITU.textColor_2}
                    underlineColorAndroid={"transparent"}
                    style={[styles.textInput, {width: "100%", height: 60}]}
                    multiline={true}
                    maxLength={500}
                    textAlignVertical={"top"}
                    textDecorationLine={"none"}
                    blurOnSubmit={true}
                    onChangeText={(e) => {
                        this.setState({
                            value: e
                        })
                    }
                    }
                />
                <View style={{marginTop: YITU.space_2, width: "100%", justifyContent: "center"}}>
                    {
                        <Text style={{
                            fontSize: YITU.fontSize_15,
                            color: YITU.textColor_warn
                        }}>{this.state.showError ? "请输入取消原因" : ""}</Text>
                    }
                </View>
            </View>
        )
    }
}
