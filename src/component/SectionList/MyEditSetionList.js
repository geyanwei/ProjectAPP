'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
} from 'react-native';
import RightList from './component/RightList';

let totalheight = []; //每个字母对应的城市和字母的总高度

let that;

export default class CityIndexListView extends Component {

    constructor(props) {
        super(props);

        let getSectionData = (dataBlob, sectionID) => {
            return sectionID;
        };
        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };

        let ALL_CITY_LIST = this.props.allCityList || [];

        let letterList = this._getSortLetters(ALL_CITY_LIST);

        let dataBlob = {};

        ALL_CITY_LIST.map(cityJson => {
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

            let eachheight = (this.props.SECTIONHEIGHT || 0) + (this.props.ROWHEIGHT || 0) * thisRow.length;

            totalheight.push(eachheight);

            return thisRow;
        });

        let ds = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            letters: sectionIDs
        };

        that = this;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allCityList.toString() !== this.props.allCityList.toString()) {
            let getSectionData = (dataBlob, sectionID) => {
                return sectionID;
            };
            let getRowData = (dataBlob, sectionID, rowID) => {
                return dataBlob[sectionID][rowID];
            };

            let ALL_CITY_LIST = nextProps.allCityList;

            let letterList = this._getSortLetters(ALL_CITY_LIST);

            let dataBlob = {};

            ALL_CITY_LIST.map(cityJson => {
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
            totalheight = [];
            let rowIDs = sectionIDs.map(sectionID => {
                let thisRow = [];
                let count = dataBlob[sectionID].length;
                for (let ii = 0; ii < count; ii++) {
                    thisRow.push(ii);
                }

                let eachheight = (this.props.SECTIONHEIGHT || 0) + (this.props.ROWHEIGHT || 0) * thisRow.length;

                totalheight.push(eachheight);

                return thisRow;
            });

            let ds = new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });

            this.setState({
                dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                letters: sectionIDs
            });
        }
    }

    _getSortLetters(dataList) {
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

    /**
     * scrollView滑动到指定位置
     * @param index
     * @private
     */
    _scrollTo(index) {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalheight[i]
        }
        this._listView.scrollTo({y: position});
    }

    /**
     * 右侧选项栏
     * @returns {XML}
     */
    renderRightItem() {
        return <RightList
            letters={this.state.letters}
            scrollTo={(index) => this._scrollTo(index)}
            extralTopHeight={this.props.extralTopHeight}
            ref={(ref) => {
                this.rightItem = ref
            }}
        />
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.titleView ? this.props.titleView() : null
                }
                <ListView ref={listView => this._listView = listView}
                          onScrollBeginDrag={(...e) => {
                              if (this.props.onScrollBeginDrag) {
                                  this.props.onScrollBeginDrag(...e);
                              }
                          }}
                          onScroll={(e) => {
                              let y = Math.ceil(e.nativeEvent.contentOffset.y);
                              let num = 0;
                              for (let i = 0; i < totalheight.length; i++) {
                                  if (y >= num && y < num + Math.ceil(totalheight[i])) {
                                      this.rightItem.refresh(i);
                                      break;
                                  }
                                  num += totalheight[i];
                              }
                          }}
                          stickySectionHeadersEnabled={true}
                          contentContainerStyle={styles.contentContainer} dataSource={this.state.dataSource}
                          renderRow={this.props.renderListRow} renderSectionHeader={this.props.renderListSectionHeader}
                          showsVerticalScrollIndicator={false}
                          enableEmptySections={true} initialListSize={10}
                          pageSize={10}
                          scrollRenderAheadDistance={Number.MAX_VALUE / 10}
                          removeClippedSubviews={false}
                />
                {
                    this.props.showNewView ? this.props.showNewView() : null
                }
                {
                    this.renderRightItem()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: 'column',
        backgroundColor: YITU.backgroundColor_1,
    },
    contentContainer: {
        flexDirection: 'row',
        width: YITU.screenWidth,
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
});
