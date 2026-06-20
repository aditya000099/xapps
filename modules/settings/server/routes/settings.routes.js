import { Router } from 'express';
import { prisma } from '@xapps/db';

// For now we mock the user since there's no auth UI to log them in.
// We'll fetch the first user (admin@xapps.com).
const router = Router();

router.get('/profile', async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      select: { id: true, name: true, email: true, role: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.findFirst();
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { name, email },
      select: { id: true, name: true, email: true, role: true }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
