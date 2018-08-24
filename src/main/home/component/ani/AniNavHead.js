import React, {Component, PropTypes} from 'react';
import {
    View,
    ImageBackground,
    Image,
    StyleSheet,
    Animated,
    TouchableOpacity,
    StatusBar,
    Platform,
    DeviceInfo
} from 'react-native';

class AniNavHead extends Component {
    static defaultProps = {
        aniHeight: (Platform.OS === 'android' ? -20 : DeviceInfo.isIPhoneX_deprecated ? 24 : 0) + 40
    };

    constructor(props) {
        super(props);
        this.fadeInOpacity = new Animated.Value(0); // 初始值
        this.fadeInOpacity1 = new Animated.Value(0); // 初始值
    }

    componentDidMount() {

    }

    setScrollNum(y) {
        if (Platform.OS === "ios") {
            StatusBar.setBarStyle(Platform.select({
                ios: y > 0 ? "dark-content" : "light-content"
            }), true);
        }
        this.fadeInOpacity.setValue(y / this.props.aniHeight);
        this.fadeInOpacity1.setValue(y < 0 ? 0 : ((y / this.props.aniHeight) > 1 ? 1 : (y / this.props.aniHeight)));
    }

    render() {
        let {title, isBack, cb, rightTitle, rightArr} = this.props;
        let bgOpacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        let colorTitle = this.fadeInOpacity1.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["#fff", "#999", "#000"],
        });
        let colorRight = this.fadeInOpacity1.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["rgba(255,255,255,0.9)", "#999", "#000"],
        });

        let colorAniLeft = this.fadeInOpacity1.interpolate({
            inputRange: [0, 1],
            outputRange: ["#fff", "#3da3ff"],
        });


        return (
            <View style={[styles.navCell, {borderBottomWidth: 0, backgroundColor: "transparent"}]}>
                <Animated.View style={[styles.navCell, {opacity: bgOpacity}]}/>
                <View style={{flexDirection: "row"}}>
                    {isBack ? <TouchableOpacity
                        onPress={() => {
                            cb && cb(1);
                        }}
                        style={styles.navBackIconBg}>
                        <ImageBackground
                            resizeMode={"contain"}
                            style={[styles.navBackIcon,
                                {
                                    marginLeft: YITU.space_2,
                                    width: 10 / 18 * YITU.d_icon_small,
                                    height: YITU.d_icon_small
                                }]}
                            source={YITU.default_backImg}>

                            <Animated.View style={{
                                opacity: bgOpacity
                            }}>
                                <Image resizeMode={"contain"}
                                       style={[styles.navBackIcon,
                                           {
                                               marginLeft: 0,
                                               marginRight: 0,
                                               width: 10 / 18 * YITU.d_icon_small,
                                               height: YITU.d_icon_small
                                           }]}
                                       source={YITU.default_backImg_blue}/>
                            </Animated.View>
                        </ImageBackground>

                        <Animated.Text style={[{
                            opacity: 0.9,
                            fontSize: YITU.fontSize_5,
                            color: YITU.c_title_white,
                        }, {
                            color: colorAniLeft,
                        }]}>{"返回"}
                        </Animated.Text>
                    </TouchableOpacity> : <View style={styles.navBackIconBg}/>}

                    <View style={styles.navTitleBg}>
                        <Animated.Text style={[styles.navTitle, {
                            color: colorTitle,
                        }]}>{title}
                        </Animated.Text>
                    </View>


                    <View style={[styles.navBackIconBg,
                        {
                            paddingRight: YITU.space_2,
                            justifyContent: "flex-end"
                        }]}>
                        {rightTitle ? <TouchableOpacity
                            style={styles.navRight}
                            activeOpacity={1}
                            onPress={() => {
                                cb && cb(2);
                            }}>
                            <Animated.Text style={[styles.navRightText, {
                                color: colorRight,
                            }]}>{rightTitle || "设置"}</Animated.Text>
                        </TouchableOpacity> : null}

                        {rightArr ? this.createItem(rightArr || [], bgOpacity) : null}
                    </View>
                </View>
            </View>);
    }

    createItem(arr, bgOpacity) {
        return arr.map((item, index) => {
            return (<TouchableOpacity
                key={index}
                onPress={() => {
                    item.onPress && item.onPress();
                }}>
                <ImageBackground
                    resizeMode={"contain"}
                    style={styles.navBackIcon}
                    source={item.defIcon}>
                    <Animated.View style={{opacity: bgOpacity}}>
                        <Image resizeMode={"contain"}
                               style={[styles.navBackIcon, {marginLeft: 0, marginRight: 0}]}
                               source={item.selIcon}/>
                    </Animated.View>
                </ImageBackground>
            </TouchableOpacity>);
        });
    }

}

module.exports = AniNavHead;

const styles = StyleSheet.create({
    navCell: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        paddingTop: YITU.barStateHeight,
        height: YITU.BAR_HEIGHT + YITU.barStateHeight,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'white',
        borderStyle: "solid",
        borderBottomColor: YITU.backgroundColor_Line,
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    navBackIconBg: {
        width: 70,
        flexDirection: "row",
        alignItems: "center",
    },
    navBackIcon: {
        width: YITU.d_icon,
        height: YITU.d_icon,
        alignSelf: 'center',
        marginRight: YITU.space_0,
    },
    navTitleBg: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center"
    },
    navTitle: {
        fontSize: YITU.fontSize_7,
        color: "#fff",
        fontFamily: YITU.fontName_regular,
        fontWeight: "bold",
        textAlign: "center",
    },
    navRight: {
        backgroundColor: "transparent",
        height: YITU.BACKIMG_SIZE,
        justifyContent: "center",
        width: 70,
    },
    navRightText: {
        paddingRight: YITU.space_5,
        textAlign: "right",
        fontSize: YITU.fontSize_4,
    },
});
