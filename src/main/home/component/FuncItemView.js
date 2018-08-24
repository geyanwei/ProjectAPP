import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
} from 'react-native';
import SelectCell from '../../../component/SelectCell.js';

const itemPlace = (YITU.screenWidth - 8 * YITU.space_0) / 3;

class FuncItemView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {item, cb} = this.props;
        return (<SelectCell
                style={{
                    margin: YITU.space_0,
                    backgroundColor: YITU.backgroundColor_1,
                    borderRadius: YITU.radius_1,
                }}
                onPress={() => {
                    cb && cb(item);
                }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: itemPlace,
                    height: 35,
                    paddingHorizontal: YITU.space_5
                }}>
                    <Image resizeMode={"contain"} style={{width: 25, height: 25}} source={item.icon}/>
                    <Text style={{
                        flex: 1,
                        fontSize: YITU.fontSize_3,
                        color: YITU.textColor_4,
                        textAlign: "center"
                    }}>{item.title}</Text>
                </View>

                <View/>
            </SelectCell>
        );
    }
}

module.exports = FuncItemView;

const styles = StyleSheet.create({});

