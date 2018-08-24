import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
} from 'react-native';

class SelectCell extends Component {
//默认属性
    static defaultProps = {
        underlayColor: '#eeeeee',
        activeOpacity:1,
    };
    constructor(props) {
        super(props);

    }

    render() {
        let main = (
                <TouchableHighlight
                    underlayColor={this.props.underlayColor}
                    activeOpacity={this.props.activeOpacity}
                    {...this.props}>
                    <View style={{backgroundColor:"#00000000"}}>
                        {this.props.children}
                    </View>
                </TouchableHighlight>
            )
        ;
        return main;
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
});

module.exports = SelectCell;
