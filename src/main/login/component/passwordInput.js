/**
 * Created by chenchunyong on 12/2/15.
 */

import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    InteractionManager,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

export default class Password extends Component {
    static propTypes = {
        style: PropTypes.any,
        inputItemStyle: PropTypes.any,
        iconStyle: PropTypes.any,
        maxLength: PropTypes.any,
        onChange: PropTypes.func,
        onEnd: PropTypes.func,
        autoFocus: PropTypes.bool,
    };

    static defaultProps = {
        autoFocus: false,
        onChange: () => {
        },
        onEnd: () => {
        },
    };

    state = {
        text: ''
    };

    getValue() {
        return this.state.text;
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            InteractionManager.runAfterInteractions(() => {
                this._onPress();
            });
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress.bind(this)}
                activeOpacity={1}
                underlayColor='transparent'>
                <View style={[styles.container, this.props.style]}>
                    <TextInput
                        style={{height: 45, zIndex: 99, position: 'absolute', width: 45 * 6, opacity: 0}}
                        ref='textInput'
                        maxLength={this.props.maxLength}
                        autoFocus={false}
                        onFocus={() => {
                            if (this.props.onFocus) {
                                this.props.onFocus()
                            }
                        }}

                        onBlur={
                            () => {
                                if (this.props.onBlur) {
                                    this.props.onBlur()
                                }
                            }
                        }
                        keyboardType="number-pad"
                        onChangeText={
                            (text) => {
                                this.setState({text});
                                this.props.onChange(text);
                                if (text.length === this.props.maxLength) {
                                    this.props.onEnd(text);
                                }
                            }
                        }
                    />
                    {
                        this._getInputItem()
                    }
                </View>
            </TouchableHighlight>
        )

    }

    _getInputItem() {
        let inputItem = [];
        let {text} = this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View key={i} style={[styles.inputItem, this.props.inputItemStyle]}>
                        {i < text.length ? <Text>{text.slice(i, i + 1)}</Text> : null}
                    </View>)
            }
            else {
                inputItem.push(
                    <View key={i}
                          style={[styles.inputItem, styles.inputItemBorderLeftWidth, this.props.inputItemStyle]}>
                        {i < text.length ?
                            <Text>
                                {text.slice(i, i + 1)}
                            </Text> : null}
                    </View>)
            }
        }
        return inputItem;
    }

    _onPress() {
        this.refs.textInput.focus();
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: YITU.backgroundColor_Line,
        backgroundColor: YITU.backgroundColor_0
    },
    inputItem: {
        height: YITU.space_5*3,
        width:  YITU.space_5*3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: 1,
        borderColor: YITU.backgroundColor_Line,
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    },
});
