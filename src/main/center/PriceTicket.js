import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import CellTicket from './cell/CellTicket.js';
import MyFlatList from '../../component/ListView/MyFlatList';
import EmptyView from '../../component/EmptyView.js';
import HttpTool from '../../http/HttpTool';
import APIJH from '../../http/APIJH.js';
import {navigation, PageView} from "myapplib";

class PriceTicket extends Component {

    constructor(props) {
        super(props);
        this.topArr = ["未使用", "已使用", "已过期"];
        this.state = {
            status: 1,
            noUseNum: 0,
            useNum: 0,
            overDateNum: 0,
        };
    }

    componentDidMount() {

    }

    onFetch(page = 0, callback, options) {
        let param = {"Status": this.state.status, page: page, pageSize: 10};
        let successCallback = (code, message, json, option) => {
            let arr = json && json.couponKeyList || [];

            let pageNumber = (param.page-1) * param.pageSize + arr.length;
            let optionNumber = option || 0;
            callback(arr, {
                allLoaded: pageNumber == optionNumber, //显示结束的底部样式,由你来控制
            });
        };
        let failCallback = (code, message, option) => {
            let data = this.flatList && this.flatList.state && this.flatList.state.data;
            let optionNumber = option || 0;
            let allLoaded = param.page * param.pageSize == optionNumber;
            if (page === 1 || !data || data && data.length === 0) {
                allLoaded = true;
            }
            callback([], {
                allLoaded: allLoaded
            });
        };
        HttpTool.post(APIJH.driver_usercenter_getDriverCouponKeyList, successCallback, failCallback, param);
    }

    _renderItemView(arr, sectionID, rowID, highlightRow) {
        let item = arr.item;
        return (<CellTicket data={item}/>);
    }

    render() {
        let view = (<View style={styles.container}>
            <View style={styles.topView}>
                {this.createTopBtn(this.topArr || [])}
            </View>

            <MyFlatList
                ref={(lv) => {
                    this.flatList = lv;
                }}
                onScroll={(e) => {

                }}
                scrollEventThrottle={1.0}
                style={{backgroundColor: YITU.backgroundColor_1, paddingTop: StyleSheet.hairlineWidth}}
                onFetch={this.onFetch.bind(this)}//抓取数据
                rowView={this._renderItemView.bind(this)}//每行显示
                emptyView={(refreshCallback) => {
                    return (<View style={{flex: 1, marginTop: "15%"}}>
                        <EmptyView
                            data={{
                                source: require('../../image/user/wjjq.png'),
                                desc: "暂无记录",
                            }}/>
                    </View>);
                }}
                // paginationAllLoadedView={this.finishView.bind(this)}//上拉数据加载完显示页面
            />
        </View>);
        return (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                navBack: () => {
                    navigation.pop(this,);
                },
                pageLoading: false,
                full: false,
            })}>
            {view}
        </PageView>);
    }

    createTopBtn(arr) {
        return arr.map((item, index) => {
            return (<TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => {
                    this.setState({
                        status: index + 1,
                    }, () => {
                        this.flatList.refresh();
                    });
                }}>
                <Text
                    style={[styles.title, {color: (this.state.status - 1) == index ? YITU.textColor_4 : YITU.textColor_2}]}>
                    {item}
                </Text>
                <View
                    style={[styles.line, {backgroundColor: (this.state.status - 1) == index ? YITU.backgroundColor_3 : 'white'}]}>
                </View>
            </TouchableOpacity>);
        })
    }
}

module.exports = PriceTicket;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    topView: {
        backgroundColor: YITU.c_bg_white,
        height: 49,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        fontSize: YITU.fontSize_4,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: YITU.space_5,
    },
    line: {
        height: 1,
        width: '100%',
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 60,
    },
    emptyImg: {
        width: 150,
        height: 150,
    },
    emptyTitle: {
        marginTop: YITU.space_6,
        fontSize: YITU.fontSize_4,
        color: YITU.textColor_1,
    },
});
