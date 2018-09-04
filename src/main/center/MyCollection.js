import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../component/ModifiedScrollableTabBar';
import APIPZP from '../../http/APIPZP'
import HttpTool from '../../http/HttpTool.js';
import EmptyView from '../../component/MyEmptyView';
import MyEtcListView from '../../component/ListView/MyFlatList.js';
import CollectionItem from './cell/CollectionItem.js'
import {ModalBox, PageView} from 'myapplib';
import ViewAniLeft from "../../component/ViewAniLeft.js"

class MyCollection extends Component {

    constructor(props) {
        super(props);
        this._firstLoad = -1; // render with first load so need to add twice 2018-07-09
        this.state = {
            label: [
                {title: "当地玩乐", type: "0,1"},
                {title: "目的地", type: "0"},
            ],
        };
        this.listView = [];
        this.firstClick = [];//点击顶部tabbar要重新刷数据用
        this.smallIndex = props.smallIndex || 0;
    }

    componentDidMount() {

    }

    renderEmptyView() {
        return (<EmptyView
            mainContainerStyle={{
                marginTop: "20%",
                flex: 1,
                alignItems: "center",
                justifyContent: 'center'
            }}
            imageSource={require('../../image/error/noOrder.png')}
            message={"暂时还没有收藏哦"}/>);
    }


    _renderRowView(rowData, sectionID, rowID, highlightRow) {
        return (
            <ViewAniLeft
                actionArr={
                    [{
                        itemStyle: {},
                        signImg: require("../../image/user/icon_delete.png"),
                        title: "删除",
                        onPress: () => {
                            alert("删除");
                        }
                    }]
                }>
                <CollectionItem
                    data={rowData.item}
                    obj={this}
                    onRefresh={() => {
                        this.listView.map((item) => {
                            item.list.scrollToOffset({y: 0, animated: false});
                            item && item.refresh && item.refresh()
                        });
                    }}/>
            </ViewAniLeft>
        );
    }

    _onFetch(page = 0, callback, options, type, index) {
        let param = {
            page: page,
            pageSize: 10,
            status: type
        };

        let successCallback = (code, message, json, option) => {
            if (this.smallIndex === 1) {
                json = "|".repeat(9).split("|").map(() => {
                    return {
                        image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535952428706&di=04476e15f84393cc810957f5183755c8&imgtype=0&src=http%3A%2F%2Fly.sz.bendibao.com%2FUpload%2FFCKEditor%2Fimage%2Fhexin%2F201101081121169823.jpg",
                        country: "中国香港",
                        city: "中国香港",
                        desc: "香港（粤语：hong & oacute;ng;英文：HongKong; 普通话：xianggang;缩写：HK）简称&Idqu"
                    }
                });
            } else {
                json = "|".repeat(9).split("|").map(() => {
                    return {
                        image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535956337318&di=b46ba4da91c586ac13ee4757512ecf72&imgtype=0&src=http%3A%2F%2Fpic.syd.com.cn%2F0%2F101%2F85%2F25%2F101852581_00000000e7be67f6.jpg",
                        country: "巴厘省",
                        city: "巴厘岛",
                        desc: "巴厘岛（Bali island）,世界著名旅游岛，印度尼西亚33个一级行政区之一。\n 巴厘岛上大部分分为山地，全岛山脉纵横，地势东高西低。。。"
                    }
                });
            }
            callback(json || [], {
                allLoaded: json && json.length > 0 ? (((param.page - 1) * param.pageSize + json.length) === (option || 0)) : true, //显示结束的底部样式,由你来控制
            });
        };
        let failCallback = (code, message, option) => {
            let data = this.listView[index] && this.listView[index].state && this.listView[index].state.data;
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
    }

    // 滑动tab
    renderScrollableTab() {
        let label = this.state.label || [];
        return (
            <ScrollableTabView
                style={{backgroundColor: YITU.backgroundColor_0}}
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarBackgroundColor={YITU.backgroundColor_0}
                tabBarActiveTextColor={YITU.textColor_4}
                tabBarInactiveTextColor={YITU.textColor_1}
                tabBarUnderlineStyle={styles.tabBarUnderline}
                initialPage={this.smallIndex}
                onChangeTab={(obj) => {
                    let index = obj.i;
                    this.smallIndex = index;
                    //第一次渲染是true,不触发事件
                    if (index !== 0 && (!this.firstClick[index])) {
                        this.firstClick[index] = true;
                    } else {
                        if (!(this._firstLoad < 0)) {
                            this._firstLoad++;
                        }
                        if (this.listView[index] && this.listView[index].state && this.listView[index].state.data && this.listView[index].state.data.length === 0) {
                            this.listView[index].refresh();
                        }
                    }
                }}>
                {
                    label.map((item, index) => {
                        return (
                            <View style={{flex: 1}}
                                  key={index}
                                  tabLabel={item.title}>
                                <MyEtcListView
                                    ref={(lv) => {
                                        this.listView[index] = lv;
                                    }}
                                    startLoad={true}
                                    rowView={this._renderRowView.bind(this)}//每行显示
                                    onFetch={(page = 0, callback, options) => {
                                        let type = this.state.label[index].type;
                                        this._onFetch(page, callback, options, type, index);
                                    }}//抓取数据
                                    manualRefresh={() => {

                                    }}
                                    emptyView={(refreshCallback) => {
                                        return this.renderEmptyView()
                                    }}
                                />
                            </View>);
                    })
                }
            </ScrollableTabView>
        )
    }

    render() {
        let view = (<View style={styles.container}>
            <View style={{flex: 1}}>
                {this.renderScrollableTab()}
            </View>
        </View>);
        return (<PageView
            ref={(ref) => this.pageView = ref}
            config={PageView.defaultConfig(this, {
                barConfig: {
                    rightButtonText: "编辑",
                    rightButtonFunc: () => {
                        alert("编辑");
                    }
                },
                hiddenIphoneXBottom: true,
            })}>
            {view}
        </PageView>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: YITU.backgroundColor_1
    },
    tabBarUnderline: {
        backgroundColor: YITU.backgroundColor_3,
        height: 2,
    }
});
module.exports = MyCollection;