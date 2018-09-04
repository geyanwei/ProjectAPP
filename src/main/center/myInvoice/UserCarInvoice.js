import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';
import HttpTool from "../../../http/HttpTool";
import APIGYW from "../../../http/APIGYW.js";
import {PageView, navigation} from "myapplib";

class UserCarInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
        };
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {

    }

    navBack() {
        navigation.pop(this,);
    }


    render() {
        let view = (<ScrollView
            style={styles.container}
            keyboardShouldPersistTaps={"handled"}>

        </ScrollView>);
        return (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                navBack: this.navBack.bind(this),
                pageLoading: false,
            })}>
            {view}
        </PageView>);
    }
}

module.exports = UserCarInvoice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    }
});
