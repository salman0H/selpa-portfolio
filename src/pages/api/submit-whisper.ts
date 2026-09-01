import type { APIRoute } from 'astro';
import { db, Whisper } from 'astro:db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("--- ریکوئست به API دریافت شد ---");
  try {
    const data = await request.formData();
    const author = data.get('author')?.toString();
    const message = data.get('message')?.toString();

    console.log("دیتای دریافتی:", { author, message });

    if (!author || !message) {
      return new Response(JSON.stringify({ success: false, error: "اطلاعات ناقص است." }), { status: 400 });
    }

    await db.insert(Whisper).values({
      author,
      message,
    });

    console.log("با موفقیت در Astro DB ذخیره شد!");

    return new Response(
      JSON.stringify({ success: true, message: "نجوای شما دریافت شد." }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("خطای دیتابیس:", error);
    return new Response(
      JSON.stringify({ success: false, error: "خطا در پردازش اطلاعات" }),
      { status: 500 }
    );
  }
}