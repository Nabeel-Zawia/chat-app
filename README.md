# Real-Time Chat App

A simple real-time chat application built with Flask and Socket.IO.
This project demonstrates how to create a multi-user chat in Python, with messages updating live across multiple clients.

##Features

1. Real-time messaging using Socket.IO
2. Messages appear on the right if sent by the user, on the left for others
3. Fully functional frontend with HTML, CSS, and JavaScript
4. Cross-browser compatible
5. Easy to extend with usernames, emojis, timestamps, and typing indicators

## Project Structure

```bash
  chat-app/
  │
  ├─ app.py                   
  ├─ requirements.txt         
  ├─ templates/
  │   └─ index.html           
  └─ static/
      ├─ script.js            
      ├─ styles.css           
      └─ fonts/               
```

## Installation

1. clone the repository:
  ```bash
  git clone https://github.com/Nabeel-Zawia/chat-app.git
  cd chat-app
  ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python app.py
   ```
4. Open your browser:
   ```bash
   http://127.0.0.1:5000
   ```
5. Open another browser or device to test real-time messaging.


## How It Works

1. Backend
   ```app.py
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
   ```
- Serves the HTML page and static assets
- Uses Flask-SocketIO to handle real-time message broadcasting

2. Frontend
   ```script.js
   document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messages = document.getElementById('messages');
    const input = document.getElementById('messeageToSend');
    const sendBtn = document.getElementById('sendMessage');

    sendBtn.addEventListener('click', () => {
        const msg = input.value.trim();
        if (!msg) return;
        socket.emit('chat message', msg);
        input.value = '';
    });

    socket.on('chat message', (data) => {
        const li = document.createElement('li');
        if (data.id === socket.id) {
            li.classList.add('user-message'); 
        } else {
            li.classList.add('other-message'); 
        }
        li.textContent = data.msg;
        messages.appendChild(li);
        messages.scrollTop = messages.scrollHeight;
    });
    });
   ```
- Connects to the server via Socket.IO
- Sends messages using socket.emit('chat message', msg)
- Receives messages using socket.on('chat message', callback)
- Compares socket.id to distinguish user messages from others


## Message Flow

  ```bash
  User types → frontend emits → server receives → server broadcasts → all clients display
  ```


## Future Features

- Add usernames
- Show typing indicators
- Add timestamps to messages
- Include emojis and rich text support
- Enhance UI with modern chat styles


## Author

Nabeel Zawia

