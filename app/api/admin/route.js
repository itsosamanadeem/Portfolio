import { checkSession } from "@/lib/auth";

export default async function handler(req, res) {
  const user = await checkSession(req);

  if (!user) {
    return res.status(403).json({ message: 'Access denied. Please log in.' });
  }

  return res.status(200).json({ message: 'Welcome to the admin panel!' });
}
