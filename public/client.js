const socket = io()
let username;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
username = prompt('Please enter your name: ')

if (!username) {
  fetch("https://randomuser.me/api/?nat=us&randomapi").then((res) => res.json()).then(data => {
    username = data.results[0].login.username;
    console.log(data)
  }).catch((err) => {
    console.log(err);
    username = "randomuser";
  }).catch((err) => {
    console.log(err);
    username = "randomuser";
  })
}

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value)
  }
})

function sendMessage(message) {
  let msg = {
    user: username,
    message: message.trim()
  }
  // Append 
  appendMessage(msg, 'outgoing')
  textarea.value = ''
  scrollToBottom()

  // Send to server 
  socket.emit('message', msg)

}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')
  const userTitle = document.createElement('h4');
  userTitle.innerText = msg.user;
  const userMessage = document.createElement('p');
  userMessage.innerText = msg.message;
  mainDiv.append(userTitle, userMessage);
  messageArea.appendChild(mainDiv);
}

// Recieve messages 
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming')
  scrollToBottom()
})

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight
}



