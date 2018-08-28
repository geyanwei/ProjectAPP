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

class MyWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
            data: null,
            accountCashList: []
        };
        this.hasAccount = undefined;
        YITU.addAction("MyWallet", () => {
            this.loadData()
        });
        this.animatedValue = new Animated.Value(0);
    }


    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {
        this.loadData();
        this.loadPutForwardData((hasAccount) => {
            this.hasAccount = hasAccount;
        });
        Animated.timing(
            this.animatedValue,
            {
                toValue: 0,
            }
        ).start();
    }

    componentWillUnmount(){
        YITU.removeAction("MyWallet")
    }

    //获取数据
    loadData() {
        let param = {};
        let successCallback = (code, message, json, option) => {
            this.setState({
                data: json
            })
        };
        let failCallback = (code, message) => {
            Toast.show(message);
        };
        HttpTool.post(APILQ.withdrawapi_accounts_getMoneyInfo, successCallback, failCallback, param);
    }

    //获取提现账户数据
    loadPutForwardData(callBack) {
        let newVar = {
            page: 1,
            pageSize: 1,
        };
        let param = newVar;
        let successCallback = (code, message, json, option) => {
            callBack(json && json.length > 0)
        };
        let failCallback = (code, message) => {
            callBack(false)
        };
        HttpTool.post(APILQ.accountapi_accounts_query, successCallback, failCallback, param);
    }

    openPage(path, option) {
        navigation.push(this, path, option)
    }

    getData() {
        return (
            <LayoutBox.Icon
                data={[
                    {
                        icon: require('../../image/user/Cash/qb-tx.png'),
                        title: "提现",
                        type: "select",
                        space: true,
                        onPress: () => {
                            let exe = () => {
                                if (this.hasAccount) {
                                    this.openPage('PutForward', {
                                        title: '提现',
                                        callBack: () => {
                                            this.loadData();
                                        }
                                    });
                                } else {
                                    ModalBox.showSelect({
                                        title:"请设置提现账户",
                                        desc:"您尚未设置提现账户，请设置提现账户",
                                        okTitle:"设置账户",
                                    }, (v) => {
                                        if (v === 1) {
                                            this.hasAccount = undefined;
                                            this.openPage('AccountCash', {
                                                title: '提现账户',
                                                noSel:true,
                                            });
                                        }
                                        return true;
                                    });
                                }
                            };
                            if (this.hasAccount === undefined) {
                                Loading.show();
                                this.loadPutForwardData((hasAccount) => {
                                    this.hasAccount = hasAccount;
                                    Loading.hide();
                                    exe();
                                })
                            } else {
                                exe();
                            }


                        }
                    },
                    {
                        icon: require('../../image/user/Cash/qb-txzh.png'),
                        title: "提现账户管理",
                        type: "select",
                        onPress: () => {
                            this.hasAccount = undefined;
                            this.openPage('AccountCash', {
                                title: '提现账户',
                                noSel:true,
                            });
                        }
                    },
                    {
                        icon: require('../../image/user/Cash/qb-txjl.png'),
                        title: "提现记录",
                        type: "select",
                        space: true,
                        onPress: () => {
                            this.openPage('AccountDetailList', {
                                title: '提现记录',
                                type: 0,

                            });
                        }
                    },
                    {
                        icon: require('../../image/user/Cash/qb-bajgl.png'),
                        title: "保证金管理",
                        type: "select",
                        onPress: () => {
                            this.openPage('BondManagement', {
                                title: '保证金',
                                data: this.state.data,
                                callBack: () => {
                                    this.loadData();
                                }
                            });
                        }
                    }, {
                        icon: require('../../image/user/Cash/qb-qbcz.png'),
                        title: "钱包充值",
                        type: "select",
                        space: true,
                        onPress: () => {
                            this.openPage('BondPutForward', {
                                title: '钱包充值',
                                type: 0,
                                callBack: () => {
                                    this.loadData();
                                }
                            });
                        }
                    },
                ]}
            />
        )

    }

    render() {
        let data = this.state.data;
        let heightAni = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [250, 600],
        });
        let view = (
            <View style={styles.container}>
                <Animated.View
                    style={ {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: YITU.screenWidth,
                        height: heightAni,
                        backgroundColor: YITU.backgroundColor_9
                    }}>
                </Animated.View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                    <View style={{backgroundColor: YITU.backgroundColor_9}}>
                        <TouchableWithoutFeedback style={{
                        }} onPress={()=>{
                            ModalBox.showOK("说明","钱包余额是指你可提现的金额")
                        }}>
                            <View style={{
                                paddingTop: YITU.space_5 * 2,
                                paddingBottom:YITU.space_2,
                                alignItems:"center",
                                width:150,
                                flexDirection: "row",}}>
                                <Text style={{
                                    color: YITU.c_title_white,
                                    fontSize: YITU.fontSize_4,
                                    opacity: 0.8,
                                    marginLeft: YITU.space_5
                                }}>钱包余额（元）</Text>
                                <Image style={{
                                    height: YITU.fontSize_4,
                                    width: YITU.fontSize_4,
                                }}
                                       resizeMode={"stretch"}
                                       source={require('../../image/user/Cash/qb_yw.png')}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{
                            color: YITU.c_title_white,
                            fontSize: YITU.fontSize_13,
                            marginLeft: YITU.space_5
                        }}>{!data ? "--" : (data.personalBalance ? parseFloat(data.personalBalance + "").toFixed(2) : "0.00")}</Text>

                        <View style={{
                            backgroundColor: "#3d3931",
                            paddingLeft: YITU.space_5,
                            paddingTop: YITU.space_3,
                            marginTop: YITU.space_6,
                            flexDirection: "row",
                            height: 75, width: "100%"
                        }}>
                            <View style={{flex: 1}}>
                                <TouchableWithoutFeedback
                                    onPress={()=>{
                                        ModalBox.showOK("说明","待结算金额是指你服务完成但还未结算的金额，7日后自动结算进入余额即可提现")
                                    }}>
                                    <View style={{width:130,alignItems:"center",flexDirection: "row",paddingBottom: YITU.space_3}}>
                                        <Text style={{
                                            color: YITU.c_title_white,
                                            fontSize: YITU.fontSize_14,
                                            opacity: 0.8,
                                        }}>待结算金额（元）</Text>
                                        <Image style={{
                                            height: YITU.fontSize_14,
                                            width: YITU.fontSize_14,
                                        }}
                                               resizeMode={"stretch"}
                                               source={require('../../image/user/Cash/qb_yw.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{
                                    color: YITU.c_title_white,
                                    fontSize: YITU.fontSize_6,
                                }}>{!data ? "--" : (data.unSettleBalance ? parseFloat(data.unSettleBalance + "").toFixed(2) : "0.00")}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{
                                    color: YITU.c_title_white,
                                    fontSize: YITU.fontSize_14,
                                    opacity: 0.8,
                                }}>保证金（元）</Text>
                                <Text style={{
                                    color: YITU.c_title_white,
                                    fontSize: YITU.fontSize_6,
                                    marginTop: YITU.space_3
                                }}>{!data ? "--" : (data.bailBalance ? parseFloat(data.bailBalance + "").toFixed(2) : "0.00")}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.actionCon}>
                        {this.getData()}
                    </View>
                </ScrollView>
            </View>
        );

        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    pageLoading: false,
                    navBack: () => {
                        navigation.pop(this);
                    },
                    barConfig: this.navBar(),
                })}
            >
                {view}
            </PageView>
        );
    }

    navBar() {
        return {
            title: "钱包",
            rightButtonText: "钱包账单",
            rightButtonTextStyle: {
                color: YITU.c_title_white,
                opacity: 0.9,
            },
            leftButtonImg: require("../../image/img_back_white.png"),
            leftButtonTextStyle: styles.barText,
            titleStyle: {
                fontSize: YITU.fontSize_7,
                color: "#fff",
                fontFamily: YITU.fontName_regular,
                fontWeight: "bold"
            },
            rightButtonFunc: () => {
                YITU.ClickTrackFunction(YITU.TrackMyWallet.mywallet_walletbill);
                this.openPage('BondRecord', {
                    title: '钱包账单',
                    type: 0,
                });
            },
            mainContainerStyle: {
                backgroundColor: YITU.backgroundColor_9
            },
            showLine: false
        }
    }
}

module.exports = MyWallet;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },

    actionCon: {
        paddingBottom: YITU.space_6,
        backgroundColor: YITU.backgroundColor_1
    },
    line: {
        backgroundColor: YITU.backgroundColor_2,
        height: YITU.space_5,
    },
    contentLine: {
        backgroundColor: YITU.c_bg_white,
        paddingLeft: YITU.space_5,
        width: "100%",
    },
    click_icon: {
        width: YITU.d_icon_small,
        height: YITU.d_icon_small,
        alignSelf: "center",
    },
    barText: {
        flex: 1,
        color: YITU.c_title_white,
        fontSize: YITU.fontSize_4,
        fontFamily: YITU.fontName_regular,
        opacity: 0.9,
        backgroundColor: YITU.backgroundColor_clear,
        alignSelf: 'center',
        marginLeft: YITU.space_0
    },

});
