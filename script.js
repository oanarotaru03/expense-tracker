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

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        editBtn.addEventListener("click", () => {
            const newAmount = prompt("Enter new amount:", expense.amount);

            if (newAmount !== null && !isNaN(parseFloat(newAmount))) {
                expenses[index].amount = parseFloat(newAmount);
                saveExpenses();
                renderExpenses();
            }
        });

        deleteBtn.addEventListener("click", () => {
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
    });

updateTotal();
renderCategoryBreakdown();
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalDisplay.textContent = `${total} RON`;
}
function renderCategoryBreakdown() {
    const breakdown = document.getElementById("categoryBreakdown");
    breakdown.innerHTML = "";

    const totals = {};

    expenses.forEach((expense) => {
        if (totals[expense.category]) {
            totals[expense.category] += expense.amount;
        } else {
            totals[expense.category] = expense.amount;
        }
    });

    for (const category in totals) {
        const tag = document.createElement("span");
        tag.classList.add("category-tag");
        tag.textContent = `${category}: ${totals[category]} RON`;
        breakdown.appendChild(tag);
    }
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