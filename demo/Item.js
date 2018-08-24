/**
 * Sample React Native TestComList
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';



export default class Item extends Component {
    render() {

        let bg = "#666666",title = "（点我）"
        switch (this.props.state) {
            case 0:
                bg = "#9c9c9c"
                title= "（未开发）"
                break;
            case 1:
                bg = "#0d9c13"
                title= "（完成）"
                break;
            case 2:
                bg = "#ff8919"
                title= "（努力成狗中）"
                break;
        }
        return (
            <TouchableOpacity style={{width: "100%"}}
                              {...this.props}
            >
                <Text style={[styles.item, {backgroundColor: bg}]}
                >
                    {this.props.title+title}
                </Text>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f00",
        width: "100%",
        textAlign: "center",
        fontSize: 14,
        padding: 10,
        color: "#fff",
        fontWeight: "bold",


    },
});
