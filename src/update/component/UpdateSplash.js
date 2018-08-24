import React, { Component } from "react";
import { View, Text, Image, TouchableHighlight, Dimensions } from "react-native";

import UpdateButton from "./UpdateButton";
import HttpTool from "../../http/HttpTool";
import APICONFIG from "../../http/APICONFIG.js";
import Config from '../../Config';
import UpdateProgressBar from "./UpdateProgressBar";

import {
	setSuccessUpdate,
	getOption,
	switchVersion,
	switchVersionLater,
	downloadUpdate
	// currentVersion
} from "../index.js"; // 千万不能删除和HotUpdate相关的代码!!!!!!!!

const { width, height } = Dimensions.get('window');
const HEIGHT_RATIO = height / 677;
const WIDTH_RATIO = width / 375;

export default class UpdateSplash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {},
			updateStatus: 0 // 0: hide, 1: show altertive button, 2: only show button, 3: show progress bar, 4: download complete
		};
		this.transparentLayoutHeight = 460*HEIGHT_RATIO; // layout height
		// this.headImageHeight = 150*HEIGHT_RATIO;
		this.stripOverlayHeight = 44*HEIGHT_RATIO;
		this.iconWidth = 54*WIDTH_RATIO/2; // close icon width
		this.iconHeight = 106*HEIGHT_RATIO/2; // close icon height
		this.iconDiff = 6*WIDTH_RATIO; // icon offset
		this.mainScreenWidth = 270*WIDTH_RATIO; // modal screen width
		this.mainScreenMarginTop = 60*HEIGHT_RATIO; // modal screen offset from top
		this.contentHeight = 246 * HEIGHT_RATIO; // main content height
		this.imgPaddingTop = 16 * HEIGHT_RATIO; // image top offset
		this.imgMarginTop = this.iconHeight; // to top transparent value
		this.btnHeight = 40 * HEIGHT_RATIO; // button height
		
		//color
		this.transparenLayoutBackgroundColor = 'transparent';
		this.shrinkContentBackgroundColor = 'transparent';
		this.closeBtnBackgroundColor = 'transparent'
		// this.cout = 0;
	}

	// componentDidUpdate() {
	// 	console.warn('test' + currentVersion);
	// }

	componentDidMount() {
		setSuccessUpdate();
		HttpTool.post(
            APICONFIG.api_check_update,
			(code, message, data, options) => {
				log(data);
				if (code == 1) {
					this.setState({
						updateStatus: data.isup === 0 ? 1 : 2,
						info: data
					});
				}
			},
			(code, message) => {},
			getOption(),
			{
				safe: false,
				host: Config.updateHost,
				contentType: "application/json;charset=utf-8"
			}
		);
	}

	getButtonList() {
		let ret = null,
			{ updateStatus, info } = this.state;
		switch (updateStatus) {
			case 0:
				break;
			case 1:
				ret = (
					<UpdateButton
						style={{ height: this.btnHeight }}
						text={"立即升级"}
						pressEvt={() => this.changeUpdateState(3)}
					/>
				);
				break;
			case 2: // only show button
				ret = (
					<UpdateButton
						pressEvt={() => {
							this.setState({
								updateStatus: 3
							});
						}}
					/>
				);
				break;
			case 3: // progress bar going
				ret = (
					<UpdateProgressBar
						ref={ref => {
							if (!ref) return;
							this.UpdateProgressBar = ref;
							this.UpdateProgressBar.run();
						}}
						onLoadBegin={() => {
							this.downFile(info, (err, hash) => {
								if (!err) {
									this.hash = hash;
									this.UpdateProgressBar.end(hash);
								}
							});
						}}
						onLoadEnd={() => {
							this.setState(
								{
									updateStatus: 4
								},
								() => {
									switchVersionLater(this.hash ? this.hash : "");
								}
							);
						}}
					/>
				);
				break;
			case 4:
				ret = (
					<UpdateButton
						style={{ height: this.btnHeight }}
						text={"立即重启"}
						pressEvt={() => switchVersion(this.hash ? this.hash : "")}
					/>
				);
				break;
			default:
		}

		return ret;
	}

	downFile(info, callback) {
		downloadUpdate(info)
			.then(hash => {
				callback(null, hash);
			})
			.catch(err => {
				callback(err);
				// Alert.alert('提示', err + '更新失败.' + JSON.stringify(info));
			});
	}

	getContent() {
		let { descs } = this.state.info;
		return (
			<View style={{ paddingLeft: 10, paddingRight:10, marginLeft:25,marginTop:10 }}>
				<Text numberOfLines={10} style={{ color: "#000", fontSize: 14 }}>
					{descs ? descs : "1.\t修复BUG\n2.\t优化用户体验"}
				</Text>
			</View>
		);
	}

	getCloseIcon() {
		return (
			<TouchableHighlight
				style={{
					position: "absolute",
					top: 0,
					right: 20
				}}
				onPress={() => {
					setTimeout(() => {
						this.changeUpdateState(0);
					}, 0);
				}}
				underlayColor={"transparent"}
			>
				<View style={{
					flex: 1, backgroundColor: this.closeBtnBackgroundColor,
					position:"relative"
				}}>
					<Image
						style={{
							width: this.iconWidth, height: this.iconHeight, resizeMode: 'contain'
						}}
						source={require("../../image/update/update_close.png")}
					/>
				</View>
			</TouchableHighlight>
		);
	}

	changeUpdateState(stat) {
		this.setState({
			updateStatus: stat
		});
	}

	render() {
		let { updateStatus } = this.state;
		if (updateStatus == 0) {
			return null;
		} else {
			return (
				<View
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backgroundColor: "#0000007f",
						flexDirection: "row"
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: "center",
							height: this.transparentLayoutHeight,
							marginTop: this.mainScreenMarginTop,
							backgroundColor: this.transparenLayoutBackgroundColor
						}}
					>
						<View
							style={{
								width:
									this.mainScreenWidth + this.iconWidth + this.iconDiff * 2,
								height: "100%",
								backgroundColor: this.shrinkContentBackgroundColor,
								paddingHorizontal:this.iconWidth / 2,
								paddingBottom: 0
							}}
						>
							<View style={{flex:1,paddingTop:this.imgPaddingTop,marginTop:this.imgMarginTop,alignItems:'center',backgroundColor:'white'}}>
								<Image
									style={{ width: 140, height: "100%",resizeMode:'contain' }}
									source={require("../../image/update/update_rocket.png")}
								/>
							</View>
							{updateStatus === 1 ? this.getCloseIcon() : void 0}
							<View
								style={{
									width: "100%",
									height: this.contentHeight,
									backgroundColor: "white",
									marginTop: -2,
									paddingTop: 10,
									flexDirection: "column"
								}}
							>
								<View style={{ flex: 2, backgroundColor: "white" }}>
									<View style={{ marginLeft: 18, marginRight: 18,marginTop:16,marginBottom:-20}}>
											<Text style={{ color: "#343b4b", fontSize: 18,textAlign:"center" }}>
												发现资源更新
											</Text>
										{this.getContent()}
									</View>
								</View>
								<View style={{ flex: 1, backgroundColor: "#fff" }}>
									{this.getButtonList()}
								</View>
							</View>
						</View>
					</View>
				</View>
			);
		}
	}
}
