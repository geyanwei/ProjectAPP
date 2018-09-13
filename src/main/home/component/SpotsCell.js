import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

class SpotsCell extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {data, cb} = this.props;
        return (<TouchableOpacity
            style={{margin: YITU.space_0}}
            activeOpacity={0.8}
            onPress={() => {
                cb && cb(data);
            }}>
            <ImageBackground
                resizeMode={"cover"}
                style={{
                    width: YITU.screenWidth - 2 * YITU.space_2,
                    height: (YITU.screenWidth - 2 * YITU.space_2) * 0.4,
                    alignItems: "center",
                    borderRadius: YITU.radius_1,
                    overflow: "hidden",
                }}
                defaultSource={data.defaultSource}
                source={data.imgUrl?{uri:data.imgUrl}:data.images}>
                <Text style={{
                    marginTop:(YITU.screenWidth - 2 * YITU.space_2) * 0.12,
                    backgroundColor: "transparent",
                    color: YITU.c_title_white,
                    fontSize: YITU.fontSize_6
                }}>{data.title}</Text>
            </ImageBackground>
        </TouchableOpacity>);
    }
}

module.exports = SpotsCell;

const styles = StyleSheet.create({

});

