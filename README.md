# 🍽️ EatIQ — AI-Powered Nutrition Analyzer

> **Eat smarter. Track better. Powered by AI.**  
> EatIQ is an AI-powered nutrition analyzer that instantly breaks down the macronutrients and calories of any meal from a simple photo. Just snap or upload an image of your food, and get detailed nutrition data—protein, carbs, fat, and total calories—with zero guesswork.

---

## 🚀 Tech Stack

**Frontend**
- ⚛️ React 18 + TypeScript  
- ⚡ Vite (Build Tool)  
- 🎨 Tailwind CSS + [shadcn/ui](https://ui.shadcn.com) (Radix-based UI components)  
- 🧭 React Router DOM (Routing)  
- 🧠 @tanstack/react-query (State Management)  
- 🔤 Lucide React (Icons)  
- 🌗 next-themes (Light/Dark Mode)  
- 📦 Bun (Package Manager)

**Backend / AI Integration**
- ⚙️ [n8n](https://n8n.io) (Workflow Automation & Webhook Handling)
- 🤖 AI Vision Technology (via n8n workflow integration)

---

## ⚙️ Setup & Installation

### 🧩 Prerequisites
- **Node.js** ≥ 18 or **Bun**
- **n8n** instance running (with webhook endpoint)

```bash
http://localhost:5678/webhook-test/meal-ai
```

---

### 🛠️ Steps to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/eatiq.git
   cd eatiq
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Build for production**
   ```bash
   bun run build
   # or
   npm run build
   ```

---

## 🤖 n8n Workflow Setup

Import the `n8n-workflow.json` file into your **n8n instance** and activate it.  
It handles the following tasks:

- 📤 Image upload via webhook  
- 🧠 AI vision analysis  
- 🧾 Nutrition data extraction  
- 🧮 Structured JSON response (food items + macro totals)

---

## 🌟 Features

| Feature | Description |
|----------|-------------|
| 📸 **Instant Image Upload** | Drag & drop or browse to upload meal photos |
| 📷 **Camera Capture** | Capture photos directly from your device |
| 🤖 **AI Vision Analysis** | Integrated AI model analyzes the meal image |
| 🍽️ **Food Item Detection** | Detects individual food items and portion sizes |
| 📊 **Macro Breakdown** | Displays protein, carbs, fat, and calories |
| 🔥 **Total Calories** | Computes total nutritional values for the meal |
| 🎨 **Modern UI** | Responsive, animated interface |
| ⚡ **Real-Time Results** | Instant nutrition insights |
| 🎯 **Accurate Analysis** | No manual logging or guesswork |
| 🌓 **Theme Support** | Light & dark mode via next-themes |

---

## 🧠 Project Architecture

```
EatIQ/
├── src/
│   ├── components/     # UI components (shadcn/ui + custom)
│   ├── hooks/          # Custom hooks (React Query logic)
│   ├── pages/          # Main views and routes
│   ├── utils/          # Helper and API functions
│   └── assets/         # Static images and icons
├── public/             # Static files
├── package.json
├── bun.lockb
└── n8n-workflow.json   # AI + webhook workflow file
```

---

## 💡 Future Improvements
- 📲 Mobile App (React Native version)
- 🧬 Nutrient history & tracking dashboard
- 🧾 Integration with fitness APIs (MyFitnessPal, Fitbit, etc.)
- 🗣️ Voice-based food logging

---

## 👨‍💻 Author

**Mourya**  
📧 *[Your email here]*  
🌐 [GitHub Profile](https://github.com/your-username)

---

## 🪪 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

> “EatIQ is more than an app — it’s your AI-powered nutrition companion.”  
> Made with ❤️ and ☕ by Mourya
