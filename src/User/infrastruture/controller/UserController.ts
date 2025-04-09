import { Request, Response } from 'express';
import UserService from '../service/UserService';

const userService = new UserService();

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;
    const user = await userService.save(name, email);
    if (!user) {
      res.status(400).json({ message: 'User already exists' });
    }
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const user = await userService.findByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function getUserByName(req: Request, res: Response) {
  try {
    const { name } = req.params;
    const user = await userService.findByName(name);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userService.delete(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const name = req.body.name || undefined;
    const email = req.body.email || undefined;
    const user = await userService.update(id, name, email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function userExists(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userService.exists(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User exists' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

export async function userExistsByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const user = await userService.existsByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User exists' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}
