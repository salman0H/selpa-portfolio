import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function WhisperForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/submit-whisper', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setStatus('success');
      } else {
        alert('خطا در ثبت: ' + result.error);
        setStatus('idle');
      }
    } catch (error) {
      alert('ارتباط با سرور برقرار نشد.');
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (status === 'success' && successRef.current) {
      gsap.fromTo(successRef.current, 
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power4.out' }
      );
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('exitWhispers'));
      }, 4000);
    }
  }, [status]);

  if (status === 'success') {
    return (
      <div ref={successRef} className="flex flex-col items-center justify-center py-20 text-center" dir="rtl">
        <h3 className="font-art text-8xl md:text-[10rem] text-[#e5dcd3] mb-8" style={{ textRendering: 'optimizeLegibility' }}>
          دریافت شد
        </h3>
        <p className="font-fa text-xl text-zinc-400 font-light tracking-wider leading-relaxed max-w-md mx-auto">
          رویای شما در بایگانی سلپا ثبت شد. در حال بازگشت به آتلیه...
        </p>
        <div className="mt-12 w-12 h-12 rounded-full border border-zinc-700 border-t-[#e5dcd3] animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-8 w-full" dir="rtl">
      <div className="relative group">
        <input 
          type="text" 
          name="author"
          required
          autoComplete="off"
          placeholder="نام خالق اثر (شما)..." 
          className="w-full bg-transparent border-b border-zinc-800 py-4 font-fa text-xl text-[#e5dcd3] placeholder:text-zinc-700 focus:outline-none focus:border-[#e5dcd3] transition-colors"
        />
      </div>
      <div className="relative group">
        <textarea 
          name="message"
          required
          rows={3}
          autoComplete="off"
          placeholder="شکل، بافت و کاربرد قطعه‌ی رویایی خود را شرح دهید..." 
          className="w-full bg-transparent border-b border-zinc-800 py-4 font-fa text-xl text-[#e5dcd3] placeholder:text-zinc-700 focus:outline-none focus:border-[#e5dcd3] transition-colors resize-none"
        ></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="self-center md:self-end mt-8 px-16 py-5 bg-[#e5dcd3] text-zinc-950 font-fa font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
      >
        {status === 'loading' ? 'در حال اتصال...' : 'ثبت رویای چرمی'}
      </button>
    </form>
  );
}