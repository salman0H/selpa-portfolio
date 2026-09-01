import { useState } from 'react';

export default function WhisperForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/submit-whisper', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
      }
    } catch (error) {
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-20 border border-zinc-800 rounded-3xl" dir="rtl">
        <h3 className="font-display text-4xl text-[#e5dcd3] mb-4">نجوای شما ثبت شد.</h3>
        <p className="font-fa text-zinc-500 font-light">در تار و پود این بایگانی جاودانه خواهد ماند.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full max-w-2xl mx-auto" dir="rtl">
      <div className="relative">
        <input 
          type="text" 
          name="author"
          required
          placeholder="نام یا نام مستعار..." 
          className="w-full bg-transparent border-b border-zinc-800 py-4 font-fa text-xl text-[#e5dcd3] placeholder:text-zinc-700 focus:outline-none focus:border-[#e5dcd3] transition-colors"
        />
      </div>
      <div className="relative">
        <textarea 
          name="message"
          required
          rows={3}
          placeholder="تجربه خود از لمس آثار سلپا را بنویسید..." 
          className="w-full bg-transparent border-b border-zinc-800 py-4 font-fa text-xl text-[#e5dcd3] placeholder:text-zinc-700 focus:outline-none focus:border-[#e5dcd3] transition-colors resize-none"
        ></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="self-end px-12 py-4 bg-[#e5dcd3] text-zinc-950 font-fa font-bold text-lg rounded-full hover:bg-white transition-colors"
      >
        {status === 'loading' ? 'در حال ثبت...' : 'ارسال نجوا'}
      </button>
    </form>
  );
}