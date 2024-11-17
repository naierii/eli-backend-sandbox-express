import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export const createTodo =  async function(req, res) {
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

    const existsRecord = await db.collection('todos').findOne({title: insertData.title});
    if (existsRecord) {
      return res.status(400).json({ message: 'Todo with this title already exists' });
    }

    const allTodos = db.collection('todos').find().toArray();
    const insertDbResult = db.collection('todos').insertOne(insertData);

    const [allTodosResult, insertDbResultDbResult] = await Promise.all([allTodos, insertDbResult]);

    res.status(201).json({ 
      message: 'Todo created successfully', 
      data: [...allTodosResult, insertData], 
      newItemId: insertDbResultDbResult.insertedId 
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: error.toString() });
  }
}

export const updateTodo = async function(req, res) {
  try {
    const { db } = req.app;

    const id = ObjectId.createFromHexString(req.params.id);
    const { title, description } = req.body;

    const updateData = {
      title: title || 'No Title',
      description: description || 'No Description',
    };

    const existsIdRecord = db.collection('todos').findOne({ _id: id });
    const existsTitleRecord = db.collection('todos').findOne({title: updateData.title});

    const [existsIdRecordResult, existsTitleRecordResult] = await Promise.all([existsIdRecord, existsTitleRecord]);
    console.log('existsIdRecordResult', existsIdRecordResult);
    if (!existsIdRecordResult) {
      return res.status(400).json({ message: 'Todo with this id does not exist'});
    }
    if (existsTitleRecordResult) {
      return res.status(400).json({ message: 'Todo with this title already exists'});
    };

    const updateResult = await db.collection('todos').updateOne({ _id: id }, { $set: updateData });
    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({ message: 'Todo with this id does not exist'});
    }
    res.status(200).json({ message: 'Todo updated successfully', updatedItem: updateResult.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export const getTodos = async function(req, res) {
  try {
    const { db } = req.app;
    const { user } = req.query;

    // const allTodos = await db.collection('todos').find().toArray();
    // const todosByUser = await db.collection('todos').find({ user: req.query.user }).toArray();
    let todoList;
    if (user) {
      todoList = await db.collection('todos').find({ user }).toArray();
    } else {
      todoList = await db.collection('todos').find().toArray();
    }

    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
export const getTodo = async function(req, res) {
  try {
    const { db } = req.app;

    const id = ObjectId.createFromHexString(req.params.id);

    const todo = await db.collection('todos').findOne({ _id: id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo with this id does not exist'});
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export const deleteTodo = async function(req, res) {
  try {
    const { db } = req.app;

    const id = ObjectId.createFromHexString(req.params.id);

    const deleteResult = await db.collection('todos').deleteOne({ _id: id });
    if (deleteResult.deletedCount === 0) {
      return res.status(400).json({ message: 'Todo with this id does not exist'});
    }
    res.status(200).json({ message: 'Todo deleted successfully', deletedItem: deleteResult.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
