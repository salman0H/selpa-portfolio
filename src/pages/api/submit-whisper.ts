import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const author = data.get('author');
    const message = data.get('message');

    // در اینجا می‌توانید داده‌ها را به دیتابیس (مانند Supabase، MongoDB یا ارسال ایمیل) متصل کنید.
    // فعلاً برای شبیه‌سازی، لاگ می‌کنیم:
    console.log(`[New Whisper] Author: ${author} | Message: ${message}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "نجوای شما دریافت شد."
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "خطا در پردازش اطلاعات" }),
      { status: 500 }
    );
  }
}