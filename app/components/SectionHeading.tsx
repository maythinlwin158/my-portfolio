interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ number, title, subtitle, align = 'left' }: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-4 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <span className="section-label">{number}</span>
        <div className={`h-px bg-gradient-to-r from-brand-purple/60 to-transparent ${isCenter ? 'w-16' : 'flex-1 max-w-32'}`} />
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-zinc-400 text-lg max-w-2xl leading-relaxed ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
