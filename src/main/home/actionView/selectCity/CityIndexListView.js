import React, {Component}from 'react';
import  {
    StyleSheet,
    View,
    WebView,
    Text,
    Platform,
    Alert,
    TouchableOpacity,
    ListView,
    Dimensions,
    ScrollView,
} from 'react-native';

import {PageView, Toast} from "myapplib";
const SECTIONHEIGHT = 25;//列表标题高度
const ROWHEIGHT = 55;//cell高度
var totalheightArr = [];//每个字母对应的城市和字母的总高度

import DATA_JSON from './city-list.json'
import HttpTool from "../../../../http/HttpTool";
import APIPZP from "../../../../http/APIPZP";
import RightList from './CityRightList.js';

const {width, height} = Dimensions.get('window');
const itemWidth = (width-2*10-5*6)/3;
const itemHeight = 40;

class CityIndexListView extends Component {

    constructor(props) {
        super(props);
        let getSectionData = (dataBlob, sectionID) => {
            return sectionID;
        };
        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };
        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
            letters: [],
        };
    }

    _getFirstChar(dataList) {
        let list = [];

        for (let j = 0; j < dataList.length; j++) {
            let firstChar = dataList[j].firstChar.toUpperCase();

            let exist = false;
            for (let xx = 0; xx < list.length; xx++) {
                if (list[xx] === firstChar) {
                    exist = true;
                }
                if (exist) {
                    break;
                }
            }
            if (!exist) {
                list.push(firstChar);
            }
        }
        return list;
    }
    componentDidMount1(){
        let ALL_CITY_LIST = DATA_JSON.allCityList;
        let HOST_CITY_LIST = DATA_JSON.hotCityList;

        let letterList = this._getFirstChar(ALL_CITY_LIST);

        let dataBlob = {};

        ALL_CITY_LIST.map(cityJson=> {
            let key = cityJson.firstChar.toUpperCase();

            if (dataBlob[key]) {
                let subList = dataBlob[key];
                subList.push(cityJson);
            } else {
                let subList = [];
                subList.push(cityJson);
                dataBlob[key] = subList;
            }
        });


        let sectionIDs = Object.keys(dataBlob);
        let rowIDs = sectionIDs.map(sectionID => {
            let thisRow = [];
            let count = dataBlob[sectionID].length;
            for (let ii = 0; ii < count; ii++) {
                thisRow.push(ii);
            }

            var eachheight = SECTIONHEIGHT + ROWHEIGHT * thisRow.length;
            totalheightArr.push(eachheight);

            return thisRow;
        });


        this.setState({
            letters: sectionIDs,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });


        //   Alert.alert('读取list数据', 'sectionIDs.length=>' + sectionIDs.length + ", rowIDs.length=>" + rowIDs.length);
        this.setState({
            letters: letterList,
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
    }

    componentDidMount() {
        let param = {
            countryType: 0,
        };

        let successCallback = (code, message, json, option) => {
            let firstObj = [
                {
                    "firstChar": "#",
                    arr:[
                        {
                            "firstChar": "#",
                            "name": "六安",
                            "enName": "liuan",
                            "id": 4532,
                            "fullname": "安徽/六安",
                        }
                    ]
                }
            ];
            let ALL_CITY_LIST = firstObj.concat(json);
            // let HOST_CITY_LIST = json.hotCityList;

            let letterList = this._getFirstChar(ALL_CITY_LIST);


            let dataBlob = {};

            ALL_CITY_LIST.map(cityJson=> {
                let key = cityJson.firstChar.toUpperCase();

                if (dataBlob[key]) {
                    let subList = dataBlob[key];
                    subList.push(cityJson);
                } else {
                    let subList = [];
                    subList.push(cityJson);
                    dataBlob[key] = subList;
                }
            });

            let sectionIDs = Object.keys(dataBlob);
            let rowIDs = sectionIDs.map(sectionID => {
                let thisRow = [];
                let count = dataBlob[sectionID].length;
                for (let ii = 0; ii < count; ii++) {
                    thisRow.push(ii);
                }
                let firObj = dataBlob[sectionID]||[];
                let rowHeight = ROWHEIGHT;
                if (firObj[0]&&firObj[0].firstChar==="#") {
                    let length = firObj[0].arr&&firObj[0].arr.length>0?firObj[0].arr.length:0;
                    rowHeight = (parseInt(length/3)+(length%3>0?1:0)) *(itemHeight+2*5)+20;

                    this.rowHeight = rowHeight;
                }
                let eachheight = SECTIONHEIGHT + rowHeight * thisRow.length;
                totalheightArr.push(eachheight);

                return thisRow;
            });
            this.setState({
                letters: sectionIDs,
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
            });
            // this.setState({
            //     letters: letterList,
            //     dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
            // });

        };
        let failCallback = (code, message) => {

        };
        HttpTool.post(APIPZP.base_basedata_dataapi_areas_search, successCallback, failCallback, param);
    }

    createHeadItem(arr){
        return arr.map((item,index)=>{
            return (<TouchableOpacity
                key={index}
                style={{
                    margin:5,
                    width:itemWidth,
                    height:itemHeight,
                    backgroundColor:YITU.backgroundColor_1,
                    borderRadius:5,
                    alignItems:"center",
                    justifyContent:"center"
            }} onPress={()=>{
                this.props.callBack&&this.props.callBack(item);
            }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                    fontSize:YITU.fontSize_6,
                    color:YITU.textColor_1
                }}>{item.name}</Text>
            </TouchableOpacity>);
        })
    }
    _renderListRow(cityJson, sectionId) {
        if (sectionId==="#"){
            return (<View key={'list_item_' + cityJson.id}
                          style={[
                              styles.rowView,{
                                  paddingHorizontal:10,
                                  paddingVertical:10,
                                  justifyContent:"flex-start",
                                  flexDirection:"row",
                                  flexWrap: "wrap",
                                  alignItems:"flex-start",
                                  height:this.rowHeight||0
                              }
                          ]}>
                {this.createHeadItem(cityJson.arr||[])}
            </View>);
        } else {
            return (<TouchableOpacity
                    key={'list_item_' + cityJson.id}
                    style={styles.rowView}
                    onPress={()=> {
                        this.props.callBack&&this.props.callBack(cityJson);
                    }}>
                    <Text style={styles.rowdatatext}>{cityJson.name}</Text>
                    <Text style={[styles.rowdatatext,{
                        color: YITU.textColor_2,
                        fontSize:YITU.fontSize_4,
                    }]}>{cityJson.enName}</Text>
                </TouchableOpacity>);
        }

    }
    _renderListSectionHeader(sectionData, sectionID) {
        return (
            <View style={  styles.sectionView }>
                <Text style={styles.sectionText}>
                    {sectionData}
                </Text>
            </View>
        );
    }

    render() {
        return (<View style={styles.container}>
            <ListView
                ref={listView => this._listView = listView}
                contentContainerStyle={styles.contentContainer}
                scrollRenderAheadDistance={Number.MAX_VALUE / 10}
                onScroll={(e) => {
                    let y = Math.ceil(e.nativeEvent.contentOffset.y);
                    let num = 0;
                    for (let i = 0; i < totalheightArr.length; i++) {
                        if (y >= num && y < num + Math.ceil(totalheightArr[i])) {
                            this.rightItem.refresh(i);
                            break;
                        }
                        num += totalheightArr[i];
                    }
                }}

                stickySectionHeadersEnabled={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderListRow.bind(this)}
                renderSectionHeader={this._renderListSectionHeader.bind(this)}
                enableEmptySections={true}
                initialListSize={10}
                pageSize={10}
            />
            {
                this.renderRightItem()
            }

            </View>);
    }
    /**
     * scrollView滑动到指定位置
     * @param index
     * @private
     */
    _scrollTo(index) {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalheightArr[i]
        }
        this._listView.scrollTo({y: position});
    }

    /**
     * 右侧选项栏
     * @returns {XML}
     */
    renderRightItem() {
        return <RightList
            ref={(ref) => this.rightItem = ref}
            letters={this.state.letters}
            scrollTo={(index) => this._scrollTo(index)}
        />
    }
}
module.exports = CityIndexListView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_0,
    },
    contentContainer: {
        overflow:'hidden'
    },


    sectionView: {
        paddingTop: 5,
        paddingBottom: 5,
        height: SECTIONHEIGHT,
        paddingLeft: 15,
        backgroundColor: '#F4F4F4',
    },
    sectionText: {
        color: YITU.backgroundColor_3,
        fontWeight: 'bold'
    },
    rowView: {
        height: ROWHEIGHT,
        paddingHorizontal: 15,
        borderBottomColor: YITU.backgroundColor_Line,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent:"center"
    },
    rowdatatext: {
        paddingVertical:2,
        color: YITU.textColor_1,
        fontSize:YITU.fontSize_5,
    },
});