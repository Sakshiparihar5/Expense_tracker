const form = document.getElementById('expense-form');
const tableBody = document.querySelector('#expense-table tbody');
const totalDiv = document.getElementById('total-expense');

const API_URL = '/api/expenses';

const addExpenseHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const expense = {
        amount: parseFloat(data.get('amount')),
        date: data.get('date'),
        note: data.get('note'),
        category: data.get('category')
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
    });

    form.reset();
    fetchExpenses();
};

form.onsubmit = addExpenseHandler;

function getCategoryIcon(category) {
    switch(category) {
        case 'Food': return '🍔';
        case 'Travel': return '✈️';
        case 'Bills': return '💡';
        case 'Other': return '🛍️';
        default: return '';
    }
}

async function fetchExpenses() {
    const res = await fetch(API_URL);
    const expenses = await res.json();
    tableBody.innerHTML = '';

    let total = 0;

    expenses.forEach(exp => {
        total += exp.amount;

        const tr = document.createElement('tr');

        const dateTd = document.createElement('td');
        dateTd.textContent = exp.date;
        tr.appendChild(dateTd);

        const amountTd = document.createElement('td');
        amountTd.textContent = exp.amount.toFixed(2);
        tr.appendChild(amountTd);

        const noteTd = document.createElement('td');
        noteTd.textContent = exp.note || '';
        tr.appendChild(noteTd);

        const categoryTd = document.createElement('td');
        categoryTd.innerHTML = `<span class="category-icon">${getCategoryIcon(exp.category)}</span> ${exp.category || ''}`;
        tr.appendChild(categoryTd);

        const actionTd = document.createElement('td');

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'action-btn delete-btn';
        delBtn.onclick = async () => {
            tr.style.opacity = 0;
            await fetch(`${API_URL}/${exp.id}`, { method: 'DELETE' });
            setTimeout(fetchExpenses, 300);
        };
        actionTd.appendChild(delBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'action-btn edit-btn';
        editBtn.onclick = () => {
            form.amount.value = exp.amount;
            form.date.value = exp.date;
            form.note.value = exp.note;
            form.category.value = exp.category;

            form.onsubmit = async (e) => {
                e.preventDefault();
                const updatedData = new FormData(form);
                const updatedExpense = {
                    amount: parseFloat(updatedData.get('amount')),
                    date: updatedData.get('date'),
                    note: updatedData.get('note'),
                    category: updatedData.get('category')
                };

                await fetch(`${API_URL}/${exp.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedExpense)
                });

                form.reset();
                fetchExpenses();
                form.onsubmit = addExpenseHandler;
            };
        };
        actionTd.appendChild(editBtn);

        tr.appendChild(actionTd);
        tableBody.appendChild(tr);
    });

    // Animate total counter
    let currentTotal = 0;
    const step = total / 30;
    const interval = setInterval(() => {
        currentTotal += step;
        if(currentTotal >= total) {
            currentTotal = total;
            clearInterval(interval);
        }
        totalDiv.textContent = `Total: $${currentTotal.toFixed(2)}`;
    }, 10);
}

fetchExpenses();
