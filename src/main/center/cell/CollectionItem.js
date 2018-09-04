import React, {Component, Props} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import {navigation} from "myapplib";
import SelectCell from "../../../component/SelectCell.js"

class CollectionItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data,obj,onRefresh} = this.props;
        let view = (<SelectCell
                style={{
                    backgroundColor: YITU.backgroundColor_0,
                }}
                onPress={() => {
                    obj&&navigation.push(obj,"SpotsDetails",{
                        callBack:()=>{
                            onRefresh&&onRefresh();
                        }
                    });
                }}>
                <View style={styles.cell}>
                    <View style={styles.row}>
                        <Image resizeMode={"cover"}
                               style={styles.image}
                               source={data.image ? {uri: data.image} : require('../../../image/userIcon/grzx-user.png')}/>
                        <View style={styles.content}>
                            <Text numberOfLines={1}
                                  ellipsizeMode={"tail"}
                                  style={styles.country}>{data.country + " " + data.city}</Text>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={3}
                                      ellipsizeMode={"tail"}
                                      style={styles.desc}>{data.desc}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SelectCell>);
        return view;
    }
}

module.exports = CollectionItem;

const styles = StyleSheet.create({
    cell: {
        width: "100%",
        paddingLeft: YITU.space_5,
    },
    row: {
        flexDirection: 'row',
        height: 100,
        paddingVertical: YITU.space_5,
        paddingRight: YITU.space_5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: YITU.backgroundColor_Line
    },
    image: {
        width: "25%",
    },
    content: {
        flex: 1,
        marginLeft: YITU.space_5,
    },
    country: {
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_5
    },
    desc: {
        color: YITU.textColor_2,
        marginTop: YITU.space_1,
        fontSize: YITU.fontSize_2
    }
});

