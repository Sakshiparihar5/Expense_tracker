# Expense Tracker
This is a simple web-based Expense Tracker I made to keep track of daily expenses.  
You can add, view, edit, and delete expenses, and see the total amount updating automatically. I also added categories with icons to make it more fun and easy to see what you’re spending on.
## Features
- Add, view, edit, and delete expenses
- Categories with icons:🍔 Food, ✈️ Travel, 💡 Bills, 🛍️ Other
- Animated total counter

## How to Run
1. Open the project in **IntelliJ IDEA** or any Java IDE  
2. Run the main application: `ExpenseTrackerApplication.java`  
3. Open your browser and go to:  http://localhost:8080/index.html
4. Start adding your expenses and see the total update!

## Project Structure
expense-tracker/
├── README.md
├── Documentation.md
├── .gitignore
├── pom.xml
├── src/
│ └── main/
│ ├── java/com/example/expensetracker/
│ └── resources/static/
│ ├── index.html
│ ├── app.js
│ └── images/
│ └── expense-background.webp

## My Notes / Assumptions

- H2 database is used locally for storing data. The database file is ignored in Git.  
- Categories are fixed: Food, Travel, Bills, Other  
- Dates must be picked using the date picker  
- Amounts must be positive

   ## Tools Used
- Java, Spring Boot, H2 Database  
- HTML, CSS, JavaScript  
- IntelliJ IDEA, Git, GitHub
