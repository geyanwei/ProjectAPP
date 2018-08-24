import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
    Platform,
    ScrollView
} from 'react-native';
import Tool from "../../../tool/Tool";
import Storage from '../../../tool/Storage';
import {Select} from 'myapplib';
import SelectCell from '../../../component/SelectCell.js';
import _ from 'lodash';

class ScreenModal extends Component {

    constructor(props) {
        super(props);

        Storage.getUserInfo((userInfo) => {
            let serverCity = [];
            if (userInfo) {
                serverCity = _.cloneDeep(userInfo.citys);
            }
            let propsCity = [];

            if (Object.prototype.toString.call(this.props.serviceCity) === '[object Array]') {
                propsCity = _.cloneDeep(this.props.serviceCity);
            } else {
                propsCity = serverCity;
            }

            this.state = {
                useTimeBegin: this.props.useTimeBegin || "",
                useTimeEnd: this.props.useTimeEnd || "",
                serviceCity: propsCity
            };
        });


        this.productType = _.cloneDeep(this.props.productType) || [];
        this.carType = _.cloneDeep(this.props.carType) || [];
    }

    componentDidMount() {

    }

    // updateServerCity(oldCity, newCity) {
    //     let list = [];
    //     let oldC = oldCity || [];
    //     let newC = newCity || [];
    //
    //     let oldCityIdList = [];
    //     for (let i = 0; i < oldCity.length; i++) {
    //         oldCityIdList.push(oldCity[i].id);
    //     }
    //
    //     let newCityIdList = [];
    //     for (let i = 0; i < newCity.length; i++) {
    //         newCityIdList.push(newCity[i].id);
    //     }
    //
    //     //循环新的城市列表
    //     for (let i = 0; i < newCityIdList.length; i++) {
    //         let id = newCityIdList[i];
    //         let no = oldCityIdList.indexOf(id);
    //         if (no > -1) {
    //             //老城市存在该城市
    //             list.push(oldC[no]);
    //         } else {
    //             list.push(newC[i]);
    //         }
    //     }
    //     return list;
    // }

