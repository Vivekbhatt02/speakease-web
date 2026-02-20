# SpeakEase Web ♿🔊

**SpeakEase Web** is an **offline-first Progressive Web App (PWA)** that converts text into natural speech, designed to help **people who cannot speak** communicate easily and independently.

Built with **React**, **Material UI**, and **Web Speech API**, SpeakEase focuses on **accessibility, simplicity, and reliability**, even without an internet connection.

---

## 🌟 Why SpeakEase?

Millions of people face temporary or permanent speech challenges due to medical conditions, disabilities, or injuries. SpeakEase aims to provide a **simple, dignified, and fast way to communicate** using text-to-speech — anytime, anywhere.

Inspired by real-world needs and assistive technology use cases.

---

## ✨ Features

- 🔊 **Text to Speech** (English)
- 📦 **Works Offline** (PWA + caching)
- 📱 **Installable like a native app**
- ♿ **Accessibility-first UI**
- 🎨 **Material UI with large, clear controls**
- ⚡ **Fast and lightweight**
- 🧠 **Extensible architecture (Android parity ready)**

---

## 🧱 Tech Stack

- **React + JavaScript**
- **Material UI (MUI)**
- **Web Speech API**
- **Vite**
- **Progressive Web App (PWA)**
- **Service Workers**

---

## 📁 Project Architecture

```

src/
 ├── app/
 │   ├── App.jsx
 │   ├── theme.js
 │
 ├── features/
 │   └── speak/
 │       ├── SpeakPage.jsx
 │       └── SpeakInput.jsx
 │
 ├── services/
 │   ├── tts.service.js
 │   └── storage.service.js
 │
 ├── routes/
 │   └── index.jsx
 │
 ├── components/
 │   └── PageContainer.jsx
 │
 ├── main.jsx
 └── index.css

````

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/<your-username>/speakease-web.git
cd speakease-web
npm install
npm run dev
````

App will run at:

```
http://localhost:5173
```

---

## 📲 Install as App (PWA)

1. Open the app in Chrome / Edge
2. Click **“Install App”** or **“Add to Home Screen”**
3. Use SpeakEase like a native app — even offline

---

## 🔊 Text-to-Speech Notes

* Uses the browser’s built-in **Web Speech API**
* Voice availability may vary by browser
* Offline support works after first load
* Best experience on **Chrome (Android / Desktop)**

---

## 🛣️ Roadmap

* [x] **Step 1**: Core app structure with MUI theme and routing
* [x] **Step 2**: Saved phrases with localStorage
* [x] **Step 3**: PWA support (offline capability)
* [x] **Step 4**: Default phrases with category headers (Medical, Daily, Emergency)
* [ ] Voice speed & pitch controls
* [ ] Conversation mode (phrase history)
* [ ] Multi-language support
* [ ] Android native app integration
* [ ] Caregiver / quick-access mode
* [ ] Cloud sync (cross-device)

---

## 🤝 Contributing

Contributions are welcome!

If you have ideas related to:

* Accessibility improvements
* Assistive technology
* Performance optimizations

Feel free to open an issue or submit a pull request.

---

## ❤️ Acknowledgements

* People living with speech disabilities who inspire inclusive technology
* Assistive technology communities
* Open-source contributors

---

## 📬 Contact

**Maintained by:** Vivek Bhatt
If you’d like to collaborate or discuss assistive tech ideas, feel free to connect.

---

> *Technology should give everyone a voice.*