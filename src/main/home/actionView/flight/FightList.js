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
import APIGYW from '../../../../http/APIGYW'
import HttpTool from '../../../../http/HttpTool.js';
import EmptyView from '../../../../component/MyEmptyView';
import MyEtcListView from '../../../../component/ListView/MyFlatList.js';
import FlightItem from './component/FlightItem.js';
import {PageView, Toast,navigation,AppInit} from 'myapplib';

class FightList extends Component {
    constructor(props) {
        super(props);
        this.value = props.value||{};
    }

    componentDidMount() {

    }

    //网络请求——获取第pageNo页数据
    _onFetch(page = 0, callback, options) {
        let param = {
            page: page,
            pageSize: 10,
        };
        let successCallback = (code, message, json, option) => {
            if (json) {
                let pageNumber = (param.page - 1) * param.pageSize + json.length;
                let optionNumber = option || 0
                callback(json, {
                    allLoaded: pageNumber === optionNumber, //显示结束的底部样式,由你来控制
                });
            } else {
                callback([], {
                    allLoaded: true, //显示结束的底部样式,由你来控制
                });
            }
        };
        let failCallback = (code, message, option) => {
            Toast.show(message);
            let data = this.flatList && this.flatList.state && this.flatList.state.data;
            let optionNumber = option || 0;
            let allLoaded = param.page * param.pageSize === optionNumber;
            if (page === 1 || !data || data && data.length === 0) {
                allLoaded = true;
            }
            callback([], {
                allLoaded: allLoaded
            });
        };
        // HttpTool.post(APIGYW.app_car_getCarList, successCallback, failCallback, param);

        let data = [
            {
                flightNum:"ZH9007",
                date:"2018-09-02",
                startTime:"00:05",
                startAirport:"白云机场",
                flightStartName:"南方航空"+(this.props.title||""),
                endTime:"06:45",
                endAirport:"史基浦机场",
                flightEndName:"阿姆斯特丹航空",
            }
        ];
        callback(data, {
            allLoaded: true, //显示结束的底部样式,由你来控制
        });
    }
    _renderRowView(rowData) {
        return (
            <FlightItem
                data={rowData.item}
                onPress={(data) => {
                    this.props.callBack&&this.props.callBack(data);
                    AppInit.removeRoutes(AppInit.ref, ["SelectFlight"]);
                    setTimeout(()=>{
                        navigation.pop(this);
                    },200);
                }}
            />);
    }
    render() {
        let view = (
            <View style={styles.container}>
                <View style={{
                    alignItems:"center",
                    paddingVertical:YITU.space_0,
                    borderBottomWidth:StyleSheet.hairlineWidth,
                    borderBottomColor:YITU.backgroundColor_Line
                }}>
                    <Text style={{
                        fontSize:YITU.fontSize_3,
                        color:YITU.textColor_1
                    }}>{this.value.date+"共"+"1"+"趟航班 航班起降均为当地时间"}</Text>
                </View>
                <MyEtcListView
                    startLoad={false}
                    style={{}}
                    rowView={this._renderRowView.bind(this)}//每行显示
                    onFetch={(page = 0, callback, options) => {
                        this._onFetch(page, callback, options);
                    }}//抓取数据
                    ref={(lv) => {
                        this.listView = lv;
                    }}
                    emptyView={(refreshCallback) => {
                        return (<EmptyView
                            data={{
                                source: require('../../../../image/error/noMessage.png'),
                                desc: "暂无航班~",
                            }}
                        />)
                    }}
                    paginationAllLoadedView={() => {
                        return (<View style={{
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text>没有更多的数据了</Text>
                        </View>);
                    }}/>
            </View>
        );
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    hiddenIphoneXBottom: true,
                })}>
                {view}
            </PageView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    }
});


module.exports = FightList;