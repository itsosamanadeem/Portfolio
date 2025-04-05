import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Find user by username
      const user = await prisma.user.findUnique({
        where: { username },
      });

      // Validate the user credentials
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a session token
      const sessionToken = nanoid();

      // Create session in the database
      const session = await prisma.session.create({
        data: {
          sessionToken,
          userId: user.id,
          expires: new Date(new Date().getTime() + 60 * 60 * 1000), // Session expires in 1 hour
        },
      });

      // Set session token in cookie
      res.setHeader('Set-Cookie', `sessionToken=${sessionToken}; HttpOnly; Path=/; Max-Age=3600`);

      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
