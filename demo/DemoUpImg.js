/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity, ImageBackground
} from 'react-native';
import Item from "./Item"
import {Toast, ImageZoom, UpImage} from "myapplib";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upLoadImageMessage: "上传",
            upLoadImageUrl: null,
        }
    }

    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>

                        <Item
                            onPress={() => {
                                UpImage.show({
                                    width: 300,
                                    height: 300,
                                    cropping: true,
                                }, (state, message, data) => {
                                    console.log("state:" + state, "message:" + message);
                                    this.setState({
                                        upLoadImageUrl: data && data.imageUrl,
                                        upLoadImageMessage: message
                                    });
                                    switch (state) {
                                        case "start":
                                            break;
                                        case "cancel":
                                            break;
                                        case "done":
                                            break;
                                        case "error":
                                            break;
                                        case "uploading":
                                            break;
                                        case "uploaddone":
                                            console.log(data.imageUrl);
                                            break;

                                        case "uploaderror":
                                            break;
                                        default:
                                            //上传失败
                                            break;
                                    }

                                });
                            }}
                            title={"上传头像(裁剪)"}
                        >

                        </Item>
                        <Item
                            onPress={() => {
                                UpImage.show(null, (state, message, data) => {
                                    console.log("state:" + state, "message:" + message);
                                    this.setState({
                                        upLoadImageUrl: data && data.imageUrl,
                                        upLoadImageMessage: message
                                    });
                                    switch (state) {
                                        case "start":
                                            break;
                                        case "cancel":
                                            break;
                                        case "done":
                                            break;
                                        case "error":
                                            break;
                                        case "uploading":
                                            break;
                                        case "uploaddone":
                                            console.log(data.imageUrl);
                                            break;

                                        case "uploaderror":
                                            break;
                                        default:
                                            //上传失败
                                            break;
                                    }

                                });
                            }}
                            title={"不剪裁上传图片"}
                        >

                        </Item>
                        <ImageBackground
                            source={this.state.upLoadImageUrl ? {uri: this.state.upLoadImageUrl} : null}
                            style={
                                {
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#fff',
                                    flexDirection: "column",
                                    borderColor: "#f3f3f3",
                                }
                            }>

                        </ImageBackground>
                        <View>
                            <Text>{this.state.upLoadImageMessage}</Text>
                            <Text
                                style={{
                                    fontSize: 30,
                                    padding: 10
                                }}
                                onPress={() => {
                                    if (this.state.upLoadImageUrl) {
                                        ImageZoom.show([this.state.upLoadImageUrl], 0);
                                    } else {
                                        Toast.show("请选择图片")
                                    }

                                }}
                            >{"(点我预览)"}</Text>
                        </View>
                        <Text>{"当前上传URL：" + this.state.upLoadImageUrl}</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.close}
                                  onPress={() => {
                                      this.props.hide && this.props.hide();
                                  }}
                >
                    <Text>关闭</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingTop: 22
    },
    main: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: '#ddd',
    },
    container: {
        flex: 1,
    },
    close: {
        position: "absolute",
        bottom: 50,
        right: 50,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#e9c576"
    }

});
