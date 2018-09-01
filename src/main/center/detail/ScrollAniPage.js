import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    NativeModules, Platform, DeviceInfo,
    ImageBackground
} from 'react-native';
import {PageView, LayoutBox, navigation, Toast, AppInit, Loading, ModalBox} from 'myapplib';
import AniHeadView from '../component/AniHeadView.js';
import NavHead from '../component/NavHead.js';
import SelectItem from '../component/aniSel/SelectItem.js';
import ScrollAniShowView from '../component/aniSel/ScrollAniShowView.js';
import OrderCommonPage from './OrderCommonPage';
import MyOrderFunc from '../component/bottomButton/MyOrderFunc';
import OrderTimeDown from '../component/OrderTimeDown';
import HttpTool from "../../../http/HttpTool";
import APIPZP from "../../../http/APIPZP";
import Storage from "../../../tool/Storage";
import OrderButton from '../component/animateBtn/OrderAnimatedButton';
import AutoHeightWebView from 'react-native-autoheight-webview';

const headImage_height = 155 + (Platform.OS === 'android' ? -20 : DeviceInfo.isIPhoneX_deprecated ? 24 : 0);

class ScrollAniPage extends Component {
    constructor(props) {
        super(props);
        this.position_Y = 0;
        this.isAutoControlScroll = true;
        this.state = ({
            update: 0
        })
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    editHtml(message) {
        let html = "";
        let mySize = YITU.fontSize_14;
        let lineHeight = YITU.lineHeight_9;
        html = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html"; charset="utf-8"><style type = "text/css">' +
            ' h4 {font-weight: bold;color: #333; font-size: ' + mySize + 'px ;margin-bottom: 0;} p {margin:0;padding:0;font-size: ' + mySize + 'px;color: #666;text-align: justify;text-justify:inter-ideograph;line-height: ' + lineHeight + 'px}' +
            ' #noselect { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none;-moz-user-select: none;-ms-user-select: none; user-select: none;}</style>' +
            '</head><body id="noselect" onselectstart="return false"><div>' + (message || "无") + "</div></body></html>";
        return html;
    }

    render() {
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            return null;
        }


        let addention = this.editHtml(orderMessage.addention);
        let freeDesc = this.editHtml(orderMessage.freeDesc);
        let backCompensate = this.editHtml(orderMessage.backCompensate);

        let view = (
            <View style={{
                flex: 1,
                backgroundColor: YITU.backgroundColor_1,
            }}>
                <AniHeadView ref={(a) => this.aniView = a}
                             aniImage={require('../../../image/order/anibg.png')}
                             aniHeight={headImage_height + 40}/>

                <ScrollView
                    ref={(a) => {
                        this.myScrollView = a
                    }}
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                    scrollEventThrottle={1}
                    onScroll={(e) => {
                        let y = e.nativeEvent.contentOffset.y;
                        this.aniView.setScrollNum(y);
                        this.navHead.setScrollNum(y);
                        this.position_Y = (YITU.navBarHeight + (this.isAutoControlScroll ? 40 : 41));
                        this.scrollAniShowView.setScrollNum(y, this.currentPosY0 - this.position_Y);
                        SelectItem.setScrollSel(this.selectItem, (y + this.position_Y) > this.currentPosY2 ? 2 : ((y + this.position_Y) > this.currentPosY1 ? 1 : 0));

                        // if (this.isAutoControlScroll) {
                        // }
                    }}
                    onMomentumScrollEnd={(e) => {
                        // let y = e.nativeEvent.contentOffset.y;
                        // this.position_Y=(YITU.navBarHeight+39);
                        // SelectItem.setScrollSel(this.selectItem,(y+this.position_Y)>this.currentPosY2?2:((y+this.position_Y)>this.currentPosY1?1:0));
                        this.isAutoControlScroll = true;
                    }}>

                    <View style={{height: headImage_height}}/>

                    <View style={[styles.actionCon, {marginBottom: YITU.space_7}]}>
                        {
                            //订单内容
                            <OrderCommonPage orderMessage={orderMessage} obj={this.props.obj}/>
                        }

                        {
                            //注意事项 费用说明 退改补偿
                        }
                        <View style={{width: "100%"}}>
                            <SelectItem cb={(index) => {
                                this.scrollToViewAction(index);
                            }}/>
                        </View>

                        <View style={{backgroundColor: YITU.backgroundColor_0}}>
                            <View style={styles.titleRow}
                                  onLayout={(e) => {
                                      NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                          this.currentPosY0 = pageY;
                                      });
                                  }}>
                                <Text style={styles.title}>• 注意事项</Text>
                            </View>
                            <AutoHeightWebView style={{flex: 1, paddingHorizontal: YITU.space_2}}
                                               source={{html: addention, baseUrl: ""}}/>

