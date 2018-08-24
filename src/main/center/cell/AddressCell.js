import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';

class AddressCell extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        let main = (
                <View style={styles.main}>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>
                    <Text style={styles.content}>
                        {data.address}
                    </Text>
                </View>
            )
        ;
        return main;
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.c_bg_white,
        padding: YITU.space_5,
        paddingTop: YITU.space_3,
        paddingBottom: YITU.space_3,
    },
    title: {
        color: YITU.textColor_0,
        fontFamily: YITU.fontName_regular,
        fontSize: YITU.fontSize_5,
    },
    content: {
        color: YITU.textColor_2,
        fontFamily: YITU.fontName_regular,
        fontSize: YITU.fontSize_3,
    }
});

module.exports = AddressCell;
