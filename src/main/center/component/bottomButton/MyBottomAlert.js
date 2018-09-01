import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';
import {ModalBox} from "myapplib";

class MyBottomAlert extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    show(title, array) {
        let cb = ModalBox.showEditModal({
            type: "bottom",
            view: (
                <View style={{marginBottom: YITU.IPHONEX_BOTTOM}}>
                    <View style={{margin: YITU.space_2, marginBottom: 0, borderRadius: 10, overflow: "hidden"}}>
                        {
                            title ?
                                <View style={{
                                    height: 56,
                                    backgroundColor: YITU.backgroundColor_0,
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    borderBottomColor: YITU.backgroundColor_Line,
                                    borderBottomWidth: StyleSheet.hairlineWidth
                                }}>
                                    <Text style={{fontSize: YITU.fontSize_5, color: YITU.textColor_2}}>{title}</Text>
                                </View> : null
                        }
                        {
                            array && array.map((item, index) => {
                                return (
                                    <TouchableHighlight
                                        key={index}
                                        activeOpacity={0.7}
                                        underlayColor={YITU.backgroundColor_Line}
                                        onPress={() => {
                                            cb.close && cb.close(
                                                () => {
                                                    item.callBack && item.callBack();
                                                });
                                        }}>
                                        <View style={[{
                                            height: 56,
                                            backgroundColor: YITU.backgroundColor_0,
                                            justifyContent: "center",
                                            alignItems: 'center',

                                        }, index !== 0 ? {
                                            borderTopWidth: StyleSheet.hairlineWidth,
                                            borderColor: YITU.backgroundColor_Line
                                        } : {}]}>
                                            <Text style={[{
                                                fontSize: YITU.fontSize_7,
                                                color: YITU.backgroundColor_3
                                            }, index !== 0 ? {color: YITU.textColor_1} : null]}>{item.title}</Text>
                                        </View>
                                    </TouchableHighlight>);
                            })
                        }
                    </View>

                    <View style={{margin: YITU.space_2, borderRadius: YITU.space_2, overflow: "hidden"}}>
                        <TouchableHighlight
                            activeOpacity={0.7}
                            underlayColor={YITU.backgroundColor_Line}
                            onPress={() => {
                                cb.close && cb.close(
                                    () => {
                                        this.props.closeCallBack && this.props.closeCallBack();
                                    });
                            }}>
                            <View style={{
                                height: 56,
                                backgroundColor: YITU.backgroundColor_0,
                                justifyContent: "center",
                                alignItems: 'center',
                            }}>
                                <Text style={{fontSize: YITU.fontSize_8, color: YITU.backgroundColor_3}}>{"取消"}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>)
        });
    }

    render() {
        return null;
    }

}

module.exports = MyBottomAlert;