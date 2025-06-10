import type { RequestHandler } from './$types';
import redis from '$lib/redis';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcryptjs';

export const POST: RequestHandler = async ({ request }) => {

const { email, code } = await request.json();
const stored = await redis.get(`verify:${email}`);

if (!stored) {
  return new Response(JSON.stringify({ error: 'Code expiré ou invalide.' }), { status: 400 });
}

const { password, code: correctCode } = JSON.parse(stored);


if (code !== correctCode) {

    return new Response(JSON.stringify({ error: 'Code incorrect.' }), { status: 400 });

  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { email, password: hashed } });

  await redis.del(`verify:${email}`);

  return new Response(JSON.stringify({ success: true }));

};

