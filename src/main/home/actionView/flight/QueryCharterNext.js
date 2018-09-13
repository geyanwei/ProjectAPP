import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {PageView, navigation, Toast, Loading} from 'myapplib';

import HttpTool from "../../../../http/HttpTool";
import APIGYW from "../../../../http/APIGYW.js";
import BottomItemView from "./component/BottomItemView.js";
import MyRow from "../../../../component/MyRow.js";
import QueryCharterItemDetail from "./component/QueryCharterItemDetail.js";
import DetailsModule from "./component/DetailsModule.js";
import Tool from "../../../../tool/Tool";

let keyBoard = {};
if (Platform.OS === 'ios') {
    keyBoard.behavior = "padding"
}

class QueryCharterNext extends Component {
    constructor(props) {
        super(props);
        this.myValue = props.values || {};
        this.carDescObj = props.carDescObj || {};
        this.isRead = true;
        this.state = {
            upData: 1,
            data: []
        };
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        Loading.show();
        setTimeout(() => {
            Loading.hide();

        }, 1000);
    }

    //获取每日视图数据
    getRowData() {
        let data = [];
        if (this.myValue.days){
            data=[{
                title: "上车地址",
                placeHolder: "请选择上车地址",
                type: "select",
                field: "address",
                noShowLine: true,
                isCheck: true,
                value: this.address || "",
                onPress: (valueData) => {
                    navigation.push(this, 'PositionLocation', {
                        title: '选择的目的地',
                        single: true,
                        callBack: (cityObj) => {
                            valueData.value = cityObj.name;
                            this.address = cityObj.name;
                            valueData.refs && valueData.refs.setData(valueData);
                        },
                    });
                }
            },{
                type: "line",
            },];
        }

        let viewD = [
            {
                title: "成人",
                type: "add",
                field: "adultNum",
                isCheck: true,
                value: this.adultNum || 1,
                msg: "成人数",
                onPress: (valueData, isAdd) => {
                    this.childNum = this.childNum || 0;
                    if (isAdd && valueData && this.carDescObj && (valueData.value + this.childNum) >= this.carDescObj.personNum) {
                        return;
                    }
                    let value = isAdd ? valueData.value + 1 : (valueData.value > 1 ? valueData.value - 1 : 1);
                    valueData.value = value;
                    this.adultNum = value;
                    valueData.refs && valueData.refs.setData(valueData);
                }
            },
            {
                title: "儿童",
                type: "add",
                field: "childNum",
                value: this.childNum || 0,
                msg: "儿童数",
                onPress: (valueData, isAdd) => {
                    this.adultNum = this.adultNum || 1;
                    if (isAdd && valueData && this.carDescObj && (valueData.value + this.adultNum) >= this.carDescObj.personNum) {
                        return;
                    }

                    let value = isAdd ? valueData.value + 1 : (valueData.value > 0 ? valueData.value - 1 : 0);
                    valueData.value = value;
                    this.childNum = value;
                    valueData.refs && valueData.refs.setData(valueData);
                }
            },
            {
                title: "行李数",
                type: "add",
                field: "luggageNum",
                noShowLine: true,
                value: this.luggageNum || 0,
                onPress: (valueData, isAdd) => {
                    if (isAdd && valueData && this.carDescObj && valueData.value >= this.carDescObj.luggageNum) {
                        return;
                    }

                    let value = isAdd ? valueData.value + 1 : (valueData.value > 0 ? valueData.value - 1 : 0);
                    valueData.value = value;
                    this.luggageNum = value;
                    valueData.refs && valueData.refs.setData(valueData);
                }
            },
            {
                type: "line",
            },
            {
                title: "乘客姓名",
                placeHolder: "请填写乘客姓名",
                type: "input",
                field: "name",
                isCheck: true,
                value: this.name || "",
                props:{
                    maxLength: 30,
                },
                valueStyle: {

                },
                onPress: (valueData, text) => {
                    valueData.value = text;
                    this.name = valueData.text;
                }
            },
            {
                title: "手机号码",
                placeHolder: "必填",
                type: "phone",
                field: "mobile",
                mobile: this.telNum || "",
                areaCode: this.areaCode || "",
                isCheck: true,
                value: this.mobile || "",
                props:{
                    maxLength: 20,
                    keyboardType: "numeric"},
                valueStyle: {},
                onPress: (valueData, obj) => {
                    if (obj && obj.isArea) {
                        navigation.push(this, "AreaCodeChoose", {
                            title: "选择国家区号",
                            callback: (areaCode) => {
                                this.areaCode = areaCode|| "";
                                valueData.areaCode = this.areaCode;

                                this.mobile = this.areaCode + "-" + this.telNum;
                                valueData.value = this.mobile;

                                valueData.refs && valueData.refs.setData(valueData);
                            }
                        });
                    } else {
                        log(obj && obj.value);
                        this.telNum = obj && obj.value;
                        valueData.mobile = this.telNum;

                        this.mobile = this.areaCode + "-" + this.telNum;
                        valueData.value = this.mobile;
                    }
                }
            },
            {
                title: "备用手机",
                placeHolder: "备用联系手机号(选填)",
                type: "phone",
                field: "beiMobile",
                mobile: this.beiTelNum || "",
                areaCode: this.beiAreaCode || "",
                value: this.beiMobile || "",
                props:{
                    maxLength: 20,
                    keyboardType: "numeric",
                },
                valueStyle: {},
                msg: "备用手机号",
                onPress: (valueData, obj) => {
                    if (obj && obj.isArea) {
                        navigation.push(this, "AreaCodeChoose", {
                            title: "选择国家区号",
                            callback: (areaCode) => {
                                this.beiAreaCode = areaCode|| "";
                                valueData.areaCode = this.beiAreaCode;

                                this.beiMobile = this.beiAreaCode + "-" + this.beiTelNum;
                                valueData.value = this.beiMobile;

                                valueData.refs && valueData.refs.setData(valueData);
                            }
                        });
                    } else {
                        this.beiTelNum = obj && obj.value;
                        valueData.mobile = this.beiTelNum;

                        this.beiMobile = this.beiAreaCode + "-" + this.beiTelNum;
                        valueData.value = this.beiMobile;
                    }
                }
            },
            {
                title: "微信号",
                placeHolder: "请填写微信号(选填)",
                type: "input",
                field: "weChat",
                value: this.weChat || "",
                props:{
                    maxLength: 30,
                },
                valueStyle: {},
                noShowLine: true,
                onPress: (valueData, text) => {
                    valueData.value = text;
                    this.weChat = valueData.text;
                }
            },
            {
                type: "line",
            },
            {
                title: "优惠券",
                placeHolder: "暂无可用优惠券",
                type: "select",
                field: "quanMoney",
                value: this.quanMoney || "",
                isShowClickIcon:true,
                noShowLine: true,
                valueStyle:{textAlign:"right"},
                onPress: (valueData) => {
                    valueData.value = "￥50";
                    this.quanMoney = "￥50";
                    valueData.refs && valueData.refs.setData(valueData);
                }
            },
            {
                type: "line",
            },
            {
                title: "备注信息",
                placeHolder: "如有特殊需求请备注",
                type: "input",
                field: "noteInfo",
                value: this.noteInfo || "",
                props:{
                    maxLength: 100
                },
                valueStyle: {},
                noShowLine: true,
                onPress: (valueData, text) => {
                    valueData.value = text;
                    this.noteInfo = valueData.text;
                }
            },
        ];
        this.viewData = data.concat(viewD);
        return this.viewData;
    }

