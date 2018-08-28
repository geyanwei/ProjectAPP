import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../component/ModifiedScrollableTabBar';
import APIPZP from '../../http/APIPZP'
import HttpTool from '../../http/HttpTool.js';
import EmptyView from '../../component/MyEmptyView';
import MyEtcListView from '../../component/ListView/MyFlatList.js';
import OrderItem from './component/OrderItem.js'
import ScreenModal from './component/ScreenModal.js'
import Storage from "../../tool/Storage.js";
import {ModalBox, PageView} from 'myapplib';

class MyOrder extends Component {

    constructor(props) {
        super(props);
        this._firstLoad = -1; // render with first load so need to add twice 2018-07-09
        this.state = {
            label: (props.type === 'all') ?
                [
                    {title: "全部", type: "0,1,2,3,4,5,6"},
                    {title: "待付款", type: "0,1"},
                    {title: "待服务", type: "2,3,4"},
                    {title: "服务中", type: "5"},
                    {title: "待评价", type: "6"},
                    {title: "退款/售后", type: "6"},
                ] :
                [
                    {title: "全部", type: "0,1"},
                    {title: "待联系乘客", type: "0"},
                ],
            serviceCity: []
        };
        this.index = 0;//判断当前处于哪个listView
        this.listView = [];
        this.firstClick = [];//点击顶部tabbar要重新刷数据用
        this.first = false; //禁止第一次触发tabBar_click
        this.smallIndex = props.smallIndex || 0;

        //筛选所用
        this.productType = [{id: "101", name: "接机"}, {id: "102", name: "送机"}, {id: "103", name: "市内包车"},
            {id: "106", name: "跨城包车"}, {id: "104", name: "单次接送"}, {id: "107", name: "线路包车"},
            {id: "108", name: "自由包车"}];
        this.carType = [{id: "4", name: "五座"}, {id: "6", name: "七座"}, {id: "999", name: "其他"}];
        this.useTimeBegin = "";
        this.useTimeEnd = "";
    }

    tabBar_click(bool) {
        if (this.first) {
            if (bool) {
                //每次进入要刷新2个列表的数据
                if (this.listView && this.listView[0]) {
                    this.listView[0].list && this.listView[0].list.scrollToOffset({y: 0, animated: false});
                    this.listView[0].refresh()
                }
                if (this.listView && this.listView[1]) {
                    this.listView[1].list && this.listView[1].list.scrollToOffset({y: 0, animated: false});
                    this.listView[1].refresh()
                }
            }
        } else {
            this.first = true;
        }
    }

    renderEmptyView() {
        let option = {
            imageSource: require('../../image/error/noOrder.png'),
            imageStyle: {width: 370 / 2, height: 417 / 2},
            message: this.props.type === "all" ? "您还没有相关的订单" : "给自己定一个小目标，先来一单",
            messageStyle: {textAlign: 'center', lineHeight: 20, fontSize: YITU.fontSize_4, color: YITU.textColor_2},
            // buttonTitle: "重新加载",
            // buttonStyle: {width: 163, height: 33, justifyContent: "center", alignItems: 'center'},
            // callBack: () => {
            //     this.listView[this.index].refresh();
            // }
        };
        return (
            <View style={{
                height: YITU.screenHeight - 64 - 44 - 44, width: "80%", alignSelf: "center", alignItems: 'center',
                bottom: "10%"
            }}>
                <EmptyView mainContainerStyle={{flex: 1, alignItems: "center", justifyContent: 'center'}}
                           {...option}/>
            </View>
        )
    }


    _renderRowView(rowData, sectionID, rowID, highlightRow) {
        return (
            <OrderItem
                from={this.props.type}
                data={rowData.item}
                isTrip={true}
                obj={this}
                onRefresh={() => {
                    this.listView && this.listView.map((item) => {
                        item.list.scrollToOffset({y: 0, animated: false});
                        item && item.refresh && item.refresh()
                    })
                }}
            />
        );
    }

