Assignment 2
#  Afrah Mohammed | Personal Portfolio

A clean, responsive, and interactive portfolio website built with **HTML**, **CSS**, and **JavaScript**.  
It highlights my work as a Computer Science student, featuring smooth animations, dynamic content, and a personalized user experience.

---

## Features

### 🧍‍♀️ Personalized Experience
- **Name Gate:** Greets visitors by name (stored with `localStorage`).
- **Greeting + Chip:** Time-based greeting (Good morning/afternoon/evening).
- **Change Name:** Button allows user to update their name anytime.

### 🌓 Theme Toggle
- Light and dark mode support.
- Remembers user’s preference across sessions using `localStorage`.



### 💼 Projects Section
- Filter by category (`Web`, `Data`, `Presentation`).
- Search and sort by date or title.
- Fully rendered dynamically using JavaScript.
- Graceful `noscript` fallback if JavaScript is disabled.

### 📬 Contact Form
- Includes form validation (name, email, message length).
- Accessible feedback via live regions.

### ⬆️ UX Enhancements
- Smooth scrolling navigation.
- “Back to Top” button with fade-in on scroll.


---

## 🧱 Project Structure

```
📁 Afrah-Portfolio/
│---docs                # Ai usage report & technical doc
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # Styling and color system (green & white theme)
├── js/
│   └── script.js       # All JavaScript logic and interactivity
├── assets/             # Project images (club.png, online.png, elec.png, etc.)
└── README.md           # Project documentation
```

---

## 🎨 Design System

| Variable | Light Mode | Dark Mode |
|-----------|-------------|------------|
| `--bg` | `#ffffff` | `#0b0f19` |
| `--bg-soft` | `#f0fdf4` | `#071015` |
| `--text` | `#102a12` | `#eef2ff` |
| `--primary` | `#16a34a` | `#22c55e` |
| `--card` | `#ffffff` | `#0f172a` |

The theme is built around **green and white**, symbolizing freshness, growth, and clarity.

---

## ⚙️ Technologies Used

- **HTML5** – Semantic markup
- **CSS3** – Responsive layout, grid system, transitions
- **Vanilla JavaScript (ES6+)** – DOM manipulation, API handling, localStorage
- **Quotable / DummyJSON / ZenQuotes APIs** – Dynamic quotes

---

## 💡 How to Run

1. Clone or download the repository.
   ```bash
   git clone https://github.com/<your-username>/afrah-portfolio.git
   ```
2. Open `index.html` directly in your browser — no build step required.
3. Optionally serve it locally for smoother navigation:
   ```bash
   npx serve
   ```

---



## 🧑‍💻 Author

**Afrah Mohammed**  
 Computer Science Student  
 (Afrah3000r@gmail.com)
