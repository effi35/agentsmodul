// agentManager.js

// משתנים גלובליים
let agentRunning = false;
let agentConfig = {};

// --- האזנה ללחיצות כפתורים ---
document.getElementById('startAgentBtn').addEventListener('click', startAgent);
document.getElementById('testAgentBtn').addEventListener('click', testAgent);
document.getElementById('advancedModeCheckbox').addEventListener('change', updateAgentType);

// --- התחלת סוכן ---
function startAgent() {
  const isAdvanced = document.getElementById('advancedModeCheckbox').checked;

  agentConfig = {
    type: isAdvanced ? "advanced" : "basic",
    createdAt: new Date().toISOString(),
    settings: generateAgentSettings(isAdvanced)
  };

  agentRunning = true;
  updateStatus("Agent started successfully.");
  saveAgentConfig(agentConfig);
  sendResultByEmail(agentConfig);
  pingAgent(); // הפעלת פינגים
}

// --- בדיקת ריצה ---
function testAgent() {
  if (agentRunning) {
    updateStatus("Agent is running correctly!");
    sendStatusEmail("Agent test successful.");
  } else {
    updateStatus("Agent is not running.");
    sendStatusEmail("Agent test failed - agent not running.");
  }
}

// --- מחולל הגדרות ---
function generateAgentSettings(isAdvanced) {
  return isAdvanced ? {
    autoRetry: true,
    errorCorrection: true,
    smartScheduling: true,
    backupAgent: true,
    maxTasks: 500,
    pingInterval: 30000
  } : {
    autoRetry: false,
    errorCorrection: false,
    smartScheduling: false,
    backupAgent: false,
    maxTasks: 50,
    pingInterval: 60000
  };
}

// --- עדכון תצוגת סטטוס ---
function updateStatus(message) {
  document.getElementById('statusArea').innerText = message;
}

// --- עדכון סוג סוכן לפי צ'קבוקס ---
function updateAgentType() {
  agentConfig.type = this.checked ? 'advanced' : 'simple';
}

// --- שמירת הגדרות לקובץ JSON ---
function saveAgentConfig(config) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
  const anchor = document.createElement('a');
  anchor.setAttribute("href", dataStr);
  anchor.setAttribute("download", "agent_config.json");
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

// --- שליחת התוצאה למייל דרך EmailJS ---
function sendResultByEmail(config) {
  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: 'default_service',
      template_id: 'template_default',
      user_id: 'user_default',
      template_params: {
        smtp_server: "smtp.gmail.com",
        smtp_port: 587,
        sender_email: "aifi.trader.bot@gmail.com",
        sender_password: "vfdj yedl gmnn zexj",
        recipient_email: "effi35@gmail.com",
        subject: "New Agent Configuration",
        message: JSON.stringify(config, null, 2)
      }
    })
  })
  .then(() => updateStatus("Agent configuration sent by email."))
  .catch(error => updateStatus("Failed to send email: " + error));
}

// --- שליחת עדכון סטטוס למייל ---
function sendStatusEmail(message) {
  fetch('/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: "Agent Status Update",
      body: message
    })
  })
  .then(res => res.json())
  .then(data => console.log('Email status:', data))
  .catch(error => console.error('Email send error:', error));
}

// --- מערכת פינגים לווידוא שהסוכן רץ ---
function pingAgent() {
  if (!agentRunning) return;

  setInterval(() => {
    fetch('https://your-server.com/ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentId: "agent123",
        timestamp: new Date().toISOString()
      })
    })
    .then(response => {
      if (!response.ok) throw new Error("Ping failed.");
      console.log("Ping successful.");
    })
    .catch(error => {
      console.error("Ping error:", error);
      agentRunning = false;
      updateStatus("Agent stopped (Ping error).");
      sendStatusEmail("Agent stopped due to ping error.");
    });
  }, agentConfig.settings.pingInterval);
}
