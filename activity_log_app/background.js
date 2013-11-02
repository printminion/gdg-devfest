
chrome.bluetooth.stopDiscovery(); //hack since we have no discovery timeout
var deviceList = [];
//chrome.app.runtime.onLaunched.addListener(onLaunched);

// onAdapterStateChanged callback (wifi card)
chrome.bluetooth.onAdapterStateChanged.addListener(function(newStatus) {
    console.log('onAdapterStateChanged:', newStatus);
    UI.onAdapterStateChanged(newStatus);
});



function discoveredDevice(device) {
    console.log("discoveredDevice", device);
    UI.onDeviceDiscovered(device);
    getProfilesForDevice(device);
}

function onDeviceDiscovered(device) {
    deviceList.push(device);
}


function onGetDevicesCompleted() {
  console.log("onGetDevicesCompleted", deviceList);

  var error = chrome.runtime.lastError;
  if (error) {
    console.log('Error onGetDevicesCompleted:', error);
    return;
  }
  console.log('Success onGetDevicesCompleted:');

  UI.updateDevices(deviceList);
}


function onLaunched() {

    chrome.bluetooth.stopDiscovery(); //hack since we have no discovery timeout
    console.log("onLaunched:begin");
    
    //chrome.app.window.create('window.html', {'width': 400,'height': 500});
    chrome.bluetooth.startDiscovery({deviceCallback: discoveredDevice}, function() {
      var error = chrome.runtime.lastError;
      if (error) {
          console.log('Error startDiscovery:', error);
          return;
      }
      console.log('Success startDiscovery:', error);

    });
    
    //addProfile();
    deviceList = [];
    chrome.bluetooth.getDevices({deviceCallback: onDeviceDiscovered}, onGetDevicesCompleted);
    //chrome.bluetooth.stopDiscovery();
    console.log("onLaunched:end");

    getLocalOutOfBandPairingData();
}

function addProfile() {
  var uuid = '00001101-0000-1000-8000-00805f9b34fb';
  uuid = '1dd35050-a437-11e1-b3dd-0800200c9a66';


  chrome.bluetooth.addProfile({uuid: uuid}, function(){
   var error = chrome.runtime.lastError;
   if (error) {
        console.log('Error addProfile:', error);
        return;
    }
    console.log('Success addProfile:', error);
    
  });

}

function getServicesByAddress(address) {
    console.log('getServicesByAddress', address);
    chrome.bluetooth.getServices({deviceAddress: address}, function(services) {
        
        for (var i in services) {
          console.log('gotService', address, services[i].name, services[i].uuid);
        };
    });
}

function getProfilesForDevice(device) {
    console.log('getProfilesForDevice', device);


    getServicesByAddress(device.address);
    //return;

    chrome.bluetooth.getProfiles({device: device}, function(profiles) {
        if (profiles === undefined) {
            return false;
        }
        console.log('displayProfiles', device, profiles);

        if (!profiles) {
            return;
        }

        return;
        if (device.address == "38:0A:94:B7:09:C1") {
        var uuid = profiles[0].uuid;

        console.log('try to connect to device', {deviceAddress: device.address, serviceUuid: uuid});
        /**
         * device ( Device )
         The connection is made to |device|.
         profile ( Profile )
         */
        chrome.bluetooth.connect(
                {device: device, profile: profiles[0]}, function() {
            if (chrome.runtime.lastError) {
                console.error("Error on connection.", chrome.runtime.lastError.message);

            }
        }
        );

        console.log("CONNECT TO :", profiles[0], device)

        }


    });
}

chrome.bluetooth.onConnection.addListener(onConnection);

function onConnection(socket) {
      console.log("onConnection", socket);
      //current_socket = socket;
}

var connectCallback = function(socket) {
    console.log('connectCallback', socket);
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


//"1dd35050-a437-11e1-b3dd-0800200c9a66"

function getLocalOutOfBandPairingData() {
  chrome.bluetooth.getLocalOutOfBandPairingData(function(data){
    console.log('getLocalOutOfBandPairingData', data);

  });
}

function testConnect() {
  
  var device = {address: '00:18:34:50:7C:95'};
  var profile = {uuid: '1dd35050-a437-11e1-b3dd-0800200c9a66'};

  chrome.bluetooth.connect({device: device, profile: profile}, function() {
    if (chrome.runtime.lastError) {
      console.error("Error on connection.", chrome.runtime.lastError.message);
    }
  });
}