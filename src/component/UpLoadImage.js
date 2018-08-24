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
    ActivityIndicator,
    TextInput,
    Image,
    ImageBackground
} from 'react-native'
import HttpTool from '../http/HttpTool.js';
import APIP from '../http/APIPZP.js';

/**
 * base64:上传图片数据
 *
 */
class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
        }
    }


    show(options, obj) {


        if (!options) {
            obj.showToast("options 不能为空");
            return;
        }
        if (!options.data) {
            obj.showToast("base64 不能为空");
            return;
        }
        this.source = {uri: options.uri};

        this.setState({
            isShow: true,
        });

        this.commitImg('data:image/jpeg;base64,' + options.data, (url) => {
            this.setState({
                isShow: false,
            });
            if (options.callBack) {
                options.callBack(url);
            }
        }, (e) => {
            this.setState({
                isShow: false,
            });
            obj.showToast(e.message)
        })
    }


    componentWillUnmount() {

    }

    render() {

        const view = this.state.isShow ?
            <View
                onPress={() => {
                    this.hidden(false);
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: "center",
                    backgroundColor: '#0000007f',
                }}>
                <ImageBackground
                    source={this.source}
                    style={
                        {
                            width: 120,
                            height: 120,
                            backgroundColor: '#fff',
                            flexDirection: "column",
                            borderColor: "#f3f3f3",
                        }
                    }>
                    <View style={{
                        backgroundColor: '#000000be',
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <ActivityIndicator
                            animating={true}
                            color={"#FFF"}
                            size="small"
                        />
                        <Text style={{color: "#fff", marginTop: 10}}>图片上传中</Text>
                    </View>
                </ImageBackground>


            </View> : null;
        return view;
    }

    /**
     * 上传图片到服务器
     * @param base64
     * @param successBack
     * @param errorBack
     */
    commitImg(base64, successBack, errorBack) {
        var param = {
            image: base64,
        }
        var successCallback = (code, message, json, option) => {
            successBack(json);
        };
        var failCallback = (code, message) => {
            errorBack({code: code, message: message});
        };
        HttpTool.post(APIP.api_common_uploadImg, successCallback, failCallback, param);
    }
}

module.exports = index;