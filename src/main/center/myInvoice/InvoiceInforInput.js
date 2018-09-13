import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import MyRow from "../../../component/MyRow.js";
import MyButton from "../../../component/MyButton.js";
import HttpTool from "../../../http/HttpTool";
import APIGYW from "../../../http/APIGYW.js";

import {PageView, navigation, Toast, Loading} from "myapplib";

class InvoiceInforInput extends Component {
    constructor(props) {
        super(props);
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
        this.viewData = [
            {
                title: "地址、电话",
                placeHolder: "请输入注册地址和电话",
                type: "textArea",
                field: "invoicename",
                isCheck: true,
                value: this.invoicename || "",
                titleStyle:{
                    alignSelf:"center"
                },
                onPress: (valueData, text) => {
                    valueData.value = text;
                    this.invoicename = valueData.text;
                }
            },
            {
                title: "开户行及账号",
                placeHolder: "请输入开户银行和银行账号",
                type: "textArea",
                field: "taxpayteridnum",
                isCheck: true,
                value: this.taxpayteridnum || "",
                noShowLine:true,
                valueStyle: {

                },
                onPress: (valueData, text) => {
                    valueData.value = text;
                    this.taxpayteridnum = valueData.text;
                }
            },
            {
                type: "line",
            },
            {
                title: "备注",
                placeHolder: "请输入备注信息(选填)",
                type: "input",
                field: "invoicemoney",
                isCheck: false,
                value: this.invoicemoney || "",
                noShowLine:true,
                valueStyle: {
                    maxLength: 100,
                },
                onPress: (valueData, text) => {
                    valueData.value = text;
                    this.invoicemoney = valueData.text;
                }
            }
        ];
        return this.viewData;
    }

    render() {
        let view = (<View style={styles.container}>
                <ScrollView
                    style={{flex: 1,paddingTop:2*YITU.space_5}}
                    keyboardShouldPersistTaps={"handled"}>

                    {this.createRowView(this.getRowData() || [])}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            alert("查看示例");
                        }}
                        style={{
                            height:45,
                            marginRight:YITU.space_5,
                            alignSelf:"flex-end",
                            justifyContent:"center"
                        }}>
                        <Text style={{color:YITU.textColor_2,fontSize:YITU.fontSize_5}}>查看示例</Text>
                    </TouchableOpacity>

                    <MyButton
                        ref={(a) => this.refBtn = a}
                        disabled={false}
                        underlayColor={YITU.backgroundColor_11}
                        underlayTxtColor='#FFFFFFf0'
                        noClickedBackgroundColor={YITU.backgroundColor_4}
                        onPress={() => {
                            this.commit();
                        }}>保存
                    </MyButton>



                </ScrollView>
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
            navigation.pop(this,()=>{
                this.props.callBack&&this.props.callBack();
            });
        }, 1000);
    }

    //创建每行视图
    createRowView(arr) {
        return arr.map((item, index) => {
            return (<MyRow key={index} data={item} ref={(a) => item.refs = a}/>);
        });
    }
}

module.exports = InvoiceInforInput;

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
