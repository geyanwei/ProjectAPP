/**
 * 这是一个演示上拉,下拉的LISTVIE组件
 * 注:由react-native-gifted-listview 整理而成..
 * 放弃npm安装,直接文件形式.
 *
 */

//第一步:导入框架与组件
import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    RefreshControl,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
//导入引用组件
var GiftedSpinner = require('./MyEtcLoadIngView.js');
var MyEtcListView = require('./MyEtcListView.js');
//第二步:创建一个类,继承组件


class demoPage extends Component {
    //构造器(如果你想做某些事情 ..就是我们经常看到的do someing)
    constructor(props) {
        super(props);
        this.state = {
            //定义,进入页面,是否直接加载 listview 注:调用加载更多
            startLoad:true,
            //是否分组显示
            withSections:true,
        }
    }
    //页面加载完成,开始执行
    componentDidMount() {
        log("进入页面完成");
    }


    /**
     * 抓取数据
     * Should be replaced by your own logic
     * @param {number} 当前分而.或,此listview第page次请求
     * @param {function} callback 是一个数据结构  返回一个包含新数据的结构
     * @param {object}options 选项通知如果第一个负载
     */
    _onFetch(page = 1, callback, options) {
        var data;
        if(this.state.withSections){
            var header = page;
            var rows = {};
            rows[header] = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
            data = rows;
        }else{
            var rows = [];
            var size = 10;
            for (var i = 0; i < size; i++) {
                rows[i] = ((page-1)*size)+i + " exe:"+page;
            }
            data = rows;
        }

        setTimeout(() => {

            callback(data, {
                allLoaded: page > 5, //显示结束的底部样式,由你来控制
            });

        }, 2000); //模拟请求延迟


    }



