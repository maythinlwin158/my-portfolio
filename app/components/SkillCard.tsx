interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  tier?: 'primary' | 'secondary' | 'familiar';
}

const tierClass: Record<NonNullable<SkillCardProps['tier']>, string> = {
  primary: 'skill-tier-primary',
  secondary: 'skill-tier-secondary',
  familiar: '',
};

export default function SkillCard({ title, skills, tier }: SkillCardProps) {
  return (
    <div className={`p-5 rounded-xl border border-border bg-surface h-full ${tier ? tierClass[tier] : ''}`}>
      <h3 className={`font-mono text-xs uppercase tracking-wider mb-4 ${tier === 'primary' ? 'text-terminal' : 'text-cyan'}`}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </div>
    </div>
  );
}