                            <View style={styles.titleRow}
                                  onLayout={(e) => {
                                      NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                          this.currentPosY1 = pageY;
                                      });
                                  }}>
                                <Text style={styles.title}>• 费用说明</Text>
                            </View>
                            <AutoHeightWebView style={{flex: 1, paddingHorizontal: YITU.space_2}}
                                               source={{html: freeDesc, baseUrl: ""}}/>

                            <View style={styles.titleRow}
                                  onLayout={(e) => {
                                      NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                          this.currentPosY2 = pageY;
                                      });
                                  }}>
                                <Text style={styles.title}>• 退改补偿</Text>
                            </View>
                            <View
                                style={{
                                    minHeight: 2 + YITU.screenHeight - (YITU.navBarHeight + (Platform.OS === 'android' ? 2.5 : 2) * YITU.d_RowHeight_2),
                                    width: '100%'
                                }}>

                                <AutoHeightWebView style={{flex: 1, paddingHorizontal: YITU.space_2}}
                                                   source={{html: backCompensate, baseUrl: ""}}/>
                            </View>
                        </View>
                    </View>
                    {
                        //订单状态
                        this.renderOrderStatus()
                    }
                </ScrollView>

                <NavHead
                    ref={(a) => this.navHead = a}
                    rightTitle={"•••"}
                    title={this.props.title || "订单详情"}
                    isBack={true}
                    cb={(index) => {
                        if (index === 1) {
                            navigation.pop(this.props.obj || this);
                        } else {
                            YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_function);
                            this.myAlert.show();
                        }
                    }}
                />
                <ScrollAniShowView
                    ref={(a) => this.scrollAniShowView = a}
                    view={<SelectItem
                        ref={(a) => this.selectItem = a}
                        cb={(index) => {
                            this.scrollToViewAction(index);
                        }}
                    />}/>

                {
                    //右上角按钮
                }
                <MyOrderFunc
                    ref={(ref) => this.myAlert = ref}
                    orderTypeTitle={
                        this.orderTypeTitle(orderMessage)
                    }
                    orderMessage={orderMessage}
                    obj={this.props.obj}/>

                {
                    //行程详情按钮
                    this.renderOrderButton()
                }
            </View>)
        ;
        return (
            view
        );
    }

    scrollToViewAction(index) {
        this.isAutoControlScroll = false;
        let scrollViewPosY = (index === 1) ? this.currentPosY1 : (index === 2 ? this.currentPosY2 : this.currentPosY0);
        scrollViewPosY = scrollViewPosY - (YITU.navBarHeight + YITU.d_RowHeight_2);
        this.myScrollView.scrollTo({x: 0, y: scrollViewPosY, animated: true});
    }

    statusMessage(orderMessage) {
        //订单状态，判断自己是否正在参与抢单
        let newInCompetition = orderMessage.newInCompetition;

        //判断订单是否可抢
        let isAvailable = orderMessage.isAvailable;

        //抢单成功后的订单状态
        let status = orderMessage.status;

        if (isAvailable === 2 && newInCompetition === 2) {
            return "已结束";
        }

        if (isAvailable !== undefined && isAvailable !== 1) {
            return "不可接单";
        }

        if (newInCompetition !== undefined) {
            let inCompetitionObj = {
                0: "等待抢单",
                1: "您正在抢单",
                2: "已结束",
            };
            return inCompetitionObj[newInCompetition];
        }

        if (status !== undefined) {
            let statusObj = {
                0: "待联系乘客",
                1: "服务中",
                2: "已甩单",
                3: "已取消",
                4: "已取消",
                5: "待结算",
                6: "已完成",
            }
            return statusObj[status];
        }

        return "";
    }

    orderTypeTitle(orderMessage) {
        //获取订单状态
        let secondType = orderMessage.secondType;
        //订单可接不可接原因
        let copyWriter = orderMessage.copyWriter || "";
        //倒计时
        let acceptCountDown;
        if (!isNaN(orderMessage.acceptCountDown)) {
            acceptCountDown = orderMessage.acceptCountDown * 1000;
        }
        //判断可接不可接
        let isAvailable = orderMessage.isAvailable;

        let newInCompetition = orderMessage.newInCompetition;
        // let newInCompetition = 1;
        // acceptCountDown = 100000;
        //航班号
        let flightNumber = orderMessage.flightNumber;
        //车型
        let carTypeName = orderMessage.carTypeName;

        let title = {
            101: {title: "接机", flightNumber: flightNumber},
            102: {title: "送机", flightNumber: flightNumber},
            103: {title: "市内包车"},
            104: {title: "单次接送"},
            106: {title: "跨城包车"},
            107: {title: "线路包车"},
            108: {title: "自由包车"},
            109: {title: "酒店接机", flightNumber: flightNumber},
            110: {title: "接机", flightNumber: flightNumber},
            111: {title: "送机", flightNumber: flightNumber},
            112: {title: "酒店送机", flightNumber: flightNumber},
        };

        let obj = title[secondType] || {};

        let orderStatusMessage = this.statusMessage(orderMessage) || "";
        return Object.assign({}, obj, {
            carTypeName: carTypeName,
            copyWriter: copyWriter,
            acceptCountDown: acceptCountDown,
            orderStatusMessage: orderStatusMessage,
            newInCompetition: newInCompetition,
            isAvailable: isAvailable
        })
    }

    //订单状态
    renderOrderStatus() {
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            return;
        }
        let data = this.orderTypeTitle(orderMessage) || {};
        return this.renderOrderStatusView(data);
    }

    renderOrderStatusView(data) {

        let couldClick = (data.newInCompetition !== 2) && (!(data.isAvailable !== undefined && data.isAvailable !== 1));
        let bottom = Platform.OS === "ios" ? YITU.space_3 : YITU.space_2;
        return (
            <ImageBackground resizeMode={"stretch"} source={require("../../../image/order/jiedan-bg.png")}
                             style={styles.flightBg}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', flex: 1, paddingLeft: YITU.space_0}}>
                    <View style={{
                        paddingTop: YITU.space_5,
                        paddingBottom: bottom,
                        paddingLeft: YITU.space_5,

                    }}>
                        <Text style={{
                            fontSize: YITU.fontSize_8,
                            color: YITU.textColor_1,
                            fontWeight: "bold"
                        }}>{data.title}</Text>
                    </View>

                    {
                        //航班
                        data.flightNumber ?
                            <View style={{
                                paddingTop: YITU.space_5,
                                paddingBottom: bottom, flex: 1
                            }}>
                                <Text
                                    selectable={true}
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}
                                    style={{
                                        fontSize: YITU.fontSize_15,
                                        color: YITU.textColor_1,
                                        marginLeft: YITU.space_2
                                    }}>{"航班：" + data.flightNumber}</Text>
                            </View> : null
                    }

                    {
                        //自己不可接，订单不可接
                        couldClick ?
                            <TouchableOpacity onPress={() => {
                                YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_movement);
                                navigation.push(this.props.obj, "OrderDynamicState", {
                                    title: "订单动态",
                                    id: this.props.orderMessage && this.props.orderMessage.orderId,
                                    acceptId: (this.props.orderMessage && this.props.orderMessage.acceptId) || null,
                                    changeBarStatus: (type) => {
                                        if (this.props.changeBarStatus) {
                                            this.props.changeBarStatus(type)
                                        }
                                    }
                                })
                            }
                            } style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                paddingRight: YITU.space_5,
                            }}>
                                <View style={{
                                    width: "100%",
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    marginTop: YITU.space_5,
                                    marginBottom: bottom,
                                }}>
                                    <Text style={{
                                        color: YITU.textColor_warn,
                                        fontSize: YITU.fontSize_5,
                                        fontWeight: "bold",
                                        backgroundColor: 'transparent'
                                    }}>{data.orderStatusMessage}</Text>
                                    {
                                        couldClick ?
                                            <Image style={{width: 13 / 2, height: 23 / 2, marginLeft: YITU.space_0}}
                                                   source={require("../../../image/userIcon/arrow.png")}/> : null
                                    }
                                </View>
                            </TouchableOpacity>
                            :
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingTop: YITU.space_5,
                                paddingRight: YITU.space_5,
                                paddingBottom: bottom
                            }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color: YITU.textColor_warn,
                                    fontSize: YITU.fontSize_5
                                }}>{data.orderStatusMessage}</Text>
                            </View>
                    }

                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: YITU.space_5,
                    paddingLeft: YITU.space_5 + YITU.space_0,
                    paddingRight: YITU.space_5,
                }}>
                    <Text selectable={true}
                          style={{fontSize: YITU.fontSize_15, color: YITU.textColor_3}}>{data.carTypeName}</Text>
                    {
                        (data.newInCompetition !== 1) ?
                            <Text numberOfLines={1}
                                  ellipsizeMode={"tail"} style={{
                                fontSize: YITU.fontSize_14,
                                color: YITU.textColor_2,
                                marginRight: couldClick ? (13 / 2 + YITU.space_0) : 0,
                            }}>{data.copyWriter}</Text> : this.renderTimeDown(data)
                    }
                </View>
            </ImageBackground>);
    }

    /**
     * 倒计时
     * @param data
     * @returns {*}
     */
    renderTimeDown(data) {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <OrderTimeDown style={{
                fontSize: YITU.fontSize_14,
                color: YITU.textColor_2,
            }}
                           time={data.acceptCountDown} callBack={() => {
                if (this.props.httpRobbingSuccess) {
                    this.props.httpRobbingSuccess()
                }
            }
            }/>
            <Text numberOfLines={1}
                  ellipsizeMode={"tail"} style={{
                fontSize: YITU.fontSize_14,
                color: YITU.textColor_2,
                marginRight: (13 / 2 + YITU.space_0)
            }}>{data.copyWriter}</Text>
        </View>
    }

    //////////
    /**
     * 动画按钮
     * @returns {XML}
     */
    renderOrderButton() {
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            return;
        }
        if (!(orderMessage.status === 0 || orderMessage.status === 1)) {
            return;
        }

        let message = "";
        if (orderMessage.status === 0) {
            message = "滑动来确认已联系乘客";
        } else if (orderMessage.status === 1) {
            message = "滑动来确认服务完成";
        }

        return (
            <View style={{alignSelf: "center", width: "85%", position: "absolute", bottom: YITU.d_barHeight}}>
                <OrderButton message={message} callBack={(cb) => {
                    if (orderMessage.status === 0) {
                        YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_contacted);
                        //先联系乘客
                        this.getCommit();
                    } else {
                        YITU.ClickTrackFunction(YITU.TrackOrderDetail.orderdetail_completed);
                        this.httpOrderStatusChange()
                    }

                    if (cb) {
                        //按钮重置
                        cb()
                    }
                }} width={YITU.screenWidth * 0.85}/>
            </View>
        )
    }

    /**
     * 改变订单状态
     */
    httpOrderStatusChange() {
        Loading.show();
        let orderMessage = this.props.orderMessage;
        if (!orderMessage) {
            Toast.show("订单信息错误");
            return;
        }
        let toastMessage = "";
        let status = 0;
        if (orderMessage.status === 0) {
            status = 1;
            toastMessage = "已联系乘客"
        } else if (orderMessage.status === 1) {
            status = 2;
            toastMessage = "已完成服务";
        }

        let param = {
            acceptId: orderMessage.acceptId,
            type: status
        };
        let successCallback = (code, message, json, option) => {
            //改变订单状态
            this.props.orderMessage.copyWriter = json && json.copyWriter;
            if (status === 1) {
                this.props.orderMessage.status = 1;
            } else if (status === 2) {
                this.props.orderMessage.status = 5;
            }
            this.setState({
                update: this.state.update++
            }, () => {
                if (this.props.obj) {
                    this.props.obj.backRefresh = true;
                }
                Loading.hide();
                Toast.show(toastMessage);
            })
        };

        let failCallback = (code, message, option) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.post(APIPZP.travel_app_trip_setServiceStatus, successCallback, failCallback, param);
    }

    /**
     * 拿出联系信息
     */
    getCommit() {
        let orderMessage = this.props.orderMessage;
        if (orderMessage.acceptId) {
            Storage.getInfo("TripDetail_" + orderMessage.acceptId, (error, result) => {
                if (error) {
                    Toast.show("订单信息错误");
                } else {
                    Storage.getUserInfo((userInfo) => {
                        if (userInfo && userInfo.type === 2 || result) {
                            this.httpOrderStatusChange()
                        } else {
                            ModalBox.showOK("请联系乘客", "请选择电话联系、发短信、微信联系，任意一种方式联系乘客")
                        }
                    })
                }
            })
        } else {
            Toast.show("订单信息错误");
        }
    }
}

