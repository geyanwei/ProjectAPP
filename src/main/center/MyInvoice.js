import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';
import HttpTool from "../../http/HttpTool";
import APILQ from "../../http/APILQ.js";
import {PageView, LayoutBox, Toast, ModalBox, Loading, navigation} from "myapplib";
import Storage from "../../tool/Storage";

class MyInvoice extends Component {

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
        navigation.pop(this,);
    }

    getRowData() {
        return [
            {
                title: "用车开票",
                onPress: () => {
                    this.openPage("UserCarInvoice", {
                        title: "用车发票"
                    });
                }
            },
            {
                title: "充值开票",
                onPress: () => {
                    this.openPage("RechargeInvoice", {
                        title: "充值发票"
                    });
                }
            },
            {
                title: "开票记录",
                onPress: () => {
                    this.openPage("InvoiceRecord", {
                        title: "开票记录"
                    });
                }
            },
            {
                title: "开票说明",
                onPress: () => {
                    this.openPage("InvoiceDesc", {
                        title: "开票说明"
                    });
                }
            },
        ];
    }

    //跳转界面
    openPage(path, option) {
        navigation.push(this, path, option);
    }

    render() {
        let userObj = Storage.getUserInfo() || {};
        let view = (<ScrollView
            style={styles.container}
            keyboardShouldPersistTaps={"handled"}>
            <LayoutBox.Icon
                rightTextStyle={{color: YITU.textColor_2, fontSize: YITU.fontSize_5}}
                data={this.getRowData(userObj)}/>
        </ScrollView>);
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
}

module.exports = MyInvoice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    }
});
