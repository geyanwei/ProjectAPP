import React, { Component } from 'react';
import { View, Text, TouchableHighlight, NativeAppEventEmitter, Platform } from 'react-native';

class UpdateProgressBar extends Component {
	constructor(p) {
		super(p);
		this.state = {
			progress: p.progress * 100
		};
		let i = 0;
		// this.runProgressEvt = Platform.OS == 'ios' ? this.progressIOS : this.progressAndroid;
		// params:{receiver,total,hashname}
		if(Platform.OS == 'ios' ){
            this.downloadListener = NativeAppEventEmitter.addListener('RCTHotUpdateDownloadProgress', (params) => {
                this.progressIOS(params, 0);
            });
            this.unzipListener = NativeAppEventEmitter.addListener('RCTHotUpdateUnzipProgress',(params)=>{
                // i<2?(console.warn(JSON.stringify(params)),i++):void 0;
                this.progressIOS(params, 1);
            });
		}

		this.timerInterval = null;
		this.hash = ''; // for android progress speed up
		this.initInterval = 1000;
		this.step = 1;
	}
	static defaultProps = {
		progress: 0,
		onLoadBegin: () => { },
		onLoadEnd: () => { }
	};


	componentWillUnmount() {
        if(Platform.OS == 'ios' ) {
            this.downloadListener.remove();
            this.unzipListener.remove();
        }else{
		}
	}

    run(){
        this.props.onLoadBegin();
        if(Platform.OS == 'ios' ) {
		}else{
            this.progressAndroid()
		}
	}

    end(hash){
        if(Platform.OS == 'ios' ) {
        }else{
            this.hash = hash;
            this.initInterval = 1;
            this.step=5
        }
    }


	// shouldComponentUpdate(nextProps, nextState) {
	// 	return nextState.progress !== this.state.progress;
	// }

	progressIOS(params,step) {
		let { received, total } = params,
			percent = Math.ceil((received / total) * 50);
		this.setState({
			progress: 50 * step + percent
		}, () => {
			this.state.progress == 100 ? this.props.onLoadEnd() : void 0;
		});
	}

	progressAndroid() {
		this.clearTimerInterval();
		this.timerInterval = setInterval(()=>this.autoIncreament(), this.initInterval)
	}

	autoIncreament() {
		if (this.progressEnd()) { // clear first step to prevent setState after unmount
			let { progress } = this.state, nextValue = progress + this.step;
			this.setState({
				progress: nextValue < 99 ? nextValue : 99
			}, () => {
				this.progressAndroid()
			});
		}	
	}

	progressEnd() {
		this.clearTimerInterval();
		return ( this.hash !== '' && this.state.progress == 99 ) ? (this.props.onLoadEnd(), false) : (true);
	}

	clearTimerInterval() {
		this.timerInterval ? clearInterval(this.timerInterval) : void 0;
	}

	render() {
		return (
			<View
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ width: '75%', height: 12, borderColor: 'gray', backgroundColor: 'white', borderRadius: 6 }}>
					<View style={{ width: `${this.state.progress+'%'}`, height: 12, borderColor: 'gray', backgroundColor: YITU.backgroundColor_3, borderRadius: 6}}></View>
				</View>
				<Text style={{paddingTop:10, color:YITU.backgroundColor_3}}>{this.state.progress+'%'}</Text>
			</View>
		);
	}
}

export default UpdateProgressBar;