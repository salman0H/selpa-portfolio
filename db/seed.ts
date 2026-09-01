import { db, Whisper } from 'astro:db';

export default async function seed() {
  await db.insert(Whisper).values([
    {
      author: 'علی',
      message: 'سلپا برای من دقیقاً آن چیزی بود که می‌خواستم. کیفیت بی‌نظیر!',
    },
    {
      author: 'فاطمه',
      message: 'هنر طراحی در هر جزئیات این محصول دیده می‌شود. بسیار رضایت‌بخش.',
    },
    {
      author: 'محمد',
      message: 'بهترین خرید سال! تیم سلپا واقعاً به تفاصیل اهمیت می‌دهند.',
    },
    {
      author: 'زهرا',
      message: 'محصول خود را سفارشی کردم و ایشان دقیقاً آنچه را ساختند که تصور می‌کردم.',
    },
  ]);
}
