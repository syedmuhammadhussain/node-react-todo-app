const Todo = require('../models/todo');

exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.getAll();
        res.json({ success: true, data: todos });
    } catch (error) {
        next(error);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const todo = await Todo.getById(req.params.id);
        res.json({ success: true, data: todo });
    } catch (error) {
        next(error);
    }
};

exports.createTodo = async (req, res, next) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        next(error);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await Todo.update(req.params.id, req.body);
        res.json({ success: true, data: updatedTodo });
    } catch (error) {
        next(error);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        await Todo.delete(req.params.id);
        res.json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
        next(error);
    }
};