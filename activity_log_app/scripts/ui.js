console.log('ui.js')

$(document).ready(function() {
	addConnectedDevice({name:'dummy1'})	
});


function addConnectedDevice(device) {
	$('#devices_connected').append('<li><a href="/user/messages"><span class="tab">' + device.name + '</span></a></li>');
}



