import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Animated,
    TouchableOpacity
} from 'react-native';
import MyRow from "../../../component/MyRow.js";
import HttpTool from "../../../http/HttpTool";
import APIGYW from "../../../http/APIGYW.js";

import {PageView, navigation, Toast, Loading} from "myapplib";

class RechargeInvoice extends Component {
    constructor(props) {
        super(props);
        this.invoiceType = 1;
        this.state = {
            upData: 1,
        };
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {

    }

    navBack() {
        navigation.pop(this);
    }

//获取每日视图数据
    getRowData() {
        let invoiceType = {
            title: "抬头类型",
            type: "switch",
            field: "invoiceType",
            isCheck: true,
            value: this.invoiceType || 1,
            selIcon: require("../../../image/userIcon/icon_s_sel.png"),
            defIcon: require("../../../image/userIcon/icon_s_def.png"),
            switchArr: [{
                title: "公司",
                value: 1
            }, {
                title: "个人",
                value: 2
            }],
            onPress: (valueData, text, obj) => {
                valueData.value = text;
                this.invoiceType = valueData.value;
                valueData.refs && valueData.refs.setData(valueData);
                this.upView();
            }
        };
        let invoiceName = {
            title: "发票抬头",
            placeHolder: "如：杭州易途吧网络科技有限公司",
            type: "input",
            field: "invoicename",
            isCheck: true,
            value: this.invoicename || "",
            valueStyle: {
                maxLength: 30,
            },
            onPress: (valueData, text) => {
                valueData.value = text;
                this.invoicename = text;
            }
        };

        let taxPayTeridNum = {
            title: "纳税人识别号",
            placeHolder: "请输入纳税人识别号",
            type: "input",
            field: "taxpayteridnum",
            isCheck: true,
            value: this.taxpayteridnum || "",
            valueStyle: {
                maxLength: 30,
            },
            onPress: (valueData, text) => {
                valueData.value = text;
                this.taxpayteridnum = text;
            }
        };

        let invoiceCon = {
            title: "发票内容",
            placeHolder: "",
            type: "text",
            field: "invoicecon",
            isCheck: true,
            value: "租车费",
        };

        let invoiceMoney = {
            title: "发票金额",
            placeHolder: "请输入发票金额",
            type: "input",
            field: "invoicemoney",
            isCheck: true,
            value: this.invoicemoney || "",
            valueStyle: {
                maxLength: 30,
            },
            onPress: (valueData, text) => {
                valueData.value = text;
                this.invoicemoney = text;
            }
        };

        let otherInfo = {
            title: "其他信息",
            placeHolder: "填写注册地址、电话等",
            type: "select",
            field: "otherInfo",
            isCheck: false,
            value: this.otherInfo || "",
            noShowLine:true,
            valueStyle: this.valueStyle||{
                textAlign: "right"
            },
            onPress: (valueData, text) => {
                navigation.push(this, "InvoiceInforInput", {
                    title: "开票信息填写",
                    callBack: (obj) => {
                        valueData.valueStyle = {
                            textAlign: "right",
                            color: YITU.textColor_6
                        };
                        this.valueStyle = valueData.valueStyle;

                        valueData.value = "已填写全部内容";
                        this.otherInfo = "已填写全部内容";
                        valueData.refs && valueData.refs.setData(valueData);
                    }
                });
            }
        };
        let line = {
            type: "line",
        };

        let name = {
            title: "乘客姓名",
            placeHolder: "请填写乘客姓名",
            type: "input",
            field: "name",
            isCheck: true,
            value: this.name || "",
            valueStyle: {
                maxLength: 30,
            },
            onPress: (valueData, text) => {
                valueData.value = text;
                this.name = text;
            }
        };

        let mobile = {
            title: "手机号码",
            placeHolder: "必填",
            type: "phone",
            field: "mobile",
            mobile: this.telNum || "",
            areaCode: this.areaCode || "",
            isCheck: true,
            value: this.mobile || "",
            valueStyle: {
                maxLength: 20,
                keyboardType: "numeric",
            },
            onPress: (valueData, obj) => {
                if (obj && obj.isArea) {
                    this.areaCode = obj.value || "86";
                    valueData.areaCode = this.areaCode;

                    this.mobile = this.areaCode + "-" + this.telNum;
                    valueData.value = this.mobile;

                    valueData.refs && valueData.refs.setData(valueData);
                } else {
                    this.telNum = obj && obj.value;
                    valueData.mobile = this.telNum;

                    this.mobile = this.areaCode + "-" + this.telNum;
                    valueData.value = this.mobile;
                }
            }
        };
        let beiMobile = {
            title: "备用手机",
            placeHolder: "备用联系手机号(选填)",
            type: "phone",
            field: "beiMobile",
            mobile: this.beiTelNum || "",
            areaCode: this.beiAreaCode || "",
            value: this.beiMobile || "",
            noShowLine:true,
            valueStyle: {
                maxLength: 20,
                keyboardType: "numeric",
            },
            msg: "备用手机号",
            onPress: (valueData, obj) => {
                if (obj && obj.isArea) {
                    this.beiAreaCode = obj.value || "315";
                    valueData.areaCode = this.beiAreaCode;

                    this.beiMobile = this.beiAreaCode + "-" + this.beiTelNum;
                    valueData.value = this.beiMobile;

                    valueData.refs && valueData.refs.setData(valueData);
                } else {
                    this.beiTelNum = obj && obj.value;
                    valueData.mobile = this.beiTelNum;

                    this.beiMobile = this.beiAreaCode + "-" + this.beiTelNum;
                    valueData.value = this.beiMobile;
                }
            }
        };

        let viewArr = [];
        viewArr.push(invoiceType);
        viewArr.push(invoiceName);
        if (this.invoiceType===1){
            viewArr.push(taxPayTeridNum);
        }
        viewArr.push(invoiceCon);
        viewArr.push(invoiceMoney);
        if (this.invoiceType===1){
            viewArr.push(otherInfo);
        }
        viewArr.push(line);
        viewArr.push(name);
        viewArr.push(mobile);
        viewArr.push(beiMobile);
        this.viewData = viewArr;
        return viewArr;
    }

    render() {
        let view = (<View style={styles.container}>
            <View style={{flex: 1}}>
                <ScrollView
                    style={{flex: 1}}
                    keyboardShouldPersistTaps={"handled"}>
                    <View style={styles.row}>
                        <Text style={{fontSize: YITU.fontSize_5, color: YITU.textColor_1}}>可开发票额度</Text>
                        <Text style={{fontSize: YITU.fontSize_5, color: YITU.textColor_6}}>{"0.00"}</Text>
                        <Text style={{fontSize: YITU.fontSize_5, color: YITU.textColor_1}}>元</Text>
                    </View>

                    {this.createRowView(this.getRowData() || [])}
                    <Text style={{
                        fontSize:YITU.fontSize_3,
                        color:YITU.textColor_3,
                        paddingHorizontal:15,
                        paddingVertical:8
                    }}>发票不包邮(到付)，支持地区包括国内及港澳台</Text>
                </ScrollView>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    this.commit();
                }}
                style={{
                    backgroundColor: YITU.backgroundColor_3,
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_5}}>提交</Text>
            </TouchableOpacity>
        </View>);
        return (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                navBack: this.navBack.bind(this),
                pageLoading: false,
            })}>
            {view}
        </PageView>);
    }

    commit() {
        let postValue = {};
        for (let obj of this.viewData) {
            if (obj.type !== "line") {
                if (obj && obj.value && (obj.field === "mobile" || obj.field === "beiMobile") && (obj.areaCode === "" || !obj.areaCode)) {
                    Toast.show((obj.msg || obj.title) + "区号不能为空");
                    return;
                }
                if (!MyRow.showMessage(obj, this)) {
                    log(obj);
                    return true;
                }
                postValue[obj.field] = MyRow.getValue(obj, this);
            }
        }
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

    //创建每行视图
    createRowView(arr) {
        return arr.map((item, index) => {
            return (<MyRow key={item.title+index} data={item} ref={(a) => item.refs = a}/>);
        });
    }
}

module.exports = RechargeInvoice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },
    row: {
        backgroundColor: YITU.backgroundColor_0,
        marginBottom: YITU.space_5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 45
    }
});
