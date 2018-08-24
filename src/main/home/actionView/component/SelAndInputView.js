import React, {Component, PropTypes} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';

class SelAndInputView extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            city: props.city
        });
    }

    setTitle(city) {
        this.setState({
            city: city,
        });
    }

    render() {
        let {placeholder, cb} = this.props;
        let {city} = this.state;
        return (<View style={styles.searchBg}>
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    width: 80,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onPress={() => {
                    cb && cb(this, "选择城市");
                }}>
                <Text numberOfLines={1}
                      ellipsizeMode={"middle"}
                      style={styles.city}>{city}</Text>
            </TouchableOpacity>

            <View style={{
                alignSelf: "center",
                marginHorizontal: YITU.space_0,
                height: 25,
                width: 1,
                backgroundColor: YITU.backgroundColor_Line
            }}/>

            <View style={styles.search}>
                <Image style={styles.search_icon}
                       source={require("../../../../image/user/icon_search.png")}/>
                <TextInput style={styles.searchInput}
                           placeholder={placeholder}
                />
            </View>
        </View>);
    }
}

module.exports = SelAndInputView;
const styles = StyleSheet.create({
    searchBg: {
        marginVertical: YITU.space_1,
        marginHorizontal: YITU.space_5,
        borderRadius: YITU.radius_2,
        flexDirection: "row",
        backgroundColor: YITU.backgroundColor_0,
        padding: YITU.space_0,
        // borderBottomWidth:StyleSheet.hairlineWidth,
        // borderStyle:"solid",
        // borderBottomColor:YITU.backgroundColor_Line,
    },
    city: {
        alignSelf: "center",
        color: YITU.textColor_0,
        fontSize: YITU.fontSize_5,
    },

    search: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: YITU.backgroundColor_0,
        paddingVertical: YITU.space_1,
        alignItems: "center",
    },

    search_icon: {
        width: YITU.d_icon_small,
        height: YITU.d_icon_small,
        marginRight: YITU.space_2,
    },
    searchInput: {
        flex: 1,
        color: YITU.textColor_0,
        fontSize: YITU.fontSize_4
    },
});
