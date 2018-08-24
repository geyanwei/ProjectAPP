import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    InteractionManager,
} from 'react-native';
import PropTypes from 'prop-types';

class Password extends Component {
    static propTypes = {
        style: PropTypes.func,
        inputItemStyle: PropTypes.func,
        iconStyle: PropTypes.func,
        maxLength: PropTypes.number,
        onChange: PropTypes.func,
        onEnd: PropTypes.func,
        autoFocus: PropTypes.bool,
    };

    static defaultProps = {
        autoFocus: true,
        onChange: () => {},
        onEnd: () => {},
    };

    state = {
        text: ''
    };

    componentDidMount() {
        if (this.props.autoFocus) {
            InteractionManager.runAfterInteractions(() => {
                this._onPress();
            });
        }
    }

    render(){
        return(
            <TouchableHighlight
                onPress={this._onPress.bind(this)}
                activeOpacity={1}
                underlayColor='transparent'>
                <View style={[styles.container,this.props.style]} >
                    <TextInput
                        style={{height:45,zIndex:99,position:'absolute',width:45*6,opacity:0}}
                        ref='textInput'
                        maxLength={this.props.maxLength}
                        autoFocus={false}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          log(text);
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
    _getInputItem(){
        let inputItem = [];
        let {text}=this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            inputItem.push(
                <View key={i} style={[styles.inputItem,[{borderColor:i < text.length?"#1299F4":"#cccccc"}],this.props.inputItemStyle]}>
                    {i < text.length ?
                        <View style={[styles.iconStyle,this.props.iconStyle]}/> : null}
                </View>);
        }
        return inputItem;
    }

    _onPress(){
        this.refs.textInput.focus();
    }
}
module.exports = Password;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    inputItem: {
        marginHorizontal:2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#cccccc',
        borderStyle:"solid",
        backgroundColor: '#ffffff',
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#1299F4',
        borderRadius: 8,
    },
});
