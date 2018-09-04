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
import SearchItem from "../../component/SearchItem.js"

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
            backgroundColor: YITU.backgroundColor_1,
        }}>
            <SearchItem
                placeholder={"请输入目的地"}
                returnKeyType={'search'}
                cb={(val) => {
                    this.searchVal = val
                }}
                onSubmitEditing={() => {
                    this.myTitleArea.setData(true);
                    this.myList.refreshListView({
                        title:"结果",
                        englishTitle:"Result",
                        imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535797735915&di=20df7a9d79d2187142154669a7868f8e&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2F2%2F2D%2F2DC8D18B509E29477F89BBB150F2DDF1.jpg"
                    });
                }}/>
            <View style={{flex: 1, flexDirection: "row",}}>
                <TitleArea ref={(a) => this.myTitleArea = a}
                    cb={(item) => {
                        this.myList.refreshListView(item)
                    }}/>

                <ConArea ref={(a) => this.myList = a}
                         onPress={(item) => {
                             navigation.push(this, "SpotsDetails", {
                                 title: "景点详情",
                             });
                         }}/>
            </View>
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
