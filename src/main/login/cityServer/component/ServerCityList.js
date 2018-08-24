import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text, ActivityIndicator
} from 'react-native';
import HttpTool from '../../../../http/HttpTool';
import APIPZP from '../../../../http/APIPZP';
import {Toast} from 'myapplib';

class ServerCityList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            cityList: [],
        }
    }

    componentDidMount() {

    }

    httpGetCityList(id) {
        let param = {
            countryId: id
        };

        let successCallback = (code, message, json, option) => {
            this.setState({
                cityList: json,
                showLoading: false,
            });
        };
        let failCallback = (code, message) => {
            this.setState({
                showLoading: false,
            }, () => {
                Toast.show("获取失败");
            });
        };

        HttpTool.post(APIPZP.base_basedata_dataapi_areas_search_cities, successCallback, failCallback, param);
    }

    renderLoading() {
        return (
            <View style={{flex: 1, backgroundColor: "#fff", justifyContent: 'center', alignItems: "center"}}>
                <ActivityIndicator
                    size={"large"}
                />
            </View>
        )
    }

    showCity(id) {
        this.setState({
            showLoading: true,
        }, () => {
            this.httpGetCityList(id)
        })
    }

    renderCityList() {
        let cityList = this.state.cityList;
        return (
            <ScrollView keyboardShouldPersistTaps={"handled"}>
                {
                    cityList && cityList.length > 0 && cityList.map((item, index) => {
                        if (item) {
                            return this.props.renderCell(item, index)
                        }
                    })
                }
            </ScrollView>
        )
    }

    render() {
        let main = this.state.showLoading ?
            this.renderLoading() : this.renderCityList();
        return main;
    }

}

const styles = StyleSheet.create({});

module.exports = ServerCityList;