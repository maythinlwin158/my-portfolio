const TECH_ITEMS = [
  'Laravel', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js',
  'PostgreSQL', 'AWS', 'Docker', 'Spring Boot', 'GraphQL', 'Microservices',
];

export default function TechMarquee() {
  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="relative py-6 border-y border-white/5 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <span key={`${tech}-${i}`} className="inline-flex items-center mx-6 text-zinc-500 font-mono text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/60 mr-3" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
