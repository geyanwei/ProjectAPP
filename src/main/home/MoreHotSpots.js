import React, {Component} from 'react';
import ReactNative,{
    StyleSheet,
    View,
    Text,
    ImageBackground,
} from 'react-native';
import {PageView, navigation, Loading, Toast} from "myapplib"

import MyFlatList from '../../component/ListView/MyFlatList';
import EmptyView from '../../component/EmptyView.js';
import APIJH from '../../http/APIJH.js';
import HttpTool from '../../http/HttpTool';
import SpotsCell from "./component/SpotsCell.js";


// import {BlurView} from 'react-native-blur';

class MoreHotSpots extends Component {
    constructor(props) {
        super(props);
    }

    onFetch(page = 0, callback) {
        let param = Object.assign({page: page, type: 1, pageSize: 10});
        let successCallBack = (code, message, json, option) => {
            if (json) {
                let data = "|".repeat(9).split("|").map((item, index) => {
                    return {
                        id: index,
                        title: "曼谷",
                        defaultSource: require("../../image/main/no_data.png"),
                        imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531978085133&di=1bec54b7837e876710ae63b90fb683e0&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D643542962%2C2722933613%26fm%3D214%26gp%3D0.jpg"
                    }
                });

                let pageNumber = (param.page - 1) * param.pageSize + json.length;
                let optionNumber = option || 0;
                callback(data, {
                    // allLoaded: pageNumber == optionNumber, //显示结束的底部样式,由你来控制
                    allLoaded: true
                });

            } else {
                callback([], {
                    allLoaded: true, //显示结束的底部样式,由你来控制
                });
            }
        };

        let errorCallBack = (code, message, option) => {
            Toast.show(message);
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
        HttpTool.post("/base-msgcenter/msgapi/messages/app/query", successCallBack, errorCallBack, param);
    }

    renderItemView(rowData, sectionID, rowID, highlightRow) {
        let itemData = rowData.item;
        return (<View style={{paddingHorizontal:YITU.space_0}}>
            <SpotsCell
                data={itemData}
                cb={(data)=>{
                    navigation.push(this, "SpotsDetailsHot", {
                        title: "产品详情"
                    });
                }}/>
        </View>);
    }

    render() {
        let view = (<View style={styles.container}>
            <MyFlatList
                ref={(lv) => {
                    this.flatList = lv;
                }}
                onFetch={this.onFetch.bind(this)}//抓取数据
                rowView={this.renderItemView.bind(this)}//每行显示
                emptyView={(refreshCallback) => {
                    return (
                        <EmptyView
                            data={{
                                source: require('../../image/error/noMessage.png'),
                                desc: "我就在这里静静等消息~",
                            }}
                        />
                    );
                }}>
            </MyFlatList>
        </View>);
        return <PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                pageLoading: false,
            })}>
            {view}
        </PageView>;
    }
}

module.exports = MoreHotSpots;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
});
