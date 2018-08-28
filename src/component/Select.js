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
    NativeModules,
} from 'react-native'

import Picker from 'react-native-picker';
const {height, width} = Dimensions.get('window');

 class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
        }
    }


    show(options) {
        this.setState({
            isShow: true,
        });
        this.openSelect(options);
    }
    hidden(){
        this.setState({
            isShow: false,
        });

    }

    verApp(){
        if(!NativeModules.BEEPickerManager){
            alert("你当前的版本过低");
            this.hidden();
            return false;
        }
        return true;
    }
    openSelect(options){

        if(!this.verApp()){
            return;
        }
        //
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择',
            pickerConfirmBtnColor: [240, 27, 40, 1],
            pickerCancelBtnColor: [1240, 27, 40,1],
            pickerToolBarBg: [232, 232, 232, 1],
            pickerBg: [255, 255, 255, 1],
            pickerFontColor: [55, 55 ,55, 1],
            onPickerConfirm: data => {
                if(options&&options.onSelect){

                    options.onSelect(data);
                }
                this.hidden();
            },
            onPickerCancel: data => {
                // alert("取消:"+data);
                this.hidden();
            },
            onPickerSelect: data => {
                //alert("滑动到:"+data);
            }
            ,
            ...options
        });
        Picker.show();
    }


    componentWillUnmount() {

        try{
            if(Picker&&Picker.isPickerShow){
                Picker.isPickerShow((returnValue)=>{
                        Picker.hide();
                })
            }
        }catch (e){

        }
    }

    render() {
        const view = this.state.isShow ?
            <TouchableOpacity
                style={[styles.container]}
                onPress={() => {
                    if(this.verApp()){
                        if(Picker&&Picker.isPickerShow){
                            Picker.isPickerShow((returnValue)=>{
                                if(returnValue){
                                    Picker.hide();
                                }
                                this.hidden();
                            })

                        }else{
                            this.hidden();
                        }
                    }else{
                        this.hidden();
                    }



                }
                }
            >
            </TouchableOpacity> : null;
        return view;
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
