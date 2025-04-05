import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkSession = async (req) => {
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    return null; // No session cookie, return null
  }

  // Find the session and verify its validity
  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  if (!session || new Date() > new Date(session.expires)) {
    return null; // Invalid or expired session
  }

  return session.user; // Return user if session is valid
};
