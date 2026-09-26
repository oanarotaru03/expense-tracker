const nameInput = document.getElementById("nameInput");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("totalDisplay");

let expenses = [];

function addExpense() {
    const name = nameInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (name === "" || isNaN(amount) || amount <= 0) {
        return;
    }

    const expense = { name, amount, category };
    expenses.push(expense);
    saveExpenses();

    renderExpenses();

    nameInput.value = "";
    amountInput.value = "";
}

function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = `${expense.name} (${expense.category}): ${expense.amount} RON`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
    });

    updateTotal();
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalDisplay.textContent = `${total} RON`;
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    const saved = localStorage.getItem("expenses");
    if (saved) {
        expenses = JSON.parse(saved);
        renderExpenses();
    }
}

addBtn.addEventListener("click", addExpense);

loadExpenses();