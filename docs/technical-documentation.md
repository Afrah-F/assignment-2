# 🧾 Technical Documentation Report  
*Afrah Mohammed *  

---

## 1. Project Overview  
**Project Name:** Afrah Portfolio  
**Author:** Afrah Mohammed  
**Date:** October 2025  

**Purpose:**  
This report documents the structure, functionality, and design of the Afrah Portfolio website — a personal web-based project that demonstrates frontend skills, interactivity.

**Scope:**  
This documentation focuses on the **frontend** implementation — HTML, CSS, and JavaScript. No backend server or database is used.

---

## 2. System Architecture  

### 2.1 Overview  
The system is a client-side application that runs directly in the browser. It dynamically renders project cards, manages theme states, and personalizes the greeting based on localStorage data.

### 2.2 Components  

| Component | Description | Technologies | Dependencies |
|------------|--------------|---------------|---------------|
| **UI Layer** | Manages layout, navigation, and content display. | HTML, CSS | None |
| **Logic Layer** | Handles dynamic rendering, theme switching, and interactions. | JavaScript | Browser APIs |
| **Data Layer** | Stores user name and theme preferences. | LocalStorage | None |

---

## 3. Implementation Details  

### 3.1 Technologies Used  
- **HTML:** Semantic structure and accessibility.  
- **CSS:** Responsive layout with grid system and green-white color theme.  
- **JavaScript :, data rendering, and event handling.  
  

### 3.2 Key Features  
- Personalized greeting stored in `localStorage`.  
- Theme toggle (light/dark) saved between sessions.  
- Dynamic project filtering, searching, and sorting.  
- Accessible contact form with validation.  
- Smooth scrolling and back-to-top button.  

---

## 4. Data Flow  

1. **User enters name →** saved in `localStorage`.  
2. **Greeting updates →** displays “Good morning/afternoon/evening, [Name]!”  
3. **Theme toggle →** saves choice (`dark` or `light`).  
4. **Projects data →** loaded from a JavaScript array, filtered dynamically.  
5. **Form input →** validated locally with real-time feedback.  

---

## 5. Testing & Validation  

| Test Case | Description | Result |
|------------|--------------|--------|
| Name Gate | Prompt appears on first visit | ✅ Pass |
| Greeting Update | Changes dynamically with name | ✅ Pass |
| Theme Toggle | Persists after reload | ✅ Pass |
| Project Filter | Works across all categories | ✅ Pass |
| Form Validation | Detects empty or invalid fields | ✅ Pass |

**Accessibility:**  
 
- Keyboard and screen reader friendly.  
- Smooth scrolling and clear focus styles.  

---




## 6. Deployment & Maintenance  

### Deployment Steps  
1. Push the project to a **GitHub repository**.  
2. Enable **GitHub Pages** under repository settings.  
3. Open the deployed link to test responsiveness.  


---



