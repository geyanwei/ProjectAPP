import React, {Component, PropTypes} from 'react';
import {View, Image, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';

class SearchItem extends Component {
    //默认属性
    static defaultProps = {
        maxLength: 20,
        underlineColorAndroid: "transparent",
        placeholderTextColor: YITU.textColor_5,
        clearButtonMode: "while-editing"
    };


    constructor(props) {
        super(props);
        this.state={
            value:"",
            isFocus:false
        }
    }


    render() {
        let {cb, quitOnPress} = this.props;
        let {value,isFocus} = this.state;
        return (<View style={styles.searchBg}>
            <View style={styles.search}>
                <Image style={styles.search_icon}
                       source={require("../image/user/icon_search.png")}/>
                <TextInput
                    ref={(a)=>this.input = a}
                    style={styles.searchInput}
                    textAlignVertical={'center'}
                    {...this.props}
                    value={value}
                    onFocus={() => {
                        this.setState({isFocus: true});
                    }}
                    onBlur={() => {
                        // this.setState({isFocus: false});
                    }}

                    onChangeText={(text) => {
                        this.setState({
                            value:text,
                        });
                        cb && cb(text);
                    }}
                />
            </View>
            {quitOnPress&&isFocus ? <TouchableOpacity
                onPress={() => {
                    this.input.blur();
                    this.setState({
                        isFocus: false,
                        value:""
                    });
                    quitOnPress && quitOnPress();
                }}
                style={{marginLeft: YITU.space_2, alignItems: "center"}}>
                <Text style={{color: YITU.textColor_1, fontSize: YITU.fontSize_4}}>取消</Text>
            </TouchableOpacity> : null}
        </View>);
    }
}

module.exports = SearchItem;
const styles = StyleSheet.create({
    searchBg: {
        flexDirection: "row",
        height:50,
        width:"100%",
        backgroundColor: YITU.c_bg_white,
        paddingHorizontal: YITU.space_6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: YITU.backgroundColor_Line,
        borderStyle: "solid",
        alignItems: "center"
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
