import React, {Component} from 'react';
import ReactNative,{
    StyleSheet,
    Text,
    ImageBackground,
} from 'react-native';


import MyFlatList from '../../../component/ListView/MyFlatList';
import EmptyView from '../../../component/EmptyView.js';
import APIJH from '../../../http/APIJH.js';
import HttpTool from '../../../http/HttpTool';
import SelectCell from '../../../component/SelectCell.js'
import {PageView, navigation, Loading, Toast} from "myapplib"

// import {BlurView} from 'react-native-blur';

class ConArea extends Component {
    constructor(props) {
        super(props);
    }

    refreshListView(param){
        this.param = param;
        this.flatList.refresh();
    }
    onFetch(page = 0, callback) {
        let valueObj = this.param||{};

        let param = Object.assign({page: page, type: 1, pageSize: 10});
        let successCallBack = (code, message, json, option) => {
            if (json) {
                let data = "|".repeat(8).split("|").map((item, index) => {
                    return {
                        id: index,
                        title: valueObj.title||"热门",
                        englishTitle: valueObj.englishTitle||"Hot Place",
                        defaultSource: require("../../../image/main/no_data.png"),
                        imgUrl:valueObj.imgUrl||"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531914107514&di=e868ce915c8d67520a4f27385d489ca4&imgtype=0&src=http%3A%2F%2Fimage3.cnpp.cn%2Fupload%2Fimages%2F20150821%2F12031424660_800x650.jpg"
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

    renderItemView(rowData) {

        let itemData = rowData.item;
        return <CityCell
            data={itemData}
            onPress={(itemData) => {
                this.props.onPress&&this.props.onPress(itemData);
            }}/>;
    }

    render() {
        let view = (<MyFlatList
            style={styles.container}
            ref={(lv) => {
                this.flatList = lv;
            }}
            numColumns={2}
            onFetch={this.onFetch.bind(this)}//抓取数据
            rowView={this.renderItemView.bind(this)}//每行显示
            emptyView={(refreshCallback) => {
                return (
                    <EmptyView
                        data={{
                            source: require('../../../image/error/noMessage.png'),
                            desc: "我就在这里静静等消息~",
                        }}
                    />
                );
            }}>
        </MyFlatList>);
        return view;
    }
}

module.exports = ConArea;

const widthItem = (YITU.screenWidth - 75 - 3 * YITU.space_1) / 2;

class CityCell extends Component {
    constructor(props) {
        super(props);
        this.state = {viewRef: null};
    }

    imageLoaded() {
        this.setState({viewRef: ReactNative.findNodeHandle(this.backgroundImage)});
    }

    render() {
        let {data, onPress} = this.props;
        return (<SelectCell
            style={{
                marginLeft: YITU.space_1,
                marginTop: YITU.space_1,
            }}
            onPress={() => {
                onPress && onPress(data);
            }}>
            <ImageBackground
                resizeMode={"cover"}
                style={{
                    width: widthItem,
                    height: widthItem,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                defaultSource={data.defaultSource}
                source={{uri:data.imgUrl}}
                // onLoadEnd={this.imageLoaded.bind(this)}
            >
                {/*<BlurView*/}
                    {/*style={styles.absolute}*/}
                    {/*viewRef={this.state.viewRef}*/}
                    {/*blurType="light"*/}
                    {/*blurAmount={10}*/}
                {/*/>*/}

                <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_3}}>{data.title}</Text>
                <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_3}}>{data.englishTitle}</Text>
            </ImageBackground>
        </SelectCell>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
});
