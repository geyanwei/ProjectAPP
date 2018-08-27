import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    View,
    SectionList, Keyboard,

} from 'react-native';
import SelectCell from "../../../../component/SelectCell.js";
import CalendarHelp from '../../component/calendar/CalendarHelp.js';
import InputMoney from '../../../../component/InputMoney.js';
import MyButton from "../../../../component/MyButton.js";

class LocalPlaceModuleView extends Component {
    constructor(props) {
        super(props);
        this.fadeInOpacity = new Animated.Value(0); // 初始值
        this.state = {
            upData: 1,
            index: 0,
            isClickedDay: "",
            allTypeArr: [
                {
                    title: "全部分类",
                    isSel: false,
                }, {
                    title: "景点门票",
                    isSel: false,
                }, {
                    title: "一日游",
                    isSel: false,
                }],
            sortArr: [
                {
                    title: "智能排序",
                    isSel: false,
                }, {
                    title: "人气最旺",
                    isSel: false,
                }, {
                    title: "价格由高到低",
                    isSel: false,
                }, {
                    title: "价格由低到高",
                    isSel: false,
                }],
            width: 0,
            height: 0,
            topSpace: 0
        };
    }

    componentDidMount() {

    }

    setTopSpace(topSpace) {
        this.setState({
            topSpace: topSpace
        });
    }

