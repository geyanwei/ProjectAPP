import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
} from 'react-native'
import AlphabetListView from 'react-native-alphabetlistview'

/**
 * react-native-alphabetlistview的以下行为导致字母定位不准确：
 * 1.渲染sectionHeader时会额外渲染一个1px的topBorder
 * 2.没考虑separator的高度
 * 3.列表内容小于屏幕高度时向上滚动(ios only, scrollTo中的y<0)
 */
export default class extends Component {
  render() {
    const {separatorHeight, sectionHeaderHeight, cellHeight, ...others} = this.props;
    return (
      <AlphabetListView
        {...others}
        sectionHeaderHeight={sectionHeaderHeight + 1} // patch 1
        cellHeight={cellHeight + separatorHeight} // patch 2
      />
    )
  }

  static PropTypes = {
    ...AlphabetListView.propTypes,
    separatorHeight: PropTypes.number,
  };
  static defaultProps = {
    separatorHeight: 0,
  }
}

// patch 3
// copied from source, but enforce maxY >= 0
AlphabetListView.prototype.scrollToSection = function (section) {
  var y = 0;
  var headerHeight = this.props.headerHeight || 0;
  y += headerHeight;

  if (!this.props.useDynamicHeights) {
    var cellHeight = this.props.cellHeight;
    var sectionHeaderHeight = this.props.sectionHeaderHeight;
    var keys = Object.keys(this.props.data);
    var index = keys.indexOf(section);

    var numcells = 0;
    for (var i = 0; i < index; i++) {
      numcells += this.props.data[keys[i]].length;
    }

    sectionHeaderHeight = index * sectionHeaderHeight;
    y += numcells * cellHeight + sectionHeaderHeight;
    var maxY = this.totalHeight - this.containerHeight + headerHeight;
    if (maxY < 0) maxY = 0;
    y = y > maxY ? maxY : y;

    this.refs.listview.scrollTo({ x:0, y, animated: true });
  } else {
    // this breaks, if not all of the listview is pre-rendered!
    UIManager.measure(this.cellTagMap[section], (x, y, w, h) => {
      y = y - this.props.sectionHeaderHeight;
      this.refs.listview.scrollTo({ x:0, y, animated: true });
    });
  }

  this.props.onScrollToSection && this.props.onScrollToSection(section);
};
