import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {PageView, navigation, Toast, Select} from 'myapplib';
import HttpTool from "../../../../http/HttpTool";
import APIGYW from "../../../../http/APIGYW.js";

import SelectCell from '../../../../component/SelectCell.js';
import ActionCell from "../component/ActionCell.js";
import MyButton from "../../../../component/MyButton.js";

class SelectFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
            selIndex: 0,
            inputValue: "",
            startCity: "",
            endCity: ""
        };

        this.flightDateObj = {
            icon: require("../../../../image/userIcon/grzx-zhaq.png"),
            isNoShowRightIcon: true,
            defaultValue: "请选择用车时间",
            value: "",
            field: "time",
        }
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {

    }

    render() {
        let {selIndex} = this.state;
        let view = (
            <View style={styles.container}>
                <ScrollView
                    style={{
                        backgroundColor: YITU.backgroundColor_1,
                    }}>

                    <View style={{
                        flexDirection: "row",
                        marginVertical: YITU.space_2,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        borderRadius: YITU.radius_1,
                        overflow: "hidden"
                    }}>
                        {this.createSelHeaderView()}
                    </View>


                    {this.createActionView(selIndex)}
                    <View style={{backgroundColor: YITU.backgroundColor_0}}>
                        <View style={{
                            marginLeft: YITU.space_5,
                            height: StyleSheet.hairlineWidth, backgroundColor: YITU.backgroundColor_Line
                        }}/>
                    </View>

                    <ActionCell
                        ref={(a) => this.flightDateObj.refs = a}
                        data={this.flightDateObj}
                        cb={(data) => {
                            Select.showTime(data.dateValue || "", new Date(), new Date().getFullYear() + 30 + "," + 12 + "," + 31, {
                                pickerTitleText: "时间选择",
                                onSelect: (result) => {
                                    data.value = result.toString().replace(/,/g, "");
                                    data.dateValue = result.toString().replace(/年|月|日/g, "");
                                    data.refs.refresh();
                                }
                            });
                        }}/>

                    <Text style={{
                        paddingVertical:YITU.space_6,
                        paddingHorizontal:YITU.space_5,
                        fontSize:YITU.fontSize_3,
                        color:this.state.selIndex===0?YITU.textColor_2:YITU.textColor_3
                    }}>
                        <Text>{"注："+"\n"+"1、如有中转，请选择末趟航班"+"\n"+"2、起飞日期请按您出发城市的当地时间来选择"}</Text>
                    </Text>

                    <MyButton
                        style={{
                            marginHorizontal: YITU.space_5,
                            marginTop: 0,
                            height: 45,
                            borderRadius: YITU.radius_1,
                            backgroundColor: YITU.backgroundColor_3
                        }}
                        ref={(a) => this.refBtn = a}
                        // disabled={true}
                        underlayColor={YITU.backgroundColor_11}
                        underlayTxtColor='#FFFFFFf0'
                        noClickedBackgroundColor={YITU.backgroundColor_4}
                        onPress={() => {
                            navigation.pop(this, () => {
                                this.props && this.props.callBack("ZU9540");
                            });
                        }}>查 询
                    </MyButton>
                </ScrollView>
            </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    hiddenIphoneXBottom: true,
                })}>
                {view}
            </PageView>
        );
    }

    createActionView(selIndex) {
        return (<View style={styles.row}>
            <View style={styles.cell}>
                <Image
                    resizeMode={"contain"}
                    style={styles.image}
                    source={require("../../../../image/userIcon/grzx-zhaq.png")}/>
                {selIndex === 0 ? this.createFlightInput() : this.createFlight_S_E_Place()}
            </View>
        </View>);
    }

    //航班号
    createFlightInput() {
        return (<TextInput
            style={[styles.title,{flex:1}]}
            placeholder={"请输入航班号"}
            value={this.state.inputValue}
            onChangeText={(text) => {
                this.setState({
                    inputValue: text
                });
            }}
        />);
    }

    //航班起降点
    createFlight_S_E_Place() {
        return (<View style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <TouchableOpacity
                style={{flex: 1,justifyContent:"center"}}
                onPress={() => {
                    this.setState({
                        startCity: "杭州"
                    });
                }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={[styles.title,
                        {
                            color: this.state.startCity && this.state.startCity !== "" ? YITU.textColor_1 : YITU.textColor_5
                        }
                    ]}>{this.state.startCity || "出发城市"}</Text>
            </TouchableOpacity>

            <Image
                resizeMode={"contain"}
                style={styles.image}
                source={require("../../../../image/userIcon/grzx-zhaq.png")}/>

            <TouchableOpacity
                style={{flex: 1, marginRight: YITU.d_icon}}
                onPress={() => {
                    this.setState({
                        endCity: "曼谷"
                    });
                }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={[styles.title,
                        {
                            textAlign: "right",
                            color: this.state.endCity && this.state.endCity !== "" ? YITU.textColor_1 : YITU.textColor_5
                        }]}>{this.state.endCity || "到达城市"}</Text>
            </TouchableOpacity>
        </View>);
    }

    createSelHeaderView() {
        return ["按航班号", "按起降地"].map((item, index) => {
            return (<TouchableOpacity
                key={index}
                style={{
                    backgroundColor: this.state.selIndex === index ? YITU.backgroundColor_3 : YITU.backgroundColor_0,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 30,
                    width: 110,
                }}
                onPress={() => {
                    this.setState({
                        selIndex: index
                    }, () => {

                    });
                }}>
                <Text style={{
                    color: this.state.selIndex === index ? YITU.c_title_white : YITU.textColor_1,
                    fontSize: YITU.fontSize_3
                }}>{item}</Text>
            </TouchableOpacity>);
        });
    }
}

module.exports = SelectFlight;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_Line
    },

    row: {
        height:50,
        paddingLeft: YITU.space_5,
        backgroundColor: YITU.backgroundColor_0,
        alignItems:"center"
    },
    cell: {
        flex: 1,
        paddingVertical: YITU.space_5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: YITU.space_5,
    },
    image: {
        width: YITU.d_icon,
        height: YITU.d_icon,
        marginRight: YITU.space_1
    },
    title: {
        fontSize: YITU.fontSize_7,
        color: YITU.textColor_1,
    },
});
