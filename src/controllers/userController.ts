import User from '../models/User.js';
import { Request, Response } from 'express';


  // get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // get a single user by id
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('posts');

      if (!user) {
        res.status(404).json({ message: 'Try again Homie they dont exist.' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // update a user by id
  export const updateUser = async (req: Request, res: Response) => { 
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!user) {
        res.status(404).json({ message: 'This user does not exist. Just like the limit!' });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // delete a user by id
  export const deleteUser = async (req: Request, res: Response) => {  
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'They are already gone homie...' });
        return;
      }

      res.json({ message: 'User got got!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // add a friend
  export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { new: true }
        );
        if (!user) {
          res.status(404).json({ message: 'They dont exist... you sure you are friends?' });
          return;
        }
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
  }
  // remove a friend 
  export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'Friendship ended!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }