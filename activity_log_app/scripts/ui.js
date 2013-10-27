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
    }
}


