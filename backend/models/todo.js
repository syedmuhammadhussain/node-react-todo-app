const db = require('../config/database');
const { validateTodoInput, validateId } = require('../utils/validators');

class Todo {
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM todos');
            return rows;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    static async getById(id) {
        try {
            validateId(id);
            const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]);

            if (rows.length === 0) {
                const error = new Error('Todo not found');
                error.type = 'NOT_FOUND';
                error.status = 404;
                throw error;
            }

            return rows[0];
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    static async create(todoData) {
        try {
            validateTodoInput(todoData);
            const [result] = await db.query('INSERT INTO todos SET ?', todoData);
            return { id: result.insertId, ...todoData };
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    static async update(id, updates) {
        try {
            validateId(id);
            validateTodoInput(updates, true);

            const [result] = await db.query(
                'UPDATE todos SET ? WHERE id = ?',
                [updates, id]
            );

            if (result.affectedRows === 0) {
                const error = new Error('Todo not found or no changes made');
                error.type = 'NOT_FOUND';
                error.status = 404;
                throw error;
            }

            return this.getById(id);
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    static async delete(id) {
        try {
            validateId(id);
            const [result] = await db.query('DELETE FROM todos WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                const error = new Error('Todo not found');
                error.type = 'NOT_FOUND';
                error.status = 404;
                throw error;
            }

            return true;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    static handleDatabaseError(error) {
        // Handle specific database errors
        switch (error.code) {
            case 'ER_TRUNCATED_WRONG_VALUE':
                error.message = 'Invalid data type for field';
                error.type = 'INVALID_DATA_TYPE';
                error.status = 400;
                break;
            case 'ER_NO_DEFAULT_FOR_FIELD':
                error.message = `Missing required field: ${error.sqlMessage.split("'")[1]}`;
                error.type = 'MISSING_FIELD';
                error.status = 400;
                break;
            case 'ER_DATA_TOO_LONG':
                error.message = 'Data too long for field';
                error.type = 'DATA_TOO_LONG';
                error.status = 400;
                break;
        }

        // Re-throw modified error
        error.status = error.status || 500;
        throw error;
    }
}

module.exports = Todo;