module.exports = ScrollAniPage;

const htmlStyle = StyleSheet.create({
    h4: {
        fontSize: YITU.fontSize_14,
        color: YITU.textColor_1,
        lineHeight: YITU.lineHeight_9,
        fontWeight: "bold"
    },
    p: {
        lineHeight: YITU.lineHeight_9,
        fontSize: YITU.fontSize_14,
        color: YITU.textColor_3
    },
    div: {
        textAlign: 'justify'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },

    flightBg: {
        position: "absolute",
        top: headImage_height - 58,
        left: YITU.space_2,
        right: YITU.space_2,
        backgroundColor: "transparent",
        width: YITU.screenWidth - YITU.space_2 * 2,
        height: 90,
        justifyContent: 'center',
        paddingBottom: 4,
    },

    actionCon: {
        paddingTop: Platform.OS === "ios" ? 26 : 28,
        backgroundColor: YITU.backgroundColor_1,
    },

    titleRow: {
        height: YITU.d_RowHeight_2,
        justifyContent: "flex-end",
        paddingBottom: YITU.space_0,
        paddingHorizontal: YITU.space_5
    },
    title: {
        fontSize: YITU.fontSize_15,
        color: YITU.textColor_1,
        fontWeight: 'bold'
    },
    conText: {
        lineHeight: YITU.lineHeight_9,
        fontSize: YITU.fontSize_14,
        color: YITU.textColor_3
    }
});
