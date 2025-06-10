import type { RequestHandler } from './$types';
import redis from '$lib/redis';


export const POST: RequestHandler = async ({ request }) => {

const { email, password } = await request.json();

if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Champs manquants' }), { status: 400 });
}

const code = Math.floor(100000 + Math.random() * 900000).toString();
await redis.setEx(`verify:${email}`, 600, JSON.stringify({ code, password }));

return new Response(JSON.stringify({ success: true, code }));

};