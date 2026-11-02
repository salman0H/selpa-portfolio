import ResponsiveImage from './ResponsiveImage';

const collection = [
  { src: '/images/image_20812b.jpg', title: 'Black Clutch', label: 'کلاچ مشکی' },
  { src: '/images/image_208147.jpg', title: 'Crossbody Bag', label: 'کیف دوشی' },
  { src: '/images/image_208183.jpg', title: 'Minimalist Tote', label: 'توت مینیمال' },
  { src: '/images/image_20842c.jpg', title: 'Laptop Folio', label: 'فولیو چرمی' },
  { src: '/images/image_2084aa.jpg', title: 'Leather Journal', label: 'ژورنال چرمی' },
  { src: '/images/image_2084cb.jpg', title: 'Grid Notebook', label: 'دفتر شطرنجی' },
  { src: '/images/image_208505.jpg', title: 'Black Notepad', label: 'یادداشت مشکی' }
];

export default function FloatingArchive() {
  return (
    <section id="archive" className="archive-section section-shell" aria-labelledby="archive-title">
      <header className="section-heading">
        <div>
          <span className="eyebrow" dir="ltr">The atelier archive / 07 pieces</span>
          <h2 id="archive-title" className="font-fa">مجموعه آثار</h2>
        </div>
        <p className="font-fa">روایت‌های متفاوت از یک متریال؛ چرم، در همراهی با زندگی روزمره.</p>
      </header>
      <div className="archive-grid">
        {collection.map((item, index) => (
          <figure key={item.src} className="archive-card">
            <a href="#contact-section" className="archive-image" aria-label={`گفت‌وگو درباره ${item.label}`}>
              <ResponsiveImage src={item.src} alt={item.label} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" />
              <span className="archive-action font-fa">سفارش اختصاصی ↖</span>
            </a>
            <figcaption>
              <div><h3 className="font-fa">{item.label}</h3><span className="font-serif" dir="ltr">{item.title}</span></div>
              <span className="archive-number" dir="ltr">0{index + 1}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
