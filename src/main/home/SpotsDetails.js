import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    NativeModules,
    Platform,
    DeviceInfo
} from 'react-native';
import {PageView, LayoutBox, navigation, Toast, AppInit, Loading, ModalBox} from 'myapplib';
import AniViewBgImage from './component/ani/AniViewBgImage.js';
import AniNavHead from './component/ani/AniNavHead.js';
import ModuleView from './component/ModuleView.js';
import HtmlView from './component/htmlView';
import ShareModule from "./component/ShareModule.js";

import FuncItemView from "./component/FuncItemView.js";

const headImage_height = 155 + (Platform.OS === 'android' ? -20 : 1 == 1 ? 24 : 0);

class SpotsDetails extends Component {
    constructor(props) {
        super(props);
        this.position_Y = 0;
        this.isAutoControlScroll = true;
        this.state = ({
            update: 0
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        let view = (
            <View style={{flex: 1, backgroundColor: YITU.backgroundColor_0}}>
                {/*{此处40是图片比原图片高度大40像素}*/}
                <AniViewBgImage
                    ref={(a) => this.AniViewBgImage = a}
                    url={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531995286064&di=7f168ef613ccc7b860baaa422c781bab&imgtype=0&src=http%3A%2F%2Ffile27.mafengwo.net%2FM00%2FEA%2FDA%2FwKgB6lO-Q2CAHobgABuR9-ffKgc01.jpeg"}
                    aniHeight={headImage_height + 40}/>

                <ScrollView
                    ref={(a) => {
                        this.myScrollView = a;
                    }}
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                    scrollEventThrottle={1}
                    onScroll={(e) => {
                        let y = e.nativeEvent.contentOffset.y;
                        this.AniViewBgImage.setScrollNum(y);
                        this.AniNavHead.setScrollNum(y);
                        this.position_Y = (YITU.navBarHeight + (this.isAutoControlScroll ? 40 : 41));

                        // if (this.isAutoControlScroll) {
                        // }
                    }}
                    onMomentumScrollEnd={(e) => {
                        // let y = e.nativeEvent.contentOffset.y;
                        // this.position_Y=(YITU.navBarHeight+39);
                        // SelectItem.setScrollSel(this.selectItem,(y+this.position_Y)>this.currentPosY2?2:((y+this.position_Y)>this.currentPosY1?1:0));
                        this.isAutoControlScroll = true;
                    }}>

                    <View style={{
                        height: headImage_height,
                        width: "100%",
                        justifyContent: "flex-end",
                        paddingBottom: YITU.space_2,
                        paddingLeft: YITU.space_5,
                    }}>
                        <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_6, marginBottom: YITU.space_0}}>
                            曼谷
                        </Text>
                        <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_6}}>
                            Bangkok
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: YITU.backgroundColor_0,
                        paddingHorizontal: YITU.space_0,
                        paddingVertical: YITU.space_1,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: "100%"
                    }}>
                        {this.createFuncItemView()}
                    </View>
                    <View style={{
                        height: YITU.space_6, width: "100%",
                        backgroundColor: YITU.backgroundColor_1,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: YITU.backgroundColor_Line
                    }}/>

                    <View style={styles.actionCon}>
                        {this.createSpotsDescsCell(this.getSpotsDescsData())}

                    </View>
                </ScrollView>

                <AniNavHead
                    ref={(a) => this.AniNavHead = a}
                    aniHeight={headImage_height - YITU.navBarHeight}
                    title={this.props.title || ""}
                    isBack={true}
                    cb={() => {
                        navigation.pop(this,()=>{
                            this.props.callBack&&this.props.callBack();
                        });
                    }}
                    rightArr={[
                        {
                            defIcon: require("../../image/icon_collect_def.png"),
                            selIcon: require("../../image/icon_collect_sel.png"),
                            onPress: () => {
                                alert("收藏");
                            }
                        },
                        {
                            defIcon: require("../../image/icon_share_def.png"),
                            selIcon: require("../../image/icon_share_sel.png"),
                            onPress: () => {
                                ShareModule.show();
                            }
                        }]}/>
            </View>);
        return (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                full: true,
                refresh: () => {
                    PageView.toLoading(this.pageView);
                    this.httpGetMessage();
                },
                pageLoading: true,
                errorTitle: this.props.title || "详情",
                navBack: () => {
                    navigation.pop(this,()=>{
                        this.props.callBack&&this.props.callBack();
                    });
                },
            })}>
            {view}
        </PageView>);
    }

    //创建功能模块
    createFuncItemView() {
        return ["接机", "送机", "单次接送", "线路包车", "自由包车", "当地玩乐"].map((title, index) => {
            return {title: title, icon: require('../../image/userIcon/grzx-zhaq.png')}
        }).map((item, i) => {
            return (<FuncItemView
                key={i}
                item={item}
                cb={(item) => {
                    alert(JSON.stringify(item));
                }}/>);
        });
    }

    //模拟景点数据
    getSpotsDescsData() {
        let data = [
            {
                title: "万里长城",
                descs: "不到长城非好汉,登上长城无遗憾..."
            },
            {
                title: "台北故宫博物院",
                descs: "故宫博物院于抗日战争的前夕，选择重要文物南迁。" + "\n" +
                "1931年，日本发动九一八事变侵占东北后，国民政府开始计划将博物院文物南运。隔年，日军攻占热河、进逼北平，故宫理事会要求博物院选择院藏文物菁华装箱储置，开始南运。\n" +
                "1933年2月6日，北平戒严，华北情势告急，第一批南迁文物抵达上海，期间南迁文物共五批19,557箱，包含古物陈列所、颐和园、国子监等单位文物的6,066箱。隔年2月，" +
                "公布《国立北平故宫博物院暂行组织条例》，故宫改隶行政院，命马衡为院长。",
                imgArr: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531999816272&di=6a76f331689c011a27689fced932d050&imgtype=0&src=http%3A%2F%2Fdiscovery.cctv.com%2F20070313%2Fimages%2F1173749625655_1173749625655.jpg",]
            },
            {
                title: "台北101大楼",
                descs: "1936年12月，南迁文物由上海转运首都南京。" + "\n" +
                "1937年1月，故宫博物院南京分院，即中央博物院正式成立。8月，上海爆发淞沪会战，南迁文物再由庄尚严等人第一批80箱南京文物迁至长沙；" +
                "隔年11月再转运至贵阳安顺暂置（1944年再运往四川巴县）。" + "\n" +
                "1937年11月，第二批9369箱以水路，经由长江至汉口；1939年5月再移往宜昌、重庆至四川乐山。第三批7286箱文物由那志良走陇海铁路运至陕西宝鸡；" +
                "1939年7月，再转卡车经汉中运抵成都，随后又运往峨眉古庙安置，成立故宫博物院峨眉办事处。最后南迁至南京的文物，约2900箱文物因来不及运送，" +
                "滞留在南京。北平沦陷后，北平故宫仍留有许多文物，沦陷期间还在继续清点未曾登记的文物，并又广泛征集了一批珍贵文物 [4]  。",
                imgArr: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531999816271&di=d3acb40c0fc5a11d739089d00a3a7f6a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D2a28573d5282b2b7b392318458d5ae83%2Fcf1b9d16fdfaaf5178b24e86875494eef01f7ab2.jpg",
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531999816271&di=bb193b8c119771684bb9da10b1280cea&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Df2fef72ad654564ef168ec79daa6f9ee%2F9e3df8dcd100baa176bb8c824c10b912c8fc2e70.jpg",
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531999816270&di=318d39bf17b8d07cc038c648399431e8&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ffd%2Ftg%2Fg3%2FM05%2F9F%2FA0%2FCggYGlZduxuAO3IAAAIrOnwnCK4932.jpg"]
            },
            {
                title: "中正纪念堂",
                descs: "故宫博物院于抗日战争的前夕，选择重要文物南迁。" + "\n" +
                "1931年，日本发动九一八事变侵占东北后，国民政府开始计划将博物院文物南运。隔年，日军攻占热河、进逼北平，故宫理事会要求博物院选择院藏文物" +
                "菁华装箱储置，开始南运。" + "\n" +
                "1933年2月6日，北平戒严，华北情势告急，第一批南迁文物抵达上海，期间南迁文物共五批19,557箱，包含古物陈列所、颐和园、国子监等单位文物的6,066箱。" +
                "隔年2月，公布《国立北平故宫博物院暂行组织条例》，故宫改隶行政院，命马衡为院长。",
                imgArr: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532595228&di=ef84f76c4ec61fddcf676e48abff77db&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.cnzyx.net%2Fdata%2Fattachment%2FProducts%2F20150513%2F2015051315155543N.jpg"]
            },
            {
                title: "台北国父纪念馆",
                imgArr: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532001029375&di=bbce6cfceaf78fdb29dafcfb5f317e47&imgtype=0&src=http%3A%2F%2Fpic.goytrip.com%2Fpicture%2Ftour%2Fupload%2Fimage%2F20160918%2F1474196763690009852.jpg"]
            },
            {
                title: "台北国父纪念馆",
                descs: "1937年11月，第二批9369箱以水路，经由长江至汉口；1939年5月再移往宜昌、重庆至四川乐山。第三批7286箱文物由" +
                "那志良走陇海铁路运至陕西宝鸡；1939年7月，再转卡车经汉中运抵成都，随后又运往峨眉古庙安置，成立故宫博物院峨眉办事处。" +
                "最后南迁至南京的文物，约2900箱文物因来不及运送，滞留在南京。北平沦陷后，北平故宫仍留有许多文物，沦陷期间还在继续清点" +
                "未曾登记的文物，并又广泛征集了一批珍贵文物"
            },];
        return data;
    }

    //创建景点显示View
    createSpotsDescsCell(data) {
        return data.map((item, index) => {
            return (<View
                key={index}
                style={{paddingHorizontal: YITU.space_2, paddingVertical: YITU.space_0}}>
                <View style={{height: 30, alignItems: "center", flexDirection: "row"}}>
                    <View style={{
                        width: 3,
                        height: 22,
                        backgroundColor: YITU.backgroundColor_3,
                        marginRight: YITU.space_2,
                        borderRadius: 1.5
                    }}/>
                    <Text style={{fontSize: YITU.fontSize_6, color: YITU.textColor_1}}>{item.title}</Text>
                </View>

                {item.descs ?
                    <View style={{width: "100%"}}>

                        <Text
                            numberOfLines={3}
                            ellipsizeMode={"tail"}
                            style={{
                                fontSize: YITU.fontSize_4,
                                color: YITU.textColor_2
                            }}>
                            <Text>{item.descs}</Text>
                        </Text>


                        <TouchableOpacity onPress={() => {
                            ModuleView.show(item);
                        }}>
                            <Text style={{fontSize: YITU.fontSize_4, color: YITU.textColor_4}}>
                                <Text>[详细简介]</Text>
                            </Text>
                        </TouchableOpacity>
                    </View> : null}

                {this.createShowImage(item.imgArr || [])}
            </View>)
        });
    }

    createShowImage(imgArr) {
        return imgArr.map((item, index) => {
            return (<Image key={index}
                           resizeMode={"cover"}
                           style={{
                               marginVertical: YITU.space_0,
                               width: YITU.screenWidth - 2 * YITU.space_2,
                               height: (YITU.screenWidth - 2 * YITU.space_2) * 0.504,
                           }}
                           source={{uri: item}}
            />)
        })
    }
}

module.exports = SpotsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },

    actionCon: {
        flex: 1,
        paddingTop: YITU.space_0,
        paddingBottom: YITU.space_6,
        backgroundColor: YITU.backgroundColor_0,
    },
});
