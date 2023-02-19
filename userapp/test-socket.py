import socketio

sio = socketio.Client()
api_key = "pzNMhsR0npxGNtToHR5jfPDN"
currency_ids = '1,2,3'

@sio.event
def connect():
    print("connected")

@sio.event
def my_message(data):
    print('message received with ', data)
    sio.emit('heartbeat', api_key)
    sio.emit('real_time_join', currency_ids)

@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('ws://fcsapi.com/v3/?EIO=3&transport=websocket')
sio.wait()