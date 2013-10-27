// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.bluetooth.stopDiscovery();
var deviceList = [];

function recordDevice(device) {
  console.log("recordDevice", device);
}

function getDevice(device){
  deviceList.push(device)
}

function devicesFound(){
  console.log("Devices found", deviceList)
}

chrome.app.runtime.onLaunched.addListener(function() {
  console.log("onLaunched:begin");
chrome.app.window.create('window.html', {'width': 400,'height': 500});
  chrome.bluetooth.startDiscovery({deviceCallback: recordDevice});
  chrome.bluetooth.getDevices({deviceCallback: getDevice}, devicesFound);
console.log("onLaunched:end");
});
