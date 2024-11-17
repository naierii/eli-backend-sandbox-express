"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.getTodo = exports.getTodos = exports.updateTodo = exports.createTodo = void 0;
const mongodb_1 = require("mongodb");
const createTodo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { db } = req.app;
            const { title, description, user } = req.body;
            console.log('title', title);
            const insertData = {
                title: title || 'No Title',
                description: description || 'No Description',
                user,
            };
            if (!user) {
                return res.status(400).json({ message: 'User is required' });
            }
            const existsRecord = yield db.collection('todos').findOne({ title: insertData.title });
            if (existsRecord) {
                return res.status(400).json({ message: 'Todo with this title already exists' });
            }
            const allTodos = db.collection('todos').find().toArray();
            const insertDbResult = db.collection('todos').insertOne(insertData);
            const [allTodosResult, insertDbResultDbResult] = yield Promise.all([allTodos, insertDbResult]);
            res.status(201).json({
                message: 'Todo created successfully',
                data: [...allTodosResult, insertData],
                newItemId: insertDbResultDbResult.insertedId
            });
        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.createTodo = createTodo;
const updateTodo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { db } = req.app;
            const id = mongodb_1.ObjectId.createFromHexString(req.params.id);
            const { title, description } = req.body;
            const updateData = {
                title: title || 'No Title',
                description: description || 'No Description',
            };
            const existsIdRecord = db.collection('todos').findOne({ _id: id });
            const existsTitleRecord = db.collection('todos').findOne({ title: updateData.title });
            const [existsIdRecordResult, existsTitleRecordResult] = yield Promise.all([existsIdRecord, existsTitleRecord]);
            console.log('existsIdRecordResult', existsIdRecordResult);
            if (!existsIdRecordResult) {
                return res.status(400).json({ message: 'Todo with this id does not exist' });
            }
            if (existsTitleRecordResult) {
                return res.status(400).json({ message: 'Todo with this title already exists' });
            }
            ;
            const updateResult = yield db.collection('todos').updateOne({ _id: id }, { $set: updateData });
            if (updateResult.modifiedCount === 0) {
                return res.status(400).json({ message: 'Todo with this id does not exist' });
            }
            res.status(200).json({ message: 'Todo updated successfully', updatedItem: updateResult.modifiedCount });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.updateTodo = updateTodo;
const getTodos = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { db } = req.app;
            const { user } = req.query;
            let todoList;
            if (user) {
                todoList = yield db.collection('todos').find({ user }).toArray();
            }
            else {
                todoList = yield db.collection('todos').find().toArray();
            }
            res.status(200).json(todoList);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.getTodos = getTodos;
const getTodo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { db } = req.app;
            const id = mongodb_1.ObjectId.createFromHexString(req.params.id);
            const todo = yield db.collection('todos').findOne({ _id: id });
            if (!todo) {
                return res.status(404).json({ message: 'Todo with this id does not exist' });
            }
            res.status(200).json(todo);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.getTodo = getTodo;
const deleteTodo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { db } = req.app;
            const id = mongodb_1.ObjectId.createFromHexString(req.params.id);
            const deleteResult = yield db.collection('todos').deleteOne({ _id: id });
            if (deleteResult.deletedCount === 0) {
                return res.status(400).json({ message: 'Todo with this id does not exist' });
            }
            res.status(200).json({ message: 'Todo deleted successfully', deletedItem: deleteResult.deletedCount });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });
};
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.controller.js.map