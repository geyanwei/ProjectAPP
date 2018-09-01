import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Clipboard,
    NativeModules,
    Platform,
    PixelRatio,
    Linking,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import {Loading, ModalBox, navigation, Toast} from "myapplib";
import MyBottomAlert from '../component/bottomButton/MyBottomAlert';
import androidMap from '../../../tool/MapUtils';
import HTMLView from '../component/htmlView';
import HttpTool from "../../../http/HttpTool";
import APIPZP from "../../../http/APIPZP";
import Storage from "../../../tool/Storage";
import TextCopy from '../component/Text/Text';

const IMAGE_SCALE = Platform.OS === 'ios' ? 1 : PixelRatio.get();
const IMAGE_SIZE = 10 * IMAGE_SCALE;

class OrderCommonPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    /**
     * 存储联系信息
     */
    recordCommit() {
        let orderMessage = this.props.orderMessage || {};
        if (orderMessage.acceptId) {
            Storage.saveInfo("TripDetail_" + orderMessage.acceptId, true)
        } else {
            Toast.show("订单信息错误");
        }
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
     * 订单具体信息
     */
    renderOrderDetail() {
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            return;
        }
        return (
            <View style={{
                paddingHorizontal: YITU.space_5,
                paddingVertical: YITU.space_6,
                backgroundColor: YITU.backgroundColor_0,
            }}>
                {
                    //时间
                }
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                    <Text style={{
                        fontSize: YITU.fontSize_15,
                        color: YITU.textColor_1,
                        fontWeight: "bold"
                    }}><Text>{"服务时间"}</Text></Text>
                    <TouchableWithoutFeedback onLongPress={() => {
                        this.copyOrderMessage()
                    }}>
                        <View style={{flex: 1, marginLeft: YITU.space_6}}>
                            <Text numberOfLines={1}
                                  ellipsizeMode={"tail"}
                                  style={{color: YITU.textColor_1, fontSize: YITU.fontSize_4,}}>
                                <Text>{(orderMessage.useTime ? this.getMyDay(orderMessage.useTime) : "") + " (当地时间)"}</Text>
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                {
                    //起点
                    this.renderFrom(orderMessage)
                }

                {
                    //终点
                    this.renderTo(orderMessage)
                }

                {
                    //服务范围
                    this.renderServerRange(orderMessage)
                }
            </View>
        )
    }

    /**
     * 复制出发时间，出发地点，到达地点
     */
    copyOrderMessage() {
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            Toast.show("订单信息复制失败");
        }
        let message = "";

        //时间
        if (orderMessage.useTime) {
            message += "服务时间: " + this.getMyDay(orderMessage.useTime) + " (当地时间)"
        }

        //接机
        let obj = this.fromType();
        if (orderMessage.secondType) {
            message += "\n" + obj[orderMessage.secondType] + ": "
                + (orderMessage.fromAddressName ? orderMessage.fromAddressName : "")
                + ((orderMessage.secondType === 101 || orderMessage.secondType === 109 || orderMessage.secondType === 110) ? "" : (orderMessage.fromAddress ? ("\n" + obj[orderMessage.secondType] + "详情: " + orderMessage.fromAddress) : ""));
        }

        //送机
        if (!(((!orderMessage.toAddressName) && (!orderMessage.toAddress)) || orderMessage.secondType === 107)) {
            message += "\n送达地址: " + (orderMessage.toAddressName ? orderMessage.toAddressName : "")
                + ((orderMessage.secondType === 102 || orderMessage.secondType === 111 || orderMessage.secondType === 112) ? "" : (orderMessage.toAddress ? ("\n送达地址详情: " + orderMessage.toAddress) : ""))
        }

        //服务范围
        if (orderMessage.secondType === 107 || orderMessage.secondType === 103 || orderMessage.secondType === 106) {
            message += "\n服务范围: " + (orderMessage.productName ? orderMessage.productName : "");
        }

        if (orderMessage.secondType === 108) {//自由包车
            let schedule = orderMessage.schedule || [];
            message += "\n包车行程: ";
            if (Object.prototype.toString.call(schedule) === '[object Array]') {
                schedule.map((data) => {
                    let day = data.day || 0;
                    let content = data.content || "";
                    message += "\n" + ("第" + day + "天 " + content);
                    if (data.freeTime || data.freeDistance) {
                        message += ((data.freeTime || 0) + "小时" + (data.freeDistance || 0) + "公里")
                    }
                })
            }
        }
        Clipboard.setString(message);
        Toast.show("订单信息已复制到剪切板");
    }

    fromType() {
        return {
            101: "接机地址",
            102: "上车地址",
            103: "上车地址",
            104: "上车地址",
            106: "上车地址",
            107: "上车地址",
            108: "上车地址",
            109: "接机地址",
            110: "接机地址",
            111: "上车地址",
            112: "上车地址",
        }
    }

    /**
     * 起点界面
     */
    renderFrom(orderMessage) {

        let obj = this.fromType();

        let view = ((!orderMessage.fromAddressName) && (!orderMessage.fromAddress)) ? null : (
            <View style={{
                marginTop: YITU.space_5,
                flexDirection: "row",
                flex: 1,
                marginRight: YITU.space_3,
            }}>
                <Text style={{
                    fontSize: YITU.fontSize_15,
                    color: YITU.textColor_1,
                    fontWeight: "bold"
                }}><Text>{obj[orderMessage.secondType]}</Text></Text>
                <View style={{flex: 1, marginLeft: YITU.space_6}}>
                    <TouchableOpacity onPress={() => {
                        YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_gohere);
                        this.openMap(orderMessage.fromLongitude, orderMessage.fromLatitude)
                    }} onLongPress={() => {
                        this.copyOrderMessage()
                    }}>
                        <Text style={{color: YITU.textColor_1, fontSize: YITU.fontSize_15,}}>
                            <Text>{orderMessage.fromAddressName ? orderMessage.fromAddressName : ""}</Text>
                        </Text>
                        {
                            (orderMessage.secondType === 101 || orderMessage.secondType === 109 || orderMessage.secondType === 110) ? null :

                                <Text style={{
                                    marginTop: YITU.space_0,
                                    fontSize: YITU.fontSize_14,
                                    color: YITU.textColor_3,
                                    lineHeight: YITU.fontSize_14 + 4
                                }}><Text>{orderMessage.fromAddress ? orderMessage.fromAddress + "   " : ""}</Text>
                                    <Image style={{
                                        marginTop: 1,
                                        width: IMAGE_SIZE,
                                        height: IMAGE_SIZE
                                    }}
                                           source={require("../../../image/order/daohang.png")}/>
                                </Text>

                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
        return view;
    }

    /**
     * 打开地图
     */
    openMap(Longitude, Latitude) {
        if ((!Longitude) && (!Latitude)) {
            Toast.show("无法获取该地址坐标,请打开地图手动导航");
            return;
        }

        if (Platform.OS === 'android') {
            androidMap.StartMap(Latitude, Longitude);
        } else {
            if (NativeModules.MapNativeModule) {
                NativeModules.MapNativeModule.mapList((data) => {
                    if (data) {
                        let dataList = data.mapList;
                        if (Object.prototype.toString.call(dataList) === '[object Array]') {
                            dataList.push({key: "iosMap", name: "苹果地图"});
                        } else {
                            dataList = [{key: "iosMap", name: "苹果地图"}];
                        }
                        let array = [];
                        dataList && dataList.map((data) => {
                            array.push({
                                title: data.name,
                                callBack: () => {
                                    NativeModules.MapNativeModule.openMap(data.key, Latitude, Longitude);
                                }
                            })
                        });
                        this.myBottom.show("选择地图", array);
                    }
                })
            } else {
                Toast.show("读取地图信息失败");
            }
        }

    }

    /**
     * 终点
     */
    renderTo(orderMessage) {
        let view = (((!orderMessage.toAddressName) && (!orderMessage.toAddress)) || orderMessage.secondType === 107) ? null : (
            <View style={{
                flexDirection: "row",
                marginTop: YITU.space_5
            }}>
                <View style={{flex: 1, flexDirection: "row",}}>
                    <Text style={{
                        fontSize: YITU.fontSize_15,
                        color: YITU.textColor_1,
                        fontWeight: "bold"
                    }}><Text>{"送达地址"}</Text></Text>

                    <View style={{flex: 1, marginLeft: YITU.space_6}}>
                        <TouchableOpacity
                            onPress={() => {
                                YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_gohere);
                                this.openMap(orderMessage.toLongitude, orderMessage.toLatitude)
                            }}
                            onLongPress={() => {
                                this.copyOrderMessage()
                            }}>
                            <Text
                                style={{color: YITU.textColor_1, fontSize: YITU.fontSize_15,}}>
                                <Text>{orderMessage.toAddressName ? orderMessage.toAddressName : ""}</Text>
                            </Text>
                            {
                                (orderMessage.secondType === 102 || orderMessage.secondType === 111 || orderMessage.secondType === 112) ? null :
                                    <Text style={{
                                        marginTop: YITU.space_0,
                                        fontSize: YITU.fontSize_14,
                                        color: YITU.textColor_3,
                                        lineHeight: YITU.fontSize_14 + 4
                                    }}>{orderMessage.toAddress ? orderMessage.toAddress + "   " : ""}
                                        <Image style={{
                                            marginTop: 1,
                                            width: IMAGE_SIZE,
                                            height: IMAGE_SIZE
                                        }}
                                               source={require("../../../image/order/daohang.png")}/>
                                    </Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
        return view;
    }

    /**
     * 服务范围
     * @param orderMessage
     */
    renderServerRange(orderMessage) {
        let message = "";
        let title = "";
        let messageArray = [];
        if (orderMessage.secondType === 107 || orderMessage.secondType === 103 || orderMessage.secondType === 106) {
            title = "服务范围";
            message = (orderMessage.productName ? orderMessage.productName : "");
        } else if (orderMessage.secondType === 108) {//自由包车
            let schedule = orderMessage.schedule || [];
            title = "包车行程";
            if (Object.prototype.toString.call(schedule) === '[object Array]') {
                schedule.map((data) => {
                    let day = data.day || 0;
                    let content = data.content || "";
                    if (data.freeTime || data.freeDistance) {
                        messageArray.push({
                            title: ("第" + day + "天 " + content),
                            detail: ((data.freeTime || 0) + "小时" + (data.freeDistance || 0) + "公里")
                        })
                    } else {
                        messageArray.push({
                            title: ("第" + day + "天 " + content),
                        })
                    }
                })
            }
        }
        if (title) {
            return <TouchableWithoutFeedback onLongPress={() => this.copyOrderMessage()}>
                <View style={{
                    marginTop: YITU.space_5,
                    flexDirection: "row",
                    flex: 1,
                    marginRight: YITU.space_3,
                }}>
                    <Text style={{
                        fontSize: YITU.fontSize_15,
                        color: YITU.textColor_1,
                        fontWeight: "bold"
                    }}>
                        <Text>{
                            title
                        }</Text>
                    </Text>
                    <View style={{flex: 1, marginLeft: YITU.space_6}}>
                        {
                            messageArray && messageArray.length > 0 ?
                                messageArray.map((data, index) => {
                                    return (
                                        <View key={index}>
                                            <Text style={{
                                                marginTop: (index === 0) ? 0 : YITU.space_0,
                                                color: YITU.textColor_1,
                                                fontSize: YITU.fontSize_15,
                                            }}><Text>{data.title}</Text></Text>
                                            {
                                                data.detail ?
                                                    <Text style={{
                                                        marginTop: 2,
                                                        marginBottom: ((messageArray.length - 1) === index) ? 0 : 4,
                                                        color: YITU.textColor_adorn,
                                                        fontSize: YITU.fontSize_15,
                                                    }}><Text>{data.detail}</Text></Text> : null
                                            }
                                        </View>)
                                }) : <Text style={{color: YITU.textColor_1, fontSize: YITU.fontSize_15,}}>
                                    <Text>{message}</Text>
                                </Text>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        }
        return null;
    }


    renderLine(height) {
        return (<View style={{backgroundColor: "transparent", height: height ? height : YITU.space_2}}/>);
    }

    /**
     * 客服额外要求模块
     */
    renderUserOrder() {
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            return;
        }

        let children = orderMessage.children || 0;
        let adults = orderMessage.adults || 0;
        let luggage = orderMessage.luggage || 0;
        let remark = orderMessage.remark;
        let orderId = orderMessage.orderId || "无";

        let additionalServiceList = orderMessage.additionalServiceList || [];//附加服务
        let array = [
            {title: "乘车人数", detail: adults + "成人／" + children + "儿童／" + luggage + "行李"},
        ];
        let extralArray = [];
        if (Object.prototype.toString.call(additionalServiceList) === '[object Array]') {
            additionalServiceList.map((data) => {
                extralArray.push(data);
            })
        }
        if (extralArray.length > 0) {
            array.push({title: "增值服务", detail: extralArray})
        }

        if (remark) {
            array.push({title: "额外要求", detail: remark});
        }

        return (
            <View style={{backgroundColor: YITU.backgroundColor_0,}}>
                <View style={{padding: YITU.space_5, paddingBottom: 0}}>
                    {
                        this.renderCellHtml(array)
                    }
                </View>
                {
                    this.renderSmallLine()
                }
                <View style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    paddingHorizontal: YITU.space_5,
                    paddingTop: YITU.space_5
                }}>
                    <View style={{flex: 1}}>
                        {
                            this.renderCellHtml([{title: "订单编号", detail: orderId}])
                        }
                    </View>
                    <TouchableOpacity onPress={() => {
                        YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_copynumber);
                        Clipboard.setString(orderMessage.orderId + "");
                        Toast.show("订单号已复制到您的剪切板");
                    }} style={{
                        backgroundColor: YITU.textColor_2,
                        padding: 1,
                        borderRadius: YITU.radius_1,
                        marginBottom: YITU.space_5
                    }}>
                        <View style={{
                            paddingVertical: 3,
                            borderRadius: YITU.radius_1,
                            paddingHorizontal: YITU.space_5, backgroundColor: '#fff'
                        }}>
                            <Text style={{fontSize: YITU.fontSize_15, color: YITU.textColor_2}}>{"复制"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /**
     * html格式展示数据
     * @param data
     * @returns {Array}
     */
    renderCellHtml(data) {
        let list = [];

        data && data.map((item, index) => {
            list.push(
                Object.prototype.toString.call(item.detail) === '[object Array]' ?
                    <View key={index}
                          style={{flexDirection: 'row', marginBottom: YITU.space_5 - YITU.space_2,}}>
                        <View style={{height: 30, justifyContent: 'center'}}>
                            <Text style={{
                                color: YITU.textColor_1,
                                fontSize: YITU.fontSize_15,
                                fontWeight: 'bold',
                            }}><Text>{item.title}</Text></Text>
                        </View>
                        <View style={{flex: 1, marginLeft: YITU.space_6, flexWrap: "wrap", flexDirection: 'row'}}>
                            {this.renderExtralView(item.detail)}
                        </View>
                    </View> :
                    <View key={index}
                          style={{flexDirection: 'row', marginBottom: YITU.space_5,}}>
                        <Text style={{
                            color: YITU.textColor_1,
                            fontSize: YITU.fontSize_15,
                            lineHeight: YITU.fontSize_15 + 5,
                            fontWeight: 'bold'
                        }}><Text>{item.title}</Text></Text>
                        <View style={{flex: 1, marginLeft: YITU.space_6, flexWrap: "wrap", flexDirection: 'row'}}>
                            <HTMLView stylesheet={styles} value={"<div>" + item.detail + "</div>"}/>
                        </View>
                    </View>
            )
        });

        return list;
    }

    /**
     * 增值服务
     * @param array
     * @returns {Array}
     */
    renderExtralView(array) {
        let list = [];
        array.map((data, index) => {

            let number = "";
            if (data.sid === "PICKUPCARD" || data.sid === "HOTELCHECKIN" || data.sid === "TRANSLATION" || data.sid === "AIRPORTCHECKIN") {
                number = "";
            } else {
                number = " " + data.number;
            }
            list.push(<View key={index} style={{
                height: 30,
                justifyContent: 'center',
                backgroundColor: YITU.textColor_3,
                borderRadius: YITU.radius_0,
                paddingHorizontal: YITU.space_2,
                marginBottom: YITU.space_2,
                marginRight: YITU.space_2
            }}>
                <TextCopy style={{color: "#fff", fontSize: YITU.fontSize_14}}>{data.name + number}</TextCopy>
            </View>);
        })
        return list;
    }

    renderSmallLine() {
        return <View style={{
            backgroundColor: YITU.backgroundColor_Line,
            height: StyleSheet.hairlineWidth,
            marginLeft: YITU.space_5,
        }}/>
    }

    /**
     * 联系乘客
     */
    contactCustomPhone(dataList, type) {
        let message = "请选择乘客电话号码";
        if (type) {
            message = "请选择乘客入住酒店电话";
        }
        let array = [];
        dataList && dataList.map((data) => {
            array.push({
                title: data.phone + " " + data.type,
                callBack: () => {
                    //记录联系过(排除酒店)
                    if (!type) {
                        this.recordCommit();
                    }
                    Linking.canOpenURL('tel:' + data.phone).then(supported => {
                        if (!supported) {
                            Toast.show("您的设备不支持直接拨打电话");
                        } else {
                            return Linking.openURL('tel:' + data.phone);
                        }
                    }).catch(err => Toast.show("您的设备不支持直接拨打电话"));
                }
            })
        });
        this.myBottom.show(message, array);
    }

    /**
     * 联系乘客短信
     * @param dataList
     */
    contactCustomMsg(dataList) {
        let array = [];
        dataList && dataList.map((data) => {
            array.push({
                title: data.phone + " " + data.type,
                callBack: () => {
                    //记录联系过
                    this.recordCommit();
                    Linking.canOpenURL('sms:' + data.phone).then(supported => {
                        if (!supported) {
                            Toast.show("您的设备不支持直接发送短信");
                        } else {
                            return Linking.openURL('sms:' + data.phone);
                        }
                    }).catch(err => Toast.show("您的设备不支持直接发送短信"));
                }
            })
        });


        this.myBottom.show("请选择乘客电话号码", array);
    }

    /**
     * 联系乘客微信
     */
    contactWechat(data) {
        Clipboard.setString(data);
        let cb = ModalBox.showSelect({
            title: "复制成功",
            desc: "已复制乘客微信号，请跳转至微信添加好友并联系乘客",
            okTitle: "前往微信",
        }, (v) => {
            // 记录联系
            if (v) {
                this.recordCommit();
                if (NativeModules.WeChatNativeModule) {
                    NativeModules.WeChatNativeModule.open_weixin((bool) => {
                        if (bool) {
                        } else {
                            Toast.show("请先安装微信");
                        }
                        cb.close();
                    });
                }
            } else {
                cb.close();
            }
        });
    }

    /**
     * 联系方式
     */
    renderContact() {
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            return;
        }

        //取消，改派，甩单不显示
        if (orderMessage.status === 2 || orderMessage.status === 3 || orderMessage.status === 4 || orderMessage.status === 5 || orderMessage.status === 6) {
            return;
        }

        if (!orderMessage.passengerInfo) {
            return;
        }

        let userInfo = orderMessage.passengerInfo || {};
        let contactArray = [];

        let phoneArray = [];

        if (userInfo.areaCode && userInfo.phone) {
            phoneArray.push({phone: ("+" + userInfo.areaCode + userInfo.phone), type: "(联系电话)"});
        }

        if (userInfo.overSeasAreaCode && userInfo.overSeasPhone) {
            phoneArray.push({phone: ("+" + userInfo.overSeasAreaCode + userInfo.overSeasPhone), type: "(备用电话)"});
        }

        contactArray.push({
            title: "电话联系",
            type: "phone",
            detail: phoneArray,
            source: require("../../../image/order/dhlx.png"),
            style: {width: 30 / 2, height: 47 / 2}
        });
        contactArray.push({
            title: "短信联系",
            type: "message",
            detail: phoneArray,
            source: require("../../../image/order/dxlx.png"),
            style: {width: 50 / 2, height: 45 / 2}
        });
        if (userInfo.wechat) {
            contactArray.push({
                title: "微信联系",
                type: "wechat",
                detail: userInfo.wechat,
                source: require("../../../image/order/wxlx.png"),
                style: {width: 59 / 2, height: 50 / 2}
            });
        }
        if (userInfo.hotelPhone) {
            contactArray.push({
                title: "酒店电话",
                type: "hotelPhone",
                detail: [{phone: ("+" + userInfo.hotelAreaCode + userInfo.hotelPhone), type: ""}],
                source: require("../../../image/order/jddh.png"),
                style: {width: 48 / 2, height: 45 / 2}
            })
        }

        return (
            <View>
                <View style={{backgroundColor: YITU.backgroundColor_0}}>
                    <View style={{flexDirection: 'row', padding: YITU.space_5, alignItems: 'center'}}>
                        <Text style={{
                            color: YITU.textColor_1,
                            fontSize: YITU.fontSize_15,
                            lineHeight: YITU.fontSize_15,
                            fontWeight: 'bold'
                        }}>{"乘客姓名"}</Text>
                        <TextCopy
                            style={{marginLeft: YITU.space_6, color: YITU.textColor_1, fontSize: YITU.fontSize_15,}}>
                            {userInfo.name}
                        </TextCopy>
                    </View>
                    {
                        this.renderSmallLine()
                    }
                    <View style={{flexDirection: 'row', width: "100%"}}>
                        {
                            contactArray.map((item, index) => {
                                return (
                                    <View key={index} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                        {
                                            index > 0 ?
                                                <View style={{
                                                    height: 40,
                                                    backgroundColor: YITU.backgroundColor_Line,
                                                    width: StyleSheet.hairlineWidth
                                                }}/> : null
                                        }
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (item.type === 'wechat') {
                                                    YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_wechat);
                                                    this.contactWechat(item.detail);
                                                } else if (item.type === 'phone') {
                                                    YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_call);
                                                    this.contactCustomPhone(item.detail);
                                                } else if (item.type === 'message') {
                                                    YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_message);
                                                    this.contactCustomMsg(item.detail);
                                                } else if (item.type === "hotelPhone") {
                                                    YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_hotelphone);
                                                    this.contactCustomPhone(item.detail, "hotelPhone");
                                                }
                                            }} style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                                            <View style={{
                                                alignItems: 'center', marginVertical: YITU.space_5
                                            }}>
                                                <Image source={item.source} style={[item.style]}/>
                                                <Text style={{
                                                    marginTop: YITU.space_2,
                                                    color: YITU.textColor_1,
                                                    fontSize: YITU.fontSize_14
                                                }}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>)
                            })
                        }
                    </View>
                </View>
                {
                    this.renderLine()
                }
            </View>);
    }

    render() {
        return (<View>
            {
                this.renderLine()
            }
            {
                this.renderOrderDetail()
            }
            {
                this.renderLine()
            }
            {
                this.renderContact()
            }
            {
                this.renderUserOrder()
            }
            {
                this.renderLine()
            }
            <MyBottomAlert ref={(ref) => this.myBottom = ref}/>
        </View>);
    }
}

const styles = StyleSheet.create({
    div: {
        lineHeight: YITU.fontSize_15 + 5,
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_15,
    }
});

module.exports = OrderCommonPage;

