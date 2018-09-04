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
import HttpTool from "../../http/HttpTool";
import APIGYW from "../../http/APIGYW.js";
import {PageView, LayoutBox, Toast, ModalBox, Loading, navigation} from "myapplib";

class InviteFriend extends Component {

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

    render() {
        let view = (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps={"handled"}>

                </ScrollView>
            </View>
        );

        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    pageLoading: false,
                    navBack: () => {
                        navigation.pop(this);
                    }
                })}>
                {view}
            </PageView>
        );
    }
}
module.exports = InviteFriend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1
    }
});
