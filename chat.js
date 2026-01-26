(() => {
  const API_URL = "/api/chat";

  const btn = document.createElement("button");
  btn.textContent = "AI Chat";
  btn.style.cssText = `
    position:fixed;bottom:20px;left:20px;
    padding:12px 16px;border-radius:999px;
    background:#20c997;border:none;font-weight:700;
    cursor:pointer;z-index:9999;
  `;

  const box = document.createElement("div");
  box.style.cssText = `
    position:fixed;bottom:80px;left:20px;
    width:300px;height:360px;background:#111;
    color:#fff;border-radius:14px;
    display:none;flex-direction:column;
    z-index:9999;
  `;

  box.innerHTML = `
    <div style="padding:10px;font-weight:700;background:#1a1a1a">
      Aslama AI
    </div>
    <div id="chatBody" style="flex:1;padding:10px;overflow:auto"></div>
    <div style="display:flex;gap:6px;padding:10px">
      <input id="chatInput" placeholder="Type…" style="flex:1;padding:8px">
      <button id="chatSend">Send</button>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(box);

  btn.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    box.style.flexDirection = "column";
  };

  const body = box.querySelector("#chatBody");
  const input = box.querySelector("#chatInput");
  const sendBtn = box.querySelector("#chatSend");

  const add = (text, who) => {
    const d = document.createElement("div");
    d.textContent = text;
    d.style.margin = "6px 0";
    d.style.textAlign = who === "user" ? "right" : "left";
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  };

  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    add(text, "user");

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    add(data.reply || "No reply", "bot");
  };
})();
