import React, {Component, PropTypes} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';

class SelInputAct extends Component {
    constructor(props) {
        super(props);
        this.state=({
            title:props.title
        });
    }
    setTitle(title){
        this.setState({
            title:title,
        });
    }
    render() {
        let {placeholder, cb} = this.props;
        let {title} = this.state;
        return (<View style={styles.searchBg}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.search}
                onPress={() => {
                    cb&&cb(this,title);
                }}>
                <Image style={styles.search_icon}
                       source={require("../../../../image/user/icon_search.png")}/>
                <Text style={styles.searchInput}>{placeholder}</Text>
            </TouchableOpacity>
        </View>);
    }
}

module.exports = SelInputAct;
const styles = StyleSheet.create({
    searchBg: {
        flexDirection: "row",
        backgroundColor: YITU.backgroundColor_1,
        paddingHorizontal: YITU.space_6,
        paddingVertical: YITU.space_1,
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
