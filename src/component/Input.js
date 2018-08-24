/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org/
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules,
    TextInput,
} from 'react-native'

import Picker from 'react-native-picker';
const {height, width} = Dimensions.get('window');

class Input extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
        }
    }


    show(options) {
        this.options = options;
        this.setState({
            isShow: true,
        });
    }
    hidden(yes,v){
        if(this.options&&this.options.callBack){
            this.options.callBack(yes,v);
        }
        this.setState({
            isShow: false,
        });
    }



    componentWillUnmount() {

    }

    render() {

        var obj = this.options?this.options:{};
        var submit = {
            backgroundColor:apin.c_app,
            borderRadius:apin.r_1,
            padding:apin.s_1,
            margin:apin.s_2,
            flex:1,
        };
        var submitTitle = {
            fontSize:apin.f_title,
            textAlign:"center",
            color:"#fff",
        };
        const view = this.state.isShow ?
            <TouchableOpacity
                onPress={()=>{
                    this.hidden(false);
                }}
                style={{
                    width:"100%",
                    height:"100%",
                    position: "absolute",
                    alignItems:'center',
                    justifyContent:'flex-start',
                    paddingTop:"30%",
                    backgroundColor: '#0000007f',
                }}>
                <View style={
                    {
                        width:"90%",
                        backgroundColor: '#fff',
                        flexDirection: "column",
                        borderRadius:apin.r_1,
                        borderWidth:1,
                        borderColor:apin.c_bg,
                    }
                }>

                    <View style={
                        {
                            backgroundColor:apin.c_bg,
                            borderTopLeftRadius:apin.r_1,
                            borderTopRightRadius:apin.r_1,
                        }
                    }>
                        <Text style={{
                            textAlign:"center",
                            backgroundColor:"transparent",
                            paddingVertical :apin.s_2,
                            color:apin.c_app,
                            fontSize:apin.f_title,
                        }}>{obj.title?obj.title:"请输入"}</Text>
                    </View>

                    <View>
                        <TextInput
                            autoFocus={true}
                            underlineColorAndroid="transparent"
                            style={{
                                backgroundColor:"#fff",
                                borderRadius:20,
                                margin:apin.s_1,
                                fontSize:apin.f_title,
                                paddingHorizontal:apin.s_1,
                                height: 40, borderColor: apin.backgroundColor_Line, borderWidth: 1}}

                            onChangeText={(text) => {
                                this.inputValue = text;
                            }}
                        />
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity style={submit} onPress={()=>{
                            //下个页面
                            this.hidden(false);
                        }}>
                            <Text  style={submitTitle}>{obj.leftTitle?obj.leftTitle:"取消"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={submit} onPress={()=>{
                            //下个页面
                            this.hidden(true,this.inputValue)
                        }}>
                            <Text style={
                                {
                                    fontSize:apin.f_title,
                                    textAlign:"center",
                                    color:"#fff",
                                }
                            }>{obj.rightTitle?obj.rightTitle:"确定"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </TouchableOpacity> : null;
        return view;
    }
}
module.exports = Input;