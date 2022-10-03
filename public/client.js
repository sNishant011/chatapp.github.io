const socket = io()
let username;
let textarea = document.querySelector('#textarea')
const messageForm = document.getElementById("message_form")
let messageArea = document.querySelector('.message__area')
username = prompt('Please enter your name: ')

// setting initial focus to text area
textarea.focus();

if (!username) {
  fetch("https://randomuser.me/api/?nat=us&randomapi").then((res) => res.json()).then(data => {
    username = data.results[0].login.username;
  }).catch((err) => {
    console.log(err);
    username = "randomuser";
  }).catch((err) => {
    console.log(err);
    username = "randomuser";
  })
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (textarea.value) {
    sendMessage(textarea.value);
  }
});

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



