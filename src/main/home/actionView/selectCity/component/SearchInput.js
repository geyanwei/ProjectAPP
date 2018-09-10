import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import {PageView} from "myapplib";

class SearchInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
        }
    }

    componentDidMount() {

    }


    render() {
        let {placeholder} = this.props;
        return (
            <View style={{
                backgroundColor: YITU.backgroundColor_1,
                height: 64,
                justifyContent: 'center',
            }}>
                <View
                    style={styles.textInputView}>
                    <Image style={{width: 17, height: 17, marginRight: YITU.space_0}}
                           source={require("../../../../../image/login/search.png")}/>
                    <TextInput multiline={false} style={[styles.textInputStyle,]}
                               underlineColorAndroid={"transparent"}
                               placeholder={placeholder || "搜索城市"}
                               value={this.state.value}
                               onChangeText={(text) => {
                                   this.setState({
                                       value: text,
                                   }, () => {
                                       let isSearch = text.length > 0;
                                       let searchLoading = true;
                                       this.props.search(isSearch, searchLoading, this.state.value);
                                   })
                               }}
                               placeholderTextColor={"rgb(150,150,150)"}
                               selectionColor={"rgb(63,94,229)"}
                               showsVerticalScrollIndicator={false}
                    />
                    {
                        this.state.value && this.state.value.length > 0 ?
                            <TouchableOpacity
                                style={{padding: YITU.space_2}}
                                onPress={() => {
                                    this.setState({
                                        value: "",
                                    }, () => {
                                        let isSearch = false;
                                        let searchLoading = false;
                                        this.props.closeSearch(isSearch, searchLoading);
                                    })
                                }}>
                                <Image style={{width: YITU.d_icon_small, height: YITU.d_icon_small}}
                                       source={require("../../../../../image/user/icon_delete.png")}/>
                            </TouchableOpacity> : null
                    }
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    textInputView: {
        backgroundColor: YITU.backgroundColor_0,
        borderRadius: YITU.radius_1,
        padding: YITU.space_2,
        marginHorizontal: YITU.space_3,
        height: 40,
        flexDirection: "row",
        alignItems: 'center'
    },
    textInputStyle: {
        // 设置尺寸
        fontSize: YITU.fontSize_15,
        padding: 0,
        height: YITU.d_head,
        flex: 1,
        color: YITU.textColor_1
    },
});

module.exports = SearchInput;