from flask import Flask, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('chat message')
def handle_message(msg):
    socketio.emit('chat message', {'msg': msg, 'id': request.sid}, to=None)

if __name__ == '__main__':
    socketio.run(app, debug=True, use_reloader=False)
