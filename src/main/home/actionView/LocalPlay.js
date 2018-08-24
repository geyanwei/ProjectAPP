import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground, NativeModules
} from 'react-native';
import {PageView, navigation, Toast} from 'myapplib';
import HttpTool from "../../../http/HttpTool";
import APIGYW from "../../../http/APIGYW.js";
import SelAndInputView from "./component/SelAndInputView.js";
import SelItemViewLocalPlay from "./component/SelItemViewLocalPlay.js";
import LocalPlaceModuleView from "./component/LocalPlaceModuleView.js";

class LocalPlay extends Component {
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

    render() {
        let view = (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode={"cover"}
                    style={{width: YITU.screenWidth, height: 0.352 * YITU.screenWidth}}
                    source={require("./image/header_img1.png")}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            navigation.pop(this);
                        }}>
                        <View style={{
                            borderRadius: 10,
                            marginLeft: YITU.space_3,
                            marginTop: YITU.barStateHeight+2,
                            width:20,
                            height: 20,
                            backgroundColor:"rgb(177.5,177.5,177.5)",
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                            <Image
                                resizeMode={"contain"}
                                style={{
                                    height: 12,
                                }}
                                source={require("../../../image/img_back_white.png")}/>
                        </View>

                    </TouchableOpacity>
                </ImageBackground>
                <SelAndInputView
                    city={"选择城市"}
                    placeholder={"请输入目的地/景点/主题/关键字"}
                    cb={(refs, text) => {
                        navigation.push(this, "SelectCity", {
                            title: '选择城市',
                            single: true,
                            callBack: (obj) => {
                                let valName = "";
                                valName = valName + obj.name + ",";
                                valName = valName.substring(0, valName.length - 1); //城市名字 拼接结果
                                refs.setTitle(valName || "");
                            },
                        });
                    }}/>

                <SelItemViewLocalPlay
                    ref={(a) => this.selItemViewLocalPlay = a}
                    cb={(refs, obj, index) => {
                        this.localPlaceModuleView.setValue(obj.isTop ? 1 : 0, index);
                    }}/>


                <ScrollView
                    onLayout={(e) => {
                        NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                            this.localPlaceModuleView.setTopSpace(pageY);
                        });
                    }}
                    style={{
                        backgroundColor: YITU.backgroundColor_1,
                    }}>
                    <Text>
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                        花花毒害的话说读书读爱好速度哈U盾哈
                    </Text>
                </ScrollView>
                <LocalPlaceModuleView
                    ref={(a) => this.localPlaceModuleView = a}
                    topSpace={this.topSpace || 0}
                    cb={(index, value) => {
                        alert(JSON.stringify(value));
                        this.selItemViewLocalPlay.setData(index, value);
                    }}
                />
            </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    full: true,
                    hiddenIphoneXBottom: true,
                })}>
                {view}
            </PageView>
        );
    }
}

module.exports = LocalPlay;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    },

});