    //清洗城市列表,应对后台修改城市列表的情况
    clearServerCity(userInfo) {
        if (this.cityStatus) {
            let list = [];
            let oldC = this.cityStatus || [];
            let newC = userInfo && userInfo.citys || [];
            let oldCityIdList = [];
            for (let i = 0; i < oldC.length; i++) {
                oldCityIdList.push(oldC[i].id);
            }

            let newCityIdList = [];
            for (let i = 0; i < newC.length; i++) {
                newCityIdList.push(newC[i].id);
            }

            //循环新的城市列表
            for (let i = 0; i < newCityIdList.length; i++) {
                let id = newCityIdList[i];
                let no = oldCityIdList.indexOf(id);
                if (no > -1) {
                    //老城市存在该城市
                    list.push(oldC[no]);
                } else {
                    list.push(newC[i]);
                }
            }

            let serviceCity = "";
            for (let i = 0; i < list.length; i++) {
                if (list[i].isSel) {
                    serviceCity += list[i].id + ","
                }
            }

            if (serviceCity.length > 0) {
                serviceCity = serviceCity.substring(0, serviceCity.length - 1);
            }

            if (list.length > 0) {
                this.cityStatus = list;
            }
            return serviceCity;
        } else {
            return "";
        }
    }

    _onFetch(page = 0, callback, options, type, index) {
        Storage.getUserInfo((userInfo) => {
            let param = {
                page: page,
                pageSize: 10,
                status: type
            };

            if (this.seatType) {
                param.seatType = this.seatType;
            }
            if (this.subType) {
                param.secondType = this.subType;
            }
            let serviceCityCleand = this.clearServerCity(userInfo);
            if (serviceCityCleand) {
                param.serviceCity = serviceCityCleand;
            }
            if (this.useTimeBegin) {
                param.useTimeBegin = this.useTimeBegin;
            }
            if (this.useTimeEnd) {
                param.useTimeEnd = this.useTimeEnd;
            }

            let successCallback = (code, message, json, option) => {
                if (json) {
                    let pageNumber = (param.page - 1) * param.pageSize + json.length;
                    let optionNumber = option || 0;
                    callback(json, {
                        allLoaded: pageNumber == optionNumber, //显示结束的底部样式,由你来控制
                    });
                } else {
                    callback([], {
                        allLoaded: true, //显示结束的底部样式,由你来控制
                    });
                }

            };
            let failCallback = (code, message, option) => {
                let data = this.listView && this.listView[index] && this.listView[index].state && this.listView[index].state.data;
                let optionNumber = option || 0;
                let allLoaded = param.page * param.pageSize == optionNumber;
                if (page === 1 || !data || data && data.length === 0) {
                    allLoaded = true;
                }
                callback([], {
                    allLoaded: allLoaded
                });
            };
            HttpTool.post(APIPZP.travel_app_trip_tripServiceList, successCallback, failCallback, param);
        })
    }

    componentDidMount() {

    }

