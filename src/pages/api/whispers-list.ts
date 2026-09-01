import type { APIRoute } from 'astro';
import { db, Whisper, desc } from 'astro:db';

export const GET: APIRoute = async () => {
  try {
    const whispers = await db.select().from(Whisper).orderBy(desc(Whisper.createdAt));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        total: whispers.length,
        whispers: whispers 
      }, null, 2),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: String(error) 
      }, null, 2),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
