const fs = require('fs');
const path = require('path');

module.exports = class Task {
    /**
     * Finds a task by its ID
     * 
     * @static
     * 
     * @throws {RangeError} If a task with this ID does not found
     * 
     * @param {number} id Task ID
     * 
     * @returns {object}
     */
    static findById(id) {
        const tasks = Task.findAll();

        for (const task of tasks) {
            if (id == task.id) {
                return task;
            }
        }

        throw RangeError("A task with this ID does not found");
    }

    /**
     * Find all tasks
     * 
     * @static
     * 
     * @returns {object} An array of tasks
     */    
    static findAll() {
        return JSON.parse(fs.readFileSync(Task.getDbPath()));
    }

    /**
     * Provides the path to the 'db.db' file
     *
     * @static
     * 
     * @returns {string}
     */
    static getDbPath() {
        return __dirname + path.sep + '..' + path.sep + 'db' + path.sep + 'db.db';
    }

    /**
     * Deletes a task of the provided ID
     *
     * @static
     *
     * @throws {RangeError} If a task with this ID does not found
     * 
     * @param {number} id Task ID
     * 
     * @returns {undefined}
     */
    static delete(id) {
        let tasks = Task.findAll();
        let deleted = false;
        let newTasks = [];

        for (const i in tasks) {
            if (id != tasks[i].id) {
                newTasks.push(tasks[i]);
                deleted = true;
            }
        }

        fs.writeFileSync(
            Task.getDbPath(), 
            JSON.stringify(newTasks)
        );

        if (! deleted) {
            throw RangeError("A task with this ID does not found");
        }
    }

    /**
     * Saves the database data
     * 
     * @static
     * 
     * @param {object} data Data to be saved (array of entries)
     * 
     * @returns {undefined}
     */
    static saveAll(tasks) {
        let id = 1;
        for (const task of tasks) {
            if (task.id === undefined) {
                task.id = id;
                id++;
            } else {
                id = task.id + 1;
            }
        }

        fs.writeFileSync(
            Task.getDbPath(), 
            JSON.stringify(tasks)
        );
    }

    /**
     * Save a new task
     *
     * @static
     *
     * @throws {Error} If the ID of the passed task already 
     *                 exists in the database
     *  
     * @param {object} task Task data
     * 
     * @returns {undefined}
     */
    static save(task) {
        const tasks = Task.findAll();
        task.id = Task.getNewId();
        tasks.push(task);
        Task.saveAll(tasks);
    }

    /**
     * Sum 1 to the ID of the last register and returns it
     * 
     * Does not verify if this ID exists. Expects a ordered list
     * of tasks
     * 
     * @static
     * 
     * @returns {number}
     */
    static getNewId() {
        const tasks = Task.findAll();
        if (tasks.length) {
            return tasks[tasks.length - 1].id + 1;
        } else {
            return 1;
        }
    }
}