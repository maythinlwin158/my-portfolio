interface SectionHeaderProps {
  number: string;
  name: string;
  description?: string;
}

export default function SectionHeader({ number, name, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="section-comment mb-2">
        <span className="text-subtle">{'// '}</span>
        <span className="num">{number}</span>
        <span className="text-subtle"> — </span>
        <span className="name">{name}</span>
      </p>
      {description && (
        <p className="text-muted text-base max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
