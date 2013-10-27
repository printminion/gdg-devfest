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
            $('#devices_connected').append('<li data-address="' + devices[i].address + '"><a href="/user/messages"><span class="tab">' + devices[i].name + '</span></a>' + devices[i].address + '</li>');
        }
    },

    onDeviceDiscovered: function(device) {
        console.log('UI.onDeviceDiscovered', device);

        $('#devices_descovered').append('<li data-address="' + device.address + '"><a href="/user/messages"><span class="tab">' 
            + device.name + '</span></a>' + device.address + '</li>');
    }
}


