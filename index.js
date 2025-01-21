const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let expenses = [];
let categories = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ...existing code...

// Categories routes
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  const newCategory = req.body;
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const updatedCategory = req.body;
  categories = categories.map(category => category.id === parseInt(id) ? updatedCategory : category);
  res.json(updatedCategory);
});

app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  categories = categories.filter(category => category.id !== parseInt(id));
  res.status(204).send();
});

// Expenses routes
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const newExpense = req.body;
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

app.put('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;
  expenses = expenses.map(expense => expense.id === parseInt(id) ? updatedExpense : expense);
  res.json(updatedExpense);
});

app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(expense => expense.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
