# LLmind

use api key in .env file due to the expiration of free credit the api key is not listed here

# 🧠 LLMind - Multi-LLM Response Aggregator

LLMind is a lightweight web app that allows users to query multiple LLMs (like OpenAI, Meta, DeepSeek, etc.) and automatically selects the best response based on a simple heuristic. It’s designed to compare outputs from different LLMs and help users pick the most informative or relevant result.

---

## 🚀 Features

- Query multiple LLMs simultaneously
- Get the **best** response selected automatically
- Intuitive UI built with React
- Easy integration with HuggingFace or OpenAI APIs
- Plug-and-play backend using Express

---

## 🛠️ Tech Stack

- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **APIs Used:** Hugging Face Inference API *(Free, public access with token)*

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/llmind.git
cd llmind
cd client
npm install
cd ../server
npm install
```
🔑 Setup Hugging Face API (Backend)
Go to https://huggingface.com

Sign in and generate a free access token from your settings page

Replace your_huggingface_api_token in server.js with your token.

▶️ Running the App
1. Start Backend

cd server
node server.js

2. Start Frontend
In another terminal:

cd client
npm start
Open http://localhost:3000 in your browser.

📂 Project Structure
bash
Copy code
llmind/
├── client/          # React frontend
│   ├── App.js
│   └── ...
├── server/          # Node.js backend
│   └── server.js
└── README.md
🧪 Future Improvements
Better "best response" heuristics using NLP

Response rating system by users

Add more free LLM sources

Switch models dynamically

💡 License
MIT License

👤 Author
Made with 💻 by Deepesh Narayan Prasad









