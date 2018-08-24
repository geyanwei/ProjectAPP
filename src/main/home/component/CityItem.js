import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const itemCityWidth = (YITU.screenWidth - 8 * YITU.space_0) / 3;

class CityItem extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {item, cb} = this.props;
        return (<TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                cb && cb(item);
            }}
            style={{
                margin: YITU.space_0,
                width: itemCityWidth,
                height: itemCityWidth * 0.504 + (YITU.space_0 + 15) * 2
            }}>
            <View style={{
                width: itemCityWidth,
                height: itemCityWidth * 0.504,
                borderRadius: YITU.radius_1,
                overflow: "hidden"
            }}>
                <Image
                    resizeMode={"contain"}
                    style={{
                        width: itemCityWidth,
                        height: itemCityWidth * 0.504,
                        borderRadius: YITU.radius_1
                    }}
                    source={item.images}/>
            </View>

            <Text
                numberOfLines={1}
                ellipsizeMode={"tail"}
                style={{
                    flex: 1,
                    marginTop: YITU.space_0,
                    fontSize: YITU.fontSize_3,
                    color: YITU.textColor_1,
                }}>{item.title}</Text>

            <Text
                numberOfLines={1}
                ellipsizeMode={"tail"}
                style={{
                    flex: 1,
                    marginTop: YITU.space_0,
                    fontSize: YITU.fontSize_3,
                    color: YITU.textColor_2,
                }}>{item.guiders + "名司导"}</Text>
        </TouchableOpacity>);
    }
}

module.exports = CityItem;

const styles = StyleSheet.create({});

