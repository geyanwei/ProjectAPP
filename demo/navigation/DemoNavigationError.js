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
    TouchableOpacity,
    Image,
} from 'react-native';
import {Toast, ModalBox, LayoutBox, PageView,navigation} from "myapplib";

export default class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
                <PageView
                    ref={(ref)=>{
                        this.pageView = ref;
                    }}
                    config={{
                        parent:this,
                        barConfig:{
                            title:"错误页面",
                        },
                        emptyConfig:{
                            loadingShow:true,
                            message:"这是加载信息"
                        },
                        errorConfig:{
                            message:"这是错误信息",
                            buttonTitle:"刷新2",
                            refresh:(data)=>{
                                //去加载
                                let config = this.pageView.getConfig();
                                config.pageLoading = true;
                                config.emptyConfig.message = "又来loading"
                                config.showError = false;
                                this.pageView.refresh()
                                setTimeout(()=>{
                                    config.pageLoading = false;
                                    config.showError = true;
                                    config.errorConfig.message = "又错了"+Math.random();
                                    this.pageView.refresh()
                                },3000)
                            }
                        }

                    }}
                >
                    <Text
                    >演示错误页面</Text>

                    <Text

                        onPress={()=>{
                            this.pageView.getConfig().showError = true;
                            this.pageView.refresh()
                        }}
                    >现在是显示正确,点击换到错误页</Text>


                </PageView>
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

    ,

});
