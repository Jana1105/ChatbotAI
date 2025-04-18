function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  input.value = "";

  setTimeout(() => {
    handleUserInput(message);
  }, 300);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", `${sender}-message`);
  messageDiv.innerHTML = text.replace(/\n/g, "<br>");
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendBotResponse(responseText) {
  appendMessage("bot", responseText);
}

function handleUserInput(message) {
  const msg = message.toLowerCase();

  if (msg.includes("news")) {
    sendBotResponse(`
      📰 <strong>Latest News:</strong><br>
      <a href="https://cnn.com" target="_blank">CNN</a><br>
      <a href="https://bbc.com/news" target="_blank">BBC News</a><br>
      <a href="https://news.google.com" target="_blank">Google News</a>
    `);
  } else if (msg.includes("sports") || msg.includes("live score")) {
    sendBotResponse(`
      🏟️ <strong>Sports Scores:</strong><br>
      <a href="https://www.espn.com" target="_blank">ESPN</a><br>
      <a href="https://www.flashscore.com" target="_blank">FlashScore</a>
    `);
  } else if (msg.includes("who is") || msg.includes("wikipedia")) {
    const keyword = msg.replace("who is", "").replace("wikipedia", "").trim();
    sendBotResponse(`📚 <a href="https://en.wikipedia.org/wiki/${keyword.replace(/ /g, "_")}" target="_blank">${keyword} - Wikipedia</a>`);
  } else if (msg.includes("weather in")) {
    const city = msg.replace("weather in", "").trim();
    sendBotResponse(`
      ☁️ <strong>Weather in ${city}:</strong><br>
      <a href="https://weather.com/weather/today/l/${city}" target="_blank">Weather.com</a><br>
      <a href="https://www.accuweather.com/en/search-locations?query=${city}" target="_blank">Accuweather</a>
    `);
  } else if (msg.includes("famous food in")) {
    const loc = msg.replace("famous food in", "").trim();
    sendBotResponse(`
      🍽️ <strong>Famous food in ${loc}:</strong><br>
      <a href="https://www.tasteatlas.com/search?search=${loc}" target="_blank">TasteAtlas</a><br>
      <a href="https://www.youtube.com/results?search_query=${loc}+famous+food" target="_blank">YouTube Recipes</a>
    `);
  } else {
    sendBotResponse("🤖 I didn’t get that. Try asking:<br>“news”, “sports”, “weather in Paris”, “famous food in Italy”, or “who is Elon Musk”.");
  }
}