    //组装车辆类型
    assemblyCarType(obj) {
        if (!obj) {
            return "";
        }
        let carStr = obj.carType + " " + obj.personNum + "成人 " + obj.luggageNum + "行李";
        return carStr;
    }

    //组装头部用车描述数据
    assemblyHeadTitle() {
        let obj = this.myValue || {};
        let headTitleObj = {
            userCarType: obj.userCarType || "",
            userDate: obj.time,
            desc: obj.headValue || (obj.flight + "包车" + (obj.days && obj.days.length) + "日游"),
        };
        return headTitleObj;
    }

    render() {
        let view = (
            <KeyboardAvoidingView {...keyBoard} style={styles.container}>
                <ScrollView style={{marginBottom: 45}}>
                    <QueryCharterItemDetail
                        myValue={this.assemblyHeadTitle()}
                        carType={this.assemblyCarType(this.carDescObj)}
                    />

                    <View style={{
                        marginTop: YITU.space_5,
                        backgroundColor: YITU.backgroundColor_0,
                    }}>
                        {this.myValue.days ? this.createDaysView(this.myValue.days) : this.createPlaceView(this.myValue)}
                    </View>

                    <View style={{
                        flex: 1,
                        marginTop: YITU.space_5,
                    }}>
                        {this.createRowView(this.getRowData() || [])}
                    </View>

                    <RowSelect callBack={(value) => {
                        this.isRead = value;
                        alert(value);
                    }}/>
                </ScrollView>

                <BottomItemView
                    price={this.carDescObj && this.carDescObj.price || ""}
                    isTop={false}
                    btnTitle={"提交订单"}
                    cb={() => {
                        this.commit();
                    }}
                    callBack={() => {
                        DetailsModule.show(this.carDescObj, {
                            btnTitle: "提交订单",
                            callBack: () => {
                                this.commit();
                            }
                        });
                    }}/>
            </KeyboardAvoidingView>);
        return (<PageView
            ref={(ref) => this.pageView = ref}
            config={PageView.defaultConfig(this, {
                hiddenIphoneXBottom: true,
            })}>
            {view}
        </PageView>);
    }

