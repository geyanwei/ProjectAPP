import EventNative from '../tool/EventAndroidIos.js'
import React from 'react'

exports.onClick = onClick;

window.YITU["ClickTrackFunction"] = onClick;

exports.onPageBegin = onPageBegin;

exports.onPageEnd = onPageEnd;

exports.onPause = EventNative.onPause;

exports.onResume = EventNative.onResume;

// 友盟点击事件统计高阶函数
exports.withClickStatistics = function (fn, name) {
  return function (...args) {
    onClick(getEventName(name));
    if (typeof fn === 'function') {
      fn(...args)
    }
  }
};

function onClick(eventId) {
  if (eventId == null) return;
  try {
    EventNative.umOnEvent(eventId)
  } catch (e) {}
}

function onPageBegin(pageName) {
  if (pageName == null) return;
  try {
    EventNative.umOnPageBegin(pageName)
  } catch (e) {}
}

function onPageEnd(pageName) {
  if (pageName == null) return;
  try {
    EventNative.umOnPageEnd(pageName)
  } catch (e) {}
}

function getEventName(name) {
  let eventName = name;
  if (typeof name === 'function') {
    eventName = name()
  }

  if (eventName == null) return null;

  if (typeof eventName !== 'string') {
    throw new Error('Invalid name.')
  }
  return eventName
}
