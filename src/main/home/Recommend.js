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
import HttpTool from "../../http/HttpTool";
import APIGYW from "../../http/APIGYW.js";
import SwiperView from "./component/SwiperView.js";
import FuncItemView from "./component/FuncItemView.js";
import CityItem from "./component/CityItem.js";
import SpotsCell from "./component/SpotsCell.js";

class Recommend extends Component {
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
            <View style={{
                flex: 1,
                backgroundColor: YITU.backgroundColor_1,
            }}>
                <ScrollView
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            style={{
                backgroundColor: YITU.backgroundColor_1,
            }}>
            <View>
            <SwiperView>{this.createBanner()}</SwiperView>
            </View>

            <View style={{
                padding: YITU.space_0,
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                backgroundColor: YITU.backgroundColor_0
            }}>
                {this.createFuncItemView()}
            </View>

            <View style={{
                marginTop: YITU.space_5,
                padding: YITU.space_0,
                width: "100%",
                backgroundColor: YITU.backgroundColor_0
            }}>
                {
                    this.createTitleRow("精选目的地", () => {
                        alert("更多");
                    })
                }
                <SwiperView
                    style={{
                        marginTop: YITU.space_0,
                        height: (YITU.space_0 * 2 + (YITU.screenWidth - 8 * YITU.space_0) / 3 * 0.504 + 40) * 2 + 30,
                    }}
                    autoplay={false}>
                    <View style={{
                        width: YITU.screenWidth - 2 * YITU.space_0,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        backgroundColor: YITU.backgroundColor_0,
                    }}>
                        {this.createCityItemView()}
                    </View>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: "100%",
                        backgroundColor: YITU.backgroundColor_0,
                    }}>
                        {this.createCityItemView()}
                    </View>
                </SwiperView>
            </View>


            <View style={{
                marginTop: YITU.space_5,
                padding: YITU.space_0,
                width: "100%",
                backgroundColor: YITU.backgroundColor_0
            }}>
                {
                    this.createTitleRow("当季热卖", () => {
                        navigation.push(this, "MoreHotSpots", {
                            title: "当季热卖"
                        });
                    })
                }
                {this.createCellView()}
            </View>

        </ScrollView>
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

    //创建title行
    createTitleRow(title, cb) {
        return (<View style={{
            flexDirection: "row",
            paddingTop: YITU.space_2,
            paddingBottom: YITU.space_0,
            paddingHorizontal: YITU.space_0
        }}>
            <View style={{width: 100}}/>
            <Text style={{
                flex: 1,
                color: YITU.textColor_0,
                fontSize: YITU.fontSize_7,
                textAlign: "center"
            }}>{title}</Text>
            <TouchableOpacity
                style={{width: 100, justifyContent: "flex-end", flexDirection: "row", alignItems: "center"}}
                onPress={() => {
                    cb && cb();
                }}>
                <Text style={{color: YITU.textColor_1, fontSize: YITU.fontSize_5}}>更多</Text>
                <Image resizeMode={"contain"} style={{marginLeft: YITU.space_0, width: 8, height: 13}}
                       source={require('../../image/userIcon/arrow.png')}/>
            </TouchableOpacity>
        </View>);
    }

    //创建banner图
    createBanner() {
        return [
            {
                imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534940128394&di=57099eab41a1cf507f075fd2392a66c0&imgtype=0&src=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F03%2F83%2F56%2F29%2Fthe-fort-resort.jpg",
                title: "The Face Suites"
            },
            {
                imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531888680142&di=5d8fdf94dbda7c0c4c53f38e9b46ffac&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9d82d158ccbf6c81343af522b63eb13532fa40ef.jpg",
                title: "卡帕莱度假村",
            },
            {
                imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534940212953&di=c9be5b7fac9aca22803e47d1004d6ede&imgtype=0&src=http%3A%2F%2Ffile110.mafengwo.net%2Fs9%2FM00%2FC8%2F89%2FwKgBs1dQRCGAKAKlAALTmjVuu-U91.jpeg%3FimageView2%2F2%2Fw%2F680%2Fq%2F90",
                title: "马达京岛",
            }].map((item, index) => {
            return (<ImageBackground
                key={index}
                resizeMode={"cover"}
                style={{
                    width: YITU.screenWidth,
                    height: YITU.screenWidth * 0.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} source={{uri: item.imgUrl}}>
                <Text style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>{item.title}</Text>
            </ImageBackground>);
        });
    }

    //创建功能模块
    createFuncItemView() {
        return [
            {
                title:"接机",
                path:"RecPlace",
                icon: require('../../image/userIcon/grzx-zhaq.png'),
            },
            {
                title:"送机",
                path:"SendPlace",
                icon: require('../../image/userIcon/grzx-zhaq.png'),
            },
            {
                title:"单次接送",
                path:"SingleRecOrSend",
                icon: require('../../image/userIcon/grzx-zhaq.png'),
            },
            {
                title:"线路包车",
                path:"LineCharter",
                icon: require('../../image/userIcon/grzx-zhaq.png'),
            },
            {
                title:"自由包车",
                path:"FreedomCharter",
                icon: require('../../image/userIcon/grzx-zhaq.png'),
            },
            {
                title:"当地玩乐",
                path:"LocalPlay",
                icon: require('../../image/userIcon/grzx-zhaq.png'),
            }].map((item, i) => {
            return (<FuncItemView
                key={i}
                item={item}
                cb={(data) => {
                    navigation.push(this,data.path,{
                        title:data.title
                    })
                }}/>);
        });
    }

    //创建城市地点模块
    createCityItemView() {
        return ["曼谷", "吉隆坡", "清迈", "巴厘岛", "台北", "首尔"].map((title, index) => {
            return {
                title: title,
                guiders: parseInt(Math.random() * 100) + 200,
                images: require('../../image/login/new_resister_pic.png')
            };
        }).map((item, i) => {
            return (<CityItem
                key={i}
                item={item}
                cb={(item) => {
                    navigation.push(this, "SpotsDetails", {
                        title: "景点详情"
                    });
                }}/>);
        });
    }

    //创建地点Cell
    createCellView() {
        return ["曼谷", "吉隆坡", "清迈", "巴厘岛", "台北",].map((title, index) => {
            return {
                title: title,
                images: require('../../image/login/new_resister_pic.png'),
                defaultSource: require("../../image/main/no_data.png"),
            };
        }).map((item, i) => {
            return (<SpotsCell
                key={i}
                data={item}
                cb={(data) => {
                    navigation.push(this, "SpotsDetailsHot", {
                        title: "产品详情"
                    });
                }}/>);
        });
    }
}

module.exports = Recommend;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },

});
