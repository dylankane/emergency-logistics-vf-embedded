
(function () {
  // Collect metadata (collecting URL and language)
  const metadata = {
    type: 'pageLoad',
    url: window.location.href,
    language: navigator.language,
  };

  // Generate or retrieve User ID for the session using cookies
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Generate or retrieve User ID
  let userID = getCookie('userID');
  if (!userID) {
    userID = 'user_' + Date.now(); // Simple unique ID using timestamp
    setCookie('userID', userID, 1); // Cookie expires in 1 day
  }

  // Function to create the Chat UI
  function createChatUI() {
    const chatPlaceholder = document.getElementById('chat-placeholder-2');
    if (!chatPlaceholder) {
      console.log('Chat placeholder not found.');
      return;
    }

    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';

    // Create chat header, chat box, input area, and buttons
    chatContainer.innerHTML = `
      <div id="chat-header">✨Consulta el estado de la entrega en vivo✨</div>
      <div id="chat-box"></div>
      <div id="chat-buttons">
        <button class="preset-button preset-style" data-message="search delivery details">Entregas</button>
        <button class="preset-button preset-style" data-message="order items query">Artículos de entrega</button>
        <button class="preset-button preset-style" data-message="personnel data">Personal</button>
      </div>
      <div id="chat-input">
        <button id="toggleButton" class="preset-button" data-message="mute"><i class="fas fa-volume-up"></i></button>
        <input type="text" id="message-input" placeholder="Type your message here...">
        <button id="send-button">➤</button>
        <button id="mic-button" title="Click to speak"><i class="fa fa-microphone"></i></button>
      </div>
      <div id="special-message-box"></div>
    `;
    chatPlaceholder.appendChild(chatContainer);

    // Inject CSS styles for the chat UI
    const style = document.createElement('style');
    style.innerHTML = `
      /* Chat container styling */
      #chat-container {
        width: 90%;
        max-height: 800px;
        background-color: #f5f5f5;
        border: none;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        margin: 20px auto;
      }
      /* Chat header styling */
      #chat-header {
        background-color: #f5f5f5;
        color: #54595F;
        padding: 10px;
        text-align: left;
      }
      /* Chat box styling */
      #chat-box {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        background-color: #f5f5f5;
      }
      /* special-message-box styling */
      #special-message-box {
        flex: 1;
        max-height: 300px
        padding: 10px;
        overflow-y: auto;
        background-color: #f5f5f5;
		margin-top: 20px;
      }
      /* Message styling */
      .message {
        margin: 8px 0;
        padding: 5px 25px;
        border-radius: 25px;
        display: block;
        width: fit-content;
        max-width: 80%;
        word-wrap: break-word;
      }
      /* User message styling */
      .user-message {
        background-color: #ff5757;
        color: #ffffff;
        align-self: flex-end;
        text-align: right;
        margin-left: auto; 
      }
      /* Bot message styling */
      .bot-message {
        background-color: #e0e0e0;
        color: #333333;
        align-self: flex-start;
        text-align: left;
        margin-right: auto;
      }
      /* Chat input container styling */
      #chat-input {
        display: flex;
        padding: 10px;
        border-top: 1px solid #54595F;
        align-items: center;
      }
      /* Message input styling */
      #message-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #000000;
        border-radius: 10px;
        outline: none;
        height: 40px;
      }
      /* Button styling */
      #send-button, #mic-button, #toggleButton {
        background-color: #ff5757;
        color: #f5f5f5;
        border: none;
        padding: 10px 25px;
        margin-left: 10px;
        border-radius: 15px;
        cursor: pointer;
      }
      #send-button:hover, #mic-button:hover, toggleButton:hover {
        background-color: #f5f5f5;
        color: #ff5757;
        border: 1px solid #000000;
      }
      #mic-button {
        /*font-size: 1.2em;*/
      }
      #toggleButton {
        margin-right: 10px;
      }
      /* Preset buttons styling */
      #chat-buttons {
        display: flex;
        justify-content: space-around;
        padding: 10px;
      }
      .preset-style {
        background-color: #0c1238;
        color: #f5f5f5;
        border: 1px solid #000000;
        padding: 5px 10px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 0.8em;
      }
      .preset-style:hover {
        background-color: #f5f5f5;
        color: #000000;
        border: 1px solid #000000;
      }
      /* Loading dots animation */
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
      }
      .loading-dot {
        width: 4px;
        height: 4px;
        margin: 0 3px;
        background-color: #54595F;
        border-radius: 50%;
        animation: loadingDot 1s infinite;
      }
      .loading-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      .loading-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      @keyframes loadingDot {
        0%, 20%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.5);
        }
      }
    `;
    document.head.appendChild(style);

    // Chat elements
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const micButton = document.getElementById('mic-button');
    const toggleButton = document.getElementById('toggleButton');
    const presetButtons = document.querySelectorAll('.preset-button');

    // Add initial loading animation before bot response
    const initialLoadingDiv = document.createElement('div');
    initialLoadingDiv.classList.add('message', 'bot-message', 'loading');
    initialLoadingDiv.innerHTML = `
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    `;
    chatBox.appendChild(initialLoadingDiv);

    // Handle sending user messages
    sendButton.addEventListener('click', () => {
      sendMessage(messageInput, sendButton, micButton, presetButtons);
    });

    messageInput.addEventListener('keypress', (event) => {
      const loadingDivExists = document.querySelector('.loading');
      if (event.key === 'Enter' && !loadingDivExists) {
        event.preventDefault();
        sendMessage(messageInput, sendButton, micButton, presetButtons);
      }
    });

    presetButtons.forEach(button => {
  		button.addEventListener('click', () => {
    		const message = button.getAttribute('data-message');
    	// Set hideMessage to true so the message is not appended to the chat box
    	sendMessage(messageInput, sendButton, micButton, presetButtons, message, true);
  		});
	});


    // Handle microphone button for speech-to-text
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US'; // Default to English; change dynamically if needed
      recognition.interimResults = false;

      micButton.addEventListener('click', () => {
        recognition.start();
      });

      recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript; // Populate input field with transcription
        // Add a delay before sending the message to ensure full transcription is visible
        setTimeout(() => {
          sendMessage(messageInput, sendButton, micButton, presetButtons);
        }, 700); // 500ms delay for better user experience
      });

      recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
      });
    } else {
      console.warn('Speech Recognition not supported in this browser.');
      micButton.style.display = 'none'; // Hide microphone button if unsupported
    }

    // Toggle button functionality for volume icon
    toggleButton.addEventListener('click', () => {
      const icon = toggleButton.querySelector('i');
      if (icon.classList.contains('fa-volume-up')) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
      } else {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
      }
    });

    // Send initial request to the backend on page load
    window.addEventListener('load', () => {
      // Disable inputs while waiting for bot response
      disableInputs(messageInput, sendButton, micButton, presetButtons);

      fetch('https://5000-dylankane-emergencylogi-emlpoc5742k.ws-eu116.gitpod.io/api/chatbot2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: '',
          userID: userID,
          metadata,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Voiceflow Response:', data); // Log response for debugging
          // Remove initial loading animation
          chatBox.removeChild(initialLoadingDiv);
          enableInputs(messageInput, sendButton, micButton, presetButtons); // Re-enable inputs after bot response

          if (data && Array.isArray(data)) {
            data.forEach(item => {
              if (item.payload && item.payload.message) {
                const botMessage = item.payload.message;
                processBotMessage(botMessage); // Process the bot message
              }
            });
          }
        })
        .catch(error => {
          console.error('Error sending initial message to backend:', error);
          // Remove initial loading animation on error
          chatBox.removeChild(initialLoadingDiv);
          enableInputs(messageInput, sendButton, micButton, presetButtons); // Re-enable inputs on error
          // Append error message to chat UI
          appendMessage('Lo sentimos, no se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde.', 'bot');
        });
    });
  }
  createChatUI();

  function appendSpecialMessage(message) {
    const specialMessageBox = document.getElementById('special-message-box');
    if (!specialMessageBox) {
      console.error('Special message box not found.');
      return;
    }
    console.log('Appending to special-message-box:', message); // Debug log
  
    // Clear existing content and add the new message
    specialMessageBox.innerHTML = message; // Directly replace the content of the special message box
  }
  

  // Append message to chat UI
  function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

    if (message.includes('<audio') || message.includes('<table')) {
      messageDiv.innerHTML = message; // Insert as HTML to allow tables and audio
    } else {
      messageDiv.textContent = message;
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

function sendMessage(messageInput, sendButton, micButton, presetButtons, message, hideMessage = false) {
  const userMessage = message || messageInput.value.trim();
  if (userMessage === '') return;

  // Append the message to the chat only if `hideMessage` is false
  if (!hideMessage) {
    appendMessage(userMessage, 'user');
  }

  messageInput.value = '';

  // Disable inputs while waiting for bot response
  disableInputs(messageInput, sendButton, micButton, presetButtons);

  // Add loading animation
  const loadingDiv = document.createElement('div');
  const chatBox = document.getElementById('chat-box');
  loadingDiv.classList.add('message', 'bot-message', 'loading');
  loadingDiv.innerHTML = `
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  `;
  chatBox.appendChild(loadingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Send user message to backend
  fetch('https://5000-dylankane-emergencylogi-emlpoc5742k.ws-eu116.gitpod.io/api/chatbot2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: userMessage,
      userID: userID,
      metadata,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Voiceflow Response:', data); // Log response for debugging
      // Remove loading animation
      if (chatBox.contains(loadingDiv)) {
        chatBox.removeChild(loadingDiv);
      }
      enableInputs(messageInput, sendButton, micButton, presetButtons); // Re-enable inputs after bot response

      if (data && Array.isArray(data)) {
        data.forEach(item => {
          if (item.payload && item.payload.message) {
            const botMessage = item.payload.message;
            processBotMessage(botMessage); // Process the bot message
          }
        });
      }
    })
    .catch(error => {
      console.error('Error sending user message to backend:', error);
      // Remove loading animation on error
      if (chatBox.contains(loadingDiv)) {
        chatBox.removeChild(loadingDiv);
      }
      enableInputs(messageInput, sendButton, micButton, presetButtons); // Re-enable inputs on error
      // Append error message to chat UI
      appendMessage('Lo sentimos, no se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde.', 'bot');
    });
}


  // Function to disable user inputs and buttons
  function disableInputs(messageInput, sendButton, micButton, presetButtons) {
    messageInput.disabled = false;
    sendButton.disabled = true;
    micButton.disabled = true;
    presetButtons.forEach(button => {
      button.disabled = true;
    });
  }

  // Function to enable user inputs and buttons
  function enableInputs(messageInput, sendButton, micButton, presetButtons) {
    messageInput.disabled = false;
    sendButton.disabled = false;
    micButton.disabled = false;
    presetButtons.forEach(button => {
      button.disabled = false;
    });
  }

  // Function to process bot messages
  function processBotMessage(botMessage) {
    if (botMessage.startsWith('Type: order_items')) {
      // Remove "Type: order_items, " from the beginning
      const content = botMessage.replace(/^Type:\s*order_items,\s*/, '');
      // Split content into individual item key-value pairs
      const keyValuePairs = content.split(',');

      // Convert key-value pairs into an array of objects
      const items = [];
      let currentItem = {};
      keyValuePairs.forEach(pair => {
        const [key, value] = pair.split(':').map(item => item.trim());
        if (key === 'order_no' && Object.keys(currentItem).length > 0) {
          items.push(currentItem);
          currentItem = {};
        }
        currentItem[key] = value;
      });
      // Push the last item
      if (Object.keys(currentItem).length > 0) {
        items.push(currentItem);
      }

      // Generate HTML table from items
      let tableHTML = '<table border="1" cellspacing="0" cellpadding="5"><thead><tr><th>Order No</th><th>Item Name</th><th>Quantity</th><th>Description</th></tr></thead><tbody>';
      items.forEach(item => {
        tableHTML += `<tr><td>${item.order_no || ''}</td><td>${item.item_name || ''}</td><td>${item.quantity || ''}</td><td>${item.item_description || ''}</td></tr>`;
      });
      tableHTML += '</tbody></table>';

      // Append table to chat UI
      appendSpecialMessage(tableHTML);
    } else {
      appendMessage(botMessage, 'bot');
    }
  }
})();
