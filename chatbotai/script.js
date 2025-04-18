const NEWS_API_KEY = 'your_newsapi_key'; // Get a free key from https://newsapi.org

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  input.value = "";

  setTimeout(() => {
    handleBotReply(message);
  }, 500);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.innerHTML = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleBotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("news")) {
    fetchLatestNews();
  } else if (msg.includes("sports") || msg.includes("score")) {
    showSportsLinks();
  } else if (msg.includes("website") || msg.includes("link")) {
    showUsefulLinks();
  } else {
    const reply = generateReply(msg);
    appendMessage("bot", reply);
  }
}

function generateReply(msg) {
  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hello! How can I assist you?";
  } else if (msg.includes("how are you")) {
    return "I'm doing well, thank you!";
  } else if (msg.includes("your name")) {
    return "I'm your AI chatbot assistant!";
  } else {
    return "I'm not sure about that. Try asking for 'news', 'sports score', or 'website links'.";
  }
}

// 📰 News API Function
function fetchLatestNews() {
  fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=${NEWS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.articles && data.articles.length > 0) {
        let newsReply = "<strong>📰 Latest News:</strong><ul>";
        data.articles.forEach(article => {
          newsReply += `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`;
        });
        newsReply += "</ul>";
        appendMessage("bot", newsReply);
      } else {
        appendMessage("bot", "Sorry, I couldn't fetch news right now.");
      }
    })
    .catch(error => {
      console.error(error);
      appendMessage("bot", "Error fetching news.");
    });
}

// 🏈 Sports Scores (static or links)
function showSportsLinks() {
  const links = `
    <strong>🏟️ Check Live Sports Scores:</strong>
    <ul>
      <li><a href="https://www.espn.com" target="_blank">ESPN</a></li>
      <li><a href="https://www.bbc.com/sport" target="_blank">BBC Sport</a></li>
      <li><a href="https://www.flashscore.com" target="_blank">FlashScore</a></li>
    </ul>
  `;
  appendMessage("bot", links);
}

// 🌐 Useful Links
function showUsefulLinks() {
  const links = `
    <strong>🔗 Helpful Websites:</strong>
    <ul>
      <li><a href="https://www.google.com" target="_blank">Google</a></li>
      <li><a href="https://www.wikipedia.org" target="_blank">Wikipedia</a></li>
      <li><a href="https://www.stackoverflow.com" target="_blank">Stack Overflow</a></li>
    </ul>
  `;
  appendMessage("bot", links);
}
