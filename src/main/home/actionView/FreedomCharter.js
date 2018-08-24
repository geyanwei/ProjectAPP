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
import {PageView, navigation, Toast} from 'myapplib';
import HttpTool from "../../../http/HttpTool.js";
import APIGYW from "../../../http/APIGYW.js";
import InforModuleView from "./component/InforModuleView";
import ActionCell from "./component/ActionCell.js";
import MyButton from "../../../component/MyButton.js";
import SelectCell from "../../../component/SelectCell.js";
import CharterModuleView from "./component/CharterModuleView.js";


class FreedomCharter extends Component {
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

    createViewData() {
        this.viewData = [
            {
                icon: require("../../../image/userIcon/grzx-zhaq.png"),
                defaultValue: "请选择包车开始城市",
                value: this.flightValue || "",
                field: "flight",
                callBack: (data) => {
                    navigation.push(this, "SelectFlight", {
                        title: "选择航班",
                        callBack: (text) => {
                            this.userCarDaysRow.setCity("萨克韩斯坦");
                            data.value = "萨克韩斯坦";
                            this.flightValue = "萨克韩斯坦";
                            data.refs && data.refs.refresh();
                        }
                    });
                }
            },
            {
                type: "line"
            },
            {
                icon: require("../../../image/userIcon/grzx-zhaq.png"),
                defaultValue: "请选择用车时间",
                value: this.useTime || "",
                field: "time",
                callBack: (data) => {
                    data.value = "2018-10-19";
                    this.useTime = "2018-10-19";
                    data.refs && data.refs.refresh();
                }
            },
            {
                type: "line"
            }];
        return this.viewData;
    }

    render() {
        let view = (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <ScrollView>
                        {this.createActionView(this.createViewData() || [])}

                        <UserCarDaysRow
                            ref={(a) => this.userCarDaysRow = a}
                            cb={(value) => {
                                alert(value);
                            }}/>
                    </ScrollView>
                </View>
                <MyButton
                    style={{
                        height: 45,
                        backgroundColor: YITU.backgroundColor_3
                    }}
                    ref={(a) => this.refBtn = a}
                    // disabled={true}
                    underlayColor={YITU.backgroundColor_11}
                    underlayTxtColor='#FFFFFFf0'
                    noClickedBackgroundColor={YITU.backgroundColor_4}
                    onPress={() => {
                        let param = this.getValue();
                        if (!param) return;

                        let daysDetail = this.userCarDaysRow.getDaysDetailValue() || [];
                        let isHasNull = this.getDays(daysDetail);
                        if (isHasNull) return;
                        let finalParam = Object.assign(param, {days: daysDetail});
                        // alert(JSON.stringify(finalParam));

                        navigation.push(this,"QueryCharter",{
                            title:finalParam.flight+"包车"+finalParam.days.length+"日游",
                            values:finalParam
                        });

                    }}>查询
                </MyButton>
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

    //提交时 拦截数据不能为空
    getValue() {
        let param = {};
        for (let obj of this.viewData) {
            if (obj.type !== "line") {
                if (!ActionCell.showMessage(obj, this)) {
                    return false;
                }
                param[obj.field] = ActionCell.getValue(obj, this);
            }
        }
        return param;
    }

    getDays(daysDetail) {
        for (let i = 0; i < daysDetail.length; i++) {
            let item = daysDetail[i];
            if (!item.value || item.value === "") {
                Toast.show("请选择第" + item.days + "天包车服务范围");
                return true;
            }
        }
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
                ref={(a) => item.refs = a}
                key={index}
                data={item}
                cb={(data) => {
                    data.callBack && data.callBack(data);
                }}/>);
        });
    }
}

module.exports = FreedomCharter;

class UserCarDaysRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allViews: [{
                days: 1,
                value: "",
                city: ""
            }]
        }
    }

    setCity(city) {
        let {allViews} = this.state;
        let obj = allViews.splice(0, 1);
        obj[0].city = city;
        obj[0].value = "";
        obj[0].refs.setValue("");
        this.setState({
            city: city,
            allViews: obj,
        });
    }

    getDaysDetailValue() {
        let myParam = [];

        for (let i in this.state.allViews) {
            let obj = this.state.allViews[i];
            myParam.push({
                days: obj.days,
                value: obj.value,
                city: obj.city,
            });
        }
        return myParam;
    }

    render() {
        let {allViews} = this.state;
        return (<View>
            <View style={styles.cell}>
                <Image resizeMode={"contain"}
                       style={styles.image}
                       source={require("../../../image/userIcon/grzx-zhaq.png")}/>
                <Text style={styles.title}><Text>{"用车天数"}</Text></Text>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                    <TouchableOpacity onPress={() => {
                        if (allViews.length < 2) {
                            return;
                        }
                        allViews.splice(allViews.length - 1, 1);
                        this.setState({
                            allViews: allViews,
                        });
                    }}>
                        <Image resizeMode={"contain"}
                               style={[styles.image, {marginRight: 0}]}
                               source={require("./image/icon_jian.png")}/>
                    </TouchableOpacity>

                    <Text style={{minWidth: 60, textAlign: "center"}}>{allViews.length}</Text>
                    <TouchableOpacity onPress={() => {
                        allViews.push({value: ""});
                        this.setState({
                            allViews: allViews,
                        });
                    }}>
                        <Image resizeMode={"contain"}
                               style={[styles.image, {marginRight: YITU.space_1}]}
                               source={require("./image/icon_jia.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
            {this.createSelDayAction(allViews || [])}
        </View>);
    }

    createSelDayAction(allViews) {
        return allViews.map((item, index) => {
            item.days = index + 1;
            return (<SelDayAction
                ref={(a) => item.refs = a}
                key={index}
                days={item.days}
                onPress={() => {
                    let msg = this.charterCarIsNull(allViews, item.days);
                    if (msg && msg !== "") {
                        Toast.show(msg);
                        return;
                    }
                    this.requestData((obj) => {
                        if (!obj) return;
                        if (obj&&obj.otherCity){
                            this.clearDayData(index,allViews,{
                                city: "巴尔斯坦",
                                title: "途径巴尔斯坦城市并停留一晚",
                                // cityLemit: "A720环城高速之内",
                                // referenceSites: "Auld Reekie Tours"
                            });
                        }else {
                            this.clearDayData(index,allViews,obj);
                        }
                    });
                }}
            />);
        });
    }

    //重新选择每一天的航程时 清空当天以下的所有数据
    clearDayData(index,allViews,obj){
        for (let i=index;i<allViews.length;i++){
            let myObj = allViews[i];
            myObj.city = i<=index?obj.city:"";
            myObj.value = i<=index?(obj.title + "value"):"";
            myObj.refs.setValue(i<=index?obj.title:"");
            allViews[i] = myObj
        }
    }

    //拦截每天的包车范围以此不能为空
    charterCarIsNull(allData, days) {
        if (days == 1 && (!this.state.city || this.state.city === "")) {
            return "请选择包车开始城市";
        }
        for (let i = 0; i < (days - 1); i++) {
            let obj = allData[i] || {};
            if (!obj.city || obj.city === "" || obj.value === "") {
                return (i === 0 && obj.city === "") ? "请选择包车开始城市" : ("请选择第" + (i + 1) + "天包车服务范围");
            }
        }
    }

    //请求数据
    requestData(cb) {
        let charterData = [
            {
                city: "阿姆斯特丹",
                title: "阿姆斯特丹市区，市内包车服务",
                cityLemit: "A720环城高速之内",
                referenceSites: "Auld Reekie Tours"
            },
            {
                city: "拉斯维加斯",
                title: "拉斯维加斯赌场风云地，周边包车服务",
                referenceSites: "大堤坝、渔港、海牙和平宫/国际法庭、圆顶教堂广场、伊拉斯谟桥"
            }];
        setTimeout(() => {
            CharterModuleView.show(charterData, (obj) => {
                cb && cb(obj);
            });
        }, 300);
    }

}

class SelDayAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            days: props.days
        }
    }


    //获取每天的数据
    setValue(value) {
        this.setState({
            value: value,
        });
    }

    render() {
        let {onPress} = this.props;
        let {value, days} = this.state;
        return (<View>
            <View style={{
                width: "100%",
                backgroundColor: YITU.backgroundColor_0,
                height: StyleSheet.hairlineWidth
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: YITU.backgroundColor_Line,
                    marginLeft: YITU.space_5
                }}/>
            </View>

            <SelectCell
                style={{backgroundColor: YITU.backgroundColor_0}}
                onPress={() => {
                    onPress && onPress();
                }}>
                <View style={styles.cell}>
                    <Text style={styles.title}><Text>{"第" + days + "天"}</Text></Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={[styles.title, {
                            flex: 1,
                            marginLeft: YITU.space_5,
                            color: value && value !== "" ? YITU.textColor_1 : YITU.textColor_5
                        }]}><Text>{value || "请选择包车服务范围"}</Text></Text>
                    <Image resizeMode={"contain"}
                           style={styles.icon}
                           source={require("../../../image/userIcon/arrow.png")}/>
                </View>
            </SelectCell>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },
    cell: {
        flex: 1,
        paddingVertical: YITU.space_2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: YITU.space_5,
        backgroundColor: YITU.backgroundColor_0
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
    icon: {
        width: YITU.d_icon_small,
        height: YITU.d_icon_small,
        marginLeft: YITU.space_1
    },
});
