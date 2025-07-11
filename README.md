# Frontend UI 

A responsive and interactive **Frontend UI ** web application built using HTML, CSS, and Vanilla JavaScript. No backend or frameworks are used. Data is handled using `localStorage`.

## 🔧 Features

- Dashboard with employee cards
- Add/Edit employee form
- Search by name or email
- Advanced filter by name, department, and role
- Sort by First Name or Department
- Pagination (10, 25, 50, 100 records)
- Responsive design for desktop, tablet, and mobile
- All data is stored in browser localStorage

## 📁 Project Structure

Employee-Directory/
├── index.html # Main Dashboard Page
├── add-edit.html # Add/Edit Employee Form
├── css/
│ └── styles.css # All styling
├── js/
│ ├── app.js # Employee list, search, filter, pagination
│ └── add-edit.js # Add/Edit form logic and validation
├── data/
│ └── employees.json # Optional mock data
└── README.md # Project overview and usage



## ▶️ How to Run

### Option 1: Open in Browser

1. Just open `index.html` in any browser to start using the app.

### Option 2: Using Live Server in VS Code

1. Install the **Live Server** extension in VS Code.
2. Open this folder in VS Code.
3. Right-click on `index.html` → **Open with Live Server**.
4. Use the UI in your browser. All data will persist in localStorage.


## 💡 Possible Improvements

- Add modal popup for Add/Edit instead of separate page
- Integrate `json-server` for a fake backend
- Export data to CSV
- Add form validations like unique email/ID check

## 🛠 Tech Stack

- HTML5, CSS3 (Flexbox, Grid)
- JavaScript (Vanilla)
- No frameworks, no backend

---

© 2025 Employee Directory UI Project
