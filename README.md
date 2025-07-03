# 💰 Smart Expense Tracker

A Django-based web application that helps users track, manage, and visualize their expenses. With built-in user authentication, rich data visualizations, Excel export, REST API access, and weekly email summaries, this app is ideal for personal financial tracking.

---

## 📌 Features

### 1. 🔐 User Authentication
- User Registration and Login via Django’s built-in authentication system  
- Secure session-based access  
- Users can only manage their own expenses  

### 2. 💸 Expense Management
- Add, edit, and delete expenses  
- Fields: `amount`, `description`, `category`, `date`  
- Filter expenses by category or date range  
- View a complete list of your expenses  

### 3. 📊 Category-wise Monthly Summary (Chart.js)
- **Pie Chart**: Distribution of current month's expenses by category  
- **Line/Bar Chart**: Trend of expenses over time  
- Data passed from Django views to Chart.js via AJAX or API  

### 4. 📤 Export to Excel
- Export your expenses to `.xlsx` format  
- Filter by date or category before exporting  
- Uses `pandas` or `openpyxl` for file generation  

### 5. 🔗 REST API (Django REST Framework)
- `GET /api/expenses/` → List all expenses  
- `POST /api/expenses/` → Create a new expense  
- `PUT /api/expenses/<id>/` → Update an expense  
- `DELETE /api/expenses/<id>/` → Delete an expense  
- Secured with token or session-based authentication  

### 6. 📧 Weekly Email Reports (Celery + Redis)
- Scheduled Celery task to run weekly using Celery Beat  
- Summarizes past week's expenses  
- Sends an automated email with category breakdown and totals  

### 7. 🛠️ Custom Admin Dashboard
- Filter expenses by user, date, and category  
- View total amount spent by each user  
- Easily manage data and export from Django Admin panel  

---

## 🧰 Tech Stack

- **Backend**: Django, Django REST Framework  
- **Frontend**: HTML, CSS, JavaScript, Chart.js  
- **Task Queue**: Celery with Redis  
- **Database**: SQLite (configurable to PostgreSQL or MySQL)  
- **Excel Export**: pandas or openpyxl  
- **Authentication**: Session or Token-based  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/krishshah1519/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Create Virtual Environment & Install Dependencies

```bash
python -m venv venv
# Activate the virtual environment:
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

pip install -r requirements.txt
```

### 3. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create a Superuser

```bash
python manage.py createsuperuser
```

### 5. Run the Development Server

```bash
python manage.py runserver
```

---

## 📨 Celery Setup (For Weekly Email Reports)

### 1. Start Redis

Make sure Redis is installed and running.

```bash
redis-server
```

### 2. Start the Celery Worker

```bash
celery -A expense_tracker worker --loglevel=info --pool=solo
```

### 3. Start Celery Beat Scheduler

```bash
celery -A expense_tracker beat --loglevel=info
```
---

## 👤 Author

- **Assigned To**: Krish Shah

---

## 📃 License

This project is for educational purposes. You may customize and reuse it as needed.

---

> “Track smarter. Spend better.”