    setValue(value, index, param) {
        if (value === 1) {
            this.setState({
                index: index,
                width: "100%",
                height: "100%",
            });
        }
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 0, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value == 0) {
                this.setState({
                    width: 0,
                    height: 0,
                }, () => {
                    this.props.cb && this.props.cb(index, param);
                });
            }
        });
    }

    render() {
        let opacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ["#fff", "rgba(0,0,0,0.2)"],
        });

        let {topSpace, width, height, index} = this.state;
        return (<Animated.View
            style={{
                position: "absolute",
                top: topSpace,
                left: 0,
                width: width,
                height: height,
                overflow: "hidden",
                backgroundColor: opacity
            }}>
            <TouchableOpacity
                activeOpacity={1}
                style={{width: "100%", height: "100%"}}
                onPress={() => {
                    this.setValue(0, index)
                }}>
                <View style={{width: "100%"}}>
                    {this.createItemView(index)}
                </View>
            </TouchableOpacity>

        </Animated.View>);
    }

    createItemView(index) {
        let view = null;
        switch (index) {
            case 0:
                view = this.createViewSel(this.state.allTypeArr || [], index);
                break;
            case 1:
                view = this.createViewSel(this.state.sortArr || [], index);
                break;
            case 2:
                view = this.createViewDay(index);
                break;
            case 3:
                view = this.createPriceArea(index);
                break;
            default:
                break;
        }
        return view;
    }

    createViewSel(arr, index) {
        return arr.map((item, i) => {
            return (
                <SelectCell
                    key={i}
                    style={{backgroundColor: YITU.backgroundColor_0,}}
                    onPress={() => {
                        this.changeData(arr, i);
                        this.setValue(0, index, item.title);
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            padding: YITU.space_4,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderColor: YITU.backgroundColor_Line
                        }}>
                        <Text style={{flex: 1, fontSize: YITU.fontSize_3}}>{item.title}</Text>
                        <Image style={{
                            marginLeft: YITU.space_5, width: 15, height: 15,
                            backgroundColor: item.isSel ? "red" : "white"
                        }}/>
                    </View>
                </SelectCell>);
        });
    }

    changeData(arr, i) {
        arr.map((item, index) => {
            item.isSel = index == i;
        });
    }

    //创建日期选择
    createViewDay(index) {
        let {isClickedDay} = this.state;
        return (<View style={{
            backgroundColor: YITU.backgroundColor_0,
            height: 55
        }}>
            <SectionList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, i, section}) => (
                    <SelectCell
                        key={i}
                        style={{
                            backgroundColor: isClickedDay === item.allDay ? YITU.backgroundColor_1 : YITU.backgroundColor_0,
                            alignItems: "center", justifyContent: "center"
                        }}
                        onPress={() => {
                            this.setState({
                                isClickedDay: item.allDay
                            }, () => {
                                this.setValue(0, index, item);
                            });
                        }}>
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingHorizontal: YITU.space_2
                            }}>
                            <Text style={{
                                fontSize: YITU.fontSize_4,
                                color: YITU.textColor_0
                            }}>{item.day}</Text>
                            <Text style={{
                                fontSize: YITU.fontSize_3,
                                marginTop: YITU.space_2,
                                color: YITU.textColor_5
                            }}>{"周" + item.week}</Text>
                        </View>
                    </SelectCell>)}
                renderSectionHeader={({section: {month}}) => (
                    <View style={{
                        height: 55,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: YITU.textColor_4,
                        paddingHorizontal: YITU.space_0
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            textAlign: "center",
                            fontSize: YITU.fontSize_5,
                            color: YITU.c_title_white
                        }}>{month + "\n" + "月"}</Text>
                    </View>
                )}
                sections={this.getDays()}
                keyExtractor={(item, index) => item + index}
            />
        </View>);
    }

    //获取每天数据
    getDays() {
        let today = new Date();
        let monthArr = [];
        for (let i = 0; i < 3; i++) {
            let days = [];
            for (let j = today.getDate(); j <= CalendarHelp.getDays(today.getFullYear(), (today.getMonth() + 1)); j++) {
                days.push({
                    allDay: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                    day: j,
                    week: CalendarHelp.getWeekOfDay(today),
                });
                today.setDate(today.getDate() + 1);
            }
            monthArr.push({
                month: today.getMonth() + 1,
                data: days
            });
            today.setDate(1);
            today.setMonth(today.getMonth() + 1);
        }
        return monthArr;
    }

    //创建价格区间
    createPriceArea(index) {
        return (<View style={{
            paddingHorizontal: YITU.space_5,
            paddingTop: YITU.space_6,
            backgroundColor: YITU.backgroundColor_0,
        }}>
            <Text style={{color: YITU.textColor_1, fontSize: YITU.fontSize_3}}>价格区间</Text>
            <View style={{
                flexDirection: "row",
                marginTop: YITU.space_2,
                alignItems: "center",
            }}>
                <View style={{
                    width: 120,
                    flexDirection: "row",
                    backgroundColor: YITU.backgroundColor_1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: YITU.space_1,
                }}>
                    <InputMoney
                        ref={(a) => this.minRefs = a}
                        keyboardType={"numeric"}
                        option={{
                            isGroup: false,
                            isNeedClear: true,
                        }}
                        // reg={[
                        //     ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                        //     ['[^\\d]+$', ''], //禁止录入任何非数字
                        // ]}
                        maxLength={9}
                        placeholder={"0"}
                        style={{fontSize: YITU.fontSize_4}}
                        value={this.minPrice || 0}
                        cb={(text) => {
                            this.minPrice = text;
                        }}
                    />
                    <Text style={{
                        fontSize: YITU.fontSize_3,
                        color: YITU.textColor_5
                    }}>元</Text>
                </View>
                <Text style={{marginHorizontal: YITU.space_1}}>~</Text>
                <View style={{
                    width: 120,
                    flexDirection: "row",
                    backgroundColor: YITU.backgroundColor_1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: YITU.space_1
                }}>
                    <InputMoney
                        ref={(a) => this.maxRefs = a}
                        keyboardType={"numeric"}
                        option={{
                            isGroup: false,
                            isNeedClear: true,
                        }}
                        maxLength={9}
                        placeholder={"999999"}
                        style={{fontSize: YITU.fontSize_4}}
                        value={this.maxPrice || 0}
                        cb={(text) => {
                            this.maxPrice = text;
                        }}
                    />
                    <Text style={{
                        fontSize: YITU.fontSize_3,
                        color: YITU.textColor_5
                    }}>元</Text>
                </View>
            </View>

            <View style={{flexDirection: "row", marginVertical: YITU.space_6}}>
                <View style={{
                    padding: StyleSheet.hairlineWidth,
                    backgroundColor: YITU.backgroundColor_3,
                    borderRadius: YITU.radius_1,
                    overflow: "hidden"
                }}>
                    <MyButton
                        style={{
                            width: 100,
                            height: 30,
                            borderRadius: YITU.radius_1,
                            backgroundColor: YITU.backgroundColor_0,
                        }}
                        txtStyle={{
                            color: YITU.textColor_4,
                            fontSize: YITU.fontSize_4,
                            textAlign: 'center'
                        }}
                        backgroundColor={YITU.backgroundColor_0}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.minPrice = "";
                            this.maxPrice = "";
                            this.minRefs.setValue("");
                            this.maxRefs.setValue("");
                            this.setValue(0, index, {
                                minPrice: "",
                                maxPrice: ""
                            });
                        }}>清除
                    </MyButton>
                </View>
                <View style={{width: 50}}/>
                <MyButton
                    style={{
                        width: 100,
                        height: 30,
                        borderRadius: YITU.radius_1,
                        backgroundColor: YITU.backgroundColor_0,
                    }}
                    ref={(a) => this.refBtn = a}
                    underlayColor={YITU.backgroundColor_11}
                    underlayTxtColor='#FFFFFFf0'
                    noClickedBackgroundColor={YITU.backgroundColor_4}
                    txtStyle={{
                        color: YITU.c_title_white,
                        fontSize: YITU.fontSize_4,
                    }}
                    onPress={() => {
                        Keyboard.dismiss();
                        this.setValue(0, index, {
                            minPrice: this.minPrice || "",
                            maxPrice: this.maxPrice || ""
                        });
                    }}>确定
                </MyButton>
            </View>
        </View>);
    }
}

module.exports = LocalPlaceModuleView;

const styles = StyleSheet.create({});