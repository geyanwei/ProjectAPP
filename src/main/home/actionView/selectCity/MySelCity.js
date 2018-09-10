'use strict';
import React, {Component}from 'react';
import {
    View,
    StyleSheet,
    Keyboard,
} from 'react-native';

import CityList from './CityIndexListView';
import {navigation, PageView} from "myapplib";
import SearchInput from './component/SearchInput';


class MySelCity extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let main = (<View style={styles.container}>
            {this.renderSearchInput()}
            <View style={{flex:1}}>
                <CityList pageView = {this.pageView}
                    callBack={(obj)=>{
                    navigation.pop(this,()=>{
                        this.props.callBack(obj);
                    });
                }}/>
            </View>
        </View>);
        return (<PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    navBack: () => {
                        navigation.pop(this,);
                    },
                    autoCloseLoading: false,
                    pageLoading: false,
                    refresh: () => {
                        //刷新
                        PageView.toLoading(this.pageView, () => {
                            this.httpGetData()
                        });
                    }
                })}>
                {main}
            </PageView>
        );
    }

    /**
     * 输入框
     * @returns {XML}
     */
    renderSearchInput() {
        return (
            <SearchInput
                closeSearch={(isSearch, searchLoading) => {
                    if (this.state.isSearch !== isSearch || this.state.searchLoading !== searchLoading) {
                        this.setState({
                            isSearch: isSearch,
                            searchLoading: searchLoading
                        }, () => {
                            Keyboard.dismiss();
                        });
                    }
                }}
                search={(isSearch, searchLoading, value) => {
                    // this.search(isSearch, searchLoading, value);
                }}
            />
        )
    }
}

module.exports = MySelCity;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: YITU.backgroundColor_0,
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    }
});