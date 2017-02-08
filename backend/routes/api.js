var express = require('express');
var router = express.Router();
var passport = require('passport');

// API for Login/Users/Todos
const loginAPI = require('./rest/login');
const usersAPI = require('./rest/users');
const todosAPI = require('./rest/todos');

// Login
router.post('/login', passport.authenticate("local"), loginAPI.login);
// Logged In
router.get('/loggedin', loginAPI.loggedIn);
// Log out
router.get('/logout', loginAPI.logout);
// Register
router.post('/register', loginAPI.register);

// Get all users
router.get('/users', usersAPI.getUsers);
// Update user info
router.put('/:username', usersAPI.updateUser);

// Get all todos for user
router.get('/:username/todos', todosAPI.getTodos);
// Get concrete one for user
router.get('/:username/todo/:id', todosAPI.getTodo);
// Update concrete one for user
router.put('/:username/todo/:id', todosAPI.updateTodo);
// Save one for user
router.post('/:username/todo', todosAPI.saveTodo);
// Delete todos
router.delete('/:username/todo/:id', todosAPI.deleteTodo);

module.exports = router;
