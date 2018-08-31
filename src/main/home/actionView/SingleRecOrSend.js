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
import {PageView, navigation, Toast, Select, Loading} from 'myapplib';
import HttpTool from "../../../http/HttpTool";
import APIGYW from "../../../http/APIGYW.js";
import ActionCell from "./component/ActionCell";
import InforModuleView from "./component/InforModuleView";


import EZSwiper from './flight/component/EZSwiper.js';
import CarDetail from "./flight/component/CarDetail.js";
import DetailsModule from "./flight/component/DetailsModule";
import BottomItemView from "./flight/component/BottomItemView.js";
import BaseData from "./BaseData.js";

class SingleRecOrSend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
            data:[]
        };
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {

    }
    createViewData(){
        this.viewData = [
            {
                icon: require("../../../image/main/icon_city.png"),
                defaultValue: "请选择出发城市",
                value:this.startCity||"",
                field:"city",
                onPress: (data) => {
                    navigation.push(this, "SelectCity", {
                        title: "选择航班",
                        callBack: (obj) => {
                            data.value = obj.name || "";
                            this.startCity = data.value;
                            data.refs && data.refs.refresh();

                            if (!this.verData(true)) {
                                this.getData();
                            }
                        }
                    });
                }
            },
            {
                type:"line"
            },
            {
                icon: require("../../../image/main/icon_place.png"),
                defaultValue: "请选择上车地址",
                value:this.startAddress||"",
                field:"startAddress",
                onPress: (data) => {
                    if (!ActionCell.showMessage(this.viewData[0], this)) {
                        return;
                    }
                    navigation.push(this, "SelectCity", {
                        title: "选择航班",
                        callBack: (obj) => {
                            data.value = obj.name || "";
                            this.startAddress = data.value;
                            data.refs && data.refs.refresh();

                            if (!this.verData(true)) {
                                this.getData();
                            }
                        }
                    });
                }
            },
            {
                type:"line"
            },
            {
                icon: require("../../../image/main/icon_position.png"),
                defaultValue: "请选择下车地址",
                value:this.endAddress||"",
                field:"endAddress",
                onPress: (data) => {
                    if (!ActionCell.showMessage(this.viewData[0], this)) {
                        return;
                    }
                    navigation.push(this, "SelectCity", {
                        title: "选择航班",
                        callBack: (obj) => {
                            data.value = obj.name || "";
                            this.endAddress = data.value;
                            data.refs && data.refs.refresh();

                            if (!this.verData(true)) {
                                this.getData();
                            }
                        }
                    });
                }
            },
            {
                icon: require("../../../image/main/icon_time.png"),
                defaultValue: "请选择用车时间",
                value:this.userValue||"",
                field:"time",
                onPress: (data) => {
                    Select.showTime(data.dateValue || "", new Date(), new Date().getFullYear() + 30 + "," + 12 + "," + 31, {
                        pickerTitleText: "时间选择",
                        onSelect: (result) => {
                            data.value = result.toString().replace(/,/g, "");
                            data.dateValue = result.toString().replace(/年|月|日/g, "");
                            data.text = "";
                            this.userValue = data.value;
                            data.refs && data.refs.refresh();

                            if (!this.verData(true)) {
                                this.getData();
                            }
                        }
                    });
                }
            }];
        return this.viewData;
    }

    //校验数据
    verData(isNoShowToast) {
        for (let obj of this.viewData) {
            if (obj.type !== "line") {
                if (!ActionCell.showMessage(obj, this,isNoShowToast)) {
                    return true;
                }
            }
        }
    }

    //获取数据
    getData() {
        let param = {};
        for (let obj of this.viewData) {
            if (obj.type !== "line") {
                param[obj.field] = ActionCell.getValue(obj, this);
            }
        }
        this.requestData(param);
    }

    //请求接机车辆数据
    requestData() {
        BaseData.getBaseData({},(json)=>{
            this.setState({
                data: json
            });
            this.changeCar(json[0] || {});
        });
    }

    render() {
        let {data} = this.state;
        let view = (
            <View style={styles.container}>
                <ScrollView
                    style={{
                        backgroundColor: YITU.backgroundColor_1,
                    }}>
                    {this.createActionView(this.createViewData()||[])}
                    {
                        data && data.length > 0 ?
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
                            </View> : null
                    }
                </ScrollView>

                {
                    data && data.length > 0 ?
                        <BottomItemView
                            ref={(a) => this.bottomItemView = a}
                            isTop={false}
                            btnTitle={"确认行程"}
                            cb={() => {
                                navigation.push(this, "QueryCharterNext", {
                                    title: "订单提交",
                                    values: {
                                        time:this.userValue,
                                        headValue:this.startAddress,
                                        userCarType:"国际",
                                        endPlace:this.endAddress
                                    },
                                    carDescObj: this.carDescObj || {}
                                });
                            }}
                            callBack={() => {
                                DetailsModule.show(this.carDescObj, {
                                    btnTitle:"确认行程",
                                    callBack: () => {
                                        navigation.push(this, "QueryCharterNext", {
                                            title: "订单提交",
                                            values: {
                                                time:this.userValue,
                                                headValue:this.startAddress,
                                                userCarType:"国际",
                                                endPlace:this.endAddress
                                            },
                                            carDescObj: this.carDescObj || {}
                                        });
                                    }
                                });
                            }}/> : null
                }
            </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    barConfig: this.navBar(),
                    hiddenIphoneXBottom: true,
                })}>
                {view}
            </PageView>
        );
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
        this.bottomItemView && this.bottomItemView.setMoney(obj && obj.price || "");
        this.carDetail && this.carDetail.setData(obj || {});
    }

    navBar() {
        return {
            rightButtonText: "•••",
            rightButtonFunc: () => {
                InforModuleView.show(this);
            },
            leftContainerStyle: {width: 110},
            rightContainerStyle: {paddingHorizontal: 0, width: 110,}
        }
    }

    createActionView(views) {
        return views.map((item, index) => {
            return (<ActionCell
                ref={(a)=> item.refs = a}
                key={index}
                data={item}
                cb={(data) => {
                    data.onPress&&data.onPress(data);
                }}/>);
        });
    }
}

module.exports = SingleRecOrSend;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },

});
