/**
 * Created by YITU on 2017/7/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    TouchableOpacity,
    NativeModules,
} from 'react-native'

import Picker from 'react-native-picker';
const {height, width} = Dimensions.get('window');
/*
* title:标题
* desc:描述内容
* onSelect:触发事件的按钮 此为数组 [{title:按钮标题,action:触发事件的回调}]
* */
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            options:{},
        }
    }

    show(options) {
        this.setState({
            isShow: true,
            options:options,
        });
    }
    hidden(){
        this.setState({
            isShow: false,
        });
    }
    componentWillUnmount() {

    }

    render() {
        let {options} = this.state.options;
        options=options||{};
        let view = this.state.isShow ?
            <TouchableOpacity
                style={[styles.container,{justifyContent:"center"}]}
                onPress={() => {
                    this.hidden();
                }}>
                <View style={{
                    alignSelf:"center",
                    width:280,
                    minHeight:80,
                    backgroundColor:"#fff",
                    borderRadius:10,
                    padding:5,
                }}>
                    <Text style={{
                        marginTop:15,
                        color:"#000",
                        alignSelf:"center",
                        fontSize:17,
                        fontWeight:"700",
                        textAlign:"center",
                    }}>{options.title?options.title:"温馨提示"}</Text>


                    <View style={{
                        marginTop:5,
                        marginHorizontal:0,
                        paddingVertical:10,
                        borderBottomWidth:(options.onSelect&&options.onSelect.length>1)? StyleSheet.hairlineWidth:0,
                        borderColor:"#dfdfdf",
                    }}>
                        {options.myView?options.myView:null}
                        {options.desc?<Text style={{
                            // textAlign:(options.desc&&options.desc.length>15)?"left":"center",
                            textAlign:"center",
                            paddingHorizontal:10,
                            color:"#333",
                            fontSize:15,
                            paddingBottom:10
                        }}>{options.desc}</Text>:null}
                    </View>

                    {this.createBtnView(options.onSelect)}

                </View>
            </TouchableOpacity> : null;
        return view;
    }

    createBtnView(onSelect){
        if(!onSelect||onSelect.length<1){
            return null;
        }
        return (<View style={{
            flexDirection:onSelect.length<3?"row":"column",
            justifyContent:"space-between",
        }}>
            {this.createBtnItem(onSelect)}
        </View>)
    }
    createBtnItem(arr){
        var itemArr=[];
        var isTwo = arr.length==2?true:false;
        var isBigTwo = arr.length>2?true:false;
        for(let i=0;i<arr.length;i++){
            let obj = arr[i];
            var item = (<TouchableOpacity
                key={i}
                onPress={()=>{
                    if (obj.action){
                        obj.action(true);
                    }
                    this.hidden();
                }} style={{
                borderLeftWidth:(i==0||isBigTwo)?0:StyleSheet.hairlineWidth,
                borderBottomWidth:isBigTwo?StyleSheet.hairlineWidth:0,
                borderColor:"#dfdfdf",
                alignItems:"center",
                width:isTwo?"50%":"100%",
                height:40,
                justifyContent:"center",
            }}>
                <Text style={{
                    color:"#1299F4",
                    fontWeight:"bold",
                    fontSize:16,
                    textAlign:"center",
                }}>{obj.title?obj.title:"确定"}</Text>
            </TouchableOpacity>)
            itemArr.push(item);
        }
        return itemArr;
    }
}
module.exports = index;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: "#00000050"
    },
});