// modules/agent_extended.js

// פונקציה לשליחת מייל עם תוצאה
async function sendEmail(subject, body) {
  const emailData = {
    smtp_server: "smtp.gmail.com",
    smtp_port: 587,
    sender_email: "aifi.trader.bot@gmail.com",
    sender_password: "vfdj yedl gmnn zexj",
    recipient_email: "effi35@gmail.com",
    subject: subject,
    body: body
  };

  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) throw new Error('שליחת מייל נכשלה');
    console.log("✅ מייל נשלח בהצלחה");
  } catch (error) {
    console.error("❌ שגיאה בשליחת מייל:", error);
  }
}

// פונקציה לשמירת תוצאה לקובץ JSON
function saveAgentResult(resultData) {
  fetch('/save-result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resultData)
  })
  .then(response => {
    if (!response.ok) throw new Error('שמירת התוצאה נכשלה');
    console.log("✅ תוצאה נשמרה בהצלחה");
  })
  .catch(error => {
    console.error("❌ שגיאה בשמירת תוצאה:", error);
  });
}

// פונקציה להרצת Agent עם תוצאה
function runExtendedAgent(agentName, taskDescription) {
  const result = {
    agent: agentName,
    description: taskDescription,
    status: "completed",
    confidence: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString()
  };

  // שמירה + שליחה
  saveAgentResult(result);
  sendEmail(`תוצאה של ${agentName}`, JSON.stringify(result, null, 2));
}
