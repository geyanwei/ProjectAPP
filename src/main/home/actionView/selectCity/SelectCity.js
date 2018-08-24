import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import {PageView, Toast, navigation} from 'myapplib';
import MyEditSectionList from '../../../../component/SectionList/MyEditSetionList';
import SelectCell from '../../../../component/SelectCell';

const SECTIONHEIGHT = 25; //列表标题高度
const ROWHEIGHT = 55; //cell高度
const SEARCH_HEIGHT = 64; //搜索框高度
const CHOOSECONTINER_HEIGHT = 55; //已选择城市容器高度

import HttpTool from '../../../../http/HttpTool';
import APIPZP from '../../../../http/APIPZP';
import ServerCell from './component/ServerCell';
import SearchInput from './component/SearchInput';

class SelectCity extends Component {

    static defaultProps = {
        single: false,
        callBack: undefined,//回调函数,页面回跳又本页面处理,
        params: {},//传递给下个页面的参数对象
        path: ""//页面名称
    };

    constructor(props) {
        super(props);
        this.state = {
            countryList: [], //城市列表
            isSearch: false,
            searchList: [], //搜索列表
            searchLoading: false,
        };
        this.refList = [];
        this.searchTime = 150;
        this.refresh = true;
    }

    componentDidMount() {
        this.httpGetData()
    }

    componentWillUnmount() {
        if (this.timeoutSearch) {
            clearTimeout(this.timeoutSearch);
            this.timeoutSearch = undefined;
        }
    }

    /**
     * 获取国家列表
     */
    httpGetData() {
        let param = {
            countryType: 0,
        };

        let successCallback = (code, message, json, option) => {
            let newArray = json;

            PageView.clearLoading(this.pageView, () => {
                this.setState({
                    countryList: newArray,
                }, () => {
                    //默认显示白色
                    this.refList && this.refList[0].showClick(true);
                })
            })

        };
        let failCallback = (code, message) => {
            PageView.clearLoading(this.pageView);
            PageView.toError(this.pageView, message)
        };

        HttpTool.post(APIPZP.base_basedata_dataapi_areas_search, successCallback, failCallback, param);
    }

    /**
     * 恢复数据用，恢复城市数量
     * @param item
     */
    showCountryId(item, type) {
        if (item) {
            for (let index in this.state.countryList) {
                if (this.state.countryList[index].id === item.countryId) {
                    if (this.refList && this.refList[index]) {
                        if (type) {
                            this.refList && this.refList[index].showNo(1);
                        } else {
                            this.refList && this.refList[index].showNo(-1);
                        }

                    }
                }
            }
        }
    }

    /**
     * 点击城市列表
     * @param data
     */
    clickCityItem(data) {
        navigation.pop(this, () => {
            if (this.props.callBack) {
                this.props.callBack(data);
            }
        });
    }

    /**
     * 国家列表cell
     * @param data
     * @returns {XML}
     */
    renderListRow(data) {
        return (
            <ServerCell
                ref={(ref) => {
                    this.refList.push(ref);
                }}
                ROWHEIGHT={ROWHEIGHT}
                data={data}
                callBack={(data) => {
                    this.clickCityItem(data);
                }}/>
        )
    }

    /**
     * 列头
     * @param sectionData
     * @param sectionID
     * @returns {XML}
     */
    renderListSectionHeader(sectionData, sectionID) {
        return (
            <View style={{
                width: '100%',
                height:SECTIONHEIGHT,
                backgroundColor: YITU.backgroundColor_5,
            }}>
                <View style={{
                    paddingLeft: YITU.space_5,
                    borderBottomWidth:StyleSheet.hairlineWidth,
                    borderTopWidth:StyleSheet.hairlineWidth,
                    borderColor:YITU.backgroundColor_Line
                }}>
                    <Text style={{paddingTop:5,fontSize: 16}}>{sectionData}</Text>
                </View>

            </View>
        );
    }


    renderCell(item, index, isSearch = false) {
        let title = item.name || "";
        let detail = item.enName || "";
        let title2 = "";
        let detail2 = "";
        if (isSearch) {
            title2 = item.enName || "";
            detail = item.country || "";
            detail2 = item.countryEnName;
        }
        return (
            <SelectCell
                key={index}
                onPress={() => {
                    this.clickCityItem(item);
                }}>
                <View style={{
                    paddingVertical: YITU.space_5,
                    marginLeft:YITU.space_5,
                    justifyContent: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: YITU.backgroundColor_Line,
                }}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={[{
                            fontSize: YITU.fontSize_5,
                            color: YITU.textColor_1
                        }]}>{title2 ? (title + " " + title2) : (title)}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={[{
                            fontSize: YITU.fontSize_3,
                            color: YITU.textColor_2,
                            marginTop: 5
                        }]}>{detail2 ? (detail + " " + detail2) : (detail)}
                    </Text>
                </View>
            </SelectCell>
        )
    }