    commit() {
        let postValue = {};
        let userData = this.viewData || [];
        for (let obj of userData) {
            if (obj.type !== "line") {
                if (obj && obj.value && (obj.field === "mobile" || obj.field === "beiMobile") && (obj.areaCode === "" || !obj.areaCode)) {
                    Toast.show((obj.msg || obj.title) + "区号不能为空");
                    return;
                }
                if (!MyRow.showMessage(obj, this)) {
                    return true;
                }
                postValue[obj.field] = MyRow.getValue(obj, this);
            }
        }

        if (!this.isRead) {
            Toast.show("请阅读并同意易途吧用车协议");
            return;
        }
        postValue.isRead = "1";
        this.commitOrder(postValue);
    }

    commitOrder(param) {
        log(param);
        log("--------");
        Loading.show();
        setTimeout(() => {
            Loading.hide();
            navigation.pop(this);
        }, 1000);
    }

    //创建每日航线
    createDaysView(arr) {
        return arr.map((item, index) => {
            return (<View
                key={index}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingVertical: YITU.space_0,
                    paddingHorizontal: YITU.space_5
                }}>
                <Text style={{
                    minWidth: 45,
                    maxWidth: 55,
                    color: YITU.textColor_2,
                    fontSize: YITU.fontSize_5
                }}><Text>{"第" + item.days + "天"}</Text></Text>
                <Text style={{
                    flex: 1,
                    color: YITU.textColor_0,
                    fontSize: YITU.fontSize_5,
                    marginLeft: YITU.space_1
                }}><Text>{"住在" + item.value}</Text></Text>
            </View>);
        });
    }

    //显示机场数据
    createPlaceView(obj) {
        let arr = [{
            icon: require("../../../../image/main/icon_place.png"),
            value: obj.headValue
        }, {
            icon: require("../../../../image/main/icon_position.png"),
            value: obj.endPlace
        }];
        return arr.map((item, index) => {
            return (<View
                key={index}
                style={{
                    flex: 1,
                    paddingHorizontal: YITU.space_5,
                    flexDirection: "row",
                    paddingVertical: YITU.space_2,
                    borderBottomColor: YITU.backgroundColor_Line,
                    borderBottomWidth: StyleSheet.hairlineWidth
                }}>
                <Image
                    resizeMode={"contain"}
                    style={{width: YITU.d_icon, height: YITU.d_icon, marginRight: YITU.space_5}}
                    source={item.icon}/>
                <Text style={{
                    color: YITU.textColor_1,
                    fontSize: YITU.fontSize_5
                }}><Text>{item.value}</Text></Text>
            </View>);
        });
    }

    //创建每行视图
    createRowView(arr) {
        return arr.map((item, index) => {
            return (<MyRow key={index} data={item} ref={(a) => item.refs = a}/>);
        })
    }
}

module.exports = QueryCharterNext;

class RowSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRead: true
        }
    }

    render() {
        let {isRead} = this.state;
        let {callBack} = this.props;
        return (<View style={{
            paddingVertical: YITU.space_2,
            paddingHorizontal: YITU.space_5,
            flexDirection: "row",
            alignItems: "center"
        }}>
            <TouchableOpacity
                style={{width: 25, height: 25, alignItems: "center", justifyContent: "center"}}
                onPress={() => {
                    this.setState({
                        isRead: !isRead
                    }, () => {
                        callBack && callBack(!isRead);
                    });
                }}>
                <Image resizeMode={"contain"}
                       style={{width: YITU.d_icon_small, height: YITU.d_icon_small}}
                       source={isRead ? require("../../../../image/login/xz.png") :
                           require("../../../../image/login/wgx.png")}/>
            </TouchableOpacity>
            <Text style={{color: YITU.textColor_1, fontSize: YITU.fontSize_3}}>您已阅读并同意易途吧用车协议</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
        paddingBottom: 45
    },

});
