/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org/
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    View,
    Text,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView,
    Animated,
} from 'react-native';

import SelectImage from './SelectImage.js';
import ViewDel from './ViewDel.js';

//
class index extends Component {

    constructor(props) {
        super(props);

        this.self = this.props.self;
        this.state = {
            descData: this.props.data ? this.props.data : [{hasImage: true}],
            upData: 0,
        }
    }


    componentWillUnmount() {

    }

    getData() {
        return this.state.descData;
    }

    render() {

        var descView = [];
        for (let i in this.state.descData) {
            let obj = this.state.descData[i];
            descView.push(
                <DescCom
                    key={i}
                    onClick={() => {
                        //提示,选择图.或者文
                        this.openAddPage(obj, (data) => {
                            var dataS = [].slice.call(this.state.descData);
                            dataS[i] = data;
                            this.setState(
                                {
                                    descData: dataS,
                                }
                            )
                        })
                    }}
                    del={() => {
                        var dataS = [].slice.call(this.state.descData);
                        dataS.splice(i, 1);
                        this.setState(
                            {
                                descData: dataS,
                            }
                        )
                    }}
                    see={() => {
                        //查看图片(收集所有图片的URL,并确定当前图片位置)
                        this.seeImage(obj.url, i);

                    }}
                    addImg={() => {
                        //选择图片
                        SelectImage.show(this.self, (response) => {
                            response.callBack = (url) => {
                                var dataS = [].slice.call(this.state.descData);
                                dataS[i].url = url;
                                this.setState(
                                    {
                                        descData: dataS,
                                    }
                                )
                            };
                            this.self.showUpLoadImage(response)
                        });
                    }}
                    data={obj}
                />
            )
        }
        return <View style={{width: "100%"}}{...this.props}>
            {descView}
            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: YITU.s_1}}>
                <AddDesc {...this.openSelectAdd(false)}/>
            </View>
        </View>

    }

    seeImage(selfUrl, selectI) {
        var dataS = [].slice.call(this.state.descData);
        var urlS = [];
        var index = 0;
        for (let i = 0; i < dataS.length; i++) {
            let url = dataS[i].url;
            if (url) {
                //记录打开后,要显示的位置
                if (selectI == i) {
                    index = urlS.length;
                }
                urlS.push(url)
            }
        }
    }

    openSelectAdd(top) {
        return {
            onClick: (index) => {
                //判断图片最大数量
                if (this.props.maxImage && index === 0) {
                    let number = 0;
                    for (let i = 0; i < this.state.descData.length; i++) {
                        if (this.state.descData[i].hasImage) {
                            number++;
                        }
                    }
                    if (number >= this.props.maxImage) {
                        this.self.showToast("图片最多为" + this.props.maxImage + "张");
                        return;
                    }
                }

                var exe = (hasImage, url) => {
                    var data = {hasImage: hasImage, url: url};
                    this.openAddPage(data, (data) => {
                        this.setState(
                            {
                                descData: this.state.descData.concat([data]),
                            }
                        )
                    });
                };
                if (index == 0) {
                    SelectImage.show(this.self, (response) => {
                        response.callBack = (url) => {
                            // exe(true,url);
                            var data = {hasImage: true, url: url};
                            this.setState(
                                {
                                    descData: this.state.descData.concat([data]),
                                }
                            )
                        };
                        this.self.showUpLoadImage(response)
                    });
                } else {
                    exe(false);
                }

                


            }
        }
    }

    openAddPage(data, callBack) {
        this.self.Help.app_open(this.self, 'AddTripDescInputOrImagePage', {
            title: "文字",
            data: data,
            callBack: callBack
        })
    }


}

class DescCom extends Component {
    constructor(props) {
        super(props);
        this._deltaX = new Animated.Value(0);
    }

    render() {
        //如何 传参数
        var {title, onClick, del, see, addImg, data} = this.props;
        return (
            <View style={{width: "100%", marginTop: YITU.s_1}}>
                <ViewDel onPress={() => {
                    if (del) {
                        del();
                    }
                }}>
                    <TouchableHighlight
                        underlayColor={"#ffffff"}
                        onPress={() => {
                            if (onClick) {
                                onClick();
                            }
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row", backgroundColor: "#fff", padding: YITU.s_1,
                                borderRadius: YITU.r_1,
                            }}>
                            {/*图片显示*/}
                            <TouchableOpacity
                                onPress={() => {
                                    //为了实现更改图片，注释此代码
                                    // if (data.url) {
                                    //     if (see) {
                                    //         see();
                                    //     }
                                    // } else {
                                    if (addImg) {
                                        addImg();
                                    }
                                    // }
                                }}
                            >
                                {
                                    data && data.hasImage ?
                                        <Image
                                            source={data.url ? {uri: data.url} : require("../../aboutres/image/img_icon_image.png")}
                                            style={{
                                                width: 80,
                                                height: 80,
                                                marginRight: YITU.s_1,
                                            }}/> : null
                                }
                            </TouchableOpacity>
                            <View style={{height: 80, flex: 1}}>
                                <Text
                                    numberOfLines={4}
                                    style={{color: YITU.c_gray}}>{
                                    data && data.value ? data.value : "添加描述"
                                }</Text>
                            </View>

                        </View>
                    </TouchableHighlight>
                </ViewDel>
            </View>
        );
    }
}

class AddDesc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render() {
        //如何 传参数
        var {onClick} = this.props;
        var rs = {
            flexDirection: "row",
            paddingHorizontal: YITU.s_3,
            borderRadius: YITU.r_3,
            marginTop: YITU.s_0,
            marginLeft: YITU.s_0,
            borderColor: YITU.c_gray,
            borderWidth: 1,
            height: YITU.f_title + YITU.s_0 * 2,
            alignItems: "center",
        };
        return (
            <View>
                {
                    this.state.show ?
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        show: false
                                    });
                                    onClick(0)
                                }
                                }
                                style={{marginHorizontal: YITU.s_2}}>
                                <Image style={{width: 32, height: 32}}
                                       source={require("../../aboutres/image/img_icon_image.png")}/>
                                <Text>照片</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        show: false
                                    });
                                    onClick(1)
                                }
                                } style={{marginHorizontal: YITU.s_2}}>
                                <Image style={{width: 32, height: 32}}
                                       source={require("../../aboutres/image/img_icon_text.png")}/>
                                <Text>正文</Text>
                            </TouchableOpacity>
                        </View>
                        :

                        <TouchableOpacity
                            onFocus={() => {
                                //alert(1)
                            }
                            }
                            onPress={(e) => {
                                this.setState({
                                    show: true
                                })
                            }}
                            style={rs}>
                            {/*左边图片,右边文字,如何用CSS*/}
                            <Image style={{width: YITU.f_title, height: YITU.f_title}}
                                   source={require("../../aboutres/image/img_plus.png")}/>
                        </TouchableOpacity>
                }
            </View>
        );
    }
}

module.exports = index;