    /**
     * 判断城市是否已经选择
     * @param array
     * @param obj
     * @param type
     * @returns {number}
     */
    cityInArray(array, obj, type) {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == obj.id) {
                index = i;
                break;
            }
        }
        return index;
    }

    /**
     * 搜索界面
     * @returns {XML}
     */
    renderSearchList() {
        let search = (
            <FlatList
                data={this.state.searchList}
                style={{flex: 1, backgroundColor: '#fff'}}
                renderItem={({item, index}) => {
                    if (item) {
                        return this.renderCell(item, index, true)
                    } else {
                        return null
                    }
                }}
                keyboardShouldPersistTaps={"handled"}
                ListEmptyComponent={() => {
                    return (
                        <View style={{flex: 1, alignItems: 'center', paddingTop: "20%"}}>
                            <Image style={{width: 173 / 2, height: 150 / 2}}
                                   source={require("../../../../image/login/cityServer_empty.png")}/>
                            <Text style={{
                                marginTop: YITU.space_5,
                                color: YITU.textColor_2,
                                fontSize: YITU.fontSize_4
                            }}>{"很抱歉，没有找到相关城市"}</Text>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => {
                    return index;
                }}
            />
        );

        let Loading = (
            <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size={"large"}
                />
            </View>
        );
        return this.state.searchLoading ? Loading : search;
    }

    search(isSearch, searchLoading, value) {
        if (isSearch !== this.state.isSearch || searchLoading !== this.state.searchLoading) {
            this.setState({
                isSearch: isSearch,
                searchLoading: searchLoading
            }, () => {
                this.searchDetail(isSearch, value)
            });
        } else {
            this.searchDetail(isSearch, value)
        }

    }

    searchDetail(isSearch, value) {
        if (value && isSearch) {
            if (this.timeoutSearch) {
                clearTimeout(this.timeoutSearch);
                this.timeoutSearch = undefined;
                this.refresh = false;
            }
            this.timeoutSearch = setTimeout(() => {
                this.httpSearchCity(value);
            }, this.searchTime);
        }
    }

    /**
     * 模糊匹配城市
     */
    httpSearchCity(value) {
        this.refresh = true;
        let param = {
            countryType: 0,
            keyword: value
        };

        let successCallback = (code, message, json, option) => {
            if (this.refresh) {
                this.setState({
                    searchList: json,
                    searchLoading: false
                });
            }
        };
        let failCallback = (code, message) => {
            this.setState({
                searchList: [],
                searchLoading: false
            });
        };
        HttpTool.post(APIPZP.base_basedata_dataapi_areas_search_cities, successCallback, failCallback, param);
    }


    /**
     * 输入框
     * @returns {XML}
     */
    renderSearchInput() {
        return (
            <SearchInput
                SEARCH_HEIGHT={SEARCH_HEIGHT}
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
                    this.search(isSearch, searchLoading, value);
                }}
            />
        )
    }

    render() {
        let {isSearch} = this.state;
        let main = (
            <View style={styles.main}>
                <ScrollView
                    contentContainerStyle={{flex: 1}}
                    keyboardShouldPersistTaps={"handled"}
                    scrollEnabled={false}>
                    {this.renderSearchInput()}

                    <View style={{flex: 1}}>
                        <MyEditSectionList
                            allCityList={this.state.countryList}
                            renderListRow={this.renderListRow.bind(this)}
                            renderListSectionHeader={this.renderListSectionHeader.bind(this)}
                            extralTopHeight={(this.props.single ? 0 : CHOOSECONTINER_HEIGHT) + SEARCH_HEIGHT}
                            SECTIONHEIGHT={SECTIONHEIGHT}
                            ROWHEIGHT={ROWHEIGHT}
                        />
                        {isSearch ?
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    width: "100%"
                                }}>{this.renderSearchList()}
                            </View> : null}
                    </View>
                </ScrollView>
            </View>
        );
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    navBack: () => {
                        navigation.pop(this,);
                    },
                    autoCloseLoading: false,
                    pageLoading: true,
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
}

module.exports = SelectCity;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
});
