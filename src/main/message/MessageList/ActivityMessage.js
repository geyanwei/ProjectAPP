import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,

} from 'react-native';

import MyFlatList from '../../../component/ListView/MyFlatList';
import ActivityMessageCell from '../../message/MessageCell/ActivityMessageCell.js';
import EmptyView from '../../../component/EmptyView.js';
import HttpTool from '../../../http/HttpTool';
import {PageView,navigation,Loading,Toast} from "myapplib"

class ActivityMessage extends Component{
    constructor(props){
        super(props);

    }

    onFetch(page=0,callback){
        let param={page:page,type:3,pageSize:10};
        let successCallBack=(code,message,json,option)=>{

            if (json) {
                let pageNumber = (param.page-1) * param.pageSize + json.length;
                let optionNumber = option || 0;
                callback(json, {
                    allLoaded: pageNumber == optionNumber, //显示结束的底部样式,由你来控制
                });
            }else{
                callback([], {
                    allLoaded: true, //显示结束的底部样式,由你来控制
                });
            }
        };

        let errorCallBack=(code,message,option)=>{
            Toast.show(message);
            let data = this.flatList && this.flatList.state && this.flatList.state.data;
            let optionNumber = option || 0;
            let allLoaded = param.page * param.pageSize == optionNumber;
            if (page === 1 || !data || data&&data.length === 0) {
                allLoaded = true;
            }
            callback([], {
                allLoaded: allLoaded
            });
        };

        HttpTool.post("/base-msgcenter/msgapi/messages/app/query",successCallBack,errorCallBack,param);

    }

    navBar(){

        return {
            title:this.props.title || "活动推荐",
            leftButtonFunc:()=>{
                navigation.pop(this,()=>{
                    if (this.props.callBack){
                        this.props.callBack()
                    }
                })

            }
        }

    }

    componentWillUnmount(){
        if (this.props.callBack){
            this.props.callBack()
        }
    }


    renderItemView(arr){
        let item = arr.item;
        return <ActivityMessageCell
            data={item}
            isabled={! item.params|| !item.params.path}
            onPress={()=>{
                navigation.push(this,item.params.path, {
                                            // title: '平台通知',
                    url: item.params.parame.url,
                });
            }}/>;
    }

    render(){

        let view=(<View style={styles.container}>
            <MyFlatList style={[styles.container,{backgroundColor:YITU.backgroundColor_1}]}
                        ref={(lv) => {
                            this.flatList = lv;
                        }}
                        scrollEventThrottle={1.0}
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
            </MyFlatList>
        </View>);
        return  (
            <PageView
                ref={(ref)=>{
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this,{
                    barConfig:this.navBar(),
                })}

            >
                {view}
            </PageView>
        );

    }

}

module.exports = ActivityMessage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    empty:{
        flex:1,
        alignItems:'center',
        width:'100%',
        marginTop:60,
    },
    emptyImg:{
        width:150,
        height:150,
    },
    emptyTitle:{
        marginTop:YITU.space_6,
        fontSize:YITU.fontSize_4,
        color:YITU.textColor_2,
    },
});
