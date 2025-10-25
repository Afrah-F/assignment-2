



## Purpose
This document explains **how AI tools were used** to build and enhance my portfolio for Assignment 2, what I changed, the benefits and risks I considered, and what I learned. It demonstrates that I understood the generated code and **modified it responsibly**.

---

##  Tools Used
- **ChatGPT** (reasoning, code suggestions, docs wording)
- **VS Code** + *Live Server* (local preview)
- **Chrome DevTools** / **Lighthouse** (debugging, performance & accessibility checks)

> No external UI frameworks or heavy libraries were used; the project is **vanilla HTML/CSS/JS**.

---

##  Use Cases, Prompts, and My Modifications

### First-Visit Name Gate + Greeting (LocalStorage)
- **Goal:** Ask the visitor for their name on first visit; store it; show greeting & a header chip; allow changing later.
- **Prompt (summary):**  
  “Create a first-visit modal that asks for a name, stores it in localStorage, and updates the page greeting and a header chip. Provide accessible markup and keyboard focus.”


###  Projects Grid — Filter, Search, Sort (Client-Side Render)
- **Goal:** Interactive project list: filter by category, real-time search, sort by date/title; show empty state if no matches.
- **Prompt (summary):**  
  “Build a vanilla JS projects grid that supports filter chips, instant search, sort by date/title, re-rendering, and an empty state.”
- **AI Output (summary):**  
  Render function + event handlers for chips, search, and select.
- **My Modifications:**  
  - Adapted to my data model and image paths (`assets/club.png`, `assets/online.png`, `assets/elec.png`).  
  - Added `loading="lazy"` to images and small fade-in animation class.  
  - Kept the code simple and readable; no frameworks.



### Theme System (Green/White + Dark Mode)
- **Goal:** Refresh the visual design with a green/white palette and support dark mode via CSS variables. 
  - Tuned colors for contrast, added shadows & hover states.  
  - Persisted theme in `localStorage` and reflected icon (🌙/☀️).

###  Documentation (README & This Report)
- **Goal:** Produce concise, clear documentation aligned with course requirements.
- **Prompt (summary):**  
  “Draft a README that explains features, structure, how to run locally, and a short AI summary.”
- **My Modifications:**  
  - Rewrote to match my repo structure and added course-specific checklists.  
  - Produced this detailed AI Usage Report.

---



---

##  Responsible & Ethical Use
- AI suggestions were treated as **drafts**; I **reviewed, edited, and tested** everything.  
- I **documented** where AI helped (this report + README).  
- I avoided copying classmates’ code and ensured I understand the final solution.  
- I will disclose AI assistance if asked in review or presentation.

---

##  Future AI-Assisted Improvements 
- Generate alt text suggestions for images.  
- Summarize project descriptions or resume bullets.  
- Run automated accessibility checks and suggest fixes.  
- Suggest performance optimizations (e.g., asset compression, preloading strategy).

---



