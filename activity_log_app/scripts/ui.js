console.log('ui.js');

$(document).ready(function() {
    UI.bind();
    onLaunched();
});



var UI = {

    bind: function() {
        console.log('UI.bind');
    },

    updateDevices: function(devices) {
        console.log('UI.updateDevices', devices);
        for(var i in devices) {
            $('#devices_connected').html('').append('<li data-address="' + devices[i].address + '"><a href="/user/messages">' 
                + devices[i].name + '</a> ' + devices[i].address + '</li>');
        }
    },

    onDeviceDiscovered: function(device) {
        console.log('UI.onDeviceDiscovered', device);

        $('#devices_descovered').append('<li data-address="' + device.address + '"><a href="/user/messages">' 
            + device.name + '</a> ' + device.address + '</li>');
    },
    startScan: function() {
        console.log('UI.startScan');
    },
    stopScan: function() {
        console.log('UI.startScan');
    },
    onAdapterStateChanged: function(status) {
        console.log('UI.onAdapterStateChanged', status);
        if (status.discovering) {
            $('#devices_descovered').html();
        }
        var status = (status.discovering) ? 'discovering...' : 'idle';
        $('#status').html(status);
    },

}


