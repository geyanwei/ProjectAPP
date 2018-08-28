/**
 * Created by tdzl2003 on 4/4/16.
 */

const HotUpdate = require('react-native').NativeModules.HotUpdate;
import { NativeAppEventEmitter, Platform } from 'react-native';
import { packageName } from '../myNativeModules';

export const downloadRootDir = HotUpdate.downloadRootDir;
export const packageVersion = HotUpdate.packageVersion;
export const currentVersion = HotUpdate.currentVersion;
export const isFirstTime = HotUpdate.isFirstTime;
export const isRolledBack = HotUpdate.isRolledBack;

// const platformCode = {
//   android: 1,
//   ios: 2
// }

// const platform = (Platform.OS == 'ios') ? 2 : 1; // 201707211346
// const platform = platformCode[Platform.OS];
const platform = Platform.select({
  ios: 2,
  android: 1,
});

/*
Return json:
Package was expired:
{
  expired: true,
  downloadUrl: 'http://appstore/downloadUrl',
}
Package is up to date:
{
  upToDate: true,
}
There is available update:
{data:{
    updates: true,
    pname: '1.0.3-rc',
    phash: 'hash',
    descs: '添加聊天功能\n修复商城页面BUG',
    isup: 1,
    url: 'http://update-packages.reactnative.cn/hash',
    pdiffUrl: 'http://update-packages.reactnative.cn/hash', // un-defined
    diffUrl: 'http://update-packages.reactnative.cn/hash', // un-defined
  },
  code:1
}
 */
export function getOption() {
  return {
    phash: currentVersion,
    package: packageName,
    type: platform,
    vcode: packageVersion
  }
}
export function setSuccessUpdate() {

  isFirstTime ? markSuccess() : void 0; // set flag if first success time start after update
}

export async function downloadUpdate(options) {
  await HotUpdate.downloadUpdate({
    updateUrl: options.url,
    hashName: options.phash,
  });
  // }
  return options.phash;
}

export async function switchVersion(hash) {
  HotUpdate.reloadUpdate({ hashName: hash });
}

export async function switchVersionLater(hash) {
  HotUpdate.setNeedUpdate({ hashName: hash });
}

export function markSuccess() {
  HotUpdate.markSuccess();
}


NativeAppEventEmitter.addListener('RCTHotUpdateDownloadProgress', (params) => {

});

NativeAppEventEmitter.addListener('RCTHotUpdateUnzipProgress', (params) => {

});