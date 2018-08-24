import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {PageView, LayoutBox, navigation, Toast, AppInit} from 'myapplib';
import AniViewBgColor from '../home/component/ani/AniViewBgColor';
import AniNavHead from '../home/component/ani/AniNavHead.js';

import Storage from '../../tool/Storage.js';
import SelectCell from "../../component/SelectCell.js";

class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
        };
        let profileObj = Storage.getAppConfig || {};
        this.objH5 = profileObj.h5 || {};
        YITU.addAction("USERCENTER", () => {
            this.upView();
        })
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {
        this.upView();
    }

    openPage(path, option) {
        navigation.push(this, path, option)
    }

    getActionData(userInfo) {
        let dataArr = [];
        let guideVer = {
            icon: require('../../image/userIcon/grzx-sdrz.png'),
            title: "我的钱包",
            resultValue: "0元",
            onPress: () => {
                this.openPage('MyWallet', {
                    title: '我的钱包',
                });
            }
        };

        let myCar = {
            title: "我的优惠券",
            icon: require('../../image/userIcon/grzx-wdcl.png'),
            onPress: () => {
                this.openPage('PriceTicket', {
                    title: '我的优惠券',
                    type: 2,
                    pageKey: this.props.navigation.state.key,
                });
            }
        };

        let myOrder = {
            title: "我的发票",
            icon: require('../../image/userIcon/grzx-wddd.png'),
            space: true,
            onPress: () => {
                this.openPage("MyInvoice", {
                    title: "我的发票",
                });
            }
        };

        let myMoney = {
            title: "我的收藏",
            icon: require('../../image/userIcon/qb-qbcz.png'),
            space: true,
            onPress: () => {
                this.openPage('MyCollection', {
                    title: '我的收藏',
                    pageKey: this.props.navigation.state.key,
                    callBack: () => {
                        this.loadData();
                    }
                });
            }
        };

        let accountSecurity = {
            title: "邀请好友",
            icon: require('../../image/userIcon/grzx-zhaq.png'),
            onPress: () => {
                this.openPage('InviteFriend', {
                    title: '邀请好友',
                    pageKey: this.props.navigation.state.key,
                    callBack: () => {
                        this.loadData();
                    }
                });
            }
        };

        let myGuiderGuide = {
            title: "关于易途吧",
            icon: require('../../image/userIcon/grzx-sdzn.png'),
            space: true,
            onPress: () => {
                this.openPage('BrowserPage', {
                    title: '关于易途吧',
                    url: this.objH5 && this.objH5.aboutUs || "",
                });
            }
        };

        dataArr.push(guideVer);
        dataArr.push(myCar);

        dataArr.push(myOrder);
        dataArr.push(myMoney);

        dataArr.push(accountSecurity);
        dataArr.push(myGuiderGuide);

        return dataArr;
    }

    render() {
        let userInfo = Storage.getUserInfo() || {};
        let view = (<View style={{
            flex: 1,
            position: "relative",
            backgroundColor: YITU.backgroundColor_1,
        }}>
            <AniViewBgColor backgroundColor={"#3da3ff"} ref={(a) => this.aniView = a}/>

            <ScrollView
                keyboardShouldPersistTaps={"handled"}
                style={styles.container}
                scrollEventThrottle={1}
                onScroll={(e) => {
                    let y = e.nativeEvent.contentOffset.y;
                    this.aniView.setScrollNum(y);
                    this.aniNavHead.setScrollNum(y);
                }}>
                {this.createUserInfor(userInfo)}

                <SelectCell onPress={() => {
                    this.openPage('MyOrder', {
                        title: "我的订单",
                        type: "all"
                    });
                }} style={{
                    paddingLeft: YITU.space_5,
                    backgroundColor: YITU.backgroundColor_0
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: YITU.space_5,
                        paddingRight: YITU.space_5,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: YITU.backgroundColor_Line
                    }}>
                        <Text style={{flex: 1, color: YITU.textColor_1, fontSize: YITU.fontSize_5}}>全部订单</Text>
                        <Image
                            resizeMode={"contain"}
                            style={{height: YITU.d_icon_small, width: YITU.d_icon_small}}
                            source={require("../../image/userIcon/arrow.png")}/>
                    </View>
                </SelectCell>
                <View style={{
                    backgroundColor: YITU.backgroundColor_0,
                    paddingHorizontal: YITU.space_5,
                    paddingVertical: YITU.space_2,
                    flexDirection: "row"
                }}>
                    {this.createOrderItem()}
                </View>


                <View style={styles.actionCon}>
                    <LayoutBox.Icon
                        leftStyle={{flexDirection: "row", alignItems: "center", backgroundColor: "#00000000"}}
                        data={this.getActionData(userInfo)}/>
                </View>
            </ScrollView>

            <AniNavHead
                ref={(a) => {
                    this.aniNavHead = a
                }}
                title={"我的"}
                rightArr={[{
                    defIcon: require("../../image/userIcon/setting_def.png"),
                    selIcon: require("../../image/userIcon/setting_sel.png"),
                    onPress: () => {
                        navigation.push(this, "Setting", {title: "设置"});
                    }
                }]}/>
        </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    full: true,
                    hiddenIphoneXBottom: true,
                })}
            >
                {view}
            </PageView>
        );
    }


    //创建用户信息行
    createUserInfor(userInfo) {
        return (<View style={styles.headCon}>
            <TouchableOpacity
                style={{marginTop: 35, flexDirection: "row", alignItems: "center",}}
                activeOpacity={1}
                onPress={() => {
                    this.openPage('UserInfor', {
                        title: '个人资料',
                        callBack: () => {
                            this.upView();
                        }
                    });
                }}>
                <View style={styles.headImgBg}>
                    <Image style={styles.headImg}
                           resizeMode={"contain"}
                           defaultSource={require('../../image/userIcon/grzx-user.png')}
                           source={userInfo.headImg ? {uri: userInfo.headImg} : require('../../image/userIcon/grzx-user.png')}/>
                </View>

                <View style={styles.nameCon}>
                    <Text numberOfLines={1} ellipsizeMode={"tail"}
                          style={styles.name}>{userInfo.name || userInfo.userName || userInfo.mobile}</Text>
                    <Text style={styles.desc}>{"你和世界的故事从这里开始"}</Text>
                </View>
                <Image style={styles.click_icon} resizeMode={"contain"}
                       source={require('../../image/userIcon/arrow_w.png')}/>
            </TouchableOpacity>
        </View>);
    }

    //创建订单item
    createOrderItem() {
        return [
            {
                icon:require("../../image/userIcon/icon_order_dfk.png"),
                title:"待付款"
            },
            {
                icon:require("../../image/userIcon/icon_order_dfw.png"),
                title:"待服务"
            },
            {
                icon:require("../../image/userIcon/icon_order_fwz.png"),
                title:"服务中"
            },
            {
                icon:require("../../image/userIcon/icon_order_dpj.png"),
                title:"待评价"
            },
            {
                icon:require("../../image/userIcon/icon_order_tk_or_sh.png"),
                title:"退款/售后"
            }].map((item, index) => {
            return (<View key={index} style={{flexDirection: "row"}}>
                {index > 0 ? <View style={{width: itemWidth, height: itemWidth}}/> : null}
                <TouchableOpacity
                    style={{width: 50, alignItems: "center"}}
                    onPress={() => {
                        this.openPage('MyOrder', {
                            title: "我的订单",
                            type: "all",
                            smallIndex: index + 1
                        });
                    }}>
                    <Image
                        resizeMode={"contain"}
                        style={{width: 35, height: 35,}} source={item.icon}/>
                    <Text style={{
                        marginTop: 4,
                        fontSize: YITU.fontSize_2,
                        color: YITU.textColor_1
                    }}>{item.title}</Text>
                </TouchableOpacity>
            </View>);
        });
    }
}

