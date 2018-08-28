import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import {PageView, navigation,Loading, Toast} from 'myapplib';
import HttpTool from "../../../http/HttpTool";
import APILQ from "../../../http/APILQ";
import MyEtcListView from '../../../component/ListView/MyFlatList.js';

import SelInputAct from "./component/SelInputAct.js";
import SelItemView from "./component/SelItemView.js";

class LineCharter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    _renderRowView(rowData) {
        return (<OrderItem data={rowData.item} isTrip={false} obj={this}/>);
    }

    _onFetch(page = 0, callback, options) {
        let param = {
            driverId: this.props.driverId,
            orderType: this.props.orderType || 0,
            page: page,
            pageSize: 10
        };
        Loading.show();
        let successCallback = (code, message, json, option) => {
            Loading.hide();
            if (json && json.orderList) {
                let pageNumber = (param.page-1) * param.pageSize + json.orderList.length;
                let optionNumber = option || 0;
                callback(json.orderList, {
                    allLoaded: pageNumber == optionNumber, //显示结束的底部样式,由你来控制
                });
            } else {
                callback([], {
                    allLoaded: true, //显示结束的底部样式,由你来控制
                });
            }
        };
        let failCallback = (code, message, option) => {
            Loading.hide();
            let data = this.listView && this.listView.state && this.listView.state.data;
            let optionNumber = option || 0;
            let allLoaded = param.page * param.pageSize == optionNumber;
            if (page === 1 || !data || data && data.length === 0) {
                allLoaded = true;
            }
            callback([], {
                allLoaded: allLoaded
            });
        };
        HttpTool.post(APILQ.api_driverteam_driverOrderList, successCallback, failCallback, param);
    }

    render() {
        let view = (
            <View style={styles.container}>
                <SelInputAct
                    title={"京都"}
                    placeholder={"选择您想去的城市"}
                    cb={(ref, text) => {
                        navigation.push(this, "SelectCity", {
                            title: "选择城市",
                            param: {value: text},
                            callBack: (value) => {
                                ref.setTitle(value || "");
                            }
                        });
                    }}/>

                <View style={{flex: 1,backgroundColor:YITU.backgroundColor_0}}>
                    <MyEtcListView
                        startLoad={false}
                        style={{}}
                        rowView={this._renderRowView.bind(this)}//每行显示
                        onFetch={this._onFetch.bind(this)}//抓取数据
                        ref={(lv) => {
                            this.listView = lv;
                        }}
                        headerView={()=>{
                            return (<View style={{width:"100%"}}>
                                <Image style={{width:YITU.screenWidth,height:YITU.screenWidth*0.2}}
                                    source={require("./image/header_img.png")}/>
                                <SelItemView cb={(index)=>{
                                    // alert(index)
                                }}/>
                            </View>);
                        }}
                        emptyView={(refreshCallback) => {
                            return (
                                <View style={{width: "100%",marginTop:"20%", justifyContent: "center"}}>
                                    <Image style={{width: 150, height: 150, alignSelf: "center"}}
                                           source={require('../../../image/main/no_data.png')}/>
                                    <Text style={{textAlign: "center", marginTop: YITU.space_5}}>
                                        暂时还没有相关城市产品哦
                                    </Text>
                                </View>
                            );
                        }}/>
                </View>
            </View>);
        return (
            <PageView
                config={PageView.defaultConfig(this, {
                    hiddenIphoneXBottom: true,
                })}>
                {view}
            </PageView>
        );
    }
}

module.exports = LineCharter;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },

});
