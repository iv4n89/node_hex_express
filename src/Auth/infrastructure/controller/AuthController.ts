import { Request, Response } from 'express';
import AuthService from '../service/AuthService';

const authService = new AuthService();

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    if (!result) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    if (!result) {
      res.status(400).json({ message: 'User already exists' });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function validateToken(req: Request, res: Response) {
  try {
    const { token } = req.body;
    const result = await authService.validateToken(token);
    if (!result) {
      res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const result = await authService.changePassword(
      userId,
      oldPassword,
      newPassword
    );
    if (!result) {
      res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const { userId, token } = req.body;
    const result = await authService.refreshToken(userId, token);
    if (!result) {
      res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
