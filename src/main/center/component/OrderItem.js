import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import {navigation, ModalBox} from "myapplib"
import Storage from '../../../tool/Storage';
import SelectCell from '../../../component/SelectCell';

const IMAGE_SIZE = 24; //订单类别icon大小
const IMAGE_SIZE_SMALL = 15;//时间，出发，到达

class OrderItem extends Component {

    constructor(props) {
        super(props);
        // props.from "all":我的订单的item
        //props.isTrip true:行程或者我的订单 false:抢单
        this.state = {};
    }

    componentDidMount() {

    }

    /**
     * 图片对象
     * @returns {{101: *, 102: *, 104: *}}
     */
    imageObj() {
        let obj = {
            101: require('../../../image/main/order_jieji.png'),
            102: require('../../../image/main/order_songji.png'),
            104: require('../../../image/main/order_dcjs.png'),
            109: require('../../../image/main/order_jieji.png'), //酒店接机
            110: require('../../../image/main/order_jieji.png'), //指定区域接机
            111: require('../../../image/main/order_songji.png'),//指定区域送机
            112: require('../../../image/main/order_songji.png'),//酒店songji
        }
        return obj;
    }

    /**
     * 获取图片路径
     * @param type
     * @returns {*}
     */
    getImageSource(type) {
        let imageObj = this.imageObj();
        let imgSource = imageObj[type];
        if (!imgSource) {
            //默认图片
            imgSource = require('../../../image/main/order_bcy.png');
        }
        return imgSource;
    }

    myEditModal() {
        let mb = ModalBox.showConfig({
            title: {
                text: "不可接单",
                props: {},//标题参数 Text所有参数
                style: {},//标题样式

            },//标题选项，如果是一个React.Element 替换现在，
            desc: {
                text: "由于您的星级或者车型不符，所以该订单不可接",
                props: {},
                style: {},
                textStyle: {
                    textAlign: "center",
                    lineHeight: 20,
                    color: YITU.textColor_1
                },

            },
            foot: {
                direction: "row",
                buttons: [
                    {
                        text: "确定", style: {color: YITU.textColor_4, backgroundColor: 'transparent'}, onPress: (e) => {
                            mb.close()
                        }
                    },
                ]
            },
            modalConfig: {
                clickToClose: false,
            }
        })
    }

    /**
     * 跳转订单详情
     *
     *
     *
     */
    jumpToOrderDetail(data) {
        Storage.getUserInfo((userInfo) => {
                // if (!(this.props.isTrip) && data.isAvailable === 2) {
                //     this.myEditModal();
                //     return;
                // }

                if (userInfo && (userInfo.isbanned === 1) && (!this.props.isTrip)) {
                    let message = "";
                    if (userInfo.bannedSecond) {
                        let runTime = userInfo.bannedSecond;
                        let int_day = Math.floor(runTime / (60 * 60 * 24));
                        let int_hour = Math.floor(runTime / (60 * 60)) - (int_day * 24) + 1;
                        message = int_day + "天" + int_hour + "小时" + "后恢复接单权限";
                    }
                    ModalBox.showOK("您已被封号", message);
                    return;
                }

                if ((!this.props.isTrip) && data.isAvailable === 1 && userInfo && userInfo.is_trained === 0) {
                    ModalBox.showOK("完成培训后可接单");
                    return;
                }

                let path = "RobbingDetail";
                if (this.props.isTrip) {
                    path = "TripDetail";
                }
                let id = "";
                //接单和行程主键名不一样
            if (this.props.isTrip) { // 是行程或我的订单
                id = this.props.data.acceptId;
            } else { // 接单页
                id = this.props.data.orderId;
            }
                navigation.push(this.props.obj, path, {
                    title: '订单详情',
                    callBack: () => {
                        if (this.props.onRefresh)
                            this.props.onRefresh()
                    },
                    isTrip: this.props.isTrip,
                    id: id,
                });
            }
        );

    }

