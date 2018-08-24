import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';
import {PageView, Toast, navigation} from 'myapplib';
import HttpTool from "../../http/HttpTool";
import APIGYW from "../../http/APIGYW.js";
import ConArea from "./component/ConArea.js";
import TitleArea from "./component/TitleArea.js";

class UserCenter extends Component {
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

    navBar() {
        return {
            showLeftButton: false,
            title: "目的地",
            mainContainerStyle: {backgroundColor: YITU.textColor_4},
            titleStyle: {
                fontSize: YITU.fontSize_7,
                color: "#fff",
                fontFamily: YITU.fontName_regular,
                fontWeight: "bold"
            },
        }
    }

    render() {
        let view = (<View style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: YITU.backgroundColor_1,
        }}>
            <TitleArea cb={(item) => {
                this.myList.refreshListView(item);

            }}/>
            <ConArea
                ref={(a) => this.myList = a}
                onPress={(item) => {
                    navigation.push(this, "SpotsDetails", {
                        title: "景点详情",
                    });
                }}/>
        </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    barConfig: this.navBar(),
                    hiddenIphoneXBottom: true,
                })}
            >
                {view}
            </PageView>
        );
    }
}

module.exports = UserCenter;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },

});
