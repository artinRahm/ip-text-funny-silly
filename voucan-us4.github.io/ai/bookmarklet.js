(function() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    var button = document.createElement('button');
    button.style.position = 'fixed';
    button.style.bottom = '100px';
    button.style.right = '20px';
    button.style.width = '60px';
    button.style.height = '60px';
    button.style.background = 'gray';
    button.style.borderRadius = '50%';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.zIndex = '9999';
    button.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
    button.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';

    var icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-robot');
    icon.style.fontSize = '30px';
    icon.style.color = 'white';
    icon.style.transition = 'transform 0.3s';

    button.appendChild(icon);
    document.body.appendChild(button);

    var iframe = document.createElement('iframe');
    iframe.srcdoc = `
<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-K8CCSDNPV3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K8CCSDNPV3');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>US4 - AI</title>
    <link href="/storage/css/style.css" rel="stylesheet">
<style>
body {
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-weight: bold;
  background-color: #1a1a1a;
  color: white;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  color: #ddd;
  margin-top: 20px;
}

#chat-container {
  border: none;
  height: auto;
  width: 90%;
  max-width: 600px;
  margin-top: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
}

#input-container {
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 600px;
  margin-bottom: 20px;
}

#user-input {
  flex-grow: 1;
  padding: 14px;
  font-size: 16px;
  border-radius: 10px;
  background-color: #333;
  color: white;
  border: 1px solid #444;
  margin-right: 10px;
  resize: none;
  min-height: 50px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

#user-input:focus {
  background-color: #444;
  outline: none;
  border-color: #666;
}

#send-button {
  width: 50px;
  height: 50px;
  background-color: #444;
  color: white;
  border-radius: 50%;
  border: 1px solid #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

#send-button::before {
  content: "↑";
  font-size: 22px;
  font-weight: bold;
}

#send-button:hover {
  background-color: #666;
  transform: scale(1.1);
}

#send-button:active {
  background-color: #888;
}

.message {
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  border-radius: 18px;
  max-width: 75%;
  word-wrap: break-word;
  line-height: 1.4;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: visible;
  min-height: 50px;
  flex-wrap: wrap;
}

.message.user {
  flex-direction: row-reverse;
  text-align: right;
  background: #4a90e2;
  color: white;
  align-self: flex-end;
  padding: 12px 18px;
  border-radius: 18px 18px 4px 18px;
}

.message.bot {
  flex-direction: row;
  text-align: left;
  background: #444;
  color: white;
  align-self: flex-start;
  padding: 12px 18px;
  border-radius: 18px 18px 18px 4px;
}

.message img {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  border-radius: 50%;
}

.message div {
  word-break: break-word;
  white-space: pre-wrap;
  flex-grow: 1;
  width: 100%;
}

.code-block {
  position: relative;
  background: #1e1e1e;
  color: #ffffff;
  font-family: monospace;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
  max-width: 95%;
  white-space: pre-wrap;
  display: block;
  width: auto;
  margin-right: auto;
}

.code-block pre {
  margin: 0;
  padding: 0;
  overflow-x: auto;
  width: 100%;
}

.copy-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.copy-btn:hover {
  background: #0056b3;
}

@media (max-width: 600px) {
  #chat-container, #input-container {
    width: 95%;
  }
  #send-button {
    width: 45px;
    height: 45px;
  }
}
</style>
</head>
<body>
    <div id="chat-container">
<div class="message bot"><img src="https://voucan-us4.github.io/ai/logo.png" class="message-icon"><span>Hello! How can I help you?</span></div>
</div>
    <div id="input-container">
        <textarea id="user-input" placeholder="Type your message here..."></textarea>
        <button id="send-button"></button>
    </div>
    <script src="https://voucan-us4.github.io/storage/js/ai-html.js"></script>
</body>
</html>`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '100px';
    iframe.style.right = '20px';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '2px solid #000';
    iframe.style.background = '#fff';
    iframe.style.borderRadius = '8px';
    iframe.style.visibility = 'hidden';
    iframe.style.opacity = '0';
    iframe.style.zIndex = '9999';
    iframe.style.overflowY = 'auto';
    iframe.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.4)';
    iframe.style.transition = 'all 0.4s ease';

    document.body.appendChild(iframe);

    button.addEventListener('click', function() {
        var isOpen = iframe.style.width === '450px';

        if (!isOpen) {
            iframe.style.visibility = 'visible';
            iframe.style.opacity = '1';
            iframe.style.width = '450px';
            iframe.style.height = '450px';
            iframe.style.bottom = '60px';
            iframe.style.right = '100px';
            iframe.style.transform = 'scale(1)';
            icon.classList.replace('fa-robot', 'fa-times');
            button.style.backgroundColor = '#ffc700';
            button.style.width = '70px';
            button.style.height = '70px';
            icon.style.transform = 'rotate(180deg)';
        } else {
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.bottom = '100px';
            iframe.style.right = '20px';
            iframe.style.transform = 'scale(0)';
            icon.classList.replace('fa-times', 'fa-robot');
            button.style.backgroundColor = 'gray';
            button.style.width = '60px';
            button.style.height = '60px';
            icon.style.transform = 'rotate(0deg)';
            
            setTimeout(() => {
                iframe.style.visibility = 'hidden';
                iframe.style.opacity = '0';
            }, 400);
        }
    });
})();
