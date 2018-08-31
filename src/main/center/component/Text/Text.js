import React, {Component} from 'react';
import {
    Text,
} from 'react-native';

class Text1 extends Component {
    render() {
        return <Text selectable={true} {...this.props}>{this.props.children}</Text>
    }
}

module.exports = Text1;

