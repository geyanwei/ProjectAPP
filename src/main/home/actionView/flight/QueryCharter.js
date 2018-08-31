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
import {PageView, navigation, Toast, Loading} from 'myapplib';
import EZSwiper from './component/EZSwiper.js';

import HttpTool from "../../../../http/HttpTool";
import APIGYW from "../../../../http/APIGYW.js";
import BottomItemView from "./component/BottomItemView.js";
import QueryCharterItemDetail from "./component/QueryCharterItemDetail.js";
import CarDetail from "./component/CarDetail.js";
import DetailsModule from "./component/DetailsModule.js";
import BaseData from "../BaseData";

class QueryCharter extends Component {
    constructor(props) {
        super(props);
        this.myValue = props.values || {};
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
        BaseData.getBaseData({},(json)=>{
            this.setState({
                data: json
            });
            this.changeCar(json[0] || {});
        });
    }

    createRow(item) {
        return (<View
            style={{
                flex: 1,
                overflow: "hidden",
                borderRadius: YITU.radius_2,
                backgroundColor: YITU.backgroundColor_1
            }}>
            <Image
                resizeMode={"cover"}
                style={{
                    flex: 1,
                    borderRadius: YITU.radius_2
                }}
                source={{uri: item.carImg}}/>
        </View>);
    }

    changeCar(obj, index) {
        this.carDescObj = obj || {};
        this.queryCharterItemDetail && this.queryCharterItemDetail.setCarType(this.assemblyCarType(obj));
        this.bottomItemView && this.bottomItemView.setMoney(obj && obj.price || "");
        this.carDetail && this.carDetail.setData(obj || {});
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
    assemblyHeadTitle(){
        let obj = this.myValue||{};
        let headTitleObj = {
            userCarType:obj.userCarType||"",
            userDate:obj.time,
            desc:obj.headValue||(obj.flight + "包车" + (obj.days && obj.days.length) + "日游"),
        };
        return headTitleObj;
    }
    render() {
        let {data} = this.state;
        let view = null;
        if (data && data.length > 0) {
            view = (
                <View style={styles.container}>
                    <ScrollView
                        style={{
                            backgroundColor: YITU.backgroundColor_1,
                        }}>
                        <QueryCharterItemDetail
                            ref={(a) => this.queryCharterItemDetail = a}
                            myValue={this.assemblyHeadTitle()}
                        />

                        <View style={{
                            marginTop: YITU.space_5,
                            backgroundColor: YITU.backgroundColor_0,
                            paddingHorizontal: YITU.space_5,
                            paddingVertical: 3
                        }}>
                            {this.createDaysView(this.myValue.days || [])}
                        </View>

                        <View style={{
                            flex: 1,
                            marginTop: YITU.space_5,
                            backgroundColor: YITU.backgroundColor_0,
                            paddingVertical: YITU.space_2,
                        }}>
                            <EZSwiper
                                style={{
                                    width: YITU.screenWidth,
                                    height: 100,
                                }}
                                loop={false}
                                autoplayTimeout={0}
                                dataSource={data}
                                width={YITU.screenWidth}
                                height={100}
                                renderRow={this.createRow.bind(this)}
                                cardParams={{
                                    cardSide: YITU.screenWidth * 0.67,
                                    cardSmallSide: 100 * 0.67,
                                    cardSpace: YITU.screenWidth * (1 - 0.67) / 2 * 0.25
                                }}
                                onDidChange={this.changeCar.bind(this)}
                                // onPress={(obj, index) => {
                                //     alert(JSON.stringify(obj));
                                // }}

                                // ratio={0.867}
                            />
                            <CarDetail ref={(a) => this.carDetail = a}/>
                        </View>
                    </ScrollView>

                    <BottomItemView
                        ref={(a) => this.bottomItemView = a}
                        isTop={false}
                        btnTitle={"下一步"}
                        cb={() => {
                            navigation.push(this, "QueryCharterNext", {
                                title: "订单提交",
                                values: this.myValue,
                                carDescObj: this.carDescObj || {}
                            });
                        }}
                        callBack={() => {
                            DetailsModule.show(this.carDescObj, {
                                callBack: () => {
                                    navigation.push(this, "QueryCharterNext", {
                                        title: "订单提交",
                                        values: this.myValue,
                                        carDescObj: this.carDescObj || {}
                                    });
                                }
                            });
                        }}/>
                </View>);
        }
        return (
            <PageView
                ref={(ref) => this.pageView = ref}
                config={PageView.defaultConfig(this, {
                    hiddenIphoneXBottom: true,
                })}>
                {view}
            </PageView>
        );
    }

    createDaysView(arr) {
        return arr.map((item, index) => {
            return (<View
                key={index}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingVertical: 3
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
}

module.exports = QueryCharter;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },

});
