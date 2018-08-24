import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import Video from "react-native-video"

class MyVideo extends Component {

    constructor(props){
        super(props);

    }

    componentDidMount() {

    }



    render() {
        let main = (
                <View style={styles.main}>
                    <Video
                        source={require('../image/login/start_original.mp4')}
                        style={styles.video}
                        rate={1}
                        volume={1}
                        onEnd={() => {if (this.props.callBack){this.props.callBack()} }}
                        repeat={false}
                        {...this.props}
                    />
                </View>
            )
        ;
        return  main;

    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_clear,
    },
    video: {
        width:'100%',
        height:'100%',
    }
});

module.exports = MyVideo;
