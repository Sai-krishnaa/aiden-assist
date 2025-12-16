# 🆘 AIDEN Assist — Emergency Triage & Ambulance Coordination (MVP)

AIDEN Assist is a **calm, trust-first emergency assistance prototype** designed to help users quickly report an emergency, assess urgency, and find nearby ambulance services — without panic, medical diagnosis, or backend complexity.

This is an **MVP prototype**, focused on **UX clarity, accessibility, and flow**, not production-grade medical logic.

---

## 🚦 Problem Statement

In emergency situations, people often:
- Panic and struggle to explain what happened
- Waste critical time searching for ambulance numbers
- Don’t know whether the situation is **urgent or non-urgent**
- Face poor UI experiences under stress

**AIDEN Assist** addresses this by providing:
- A guided, step-by-step emergency intake
- A calm urgency assessment
- Clear next actions
- Easy access to nearby ambulance providers

---

## 🧠 What AIDEN Assist Does (MVP Scope)

✅ Guided emergency form  
✅ Voice recording, photo capture, and text input  
✅ Urgency classification (Emergency / Urgent / Non-Emergency)  
✅ Suggested ambulance type (Basic / Cardiac / Trauma)  
✅ Location input with OpenStreetMap preview  
✅ Nearby ambulance & hospital directory (call-to-connect)  
✅ Full screen flow (no modals, no confusion)  
✅ Accessibility-first design  

❌ No diagnosis  
❌ No medical predictions  
❌ No backend or real dispatch  
❌ No patient data storage  

---

## 🧭 User Flow

1. **Start Emergency Assessment**
2. **Describe What Happened**
   - Quick options (accident, collapse, breathing issue, etc.)
   - Optional voice recording
   - Optional photo capture
   - Optional text description
3. **Answer Key Questions**
   - Consciousness
   - Age group
   - Location
4. **Urgency Result Screen**
   - Clear urgency level
   - Recommended action
   - Suggested ambulance type
5. **Book Ambulance Near You**
   - View nearby hospitals / NGOs / ambulance providers
   - Tap-to-call functionality
6. **Dispatch Summary & Guidance**

---

## 🧩 Tech Stack

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion** (subtle animations)
- **OpenStreetMap (Nominatim)** for location preview
- **Context API** for state management
- **Vercel** for deployment

---

## 🎨 Design Principles

- Calm, non-panic UI
- Large touch-friendly buttons
- High contrast for readability
- Minimal cognitive load
- Accessibility-first (screen reader friendly)
- Mobile-first responsive design

---

## ⚠️ Disclaimer

> **AIDEN Assist is a prototype and does NOT replace emergency medical services.**  
> It does not diagnose, predict outcomes, or guarantee emergency response.

For real emergencies, users should always contact official emergency services.

---

## 🚀 Getting Started (Local Setup)

```bash
git clone https://github.com/Sai-krishnaa/aiden-assist.git
cd aiden-assist
npm install
npm run dev
