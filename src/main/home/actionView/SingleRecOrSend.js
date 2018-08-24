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
import HttpTool from "../../../http/HttpTool";
import APIGYW from "../../../http/APIGYW.js";
import ActionCell from "./component/ActionCell";
import InforModuleView from "./component/InforModuleView";

class SingleRecOrSend extends Component {
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
    createViewData(){
        this.viewData = [
            {
                icon: require("../../../image/userIcon/grzx-zhaq.png"),
                defaultValue: "请选择出发城市",
                value:"",
                field:"city"
            },
            {
                type:"line"
            },
            {
                icon: require("../../../image/userIcon/grzx-zhaq.png"),
                defaultValue: "请选择上车地址",
                value:"",
                field:"startplace"
            },
            {
                type:"line"
            },
            {
                icon: require("../../../image/userIcon/grzx-zhaq.png"),
                defaultValue: "请选择下车地址",
                value:"",
                field:"endplace"
            },
            {
                icon: require("../../../image/userIcon/grzx-zhaq.png"),
                defaultValue: "请选择用车时间",
                value:"",
                field:"time"
            }];
        return this.viewData;
    }

    getValue(){
        let param = {};
        for (let obj of this.viewData) {
            if (obj.type !== "line") {
                if (!ActionCell.showMessage(obj, this)) {
                    return true;
                }
                param[obj.field] = ActionCell.getValue(obj, this);
            }
        }
        alert(JSON.stringify(param));
    }
    render() {
        let view = (
            <View style={styles.container}>
                <ScrollView
                    style={{
                        backgroundColor: YITU.backgroundColor_1,
                    }}>
                    {this.createActionView(this.createViewData()||[])}
                </ScrollView>
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
                    navigation.push(this, "SelectFlight", {
                        title: "选择航班",
                        callBack: (text) => {
                            data.value = text;
                            data.refs && data.refs.refresh();
                        }
                    });
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
