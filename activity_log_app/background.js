// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.bluetooth.stopDiscovery(); //hack since we have no discovery timeout
var deviceList = [];
chrome.app.runtime.onLaunched.addListener(onLaunched);

// onAdapterStateChanged callback (wifi card)
chrome.bluetooth.onAdapterStateChanged.addListener(function(newStatus) {
    console.log('onAdapterStateChanged:', arguments);
});

function recordDevice(device) {
  console.log("recordDevice", device);
  //getServicesByAddress(device.address);
  getProfilesForDevice(device);
}

function getDevice(device){
  deviceList.push(device)
}

function devicesFound(){
  console.log("Devices found", deviceList)
}


function onLaunched() {
  chrome.bluetooth.stopDiscovery(); //hack since we have no discovery timeout
  console.log("onLaunched:begin");
  chrome.app.window.create('window.html', {'width': 400,'height': 500});
  chrome.bluetooth.startDiscovery({deviceCallback: recordDevice});
  chrome.bluetooth.getDevices({deviceCallback: getDevice}, devicesFound);
  //chrome.bluetooth.stopDiscovery();
  console.log("onLaunched:end");
}

function getServicesByAddress(adress) {
	console.log('getServicesByAddress', adress);
	chrome.bluetooth.getServices({deviceAddress: address}, function(data) {
		console.log('getServices', data);
	});	
}

function getProfilesForDevice(device) {
	console.log('getProfilesForDevice', device);
	chrome.bluetooth.getProfiles({device : device }, function(profiles){
	 console.log('displayProfiles', device, profiles);

   if (device.address == "38:0A:94:B7:09:C1") {
    var uuid = profiles[0].uuid;

    console.log('try to connect to device');
    chrome.bluetooth.connect(
        {deviceAddress: device.address, serviceUuid: uuid}, connectCallback);
   }
    
  }); 
}

var connectCallback = function(socket) {
	console.log('connectCallback', connectCallback);

  if (socket) {
    console.log('Connected!  Socket ID is: ' + socket.id + ' on service ' + socket.serviceUuid);

  } else {
    console.log('Failed to connect.');
  }
};
var connectToDevice = function(result) {
  if (chrome.runtime.lastError) {
    console.log('Error searching for a device to connect to.');
    return;
  }
  if (result.length == 0) {
    console.log('No devices found to connect to.');
    return;
  }
  for (var i in result) {
    var device = result[i];
    console.log('Connecting to device: ' + device.name + ' @ ' + device.address);
    chrome.bluetooth.connect(
      {deviceAddress: device.address, serviceUuid: kUUID}, connectCallback);
  }
};