    /**
     * 渲染每一行显示
     * @param {object} rowData对应的行数据
     */
    _renderRowView(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity
                style={customStyles.row}
                onPress={() => {
                //点击事件
                 // console.warn('点击了:'+rowData);
                }}
            >
                <Text  >这是ITEM {rowData}</Text>
            </TouchableOpacity>
        );
    }

    /**
     * 如果是小组视图.每一个小组的头部视图
     * @param {object} rowData Row data
     */
    _renderSectionHeaderView(sectionData, sectionID) {
        return (
            <View style={customStyles.header}>
                <Text style={customStyles.headerTitle}>
                    这是头部 {sectionID}
                </Text>
            </View>
        );
    }

    /**
     * 渲染刷新视图时等待刷新
     * 在Android上，将会拖动触发refreshcallback IOS上,点击触发
     * @param {function} refreshCallback 这个函数,调用的是刷新listview
     */
    _renderRefreshableWaitingView(refreshCallback) {
        if (Platform.OS !== 'android') {
            return (
                <View style={customStyles.refreshableView}>
                    <Text style={customStyles.actionsLabel}>
                        ↓
                    </Text>
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={refreshCallback}
                    style={customStyles.refreshableView}
                >
                    <Text style={customStyles.actionsLabel}>
                        ↻
                    </Text>
                </TouchableOpacity>
            );
        }
    }

    /**
     * 渲染刷新视图的下拉刷新时被激活
     * @platform ios IOS上生效
     */
    _renderRefreshableWillRefreshView() {
        return (
            <View style={customStyles.refreshableView}>
                <Text style={customStyles.actionsLabel}>
                    ↻
                </Text>
            </View>
        );
    }

    /**
     * 渲染刷新视图时 注:ios取IOS的小菊花,android取加载圆
     */
    _renderRefreshableFetchingView() {
        return (
            <View style={customStyles.refreshableView}>
                <GiftedSpinner />
            </View>
        );
    }

    /**
     *  渲染分面的时候,等待触摸
     * @param {function} paginateCallback 这个函数是,调回加载更多的
     */
    _renderPaginationWaitingView(paginateCallback) {
        return (
            <TouchableOpacity
                onPress={paginateCallback}
                style={customStyles.paginationView}
            >
                <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
                    加载更多
                </Text>
            </TouchableOpacity>
        );
    }

    /**
     * 渲染加载更多 注:底部加载更新中动画
     */
    _renderPaginationFetchingView() {
        return (
            <View style={customStyles.paginationView}>
                <GiftedSpinner />
                <Text>aa</Text>
            </View>
        );
    }

    /**
     * 渲染,listview数据加载完成
     */
    _renderPaginationAllLoadedView() {
        return (
            <View style={customStyles.paginationView}>
                <Text style={customStyles.actionsLabel}>
                    ~到底了~
                </Text>
            </View>
        );
    }

    /**
     * 如果没有内容显示,显示此视图. 注:此是,上拉将不可用.下拉刷新,或者点击此视图,可刷新
     * @param {function} refreshCallback 这个函数,会调用刷新 listview
     */
    _renderEm_renderEmptyViewptyView(refreshCallback) {
        return (
            <View style={customStyles.defaultView}>
                <Text style={customStyles.defaultViewTitle}>
                    对不起，没有内容显示
                </Text>

                <TouchableOpacity
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                >
                    <Text>
                        点击刷新↻
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 渲染每一行之间的间隔视图(分隔线) 注:必须加上key属性
     * return null,将不显示线
     */
    _renderSeparatorView(sectionID, rowID) {
        return (
            <View
                key={rowID}
                style={{
                height: 1,
                backgroundColor: '#CCCCCC'
                }}>
            </View>
        );
    }


    //组件的视图核心  渲染显示
    render() {
        return (
            <View style={{
             flex:1,
             paddingTop:24,
            }}>
                <MyEtcListView
                    rowView={this._renderRowView}//每行显示
                    onFetch={this._onFetch.bind(this)}//抓取数据
                    pageSize={10}//每页渲染的个数.注:建议与你的onFetch每次抓取数相同,
                    startLoad={this.state.startLoad}
                    
                    // firstLoader={true} // 显示加载第一屏的view
                    // pagination={true} // 加载更多功能是否打开
                    // refreshable={true} // 刷新功能是否打开
                    // paginationFetchingView={this._renderPaginationFetchingView} //加载数据布局
                    // paginationAllLoadedView={this._renderPaginationAllLoadedView}//加载完所有数据布局

                    // paginationWaitingView={this._renderPaginationWaitingView}//加载更多.显示布局


                    // emptyView={this._renderEmptyView}//没有内容显示时 显示此视图

                    // renderSeparator={this._renderSeparatorView}//渲染每一行的间隔view

                    withSections={this.state.withSections} // 是否分组显示 注:如要分组显示,数据源要进行分组
                    // sectionHeaderView={this._renderSectionHeaderView}//头部显示视图

                    refreshableTintColor="#00bb00"//ios:刷新颜色 加载更多颜色 android:刷新色无 ,加载更多色
                    refreshableTitle="刷新中"//IOS:下拉显示 android:无显示
                    refreshableColors={['#00bb00', '#00bb00', '#00bb00']}//ios:无  android:刷新色
                    refreshableProgressBackgroundColor="#ffffff" //ios:无  android:刷新圆背影色
                />
            </View>
        );
    }

    _renderPaginationView(){
        log('_renderPaginationView');
        return (
            <View >
                <LoadIngView />
            </View>
        );


    }
    _onEndReached(event){
        //加载更多
        // console.warn('你好');
        this._loadData();
    }
    _onRefresh(){
        // console.warn('这是刷新');
        //更新状态机
        this.setState({
            isRefreshing:true,
        });
        this.state.data = [];
        exe_count = 0;
        this._loadData();
    }

    _loadData(){

        var data = [];
        var size = 10;
        for (var i = 0; i < size; i++) {
            data[i] = (exe_count*size)+i + " exe:"+exe_count;
        }
        // var data = [...newData ,...this.state.data];
        var daaa = [...this.state.data,...data];
        // console.warn(daaa.length);
        //更新状态机
        exe_count++;
        setTimeout(()=>{
                this.setState({
                    data: daaa,
                    dataSource: this.state.dataSource.cloneWithRows(daaa),
                    isRefreshing:false,
                });
        },500
        );


    }
}
let customStyles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    refreshableView: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsLabel: {
        fontSize: 20,
        color: '#007aff',
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    defaultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    row: {
        padding: 10,
        height: 44,
    },
    header: {
        backgroundColor: '#50a4ff',
        padding: 10,
    },
    headerTitle: {
        color: '#fff',
    },

})
let screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    navBar: {
        height: 64,
        backgroundColor: '#007aff',

        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 12,
    }

})
module.exports = demoPage;
