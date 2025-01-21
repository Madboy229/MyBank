document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expensesList = document.getElementById('expensesList');
    const filterCategory = document.getElementById('filterCategory');
    const categorySelect = document.getElementById('category');

    let expenses = [];
    let categories = [];

    // Fetch categories from the API
    fetch('/api/categories')
        .then(response => response.json())
        .then(data => {
            categories = data;
            populateCategories();
        });

    // Fetch expenses from the API
    fetch('/api/expenses')
        .then(response => response.json())
        .then(data => {
            expenses = data;
            displayExpenses();
        });

    // Populate categories in the select elements
    function populateCategories() {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);

            const filterOption = option.cloneNode(true);
            filterCategory.appendChild(filterOption);
        });
    }

    // Display expenses in the list
    function displayExpenses() {
        expensesList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.amount} - ${expense.description} (${getCategoryName(expense.categoryId)})`;
            expensesList.appendChild(li);
        });
    }

    // Get category name by ID
    function getCategoryName(id) {
        const category = categories.find(category => category.id === id);
        return category ? category.name : 'Unknown';
    }

    // Handle form submission
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newExpense = {
            id: Date.now(),
            amount: parseFloat(expenseForm.amount.value),
            description: expenseForm.description.value,
            categoryId: parseInt(expenseForm.category.value)
        };
        expenses.push(newExpense);
        displayExpenses();
        expenseForm.reset();
    });

    // Handle category filter change
    filterCategory.addEventListener('change', () => {
        const selectedCategory = parseInt(filterCategory.value);
        const filteredExpenses = selectedCategory ? expenses.filter(expense => expense.categoryId === selectedCategory) : expenses;
        displayFilteredExpenses(filteredExpenses);
    });

    // Display filtered expenses
    function displayFilteredExpenses(filteredExpenses) {
        expensesList.innerHTML = '';
        filteredExpenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.amount} - ${expense.description} (${getCategoryName(expense.categoryId)})`;
            expensesList.appendChild(li);
        });
    }
});