    // 滑动tab
    renderScrollableTab() {
        let label = this.state.label || [];
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarBackgroundColor={YITU.backgroundColor_0}
                tabBarActiveTextColor={YITU.textColor_4}
                tabBarInactiveTextColor={YITU.textColor_1}
                tabBarUnderlineStyle={styles.tabBarUnderline}
                initialPage={this.smallIndex}
                onChangeTab={(obj) => {
                    this.index = obj.i;
                    //第一次渲染是true,不触发事件
                    if (this.index !== 0 && (!this.firstClick[this.index])) {
                        this.firstClick[this.index] = true;
                    } else {
                        if (this._firstLoad > 0) {

                        } else {
                            this._firstLoad++;
                        }
                        if (this.listView && this.listView[this.index] && this.listView[this.index].state && this.listView[this.index].state.data && this.listView[this.index].state.data.length === 0) {
                            this.listView[this.index].refresh();
                        }
                    }

                }}
            >
                {
                    label.map((item, index) => {
                        return (
                            <View style={{flex: 1}} key={index} tabLabel={item.title}>
                                <MyEtcListView
                                    startLoad={true}
                                    style={{}}
                                    manualRefresh={() => {

                                    }}
                                    rowView={this._renderRowView.bind(this)}//每行显示
                                    onFetch={(page = 0, callback, options) => {
                                        let type = this.state.label[index].type;
                                        this._onFetch(page, callback, options, type, index);
                                    }}//抓取数据
                                    ref={(lv) => {
                                        this.listView[index] = lv;
                                    }}
                                    emptyView={(refreshCallback) => {
                                        return this.renderEmptyView()
                                    }}
                                    paginationAllLoadedView={() => {
                                        return (
                                            <View style={{}}>
                                                <Text style={{}}>
                                                    已经显示所有订单
                                                </Text>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        )
                    })
                }
            </ScrollableTabView>
        )
    }

    render() {
        let view = (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    {this.renderScrollableTab()}
                </View>
            </View>
        );
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

    navBar() {
        return {
            showLeftButton: this.props.type === "all",
            title: this.props.title || "行程",
            titleStyle: {
                fontSize: YITU.fontSize_7,
                color: "#fff",
                fontFamily: YITU.fontName_regular,
                fontWeight: "bold"
            },
            leftButtonTextStyle: {
                color: YITU.c_bg_white,
                marginLeft: YITU.space_0,
                fontSize: YITU.fontSize_4,
                fontFamily: YITU.fontName_regular,
            },
            leftButtonImg: require("../../image/img_back_white.png"),
            mainContainerStyle: {backgroundColor: YITU.textColor_4},

            rightButtonText: "筛选",
            rightButtonImg: require("../../image/main/shaixuan.png"),
            rightButtonImgStyle: {marginLeft: 5, width: 14, height: 14},
            rightButtonTextStyle: {fontSize: YITU.fontSize_4, color: YITU.c_title_white},
            rightButtonFunc: () => {

                let option = {
                    type: "right",
                    view: (
                        <ScreenModal
                            type={this.props.type}
                            isTrip={true}
                            ref={(lib) => {
                                this.lib = lib
                            }}
                            obj={this}
                            callBack={(subType, seatType, serviceCity, cityStatus, useTimeBegin, useTimeEnd, productType, carType) => {
                                this.subType = subType;
                                this.seatType = seatType;
                                this.serviceCity = serviceCity;
                                this.cityStatus = cityStatus;//城市状态（选中或未选中）
                                this.useTimeBegin = useTimeBegin;
                                this.useTimeEnd = useTimeEnd;
                                this.productType = productType;
                                this.carType = carType;
                                this.listView && this.listView.map((item) => {
                                    item.list.scrollToOffset({y: 0, animated: false});
                                    item && item.refresh && item.refresh()
                                });
                            }}
                            serviceCity={this.cityStatus}
                            productType={this.productType}
                            carType={this.carType}
                            useTimeBegin={this.useTimeBegin}
                            useTimeEnd={this.useTimeEnd}
                        />
                    )
                };
                ModalBox.showEditModal(option);
            },
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: YITU.backgroundColor_1
    },
    navLeft: {
        alignItems: 'center',
        marginLeft: YITU.space_2,
    },
    navRight: {
        alignItems: 'center',
        marginRight: YITU.space_2,
    },
    navIcon: {
        height: 20,
        width: 20,
    },
    navText: {
        fontSize: YITU.fontSize_1,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.7,
        backgroundColor: '#ededed',
        borderRadius: 5,
        height: 30,
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    searchContent: {
        color: YITU.textColor_3,
        fontSize: YITU.fontSize_15,
    },
    tabBarUnderline: {
        backgroundColor: YITU.backgroundColor_3,
        height: 2,
    }
});


module.exports = MyOrder;