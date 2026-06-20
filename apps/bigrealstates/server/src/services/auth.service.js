import { prisma } from '@xapps/db';
import { hashPassword, verifyPassword, createSession, destroySession, ROLES } from '@xapps/auth';

export class AuthService {
  async registerUser({ email, password, name, role }) {
    if (!email || !password || !name) {
      throw new Error('Missing required fields');
    }

    const assignedRole = ROLES[role] ? role : 'user';

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: assignedRole,
      },
    });

    const token = await createSession(user.id, {
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { user, token };
  }

  async loginUser({ email, password }) {
    if (!email || !password) {
      throw new Error('Missing credentials');
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = await createSession(user.id, {
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { user, token };
  }

  async logoutUser(token) {
    if (token) {
      await destroySession(token);
    }
  }

  getPermissionsForRole(role) {
    return ROLES[role] || [];
  }
}

export const authService = new AuthService();
