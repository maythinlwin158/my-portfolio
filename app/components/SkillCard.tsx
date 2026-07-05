interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div className="p-5 rounded-xl border border-border bg-surface h-full">
      <h3 className="font-mono text-xs uppercase tracking-wider text-terminal mb-4">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </div>
    </div>
  );
}
