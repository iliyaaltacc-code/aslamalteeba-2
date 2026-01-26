/* chat.js — drop-in frontend chat widget for Vercel API route: /api/chat
   Usage: include <script src="/chat.js" defer></script> on your pages.
*/

(() => {
  "use strict";

  // ---------- Config ----------
  const API_PATH = "/api/chat";
  const MAX_HISTORY = 12;

  // Basic locale detection by URL path
  const path = (location.pathname || "/").toLowerCase();
  const locale = path.startsWith("/ar") ? "ar" : path.startsWith("/fa") ? "fa" : "en";

  const STRINGS = {
    en: {
      title: "Aslama AI Assistant",
      subtitle: "Ask about sizes, brands, or availability.",
      open: "AI Chat",
      placeholder: "Type a question…",
      send: "Send",
      intro: "Welcome to Aslama Alteeba. How can the team help with tires, sizing, or availability?",
      unavailable: "Sorry, the assistant is unavailable right now. Please try again later.",
      network: "Network error. Please try again.",
      close: "Close",
    },
    ar: {
      title: "مساعد أسلاما الذكي",
      subtitle: "اسأل عن المقاسات أو العلامات أو التوفر.",
      open: "محادثة",
      placeholder: "اكتب سؤالك…",
      send: "إرسال",
      intro: "مرحبًا بك في أسلاما ألتيبا. كيف يمكننا مساعدتك بخصوص الإطارات أو المقاسات أو التوفر؟",
      unavailable: "عذرًا، المساعد غير متاح الآن. حاول مرة أخرى لاحقًا.",
      network: "خطأ في الاتصال. حاول مرة أخرى.",
      close: "إغلاق",
    },
    fa: {
      title: "دستیار هوشمند اسلما",
      subtitle: "درباره سایز، برند یا موجودی بپرسید.",
      open: "چت",
      placeholder: "سوالتان را بنویسید…",
      send: "ارسال",
      intro: "به اسلما آلتیبا خوش آمدید. چگونه می‌توانیم درباره لاستیک، سایز یا موجودی کمک کنیم؟",
      unavailable: "متأسفیم، دستیار فعلاً در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.",
      network: "خطای شبکه. لطفاً دوباره تلاش کنید.",
      close: "بستن",
    },
  };

  const T = STRINGS[locale] || STRINGS.en;

  // ---------- Helpers ----------
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "style") node.setAttribute("style", v);
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, String(v));
    }
    for (const child of Array.isArray(children) ? children : [children]) {
      if (child == null) continue;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    }
    return node;
  };

  const escapeText = (s) => (s ?? "").toString();

  // ---------- Inject Styles ----------
  const style = el("style", {}, `
    .aslama-chat-btn {
      position: fixed;
      bottom: 18px;
      left: 18px;
      z-index: 999999;
      border: 0;
      padding: 12px 14px;
      border-radius: 999px;
      background: #20c997;
      color: #072b22;
      font: 600 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      cursor: pointer;
      box-shadow: 0 12px 30px rgba(0,0,0,.25);
    }
    .aslama-chat-wrap {
      position: fixed;
      bottom: 72px;
      left: 18px;
      width: 360px;
      max-width: calc(100vw - 36px);
      height: 420px;
      max-height: calc(100vh - 120px);
      z-index: 999999;
      background: rgba(18, 18, 18, 0.92);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 16px;
      overflow: hidden;
      display: none;
      box-shadow: 0 18px 40px rgba(0,0,0,.35);
      color: #fff;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    }
    .aslama-chat-wrap[dir="rtl"] { direction: rtl; }
    .aslama-chat-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 12px 10px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      gap: 10px;
    }
    .aslama-chat-head h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 750;
    }
    .aslama-chat-head p {
      margin: 3px 0 0;
      font-size: 12px;
      opacity: 0.8;
    }
    .aslama-chat-close {
      border: 0;
      width: 30px;
      height: 30px;
      border-radius: 10px;
      background: rgba(255,255,255,0.10);
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      line-height: 30px;
    }
    .aslama-chat-body {
      height: calc(100% - 112px);
      overflow: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .aslama-msg {
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.35;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .aslama-msg.bot {
      background: rgba(255,255,255,0.10);
      align-self: flex-start;
    }
    .aslama-msg.user {
      background: #20c997;
      color: #072b22;
      align-self: flex-end;
    }
    .aslama-chat-foot {
      padding: 10px 12px 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .aslama-input {
      flex: 1;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(0,0,0,0.25);
      color: #fff;
      border-radius: 12px;
      padding: 10px 12px;
      outline: none;
      font-size: 13px;
    }
    .aslama-send {
      border: 0;
      padding: 10px 14px;
      border-radius: 12px;
      background: #20c997;
      color: #072b22;
      cursor: pointer;
      font-weight: 750;
      font-size: 13px;
    }
    .aslama-send:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .aslama-note {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 4px;
    }
  `);
  document.head.appendChild(style);

  // ---------- Build UI ----------
  const btn = el("button", { class: "aslama-chat-btn", type: "button", "aria-label": T.open }, T.open);

  const headerLeft = el("div", {}, [
    el("h3", {}, T.title),
    el("p", {}, T.subtitle),
  ]);

  const closeBtn = el("button", { class: "aslama-chat-close", type: "button", title: T.close, "aria-label": T.close }, "×");

  const head = el("div", { class: "aslama-chat-head" }, [headerLeft, closeBtn]);
  const body = el("div", { class: "aslama-chat-body" });
  const input = el("input", { class: "aslama-input", type: "text", placeholder: T.placeholder, autocomplete: "off" });
  const send = el("button", { class: "aslama-send", type: "button" }, T.send);

  const foot = el("div", { class: "aslama-chat-foot" }, [input, send]);

  const wrap = el("div", { class: "aslama-chat-wrap", role: "dialog", "aria-label": T.title }, [head, body, foot]);
  if (locale === "ar" || locale === "fa") wrap.setAttribute("dir", "rtl");

  document.body.appendChild(btn);
  document.body.appendChild(wrap);

  // ---------- State ----------
  let history = []; // {role: 'user'|'assistant', content: string}
  let isOpen = false;

  const addMsg = (who, text) => {
    const msg = el("div", { class: `aslama-msg ${who === "user" ? "user" : "bot"}` }, escapeText(text));
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  };

  const setOpen = (open) => {
    isOpen = open;
    wrap.style.display = open ? "block" : "none";
    if (open) setTimeout(() => input.focus(), 50);
    try { localStorage.setItem("aslama_chat_open", open ? "1" : "0"); } catch {}
  };

  const loadOpen = () => {
    try { return localStorage.getItem("aslama_chat_open") === "1"; } catch { return false; }
  };

  // ---------- API Call ----------
  const callApi = async (userText) => {
    const payload = {
      message: userText,
      locale,
      history: history.slice(-MAX_HISTORY),
      page: location.pathname,
    };

    const res = await fetch(API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // If server returned non-JSON, this will throw; that's fine — we catch above.
    const data = await res.json();

    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
      throw new Error(msg);
    }

    // Accept a few possible response shapes
    const reply =
      (data && (data.reply || data.text || data.answer || data.output)) ??
      "";

    if (!reply) throw new Error("Empty reply");
    return reply;
  };

  // ---------- Send Flow ----------
  const doSend = async () => {
    const text = (input.value || "").trim();
    if (!text) return;

    input.value = "";
    send.disabled = true;
    input.disabled = true;

    addMsg("user", text);
    history.push({ role: "user", content: text });

    try {
      const reply = await callApi(text);
      addMsg("bot", reply);
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      // Fallback message
      const msg = (err && err.message) ? err.message : "";
      // If it's a network-ish error, show a nicer string
      const nice =
        msg.toLowerCase().includes("failed to fetch") ||
        msg.toLowerCase().includes("network") ||
        msg.toLowerCase().includes("timeout")
          ? T.network
          : T.unavailable;

      addMsg("bot", nice);
      // Keep history consistent (optional)
      history.push({ role: "assistant", content: nice });
      // Also log for debugging in DevTools
      console.error("Chat API error:", err);
    } finally {
      send.disabled = false;
      input.disabled = false;
      input.focus();
    }
  };

  // ---------- Events ----------
  btn.addEventListener("click", () => {
    if (!isOpen && body.childElementCount === 0) {
      addMsg("bot", T.intro);
      history.push({ role: "assistant", content: T.intro });
    }
    setOpen(!isOpen);
  });

  closeBtn.addEventListener("click", () => setOpen(false));

  send.addEventListener("click", doSend);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSend();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });

  // Restore open state (optional)
  setOpen(loadOpen());

  // If reopened, ensure intro exists
  if (isOpen && body.childElementCount === 0) {
    addMsg("bot", T.intro);
    history.push({ role: "assistant", content: T.intro });
  }
})();