    startTime() {
        if (this.props.type === 'all') {
            //我的订单
            if (this.state.useTimeEnd) {
                let arr = this.state.useTimeEnd.split("-");
                let d2 = new Date(arr[0], arr[1] - 1, arr[2]);
                d2.setDate(d2.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(new Date(), new Date(2015, 5, 1), d2);
            } else {
                let d2 = new Date();
                d2.setFullYear(d2.getFullYear() + 1);
                d2.setDate(d2.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(new Date(), new Date(2015, 5, 1), d2);
            }
        } else {
            if (this.state.useTimeEnd) {
                let arr = this.state.useTimeEnd.split("-");
                let d2 = new Date(arr[0], arr[1] - 1, arr[2]);
                d2.setDate(d2.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(new Date(), new Date(), d2);
            } else {
                let d2 = new Date();
                d2.setFullYear(d2.getFullYear() + 1);
                d2.setDate(d2.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(new Date(), new Date(), d2);
            }
        }

    }

    endTime() {
        if (this.props.type === 'all') {
            //我的订单
            if (this.state.useTimeBegin) {
                let arr = this.state.useTimeBegin.split("-");
                let d2 = new Date(arr[0], arr[1] - 1, arr[2]);
                d2.setDate(d2.getDate());

                let d3 = new Date();
                d3.setFullYear(d3.getFullYear() + 1);
                d3.setDate(d3.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(d2, d2, d3);
            } else {
                let d2 = new Date();
                d2.setFullYear(d2.getFullYear() + 1);
                d2.setDate(d2.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(new Date(), new Date(2015, 5, 1), d2);
            }
        } else {
            if (this.state.useTimeBegin) {
                let arr = this.state.useTimeBegin.split("-");
                let d2 = new Date(arr[0], arr[1] - 1, arr[2]);
                d2.setDate(d2.getDate());

                let d3 = new Date();
                d3.setFullYear(d3.getFullYear() + 1);
                d3.setDate(d3.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(d2, d2, d3);
            } else {
                let d2 = new Date();
                d2.setFullYear(d2.getFullYear() + 1);
                d2.setDate(d2.getDate());
                return {pickerData, selectedValue} = Tool.createDateData(new Date(), new Date(), d2);
            }
        }
    }


    render() {
        let {pickerData, selectedValue} = this.startTime();
        let pickerData2 = this.endTime().pickerData;
        let selectedValue2 = this.endTime().selectedValue;
        let screenHeight = Platform.OS === 'ios' ? (YITU.screenHeight - YITU.IPHONEX_BOTTOM) : "100%";
        return (
            <View style={{
                backgroundColor: YITU.backgroundColor_0,
                height: screenHeight,
                width: YITU.screenWidth * 0.7,
            }}>
                <ScrollView>
                    <Text style={{
                        marginTop: (Platform.OS === 'android' ? YITU.space_6 : YITU.barStateHeight) + YITU.space_2,
                        marginVertical: YITU.space_2,
                        marginLeft: YITU.space_2
                    }}>
                        产品类型
                    </Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        {
                            this.productType.map((item, index) => {
                                return (<View key={index}
                                              style={styles.item_bg}>
                                    <ItemView data={item} cb={(item) => {
                                        this.productType[index] = item;
                                    }}/>
                                </View>)

                            })
                        }
                    </View>
                    {
                        //接单车型
                    }
                    <View style={{
                        backgroundColor: YITU.backgroundColor_4,
                        height: StyleSheet.hairlineWidth,
                        width: "100%",
                        marginTop: YITU.space_0
                    }}/>
                    <Text style={{marginTop: YITU.space_2, marginLeft: YITU.space_2}}>
                        接单车型
                    </Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: YITU.space_2}}>
                        {
                            this.carType.map((item, index) => {
                                return (<View key={index}
                                              style={styles.item_bg}>
                                    <ItemView data={item} cb={(item) => {
                                        this.carType[index] = item;
                                    }}/>
                                </View>)

                            })
                        }
                    </View>
                    <View style={{
                        backgroundColor: YITU.backgroundColor_4,
                        height: StyleSheet.hairlineWidth,
                        width: "100%",
                        marginTop: YITU.space_0
                    }}/>
                    <Text style={{marginTop: YITU.space_2, marginLeft: YITU.space_2}}>
                        所在城市
                    </Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: YITU.space_2}}>
                        {
                            this.state.serviceCity && this.state.serviceCity.map((item, index) => {
                                return (<View key={index}
                                              style={styles.item_bg}>
                                    <ItemView data={item} cb={(item) => {
                                        this.state.serviceCity[index] = item;
                                    }}/>
                                </View>)
                            })
                        }
                    </View>
                    <View style={{
                        backgroundColor: YITU.backgroundColor_4,
                        height: StyleSheet.hairlineWidth,
                        width: "100%",
                        marginTop: YITU.space_0,
                    }}/>
                    <Text style={{marginTop: YITU.space_2, marginLeft: YITU.space_2}}>
                        用车时间
                    </Text>
                    <View style={{
                        marginTop: YITU.space_2,
                        alignItems: "center",
                        backgroundColor: YITU.backgroundColor_1,
                        flexDirection: "row",
                        height: 50,
                        marginHorizontal: YITU.space_0,
                        marginBottom: YITU.space_2
                    }}>
                        <SelectCell style={styles.selTime}
                            onPress={() => {
                                if (this.props.isTrip) { // 行程的筛选

                                        } else { // 抢单的筛选
                                            YITU.ClickTrackFunction(YITU.TrackOrderList.filter.takeorder_filter_usetime);
                                }
                                
                            Select.show({
                                pickerData: pickerData,
                                selectedValue: selectedValue,
                                onSelect: v => {
                                    let str = v.toString().replace(/,/g, "-");
                                    let date = str.replace(/[\u4E00-\u9FA5]/g, '');

                                    this.setState({
                                        useTimeBegin: date,
                                    })
                                }
                            });
                        }}>
                            <Text style={{color: YITU.textColor_3}}>{this.state.useTimeBegin || "开始时间"}</Text>
                        </SelectCell>

                        <View style={{
                            backgroundColor: YITU.backgroundColor_4,
                            height: 3,
                            width: YITU.space_5,
                        }}/>
                        <SelectCell style={styles.selTime}
                            onPress={() => {
                                Select.show({
                                            pickerData: pickerData2,
                                            selectedValue: selectedValue2,//默认选择
                                            onSelect: v => {
                                                let str = v.toString().replace(/,/g, "-");
                                                let date = str.replace(/[\u4E00-\u9FA5]/g, '');
                                                this.setState({
                                                    useTimeEnd: date,
                                                })
                                            }
                                        });
                                    }}>
                            <Text style={{color: YITU.textColor_3}}>{this.state.useTimeEnd || "结束时间"}</Text>
                        </SelectCell>
                    </View>
                </ScrollView>
                {
                    /**
                     * 确认按钮
                     */
                }
                <View style={{
                    height: 44,
                    flexDirection: "row",
                }}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.productType.map((item, index) => {
                                this.productType[index].isSel = false
                            })
                            this.carType.map((item, index) => {
                                this.carType[index].isSel = false
                            })
                            this.state.serviceCity && this.state.serviceCity.map((item, index) => {
                                this.state.serviceCity[index].isSel = false
                            })
                            this.setState({
                                useTimeBegin: "",
                                useTimeEnd: ""
                            }, () => {
                                if (this.props.close) {
                                    this.props.close(() => {
                                        this.getValues();
                                    })
                                }
                            });

                        }}
                    >

                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            height: 44,
                            backgroundColor: "#eee",
                        }}>

                            <Text style={{color: YITU.textColor_4, fontSize: YITU.space_5}}>重置</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {

                        if (this.props.close) {
                            this.props.close(() => {
                                this.getValues();
                            })
                        }
                    }}>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            height: YITU.d_barHeight,
                            backgroundColor: YITU.backgroundColor_3
                        }}>
                            <Text style={{color: YITU.c_title_white, fontSize: YITU.space_5}}>确定</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    getValues() {
        this.subType = "";
        this.seatType = "";
        this.serviceCity = "";
        this.cityStatus = [];
        this.productType.map((item, index) => {
            if (item.isSel) {
                this.subType = this.subType + item.id + ","
            }
        });
        this.carType.map((item, index) => {
            if (item.isSel) {
                this.seatType = this.seatType + item.id + ","
            }
        });
        this.state.serviceCity && this.state.serviceCity.map((item, index) => {
            if (item.isSel) {
                this.serviceCity = this.serviceCity + item.id + ","
            }
            this.cityStatus.push(item)
        });
        this.subType = this.subType.substring(0, this.subType.length - 1);
        this.seatType = this.seatType.substring(0, this.seatType.length - 1);
        this.serviceCity = this.serviceCity.substring(0, this.serviceCity.length - 1);
        if (this.props.callBack) {
            this.props.callBack(this.subType, this.seatType, this.serviceCity, this.cityStatus, this.state.useTimeBegin, this.state.useTimeEnd,this.productType,this.carType)
        }

    }

}

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSel: props.data && props.data.isSel || false
        };
    }

    render() {
        let {data, cb} = this.props;
        let {isSel} = this.state;
        return (<View style={{
                borderRadius: YITU.radius_1,
                backgroundColor: isSel ? YITU.backgroundColor_3 : YITU.backgroundColor_Line,
                padding: StyleSheet.hairlineWidth,
                marginHorizontal: YITU.space_0,
            }}>
                <SelectCell
                    style={[styles.item, {
                        backgroundColor: isSel ? YITU.backgroundColor_0 : YITU.backgroundColor_1,
                    }]}
                    onPress={() => {
                        this.setState({
                            isSel: !isSel
                        }, () => {
                            if (cb) {
                                data.isSel = !isSel;
                                cb(data);
                            }
                        });
                    }}>
                    <Text style={[styles.title, {
                            color: isSel ? YITU.textColor_4 : YITU.textColor_3
                        }]}>{data.name}</Text>
                </SelectCell>
                {isSel ? <Image style={styles.sign} source={require('../../../image/user/select_sign.png')}/> : null}
            </View>);
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },
    con: {
        paddingVertical: YITU.space_5,
        paddingHorizontal: YITU.space_5,
        backgroundColor: YITU.c_bg_white,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    desc: {
        marginTop: YITU.space_7,
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_2,
        textAlign: "center",
    },
    item_bg: {
        width: "33.3%",
        marginVertical: YITU.space_0,
    },
    item: {
        paddingVertical: YITU.space_2,
        position: "relative",
        borderRadius: YITU.radius_1
    },
    title: {
        fontSize: YITU.fontSize_3,
        textAlign: "center",
    },
    sign: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: YITU.d_icon_center,
        height: YITU.d_icon_center,
    },
    selTime:{
        borderRadius: YITU.radius_1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: YITU.space_2,
        flex: 1,
        height: 30,
        marginVertical: YITU.space_2,
        backgroundColor: YITU.backgroundColor_0
    }
});


module.exports = ScreenModal;
