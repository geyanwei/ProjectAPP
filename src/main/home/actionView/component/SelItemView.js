import React, {Component, PropTypes} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';

class SelItemView extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            index: 0,
            isTop: false
        });
    }

    render() {
        let {cb} = this.props;
        return (<View style={styles.main}>
            <View style={{
                flexDirection: "row",
                paddingVertical: YITU.space_2,
                borderColor: YITU.backgroundColor_Line,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderStyle: "solid",
            }}>
                {this.createItem(cb)}
            </View>
        </View>);
    }

    createItem(cb) {
        return ["综合排序", "销量优先"].map((item, index) => {
            return (<TouchableOpacity
                key={index}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    borderColor: YITU.backgroundColor_Line,
                    borderRightWidth: index === 0 ? StyleSheet.hairlineWidth : 0,
                    borderStyle: "solid",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => {
                    this.setState({
                        index: index,
                        isTop: this.state.index === 1 ? false : !this.state.isTop
                    }, () => {
                        cb && cb(index);
                    });
                }}>
                <Text style={{
                    paddingVertical: YITU.space_0,
                    color: this.state.index === index ? YITU.textColor_4 : YITU.textColor_1
                }}>{item}</Text>

                {index === 0 ?
                    <Image
                        style={{
                            marginLeft: YITU.space_5, width: 15, height: 15
                        }}
                        source={this.state.index === 0 ?
                            (this.state.isTop ?
                                    require("../image/blue_top.png") :
                                    require("../image/blue_bottom.png")
                            ) : require("../image/black_bottom.png")}
                    /> : null}
            </TouchableOpacity>);
        });
    }
}

module.exports = SelItemView;

const styles = StyleSheet.create({
    main: {
        width: "100%",
        // borderBottomWidth:StyleSheet.hairlineWidth,
        // borderStyle:"solid",
        // borderBottomColor:YITU.backgroundColor_Line,
    },


    title: {
        alignSelf: "center",
        marginRight: YITU.space_5,
        color: YITU.textColor_4,
        fontSize: YITU.fontSize_3,
        maxWidth: 40
    },
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: YITU.backgroundColor_0,
        paddingHorizontal: YITU.space_5,
        paddingVertical: YITU.space_1,
        alignItems: "center",
        borderRadius: YITU.radius_2,
    },

    search_icon: {
        width: YITU.d_icon_small,
        height: YITU.d_icon_small,
        marginRight: YITU.space_2,
    },
    searchInput: {
        flex: 1,
        color: YITU.textColor_5,
        fontSize: YITU.fontSize_4
    },
});
