# 📊 Average Calculator Microservice

This project is a Node.js-based microservice that calculates a moving average of unique numbers fetched from third-party number streams. It supports four types of number IDs:

- `p` → Prime numbers
- `f` → Fibonacci numbers
- `e` → Even numbers
- `r` → Random numbers

It maintains a sliding window of the latest **10 unique numbers** and returns the average along with the window states.

---

## 🗂 Folder Structure

average-calculator-service/
├── average-microservice/
│ └── index.js # Main average calculator microservice
├── fake-api/
│ └── fake-api.js # Local testing server to simulate third-party APIs
├── screenshots/
│ └── sample-response.png # Screenshot showing a sample response
└── README.md

---

## ⚙️ How It Works

- The microservice exposes a single GET API endpoint:


- Supported IDs:  
- `p` → Primes  
- `f` → Fibonacci  
- `e` → Even  
- `r` → Random

- On each request:
- It fetches numbers from a third-party API (or fake API during testing)
- Stores only **unique** numbers
- Maintains a maximum of `10` values (oldest values are removed)
- Returns:
  - Previous window state
  - Current window state
  - Numbers fetched in this request
  - Calculated average (rounded to 2 decimal places)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install express axios