    render() {
        let data = this.props.data;
        if (!data) {
            return null;
        }

        let img = this.getImageSource(data.secondType);
        return (
            <SelectCell
                style={{backgroundColor: YITU.backgroundColor_0, marginTop: YITU.space_2}}
                onPress={() => {
                    this.jumpToOrderDetail(data);
                }}>

                {
                    //类别
                }
                <View style={{
                    flexDirection: "row", marginHorizontal: YITU.space_5, marginBottom: 0,
                    alignItems: 'flex-end'
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, paddingTop: YITU.space_5}}>

                        <Image style={{
                            height: IMAGE_SIZE,
                            width: IMAGE_SIZE,
                            backgroundColor: "transparent",
                        }}
                               resizeMode={"contain"}
                               source={img}/>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text
                                style={{
                                    marginLeft: 7,
                                    fontSize: YITU.fontSize_5,
                                    color: YITU.textColor_0,
                                    fontWeight: "bold"
                                }}>
                                {data.secondTypeName || ""}
                            </Text>
                            <Text style={{
                                marginLeft: YITU.space_2,
                                fontSize: YITU.fontSize_3,
                                color: YITU.textColor_3,
                                top: 1
                            }}>
                                {data.carTypeName || ""}
                            </Text>
                            {
                                this.props.isTrip ? <View style={{alignItems: 'flex-end', flex: 1,}}>
                                    <Text style={{
                                        color: YITU.textColor_warn,
                                        backgroundColor: "transparent",
                                        fontSize: YITU.fontSize_3
                                    }}>
                                        {this.showStatus(data.status)}
                                    </Text>
                                </View> : null
                            }
                        </View>
                    </View>
                    {this.renderOrderState(data)}
                </View>

                {
                    //时间
                }
                <View
                    style={{
                        flexDirection: "row",
                        marginHorizontal: YITU.space_5,
                        marginTop: YITU.space_2,
                        alignItems: 'center'
                    }}>
                    <Image style={{
                        height: IMAGE_SIZE_SMALL,
                        width: IMAGE_SIZE_SMALL,
                        backgroundColor: "transparent",
                    }} source={require('./img_clock.png')}/>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={{fontSize: YITU.fontSize_4, color: YITU.textColor_1, marginLeft: 7}}>
                        {data.useTime + "(当地时间)"}
                    </Text>
                </View>

                {
                    //地点
                }
                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: YITU.space_5,
                        marginTop: YITU.space_2,
                        alignItems: 'center'
                    }}>
                    {
                        //left
                    }
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", alignItems: 'center'}}>
                            <Image style={{
                                height: IMAGE_SIZE_SMALL,
                                width: IMAGE_SIZE_SMALL,
                                backgroundColor: "transparent",
                            }}
                                   resizeMode={"contain"}
                                   source={require('./img_qd.png')}/>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={{
                                    fontSize: YITU.fontSize_4,
                                    color: YITU.textColor_1,
                                    marginLeft: 7,
                                    marginRight: YITU.space_5
                                }}>
                                {data.fromAddressName || ""}
                            </Text>
                        </View>
                        {
                            data.toAddressName ?
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    marginTop: YITU.space_2,
                                }}>
                                    <Image style={{
                                        height: IMAGE_SIZE_SMALL,
                                        width: IMAGE_SIZE_SMALL,
                                        backgroundColor: "transparent",
                                    }}
                                           resizeMode={"contain"}
                                           source={require('./img_zd.png')}/>
                                    <Text numberOfLines={1}
                                          ellipsizeMode={"tail"}
                                          style={{fontSize: YITU.fontSize_4, color: YITU.textColor_1, marginLeft: 7,}}>
                                        {data.toAddressName}
                                    </Text>
                                </View> : null
                        }

                    </View>
                    {
                        data.inCompetition === 1 ?
                            <View style={{
                                width: 70,
                                height: 23,
                                borderRadius: 16,
                                backgroundColor: YITU.backgroundColor_robbing,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: "flex-end"
                            }}>
                                <Text style={{color: YITU.textColor_warn, fontSize: YITU.fontSize_1}}>{"正在抢单"}</Text>
                            </View> : null
                    }
                </View>

                <View style={{
                    width: "100%",
                    height: StyleSheet.hairlineWidth,
                    marginTop: YITU.space_5,
                    backgroundColor: YITU.backgroundColor_Line
                }}/>

                {
                    //路程和结算价
                }
                <View style={{flexDirection: "row",}}>
                    <View style={{
                        marginVertical: YITU.space_2,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: YITU.fontSize_5, color: YITU.textColor_0, fontWeight: "bold"}}>
                            {data.secondType === 107 || data.secondType === 103 || data.secondType === 106 || data.secondType === 108 ?
                                (data.days ? data.days : "0") + "天" :
                                (data.estimatedDistance ? data.estimatedDistance : "0") + "km"
                            }
                        </Text>
                        <Text style={{fontSize: YITU.fontSize_2, marginTop: 2, color: YITU.textColor_2}}>
                            {data.secondType === 107 || data.secondType === 103 || data.secondType === 106 || data.secondType === 108 ?
                                "服务天数" : "预估路程"
                            }
                        </Text>
                    </View>
                    <View style={{
                        width: StyleSheet.hairlineWidth,
                        height: "100%",
                        backgroundColor: YITU.backgroundColor_Line
                    }}/>
                    <View style={{
                        marginVertical: YITU.space_2,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: YITU.fontSize_5, color: YITU.textColor_warn, fontWeight: "bold"}}>
                            {data.isAvailable === 2 ? ("暂不可见") : ("¥" + (data.driverAmount ? data.driverAmount : "0.00"))}
                        </Text>
                        <Text style={{fontSize: YITU.fontSize_2, marginTop: 2, color: YITU.textColor_2}}>结算价</Text>
                    </View>
                </View>
                {this.getOrderWait(data)}
            </SelectCell>
        );
    }

    //待联系乘客item
    getOrderWait(data) {
        return data.oderStatus && data.oderStatus > 5 ?
            <View style={{
                padding: YITU.space_2,
                backgroundColor: "#f8f8f8",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{fontSize: 13, color: YITU.textColor_2}}>
                    {data.nearTime && data.nearTime != 0 ? "距离服务开始还有" + data.nearTime + "天" :
                        "用车时间已过"}
                </Text>
            </View> : null
    }

    showStatus(status) {
        let obj = {
            0: "待联系乘客",
            1: "服务中",
            2: "已甩单",
            3: "已取消",
            4: "已取消",
            5: "待结算",
            6: "已完成",
        };

        if (obj[status]) {
            return obj[status];
        } else {
            return "";
        }
    }

    /**
     * 展示星级
     * @param data
     * @returns {*}
     */
    renderOrderState(data) {
        if (!this.props.isTrip) {
            if (data.level && (!isNaN(data.level))) {
                return <View
                    style={{height: "100%", flexDirection: 'row', alignItems: 'center', paddingTop: YITU.space_5}}>
                    {
                        this.renderStar(data.level)
                    }
                </View>
            } else {
                return null
            }
        }
    }

    /**
     * 星级图片组合
     */
    renderStar(no) {
        let list = [];
        for (let i = 0; i < no; i++) {
            list.push(
                <Image key={i} style={{height: 9, width: 10}} source={require("../../../image/order/star2.png")}/>
            )
        }
        return list;
    }

    getMyDay(date) {
        // let day = new Date(date.replace(/-/g, "/"))
        // let week = "";
        // if (day.getDay() === 0) week = "周日"
        // if (day.getDay() === 1) week = "周一"
        // if (day.getDay() === 2) week = "周二"
        // if (day.getDay() === 3) week = "周三"
        // if (day.getDay() === 4) week = "周四"
        // if (day.getDay() === 5) week = "周五"
        // if (day.getDay() === 6) week = "周六"
        // return date.trim().substring(0, 10) + "  " + week + date.trim().substring(10);
        // return "";
    }
}

const styles = StyleSheet.create({});

module.exports = OrderItem;
//订单类型
// let secondTypeJj = "101";  //接机
// let secondTypeSj = "102";  //送机
// let secondTypeJS = "104";  //单次接送
// let secondTypeBC1 = "103";  //市内包车
// let secondTypeBC2 = "106";  //跨市包车
// let secondTypeBC3 = "107";  //线路包车
// let secondTypeBC4 = "108";  //自由包车
