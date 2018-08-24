import React from "react";
import {
    FlatList,
    RefreshControl,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Text,
    Image,
    Platform,
    ActivityIndicator
} from "react-native";

import LoadingView from "./MyEtcLoadIngView";

class MyFlatList extends React.PureComponent {
    static defaultProps = {
        enableRefreshing: true
    };
    constructor(props) {
        super(props);
        this.pageIndex = 1; // init page Index
        this.pageSize = this.props.pageSize || 10;

        //加载更多完成
        //加载更多中
        this.load_more_end = "more_end";
        this.load_more_loading = "more_loading";
        this.load_more_finish = "more_finish";
        this.load_refresh_end = "refresh_end";
        this.load_refresh_loading = "refresh_loading";
        //
        this.state = {
            load_refresh: false,
            load_more_finish: false,
            load_more: this.load_more_end,
            data: []
        };
        this.loadingDelay = 100; // delay to show loading unit in ms
    }
    /**
     * Load data from request
     * @param {Function} cb function after load data
     * @param {Object} data list data
     * @param {Boolean} refresh is refresh action
     */
    loaData(cb, data, refresh) {
        log("添加第" + this.pageIndex + "页");
        let oldData = this.state.data;
        this.setState(
            {
                data: refresh ? data : oldData.concat(data)
            },
            () => {
                data.length > 0 && this.pageIndex++;
                cb && cb();
            }
        );
    }
    /**
     * reset List data
     */
    clearData() {
        this.setState(
            {
                data: []
            },
            () => {
                this.pageIndex = 1;
            }
        );
    }

    getHeaderView() {
        return (this.props.headerView && this.props.headerView(this.state.data.length!==0)) || null;
    }

    getEmptyView() {
        return (this.props.emptyView && this.props.emptyView()) || null;
    }

    componentDidMount() {
        if (this.state.data.length === 0) {
            this.loadMore();
        }
    }

    refresh() {
        if (this.noCan()) {
            return;
        }

        this.updateMore(this.load_refresh_loading, () => {
            //
            this.pageIndex = 1;
            this.getLoadData((data, option = {}) => {
                let isEnd = option.allLoaded;
                this.loaData(
                    () => {
                        this.list&&(this.list._listRef._hasDataChangedSinceEndReached = false);
                        this.updateMore(this.load_refresh_end, () => {
                            log("isEnd_ref", isEnd);
                            this.setState({
                                load_more_finish: isEnd // set load_more_finish flag to decide foot view
                            });
                        });
                    },
                    data,
                    true
                );
            });
        });
    }

    noCan() {
        return (
            this.state.load_more !== this.load_refresh_end &&
            this.state.load_more !== this.load_more_end
        );
    }
    /**
     * Load more data
     * @param {Number} p Page Index
     * @param {Function} callBack function after load data
     */
    loadMore(p,callBack) {
        if (this.noCan()) {
            return;
        }
        this.pageIndex = p?p:this.pageIndex;

        let startTime = +new Date();

        this.updateMore(this.load_more_loading, () => {
            setTimeout(() => {
                this.getLoadData((data, option = {}) => {
                    let isEnd = option.allLoaded;
                    this.loaData(() => {
                        this.list&&(this.list._listRef._hasDataChangedSinceEndReached = false);
                        this.updateMore(this.load_more_end, () => {
                            log("isEnd_up", isEnd);
                            this.setState({
                                load_more_finish: isEnd // set load_more_finish flag to decide foot view
                            });
                        });
                        if (callBack){
                            callBack();
                        }
                    }, data,(typeof p!=='undefined'));
                });
            }, ((+new Date() - startTime) < this.loadingDelay) && this.loadingDelay || 0);
        });
    }
    /**
     * Execute load data
     * @param {Function} cb function after load data
     */
    getLoadData(cb) {
        if (this.props.onFetch) {
            this.props.onFetch(this.pageIndex, cb, {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            });
        }
    }

    onRefresh = () => {
        log("onRefresh");
        this.props.manualRefresh && this.props.manualRefresh();
        this.refresh();
    };

    render() {
        // if (this.state.load_more !== this.load_refresh_loading) {
        // }
        let refreshControl = {};
        if (this.props.enableRefreshing) {
            refreshControl = <RefreshControl
                refreshing={(this.state.load_more === this.load_refresh_loading)}
                onRefresh={this.onRefresh.bind(this)}
            />;
        }

        let main = null;

        if (this.state.data.length === 0&&(!this.state.load_more_finish)) {
            main = this.getLoadingView();
        } else {
            main = (
				<FlatList
					ref={ref => {
                        this.list = ref;
                    }}
					style={{flex: 1 }}
					data={this.state.data}
                    refreshControl={refreshControl}
					onScrollBeginDrag={() => {
                        this.list._listRef._hasDataChangedSinceEndReached = true;
                    }}
					onEndReachedThreshold={1}
					onEndReached={info => {
                        if (!this.state.load_more_finish)
                            this.loadMore();
                    }}
					keyExtractor={(item, index) => {
                        return index;
                    }}
					ListHeaderComponent={this.getHeaderView()}
					ListFooterComponent={this.getFooterView()}
					ListEmptyComponent={this.getEmptyView()}
					renderItem={this.props.rowView}
                    {...this.props}
				/>
            );
        }
        // return help.app_render(this, main, { full: true, libSelect: true });
        return main;
    }

    updateMore(load_more, cb) {
        this.setState(
            {
                load_more: load_more
            },
            cb
        );
    }

    getLoadingView() {
        return (<View
			style={[
                {
                    height: 44,
                    justifyContent: "center",
                    alignItems: "center"
                },
                this.props.paginationView
            ]}
		>
			<LoadingView color={this.props.refreshableTintColor} />
            {/* <ActivityIndicator size={"small"} color={"black"} /> */}
		</View>);
    }

    getFooterView() {
        if(this.state.data.length!==0){
            let v = (
				<TouchableOpacity
					onPress={() => {
                        this.loadMore();
                    }}
					style={[
                        {
                            height: 44,
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        this.props.paginationView
                    ]}
				>
					<Text style={{color:YITU.textColor_2}}>{"点击加载更多"}</Text>
				</TouchableOpacity>
            );
            if (this.state.load_more === this.load_more_loading) {
                v = this.getLoadingView();
            }
            // else if (this.state.load_more === this.load_more_end) {
            // 	if (this.state.load_more_finish) {
            // 		v = (
            // 			<View
            // 				style={[
            // 					{
            // 						height: 44,
            // 						justifyContent: "center",
            // 						alignItems: "center"
            // 					},
            // 					this.props.paginationView
            // 				]}
            // 			>
            // 				<Text>{"没有更多数据啦~"}</Text>
            // 			</View>
            // 		);
            // 	}
            // }
            if (this.state.load_more_finish) {
                v = (
					<View
						style={[
                            {
                                height: 44,
                                justifyContent: "center",
                                alignItems: "center"
                            },
                            this.props.paginationView
                        ]}
					>
						<Text style={{color:YITU.textColor_2}}>{"没有更多数据啦~"}</Text>
					</View>
                );
            }
            return v;
        }
    }
}

module.exports = MyFlatList;
