// chat.js — simple, robust frontend chat for /api/chat

(() => {
  const API_URL = "/api/chat";

  // ----- Create UI -----
  const style = document.createElement("style");
  style.textContent = `
    .chat-btn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 12px 14px;
      border-radius: 999px;
      border: none;
      background: #20c997;
      color: #062d23;
      font-weight: 700;
      cursor: pointer;
      z-index: 9999;
    }
    .chat-box {
      position: fixed;
      bottom: 80px;
      left: 20px;
      width: 320px;
      height: 400px;
      background: #111;
      color: #fff;
      border-radius: 14px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      box-shadow: 0 20px 40px rgba(0,0,0,.4);
      font-family: system-ui, -apple-system, Arial, sans-serif;
    }
    .chat-head {
      padding: 10px 12px;
      background: #1a1a1a;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chat-body {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .msg {
      padding: 8px 10px;
      border-radius: 10px;
      max-width: 85%;
      font-size: 13px;
      white-space: pre-wrap;
    }
    .user { background: #20c997; color: #062d23; align-self: flex-end; }
    .bot { background: #2a2a2a; align-self: flex-start; }
    .chat-foot {
      display: flex;
      gap: 8px;
      padding: 10px;
      border-top: 1px solid #222;
    }
    .chat-input {
      flex: 1;
      padding: 8px 10px;
      border-radius: 10px;
      border: none;
      outline: none;
    }
    .chat-send {
      padding: 8px 12px;
      border-radius: 10px;
      border: none;
      background: #20c997;
      font-weight: 700;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.className = "chat-btn";
  btn.textContent = "AI Chat";

  const box = document.createElement("div");
  box.className = "chat-box";

  box.innerHTML = `
    <div class="chat-head">
      <span>Aslama AI</span>
      <button style="background:none;border:none;color:#fff;cursor:pointer">✕</button>
    </div>
    <div class="chat-body"></div>
    <div class="chat-foot">
      <input class="chat-input" placeholder="Type a message…" />
      <button class="chat-send">Send</button>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(box);

  const closeBtn = box.querySelector(".chat-head button");
  const body = box.querySelector(".chat-body");
  const input = box.querySelector(".chat-input");
  const sendBtn = box.querySelector(".chat-send");

  btn.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    box.style.flexDirection = "column";
    input.focus();
  };

  closeBtn.onclick = () => {
    box.style.display = "none";
  };

  const addMsg = (cls, text) => {
    const d = document.createElement("div");
    d.className = `msg ${cls}`;
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  };

  // ----- Send logic -----
  const send = async () => {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    addMsg("user", text);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const raw = await res.text();

      let reply;
      try {
        const json = JSON.parse(raw);
        reply =
          json.reply ??
          json.response ??
          json.message ??
          json.content ??
          JSON.stringify(json);
      } catch {
        reply = raw;
      }

      addMsg("bot", reply || "No response.");
    } catch (err) {
      addMsg("bot", "Server error. Please try again.");
      console.error(err);
    }
  };

  sendBtn.onclick = send;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
  });
})();
