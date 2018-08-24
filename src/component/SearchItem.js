import React, {Component, PropTypes} from 'react';
import {View, Image, StyleSheet, TextInput} from 'react-native';

class SearchItem extends Component {
    //默认属性
    static defaultProps = {
        maxLength: 20,
        underlineColorAndroid: "transparent",
        placeholderTextColor: YITU.textColor_5,
        clearButtonMode:"while-editing"
    };


    constructor(props) {
        super(props);
    }

    render() {
        let {cb} = this.props;
        return (<View style={styles.searchBg}>
            <View style={styles.search}>
                <Image style={styles.search_icon}
                       source={require("../image/user/icon_search.png")}/>
                <TextInput
                    style={styles.searchInput}
                    textAlignVertical={'center'}
                    {...this.props}
                    onChangeText={(text) => {
                        cb && cb(text);
                    }}
                />
            </View>
        </View>);
    }
}

module.exports = SearchItem;
const styles = StyleSheet.create({
    searchBg: {
        flexDirection: "row",
        backgroundColor: YITU.c_bg_white,
        paddingHorizontal: YITU.space_6,
        paddingVertical: YITU.space_2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: YITU.backgroundColor_Line,
        borderStyle: "solid",
    },
    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: YITU.backgroundColor_2,
        paddingLeft: YITU.space_5,
        paddingRight: 3,
        paddingVertical: YITU.space_0,
        alignItems: "center",
        borderRadius: YITU.radius_2
    },

    search_icon: {
        width: YITU.d_icon_small,
        height: YITU.d_icon_small,
        marginRight: YITU.space_2,
    },
    searchInput: {
        flex: 1,
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_5,
    },
});
