import { authService } from '../services/auth.service.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export class AuthController {
  async register(req, res) {
    try {
      const { user, token } = await authService.registerUser(req.body);
      res.cookie('sessionId', token, cookieOptions);
      res.status(201).json({
        message: 'Registered successfully',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { user, token } = await authService.loginUser(req.body);
      res.cookie('sessionId', token, cookieOptions);
      res.json({
        message: 'Logged in successfully',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: err.message });
    }
  }

  async logout(req, res) {
    try {
      const token = req.cookies?.sessionId;
      await authService.logoutUser(token);
      res.clearCookie('sessionId', cookieOptions);
      res.json({ message: 'Logged out successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async me(req, res) {
    const permissions = authService.getPermissionsForRole(req.user.role);
    res.json({
      user: req.user,
      permissions,
    });
  }
}

export const authController = new AuthController();
