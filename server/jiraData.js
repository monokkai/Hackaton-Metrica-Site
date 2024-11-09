const express = require("express");
const { simpleParser } = require("mailparser");
const Imap = require("imap");
const axios = require("axios");

// Конфигурация почты и JIRA
const MAIL_HOST = "imap"; //почта для проверки
const MAIL_USER = "example";
const MAIL_PASS = "PASSWORD";
const JIRA_URL = "URL";
const JIRA_USER = "EMAIL"; //их собственный email
const JIRA_API_TOKEN = "some";
const ALLOWED_SENDER = "example";

const app = express();
app.use(express.json());

// Функция для получения писем
const fetchEmails = () => {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: MAIL_USER,
      password: MAIL_PASS,
      host: MAIL_HOST,
      port: 993,
      tls: true,
    });

    imap.once("ready", function () {
      imap.openBox("INBOX", false, function (err, box) {
        if (err) reject(err);
        imap.search(
          ["UNSEEN", ["FROM", ALLOWED_SENDER]],
          function (err, results) {
            if (err) reject(err);
            if (!results.length) {
              resolve([]); // Нет новых писем
            } else {
              const fetch = imap.fetch(results, { bodies: "" });
              let emails = [];

              fetch.on("message", (msg) => {
                msg.on("body", (stream, info) => {
                  simpleParser(stream, (err, parsed) => {
                    if (err) reject(err);
                    emails.push({
                      subject: parsed.subject,
                      body: parsed.text,
                    });
                  });
                });
              });

              fetch.once("end", () => {
                resolve(emails);
                imap.end();
              });
            }
          }
        );
      });
    });

    imap.once("error", (err) => {
      reject(err);
    });

    imap.connect();
  });
};

// Функция для обработки данных (вместо этого вы можете вызвать свою модель ML)
const processEmail = (body) => {
  return `Результат обработки: ${body}`;
};

// Функция для отправки данных в JIRA
const sendToJira = async (issue) => {
  const payload = {
    fields: {
      project: {
        key: "PROJECT_KEY",
      },
      summary: issue.summary,
      description: issue.description,
      issuetype: {
        name: "Task",
      },
    },
  };

  const response = await axios.post(JIRA_URL, payload, {
    auth: {
      username: JIRA_USER,
      password: JIRA_API_TOKEN,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// API для проверки писем
app.get("/check-emails", async (req, res) => {
  try {
    const emails = await fetchEmails();
    for (const email of emails) {
      const result = processEmail(email.body);
      const issue = {
        summary: email.subject,
        description: result,
      };
      await sendToJira(issue);
    }
    res.json({ status: "Processed", emails: emails.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
