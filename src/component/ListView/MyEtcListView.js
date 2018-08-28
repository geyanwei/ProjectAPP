'use strict';

import React, {Component} from 'react';

import {
    // ListView,
    SectionList,
    Platform,
    TouchableHighlight,
    View,
    Text,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

import ListView from 'react-native/Libraries/Lists/ListView/ListView';
import ListViewDataSource from 'react-native/Libraries/Lists/ListView/ListViewDataSource';

// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
        try {
            if ( obj2[p].constructor==Object ) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch(e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

var LoadIngView = require('./MyEtcLoadIngView.js');

export default class MyEtcListView extends Component{
    constructor(props){
        super(props);
        this._setPage(1);
        this._setRows([]);

        var ds = null;
        if (props.withSections === true) {
            ds = new ListViewDataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            });
            this.state = {
                dataSource: ds.cloneWithRowsAndSections(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'none',
                isRefreshable:false,
                loadData:false,
            };
        } else {
            ds = new ListViewDataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            });
            this.state = {
                dataSource: ds.cloneWithRows(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'none',
                isRefreshable:false,
                loadData:false,
            };
        }
        log(props);
        log(this.state);
        log('~~~~~')
    }
    static defaultProps = {
        customStyles: {},
        initialListSize: 10,
        startLoad: false,
        firstLoader: true,
        pagination: true,
        refreshable: true,
        refreshableColors: ['#00bb00', '#00bb00', '#00bb00'],
        refreshableProgressBackgroundColor: '#ffffff',
        refreshableSize: undefined,
        refreshableTitle: '刷新中',
        refreshableTintColor: '#1299F4',
        renderRefreshControl: null,
        headerView: null,
        sectionHeaderView: null,
        scrollEnabled: true,
        withSections: false,
        onFetch(page, callback, options) { callback([]); },

        paginationFetchingView: null,
        paginationAllLoadedView: null,
        paginationWaitingView: null,
        emptyView: null,
        renderSeparator: null,
    };



    _setPage(page) { this._page = page; }
    _getPage() { return this._page; }
    _setRows(rows) { this._rows = rows; }
    _getRows() { return this._rows; }


    paginationFetchingView() {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView();
        }
        return (
            <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <LoadIngView
                    color={this.props.refreshableTintColor}
                />
            </View>
        );
    }
    paginationAllLoadedView() {
        if (this.props.paginationAllLoadedView) {
            return this.props.paginationAllLoadedView();
        }

        return (
            <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    ~END~
                </Text>
            </View>
        );
    }
    paginationWaitingView(paginateCallback) {
        if (this.props.paginationWaitingView) {
            return this.props.paginationWaitingView(paginateCallback);
        }

        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
            >
                <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    点击更多
                </Text>
            </TouchableHighlight>
        );
    }
    headerView() {
        if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView){
            return null;
        }
        return this.props.headerView();
    }
    emptyView(refreshCallback) {
        //禁用上拉,下拉等

        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }

        return (
            <View style={[this.defaultStyles.defaultView, this.props.customStyles.defaultView]}>
                <Text style={[this.defaultStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
                    对不起，没有内容显示
                </Text>

                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                >
                    <Text>
                        点击刷新↻
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
    renderSeparator() {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator();
        }

        return (
            <View style={[this.defaultStyles.separator, this.props.customStyles.separator]} />
        );
    }

    sectionHeaderView(sectionData, sectionID) {
        if(this.props.withSections === false){
            return null;
        }
        if (this.props.sectionHeaderView) {
            return this.props.sectionHeaderView();
        }

        return (
            <View style={{
                backgroundColor: '#50a4ff',
                padding: 10,
            }}>
                <Text style={{
                    color: '#fff',
                }}>
                    Head:{sectionID}  {sectionData}
                </Text>
            </View>
        );
    }

    getGiftedListView(){

    }
    componentDidMount() {

        //
        this._setPage(1);
        //log("组件  进入MyEtcListView完成 当前页码:"+this._getPage());

        if (this.refs.listview.isMounted()&&this.props.startLoad) {
            this.setState({
                isRefreshing: true,
                paginationStatus: 'none',
            });
            this._refresh();

            // this.props.onFetch(this._getPage() , this._postPaginate, {});
            // this.props.onFetch(this._getPage(), this._postRefresh, options);
        }else{
            this.setState({
                paginationStatus: 'empty',
            });
        }

    }

    setNativeProps(props) {
        this.refs.listview.setNativeProps(props);
    }
    _refresh() {
        this._onRefresh({external: true});

    }

    _onRefresh(options = {}) {
        // if(this._getRows().length === 0){
        //   //log("请求刷新   无数据页面,只能点击刷新");
        //   return null
        // }
        //如果加载完成或者加载中.或者刷新中,不进行处理
        if(this.state.paginationStatus==='fetching'
            ||this.state.isRefreshing){

            //log("请求刷新  请求中..别急");
            return null
        }



        if (this.refs.listview.isMounted()) {
            this.setState({
                isRefreshing: true,
                paginationStatus: 'none',
            });

            this._setPage(1);
            this.props.onFetch(this._getPage(), this._postRefresh, options);
        }
        log("刷新"+this._getPage());
    }
    _postRefresh(rows = [], options = {}) {
        if (this.refs.listview.isMounted()) {
            this._updateRows(rows, options);
        }
    }
    _onLoadMore() {

        this._onPaginate();

    }
    _onPaginate() {
        if(this._getRows().length === 0){
            //log("请求加载  无数据页面,只能点击刷新");
            return null;
        }
        //如果加载完成或者加载中.或者刷新中,不进行处理
        if(this.state.paginationStatus==='allLoaded'
            ||this.state.paginationStatus==='fetching'
            ||this.state.isRefreshing){
            //log("请求加载  请求中..别急");
            return null
        }


        else {
            this.setState({
                paginationStatus: 'fetching',
            });
            this.props.onFetch(this._getPage() + 1, this._postPaginate, {});
        }
        //log("加载更多"+(this._getPage()+1));
    }


    _postPaginate(rows = [], options = {}) {

        //如果在加载更多的时候,进行了刷新,取刷新的数据



        this._setPage(this._getPage() + 1);
        var mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRecursive(this._getRows(), rows);
        } else {
            if(options&&options.addFirst){
                mergedRows =rows.concat(this._getRows());
            }else{
                mergedRows = this._getRows().concat(rows);
            }

        }
        this._updateRows(mergedRows, options);
    }

    _updateRows(rows = [], options = {}) {
        if (rows !== null) {
            this._setRows(rows);
            if (this.props.withSections === true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
                    isRefreshing: false,
                    loadData:false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            } else {
                this.setState({

                    dataSource: this.state.dataSource.cloneWithRows(rows),
                    isRefreshing: false,
                    loadData:false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            }
        } else {
            this.setState({
                isRefreshing: false,
                loadData:false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        }
    }

    _renderPaginationView() {
        if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
            return this.paginationFetchingView();
        } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
            return this.paginationWaitingView(this._onPaginate);
        } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
            return this.paginationAllLoadedView();
        } else if (this.state.paginationStatus === 'none') {
            return null;

        }else if (this._getRows().length === 0) {

            return this.emptyView(this.refreshList);
        } else {
            return null;
        }
    }

    renderRefreshControl() {
        if (this.props.renderRefreshControl) {
            return this.props.renderRefreshControl({ onRefresh: this._onRefresh });
        }
        return (
            <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefreshing}
                colors={this.props.refreshableColors}
                progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
                size={this.props.refreshableSize}
                tintColor={this.props.refreshableTintColor}
                title={this.props.refreshableTitle}
                titleColor={this.props.refreshableTintColor}

            />
        );
    }

    refreshList(){
        var ds = null;
        var dataSource = null;
        if (this.props.withSections === true) {
            dataSource= this.state.dataSource.cloneWithRowsAndSections([]);
        } else {
            dataSource= this.state.dataSource.cloneWithRows([])
        }

        this.setState(
            {
                dataSource:dataSource,
                loadData: true,
            }
        );
        this._onRefresh();

    }
    render() {
        var big = {

            position: "absolute",
            width:"100%",height:"100%",
            justifyContent:"center",
            alignItems:"center",
        };
        let self = this;
        return (
            <View style={[this.props.style,{position: "relative",width:"100%",height:"100%"}]} >
                <ListView
                    style={big}
                    ref="listview"
                    dataSource={this.state.dataSource}
                    renderRow={this.props.rowView.bind(this)}

                    renderSectionHeader={this.sectionHeaderView.bind(this)}
                    onScroll={(...e)=>{
                        if(this.props.onScroll){
                            this.props.onScroll(...e);
                        }
                    }}

                    renderHeader={this.headerView.bind(this)}
                    renderFooter={this._renderPaginationView.bind(this)}
                    renderSeparator={this.renderSeparator.bind(this)}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={this.props.scrollEnabled}
                    canCancelContentTouches={true}
                    refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}

                    onEndReached = {this.props.pagination === true ? (event) => this._onLoadMore() : null }
                    onEndReachedThreshold = {10}
                    {...this.props}
                />
                {/*<SectionList*/}
                    {/*style={big}*/}
                    {/*ref="listview"*/}
                    {/*sections={[{data:self.state.dataSource,title:'test'}]}*/}
                    {/*renderItem={this.props.rowView}*/}

                    {/*renderSectionHeader={this.sectionHeaderView}*/}
                    {/*// onScroll={(...e)=>{*/}
                    {/*//     if(this.props.onScroll){*/}
                    {/*//         this.props.onScroll(...e);*/}
                    {/*//     }*/}
                    {/*// }}*/}

                    {/*ListHeaderComponent={this.headerView}*/}
                    {/*ListFooterComponent={this._renderPaginationView}*/}
                    {/*ItemSeparatorComponent={this.renderSeparator}*/}

                    {/*// enableEmptySections={true}*/}
                    {/*// automaticallyAdjustContentInsets={false}*/}
                    {/*// scrollEnabled={this.props.scrollEnabled}*/}
                    {/*canCancelContentTouches={true}*/}
                    {/*// refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}*/}

                    {/*onEndReached = {this.props.pagination === true ? (event) => this._onLoadMore() : null }*/}
                    {/*onEndReachedThreshold = {10}*/}
                    {/*onRefresh={this._onRefresh}*/}
                    {/*refreshing={self.state.isRefreshing}*/}
                    {/*{...this.props}*/}
                {/*/>*/}
                {this.state.loadData?
                    <View style={big}>
                        <View>
                            <ActivityIndicator
                                animating={true}
                                color={this.props.refreshableTintColor}
                                size="small"
                            />
                            <Text style={{marginTop:5}}>{this.props.refreshableTitle}</Text>
                        </View>
                    </View>:null
                }
            </View>
        );
    }

    defaultStyles: {
        separator: {
            height: 1,
            backgroundColor: '#CCC'
        },
        actionsLabel: {
            fontSize: 20,
        },
        paginationView: {
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
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
    }
}
