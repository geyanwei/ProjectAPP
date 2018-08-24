import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TextInput,
    TouchableOpacity,

} from 'react-native';

import AddressCell from '../../../center/cell/AddressCell.js'
import SelectCell from '../../../../component/SelectCell.js';
import {PageView, navigation, Toast, Loading} from "myapplib";
import Httptool from '../../../../http/HttpTool.js';
import SearchItem from "../../../../component/SearchItem.js"

class PositionLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            empty: true,
            dataAry: [],
            isSearch: false,
        }
    }

    getItem(ary) {
        return ary.map((item, index) => {
            return (<SelectCell
                key={index}
                onPress={() => {
                    navigation.pop(this, () => {
                        if (this.props.callBack) {
                            this.props.callBack(item);
                        }
                    });
                }}>
                <AddressCell data={item}/>
                <View style={styles.line}/>
            </SelectCell>)

        })
    }

    getData(str) {
        if (str === "") {
            return;
        }
        let data = {
            keyword: str,
        };
        Loading.show("搜索中");
        let success = (code, message, json) => {
            Loading.hide();
            let ary = json.addressList || [{
                name: "杭州市",
                address: "中国浙江省杭州市"
            }];
            if (ary.length > 0) {
                this.setState({
                    empty: false,
                    dataAry: ary,
                    isSearch: false,
                })
            } else {
                this.setState({
                    empty: true,
                    isSearch: true,
                });
            }
        };
        let error = (code, message) => {
            Loading.hide();
            this.setState({
                isSearch: true,
            });
            Toast.show(message);
        };
        // Httptool.post("/common/manage/PublicService/getAddressListByKeyword", success, error, data);

        setTimeout(() => {
            Loading.hide();
            let ary = [{
                name: "杭州市",
                address: "中国浙江省杭州市"
            }];
            if (ary.length > 0) {
                this.setState({
                    empty: false,
                    dataAry: ary,
                    isSearch: false,
                })
            } else {
                this.setState({
                    empty: true,
                    isSearch: true,
                });
            }
        }, 1500);
    }

    render() {
        let {empty, isSearch, dataAry} = this.state;
        let main = (
            <View style={styles.main}>
                <SearchItem
                    placeholder={"请输入目的地址"}
                    returnKeyType={'search'}
                    onSubmitEditing={() => {
                        this.getData(this.state.value);
                    }}
                    cb={(val) => {
                        this.setState({
                            value: val,
                            empty: !(val.length > 0),
                            isSearch: !(val.length > 0)
                        })
                    }}/>
                <View style={styles.line}/>

                {!empty ?
                    <ScrollView keyboardDismissMode={"on-drag"}>
                        {this.getItem(dataAry || [])}
                    </ScrollView> :
                    <View style={{alignSelf: 'center', justifyContent: 'center', height: '40%'}}>
                        <Image style={{width: 75, height: 75, alignSelf: 'center'}}
                               resizeMode={"contain"}
                               source={
                                   !isSearch ?
                                       require('../../../../image/user/address.png') :
                                       require('../../../../image/user/null-Search.png')}/>
                        <Text style={[styles.content, {marginTop: YITU.space_0}]}>
                            {
                                !isSearch ? "请搜索目的地址   " : "很抱歉, 没有找到相关地址"
                            }
                        </Text>
                    </View>}
            </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    // refresh:this.getData(this.state.value)
                })}>
                {main}
            </PageView>
        );

    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    content: {
        color: YITU.textColor_2,
        fontFamily: YITU.fontName_regular,
        fontSize: YITU.fontSize_3,
        marginLeft: YITU.space_5,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: YITU.backgroundColor_Line,
    }
});

module.exports = PositionLocation;
