/* 
	FOR BEGINNERS
*/

/* 
	install "npm install socket.io@2.4.1"
	run "node server_basic_code.js"
*/
var io = require('socket.io-client');

var api_key = 'pzNMhsR0npxGNtToHR5jfPDN'; // Enter your API KEY here,

/*
	EXCEL LIST:  https://fcsapi.com/beta/assets/socket/socket_support_list.xlsx
	Enter your Forex/Crypto ids, set multiple ids with comma
*/
var currency_ids 	= '1,1984,80,81,7774,7778';

/*
	#### START ####
*/
socket_connection();

// Variables
var socket_re_conn,socket,heart_interval;

// wss:// if your application does not support WSS/SSL/HTTPS then use "ws://fcsapi.com" (http)
var ws_url 		= 'wss://fcsapi.com'; // web socket URL

// start socket connection function
function socket_connection(){
	// require connect with fxpricing
	socket = io.connect(ws_url,{
	    transports: ['websocket'],
		path : "/v3/"
	});

	// comment
	console.log("Connection Request send. Waiting response");

	// socket heartbeat require once every hour, if your heartbeat stop so you will disconnect
	socket.emit('heartbeat', api_key);
	
	// connect your required IDs with server
	socket.emit('real_time_join', currency_ids);

	// PRICES Real time data received from server
	socket.on('data_received',function(prices_data){
		// get prices
		console.log(prices_data);
	});

	/* 
		You need to connect with server once per 24 hour, else your connection will be disconnect.
		Below we set heartbeat every hour, you can increase time upto 24 hours, 
		but do not decrease this time, beucase it will slow down your speed with server
	*/
	setInterval(function(){
		socket.emit('heartbeat', api_key);
	}, (1*60*60*1000)); // hour * minutes*seconds*1000; 

}