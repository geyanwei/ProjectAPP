import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Platform
} from 'react-native';
import {PageView, navigation, Toast, Loading, EmptyView, ModalBox} from "myapplib";
import HttpTool from '../../../http/HttpTool.js';
import APIPZP from '../../../http/APIPZP';
import ScrollAniPage from './ScrollAniPage';
import GuiderModuleView from "../component/GuiderModuleView.js";
class TripDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            update: 0
        };
        //订单id
        this.trip_id = this.props.id;
        this.backRefresh = false;
    }


    componentDidMount() {
        this.httpGetMessage()
    }

    componentWillUnmount() {
        if (this.backRefresh && this.props.callBack) {
            this.props.callBack();
        }
    }

    renderErrorPage() {
        PageView.toError(this.pageView);
    }

    /**
     * 网络请求
     */
    httpGetMessage() {
        if (!this.trip_id) {
            this.renderErrorPage();
            return;
        }
        //参数
        let param = {
            acceptId: this.trip_id,
        };
        let successCallback = (code, message, json, option) => {
            if (!json) {
                this.renderErrorPage();
            } else {
                this.orderMessage = json;
                GuiderModuleView.show();
                PageView.clearLoading(this.pageView, () => {
                    this.setState({
                        isShow: true
                    })
                });

            }
        };

        let failCallback = (code, message, option) => {
            this.setState({
                isShow: false
            }, () => {
                PageView.clearLoading(this.pageView);
                this.renderErrorPage();
            });

        };
        HttpTool.post(APIPZP.travel_app_trip_tripServiceDetail, successCallback, failCallback, param);

    }

    changeBarStatus(type) {
        let content = "light-content";
        if (type) {
            content = "dark-content";
        }
        if(Platform.OS === "ios"){
            StatusBar.setBarStyle(content, true);
        }
    }

    render() {
        let main = (
            <View style={styles.main}>
                {
                    this.state.isShow ?
                        <ScrollAniPage changeBarStatus={(type) => this.changeBarStatus(type)} orderMessage={this.orderMessage} obj={this} /> : null
                }
            </View>
        );
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    full: true,
                    refresh: () => {
                        PageView.toLoading(this.pageView);
                        this.httpGetMessage();
                    },
                    pageLoading: true,
                    errorTitle: this.props.title || "订单详情",
                    back: () => {
                        navigation.pop(this)
                    },
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
    textInput: {
        marginTop: YITU.space_5,
        padding: YITU.space_2,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ddd",
        maxHeight: 100,
        textAlign: "left"
    }
});

module.exports = TripDetail;