const itemWidth = (YITU.screenWidth - 30 - 5 * 50) / 4;
module.exports = UserCenter;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    headCon: {
        paddingHorizontal: YITU.space_6,
        paddingTop: YITU.barStateHeight + YITU.space_1,
        height: 207.5 - 40,
        justifyContent: "center",
    },
    headImgBg: {
        borderRadius: YITU.d_RowHeight * 0.5 + 3,
        marginRight: YITU.space_5,
        padding: 3,
        backgroundColor: "rgba(255,255,255,0.2)"
    },
    headImg: {
        borderRadius: YITU.d_RowHeight * 0.5,
        width: YITU.d_RowHeight,
        height: YITU.d_RowHeight,
    },
    nameCon: {
        flex: 1,
    },
    name: {
        maxWidth: 300,
        marginBottom: YITU.space_1,
        marginRight: YITU.space_0,
        color: YITU.c_title_white,
        fontSize: YITU.fontSize_7,
    },
    desc: {
        color: "rgba(255,255,255,0.6)",
        fontSize: YITU.fontSize_14,
    },


    starBg: {
        marginHorizontal: YITU.space_2,
        width: YITU.screenWidth - 2 * YITU.space_2,
        height: (YITU.screenWidth - 2 * YITU.space_2) * 0.1972,
        flexDirection: "row",
        paddingHorizontal: YITU.space_0,
        paddingVertical: YITU.space_2,
        borderRadius: YITU.radius_1,
        alignItems: "center"
    },
    starItem: {
        flex: 1,
        borderColor: YITU.backgroundColor_Line,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderStyle: "solid",
        alignItems: "center",
    },
    itemTitle: {
        marginTop: YITU.space_0,
        textAlign: "center",
        color: YITU.textColor_5,
        fontSize: YITU.fontSize_2
    },

    actionCon: {
        position: "relative",
        paddingTop: YITU.space_3,
        paddingBottom: YITU.space_6,
        backgroundColor: YITU.backgroundColor_1,
    },

    click_icon: {
        width: YITU.d_icon_center,
        height: YITU.d_icon_center,
    }
});
