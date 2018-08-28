import Config from '../src/Config.js';


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    TextInput,
    Platform,
    TouchableHighlight,
} from 'react-native';

const {height, width} = Dimensions.get('window');
import {
    Toast, Loading, ModalBox, ImageZoom, UpImage, Select, LayoutBox, PageView, NavBarView, navigation
} from 'myapplib';

import ErrorView from './configView.js'
import LoadingView from './loadingView.js'

//配置全局Toast样式
Toast.DURATION_SHORT = 2000;
Toast.STYLE = {
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: YITU.space_9,
    paddingVertical:11,
    maxWidth:265,//14个字的宽度
    borderRadius:4,
    alignItems:"center",
};
Toast.TEXTSTYLE = {
    color: "#ffffff",
    fontSize:YITU.fontSize_4,
    textAlign:"center"
};
Toast.POSITION = "top";
Toast.showOK = (text) => {
    Toast.show(text, {
        textStyle: {
            color: "white"
        },
        style: {
            backgroundColor: "green"
        }
    })
};

Toast.showICON = (text, icon) => {
    Toast.show(text, {
        position: "top",
        style: {
            backgroundColor: YITU.textColor_0
        },
        view: (
            <View
                style={{
                    width: YITU.d_click_icon * 4,
                    height: YITU.d_click_icon * 4,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Image resizeMode={"contain"} style={{
                    width: 32,
                    height: 32,
                }} source={icon || require("./image/ok.png")}/>
                <Text
                    style={{
                        marginTop: YITU.space_2,
                        color: YITU.backgroundColor_0
                    }}
                >{text}</Text>
            </View>
        )
    })
};

Loading.BGSTYLE = {};//视图背影样式 默认
Loading.CONTENTSTYLE = {
    backgroundColor: '#000000cc',
};//LOADING背影样式 默认
Loading.TEXTSTYLE = {
    color: 'white',
    marginTop: YITU.space_2,
    fontSize: YITU.fontSize_15,
    textAlign: "center",
    backgroundColor: '#00000000',
    width: "100%",
    maxWidth: 90,
};//文本样式  默认
Loading.CIRCLERING = {
    color: [YITU.textColor_4],
    thickness: 2,
    spinDuration: 2000,
    ringColor: YITU.backgroundColor_4,
};//环形转圈样式  默认
Loading.TEXT = "请求中";

UpImage.uploadListen = (data, callBack) => {
    console.log(('data:image/jpeg;base64,' + data.data));
    fetch(Config.url + "/cloudfile/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        body: ("image=" + 'data:image/jpeg;base64,' + data.data).replace(/\s/g, "+")
    }).then((response) => response.json())
        .then((json) => {
            if (json && json.code === 200 && json.data) {
                data.imageUrl = json.data.domain + json.data.path;
                callBack("uploaddone", "上传成功", data);

            } else {
                callBack("uploaderror", "上传失败", data);
            }
        })
        .catch((error) => {
            callBack("uploaderror", "上传失败" + JSON.stringify(error), data);
        });
    callBack("uploading", "上传开始", data);

};
Select.STYLE = {
    pickerConfirmBtnColor: YITU.textColor_4,
    pickerCancelBtnColor: YITU.textColor_4,
    pickerToolBarBg: "#f8f8f8",
    pickerBg: YITU.backgroundColor_0,
    pickerFontColor: YITU.textColor_0,
    pickerTitleColor: YITU.textColor_0,
    pickerToolBarFontSize: YITU.fontSize_5
};


LayoutBox.Icon = class  extends Component {

    render() {


        return (
            <LayoutBox

                leftStyle={{
                    backgroundColor: "#00000000",
                    paddingTop: YITU.space_10,
                    paddingBottom: YITU.space_10,

                }}
                rowStyle={layoutBoxStyle.rowStyle}
                lineStyle={layoutBoxStyle.lineStyle}
                renderLine={(data, isLast) => {
                    if (isLast) {
                        return null;
                    }

                    return (<View style={{
                        backgroundColor: YITU.backgroundColor_0,
                        height: StyleSheet.hairlineWidth,
                        paddingLeft: YITU.space_5,
                        width: "100%"
                    }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: YITU.backgroundColor_Line,
                            height: StyleSheet.hairlineWidth,
                        }}/>
                    </View>);
                }}
                renderSpace={(data) => {
                    return <View style={[layoutBoxStyle.space, this.props.spaceStyle, data.spaceStyle]}/>
                }}
                renderRow={(props, leftView, rightView) => {
                    let TouchType = props.data.type === "label" ? View : TouchableHighlight;
                    return (
                        <TouchType
                            activeOpacity={1}
                            underlayColor={YITU.backgroundColor_2}
                            style={{
                                backgroundColor: YITU.backgroundColor_0,
                            }}
                            onPress={props.data.onPress}>
                            <View style={[{
                                backgroundColor: YITU.backgroundColor_3,
                                flexDirection: "row",
                                paddingLeft: YITU.space_2,
                                paddingRight: YITU.space_2,
                            }, props.rowStyle, props.data.rowStyle
                                , {
                                    backgroundColor: "#00000000",
                                }]}>
                                {leftView}
                                {rightView}
                            </View>
                        </TouchType>
                    );
                }}
                renderLeft={(data) => {

                    return (
                        <View style={[layoutBoxStyle.leftRow, this.props.leftStyle, data.leftStyle]}>
                            {data.icon ? <Image
                                resizeMode={"contain"}
                                style={layoutBoxStyle.icon}
                                source={data.icon}
                            /> : null}
                            <Text
                                style={[layoutBoxStyle.title, this.props.leftTextStyle, data.leftTextStyle]}>
                                <Text>
                                    {data.title}
                                    {/*这个空格 不能删除，一定不要删除啊，一定不要删除啊，一定不要删除啊，一定不要删除啊，用来解决数学与汉字高度不统一问题*/}
                                </Text>
                            </Text>
                        </View>
                    )
                }}

                renderRight={(data) => {

                    return (
                        <View style={layoutBoxStyle.rightRow}>
                            <Text

                                style={[layoutBoxStyle.desc, this.props.rightTextStyle, data.rightTextStyle]}>
                                <Text>
                                    {data.resultValue||" "}
                                    {/*这个空格 不能删除，一定不要删除啊，一定不要删除啊，一定不要删除啊，一定不要删除啊，用来解决数学与汉字高度不统一问题*/}
                                </Text>
                            </Text>
                            {data.type === "label" ? null : (
                                <Image
                                    resizeMode={"contain"}
                                    style={layoutBoxStyle.iconRight}
                                    source={require("./image/r2.png")}
                                />
                            )}
                        </View>
                    )
                }}
                {...this.props}
            />
        );
    }
};
LayoutBox.Input = class  extends Component {

    getLayoutBox() {
        return this.refs["layoutBox"]
    }

    render() {
        return (
            <LayoutBox
                ref={"layoutBox"}

                renderRightIcon={() => {
                    return <Image
                        resizeMode={"contain"}
                        style={{width: YITU.d_icon_small, height: YITU.d_icon_small}}
                        source={require("./image/r2.png")}
                    />
                }}
                titleStyle={[layoutBoxStyle.title, this.props.leftTextStyle]}
                leftStyle={layoutBoxStyle.leftStyle}
                rowStyle={layoutBoxStyle.rowStyle}
                lineStyle={layoutBoxStyle.lineStyle}
                renderLine={(data, isLast) => {
                    if (isLast) {
                        return null;
                    }

                    return (<View style={{
                        backgroundColor: YITU.backgroundColor_0,
                        height: StyleSheet.hairlineWidth,
                        paddingLeft: YITU.space_5,
                        width: "100%"
                    }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: YITU.backgroundColor_Line,
                            height: StyleSheet.hairlineWidth,
                        }}/>
                    </View>);
                }}

                renderSpace={(data) => {
                    return <View style={[layoutBoxStyle.space, this.props.spaceStyle, data.spaceStyle]}/>
                }}
                {...this.props}

            />
        );
    }
};
LayoutBox.Second = class  extends Component {

    getLayoutBox() {
        return this.refs["layoutBox"]
    }

    render() {
        return (
            <LayoutBox
                ref={"layoutBox"}
                leftStyle={layoutBoxStyle.detailRowStyle}
                rowStyle={layoutBoxStyle.detailRowStyle}
                lineStyle={[layoutBoxStyle.lineStyle, {backgroundColor: YITU.backgroundColor_0}]}
                titleStyle={layoutBoxStyle.titleStyle}
                rightTextStyle={layoutBoxStyle.rightTextStyle}
                {...this.props}

            />
        );
    }
};
LayoutBox.InputFile = class  extends Component {

    constructor(props) {
        super(props);
        let {data} = this.props;
        let loadState = 0, upLoadImageUrl = null;
        if (data.resultValue || data.preview) {
            loadState = 2;
            upLoadImageUrl = data.resultValue || ""
        }
        this.state = {
            loadState,
            upLoadImageUrl
        }
    }

    getLoadingTheme() {
        return {
            contentStyle: {
                backgroundColor: '#00000000',
                padding: 0,
            },//LOADING背影样式 默认
            textStyle: {
                color: YITU.textColor_3,
                marginTop: YITU.space_2,
                fontSize: YITU.fontSize_15,
                textAlign: "center",
                backgroundColor: '#00000000',
                width: "100%",
                maxWidth: 90,
            },//文本样式  默认
            circleRing: {
                color: [YITU.textColor_4],
                thickness: 2,
                spinDuration: 2000,
                ringColor: YITU.backgroundColor_Line,
            }, //环形转圈样式  默认
        }
    }

    getFrame() {
        if (this.state.loadState === 0) {
            return (
                <View style={layoutBoxFileStyle.addFile}>
                    <Image
                        style={layoutBoxFileStyle.addFileIcon}
                        source={require("./image/camera.png")}
                        resizeMode={"stretch"}
                    />
                </View>
            )
        } else if (this.state.loadState === 1) {
            return (
                <Loading
                    text={"上传中"}
                    {...this.getLoadingTheme()}
                />
            )
        } else {
            //添加完成
            return (
                <View style={layoutBoxFileStyle.actionLayout}>
                    <TouchableOpacity style={layoutBoxFileStyle.actionLayoutLeft}
                                      onPress={() => {
                                          //清空图片
                                          this.props.data.resultValue = undefined;
                                          this.setState({
                                              loadState: 0,
                                              upLoadImageUrl: null
                                          })
                                      }}
                    >
                        <Text style={layoutBoxFileStyle.actionLayoutTitle}>清空</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={layoutBoxFileStyle.actionLayoutRight}
                                      onPress={() => {
                                          //上传图片
                                          this.openFile(true);
                                      }}
                    >
                        <Text style={layoutBoxFileStyle.actionLayoutTitle}>重新上传</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    openFile(save) {
        //打开照片
        UpImage.show({
            compressImageMaxWidth:720,
            compressImageMaxHeight:1280,
            compressImageQuality:0.9,
            cropperCancelText: "取消",
            cropperChooseText: "选择",
            loadingLabelText: "加载中，请稍候",
            mediaType: "photo",
        }, (state, message, data) => {
            switch (state) {
                case "start":
                case "uploading":
                case "done":
                    //上传中显示
                    this.setState({
                        loadState: 1
                    });
                    break;
                case "uploaddone":
                    //上传完成显示
                    console.log(data.imageUrl);
                    this.props.data.resultValue = data.imageUrl;
                    this.setState({
                        loadState: 2,
                        upLoadImageUrl: data.imageUrl
                    });
                    break;
                case "errorMessage":
                    Toast.show(message);
                case "cancel":
                case "error":

                    //不处理用户取消类别错误
                    this.setState({
                        loadState: save ? 2 : 0
                    });

                    break;
                case "uploaderror":
                //上传失败显示
                default:
                    //上传失败
                    this.setState({
                        loadState: save ? 2 : 0
                    });
                    Toast.show(message);
                    break;
            }

        });
    }

    render() {
        let {data} = this.props;
        let source = null;
        if (data.preview) {
            //预览模式，修改显示规则
            if (this.state.upLoadImageUrl && this.state.upLoadImageUrl.toLowerCase().indexOf("http") >= 0) {
                //存在图片地址
                source = {uri: this.state.upLoadImageUrl}
            } else {
                source = data.defaultImage;
            }
        } else {
            source = this.state.loadState === 2 ? {uri: this.state.upLoadImageUrl || ""} : data.defaultImage;
        }
        return (
            <View
                style={[layoutBoxFileStyle.row, {display: data.display === undefined || data.display ? "flex" : "none"}]}
            >

                {data.title ? <Text style={[layoutBoxFileStyle.title]}>{data.title}</Text> : null}
                {data.desc1 ? <Text style={[layoutBoxFileStyle.desc1]}>{data.desc1}</Text> : null}

                <TouchableOpacity style={layoutBoxFileStyle.imageLayout}
                                  onPress={() => {
                                      if (this.state.loadState === 2 || data.preview) {
                                          //预览图片
                                          //如果图片不存在，预览默认图
                                          if (!this.state.upLoadImageUrl) {
                                              return;
                                          }
                                          ImageZoom.show([
                                              this.state.upLoadImageUrl,
                                          ]);
                                          return;
                                      }
                                      this.openFile()
                                  }}
                >
                    <ImageBackground
                        resizeModev={"cover"}
                        style={layoutBoxFileStyle.image}
                        source={source}>
                        {data.preview ? null : this.getFrame()}
                    </ImageBackground>
                </TouchableOpacity>
                {data.desc2 ? <Text style={[layoutBoxFileStyle.desc2]}>{data.desc2}</Text> : null}
            </View>
        );
    }
};
LayoutBox.InputArea = class  extends Component {

    constructor(props) {
        super(props);
        let {data} = this.props;
        let text = "";
        if (data.rightProps) {
            text = data.rightProps.value || data.rightProps.defaultValue;
        } else {
            text = data.resultValue;
        }
        this.state = {
            text: text || "",
        }
    }

    componentDidMount() {
        let {data} = this.props;

    }

    render() {
        let {data, left} = this.props;
        let maxLength = data.rightProps && data.rightProps.maxLength;
        let editable = data.type === "input";
        return (
            <View
                style={[layoutInputAreaStyle.row, {display: data.display === undefined || data.display ? "flex" : "none"}]}
            >
                {left}
                <View style={layoutInputAreaStyle.line}/>
                <TextInput
                    ref={(ref) => this.textInput = ref}
                    placeholderTextColor={"#999"}
                    underlineColorAndroid={"transparent"}
                    textAlignVertical={"top"}
                    textDecorationLine={"none"}
                    editable={editable}
                    multiline={true}
                    style={[layoutInputAreaStyle.inputStyle, this.props.rightTextStyle, data.rightTextStyle]}
                    onChangeText={(text) => {
                        if (maxLength)
                            text = text.substring(0, maxLength);
                        data.resultValue = text;
                        this.setState({text})
                    }}
                    value={this.state.text}
                    onFocus={this._onFocus.bind(this)}
                    {...data.rightProps}
                />
                {maxLength ? <Text
                    style={[layoutInputAreaStyle.maxLength]}>{(maxLength - this.state.text.length) + "字"}</Text> : null}
            </View>
        );
    }

    _onFocus() {

        if (Platform.OS === "ios" && this.props.obj && this.props.obj.scrollView) {
            setTimeout(() => {
                let scrollResponder = this.props.obj.scrollView.getScrollResponder();
                scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                    ReactNative.findNodeHandle(this.textInput), YITU.d_RowHeight * 2, true);
            }, 100);
        }
    }
};
const layoutInputAreaStyle = StyleSheet.create({
    row: {
        backgroundColor: YITU.backgroundColor_0,
        paddingLeft: YITU.space_5,
        paddingRight: YITU.space_5,
        paddingBottom: YITU.space_5,
    },
    inputStyle: {
        color: "#000",
        flex: 1,
        height: YITU.d_RowHeight * 2,
        textAlign: "left",
        textAlignVertical: 'top',
        borderWidth: 0,
        fontSize: YITU.fontSize_5,

    },
    line: {
        backgroundColor: "#ddd",
        height: StyleSheet.hairlineWidth,
    },
    maxLength: {
        marginTop: YITU.space_2,
        color: YITU.textColor_2,
        textAlign: "right",
        fontSize: YITU.fontSize_5
    }

});
const layoutBoxFileStyle = StyleSheet.create({
    row: {
        backgroundColor: YITU.backgroundColor_0,
        padding: YITU.space_5,
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_0,
        marginBottom: YITU.space_5,
    },
    desc1: {
        textAlign: "center",
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_2,
        marginBottom: YITU.space_2,
    },
    desc2: {
        textAlign: "center",
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_2,
        marginTop: YITU.space_2,
    },
    imageLayout: {
        width: width * 0.6,
        height: width * 0.6 * 0.6,
        backgroundColor: "#ddd",
        borderRadius: YITU.radius_4,
    },
    image: {
        flex: 1,
        borderRadius: YITU.radius_4,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    addFile: {
        width: 46,
        height: 46,
        borderRadius: YITU.radius_6,
        backgroundColor: "#00000099",
        alignItems: "center",
        justifyContent: "center",
    },
    addFileIcon: {
        width: 46,
        height: 46,
    },
    actionLayout: {
        borderRadius: YITU.space_5,
        flex: 1,
        width: "100%",
        alignItems: "flex-end",
        flexDirection: "row",
    },
    actionLayoutLeft: {
        backgroundColor: "#00000099",
        flex: 1,
        padding: YITU.space_5,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: YITU.space_5,
    },
    actionLayoutRight: {
        backgroundColor: "#00000099",
        flex: 1,
        padding: YITU.space_5,
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: YITU.space_5,
    },

    actionLayoutTitle: {
        fontSize: YITU.fontSize_5,
        color: YITU.c_title_white
    }
});
const layoutBoxStyle = StyleSheet.create({
    detailRowStyle: {
        backgroundColor: YITU.backroundColor_0,
        paddingLeft: YITU.space_1,
        paddingRight: YITU.space_1,
    },
    rowStyle: {
        backgroundColor: YITU.backgroundColor_0,
        paddingLeft: YITU.space_5,
        paddingRight: YITU.space_5,
    },
    leftStyle: {
        backgroundColor: "#00000000",
        paddingTop: YITU.space_5,
        paddingBottom: YITU.space_5,
    },
    lineStyle: {
        backgroundColor: YITU.backgroundColor_Line,
    },
    titleStyle: {
        color: YITU.textColor_2,
        fontSize: YITU.fontSize_3,

    },
    rightTextStyle: {
        color: YITU.textColor_0,
        fontSize: YITU.fontSize_3

    },
    leftRow: {

        flexDirection: "row",
        alignItems: "center"
    },
    rightRow: {
        paddingTop: YITU.space_10,
        paddingBottom: YITU.space_10,
        flexDirection: "row",
        alignItems: "center"
    },
    space: {
        height: YITU.space_5,
        backgroundColor: "#00000000",
    },
    icon: {
        width: YITU.d_icon,
        height: YITU.d_icon,
        marginRight: YITU.space_5,
    },
    iconRight: {
        marginLeft: YITU.space_2,
        height: YITU.space_5,
    },
    title: {

        fontSize: YITU.fontSize_5,
        color: YITU.textColor_1,
    },
    desc: {

        fontSize: YITU.fontSize_5,
        color: YITU.textColor_2,
    }

});


PageView.toLoading = (pageView, cb) => {
    let config = pageView.getConfig();
    config.pageLoading = true;
    config.showError = false;
    pageView.refresh(cb)
};

PageView.toError = (pageView, message, cb) => {
    let config = pageView.getConfig();
    config.pageLoading = false;
    config.showError = true;
    config.errorConfig.message = message;
    pageView.refresh(cb)
};

PageView.clearLoading = (pageView, cb) => {
    let config = pageView.getConfig();
    config.pageLoading = false;
    config.showError = false;
    pageView.refresh(cb)
};

PageView.defaultConfig = (obj = {props: {}}, other = {}) => {

    if (!obj.pageViewDefaultConfig) {
        let barConfig = other.barConfig;
        if (!barConfig) {
            barConfig = {
                title: obj.props.title,
            }
        }

        if (!barConfig.title) {
            barConfig.title = obj.props.title;
        }
        if (!barConfig.leftButtonFunc) {
            barConfig.leftButtonFunc = other.navBack
        }

        obj.pageViewDefaultConfig = {
            full: other.full,
            pageLoading: other.pageLoading === undefined ? false : other.pageLoading,
            parent: obj,
            barConfig: barConfig,
            autoCloseLoading: other.autoCloseLoading === undefined ? true : other.autoCloseLoading,
            parentDidMount: other.parentDidMount,
            renderError: (error) => {
                // console.log("other=="+JSON.stringify(other));
                return <ErrorView config={other} error={error}/>;
            },
            renderEmpty: () => {
                return <LoadingView/>;
            },
            errorConfig: {
                refresh: other.refresh,
                buttonTitle: "重新加载",
            },
            ...other
        }
    }
    return obj.pageViewDefaultConfig
};

if (__DEV__) {
    require("../demo/Demo")
}

NavBarView.defaultProps = {
    //整体导航栏样式
    mainContainerStyle: {
        backgroundColor: "#fff"
    },

    //整体导航栏渐变样式
    mainNavbarGradientStyle: {},
    //左侧子容器样式
    leftContainerStyle: {},

    //右侧子容器样式
    rightContainerStyle: {},

    //中间子容器样式
    centerContainerStyle: {},

    //返回按钮图片
    leftButtonImg: require('../src/image/img_back_blue.png'),
    //返回按钮样式
    leftButtonImgStyle: {
        width: 10 / 18 * 16, height: 16
    },

    //返回按钮文字
    leftButtonText: "返回",

    //返回按钮文字样式
    leftButtonTextStyle: {
        color: YITU.textColor_4,
        marginLeft: YITU.space_0,
        fontSize: YITU.fontSize_4,
        fontFamily: YITU.fontName_regular,
    },

    //中间标题样式
    titleStyle: {
        fontSize: YITU.fontSize_7,
        color: YITU.textColor_1,
        fontFamily: YITU.fontName_regular,
        fontWeight: "bold"
    },

    //右侧按钮文字样式
    rightButtonTextStyle: {
        color: YITU.textColor_4,
        marginRight: YITU.space_2,
        fontSize: YITU.fontSize_4,
        fontFamily: YITU.fontName_regular,

    },

    //右侧按钮图片样式
    rightButtonImgStyle: {},

    //定义左侧子容器和右侧子容器的宽度
    leftRightContainerWidth: 90,

    //底线
    bottomLineStyle: {
        borderColor: '#ddd'
    }
};

ModalBox.showOK = (title, desc, cb)=> {
    let mb = ModalBox.showConfig({
        modalConfig: {
        clickToClose: false,
    },
        title: {
            text: title,
        },
        desc: desc?(<Text style={{
            marginTop:YITU.space_1,
            textAlign:"center",
            color:YITU.textColor_3,
            fontSize:YITU.fontSize_4,
        }}>
            <Text>{desc}</Text>
        </Text>):null,
        foot: {
            buttons: [
                {
                    text: "我知道了",
                    style: {color: "#108ee9"},
                    onPress: () => {
                        mb.close(()=>{
                            cb&&cb();
                        });
                    }
                }
            ]
        }

    });
    return mb;
};

ModalBox.showSelect = (option,callBack)=> {
    let obj = option||{};
    let mb = ModalBox.showConfig({
        modalConfig: {
            clickToClose: false,
        },
        title: {
            text: obj.title||"提示",
        },
        desc: obj.desc?(<Text style={{
            marginTop:YITU.space_1,
            textAlign:"center",
            color:YITU.textColor_3,
            fontSize:YITU.fontSize_4,
        }}>
            <Text>{obj.desc}</Text>
        </Text>):null,
        foot: {
            buttons: [
                {
                    text: obj.closeTitle || "取消",
                    style: {color: "#333"},
                    onPress: (e) => {
                        mb.close(()=>{
                            callBack&&callBack(0);
                        });
                    }
                },
                {
                    text: obj.okTitle || "确定",
                    style: {color: "#108ee9"},
                    onPress: (e) => {
                        mb.close(()=>{
                            callBack&&callBack(1);
                        });
                    }
                }
            ]
        }
    });
    return mb;
};

ModalBox.showDescCustom = (option, cb) => {
    let obj = option || {};
    let mb = ModalBox.showConfig({
        title: <Text style={{
            textAlign: "center",
            color: YITU.textColor_1,
            fontSize: YITU.fontSize_5,
            lineHeight: 21
        }}>{obj.desc}</Text>,
        foot: {
            direction: "row",
            buttons: [
                {
                    text: obj.btnTitle || "我知道了",
                    style: {color: YITU.textColor_4},
                    onPress: () => {
                        mb.close(() => {
                            cb&& cb();
                        });
                    }
                }
            ]
        },
        modalConfig: {
            clickToClose: false,
        }
    });
    return mb;
};

