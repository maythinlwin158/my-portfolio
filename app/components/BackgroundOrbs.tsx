export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-purple/20 blur-[120px] animate-float" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-brand-teal/15 blur-[100px] animate-float-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-brand-indigo/10 blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[10%] right-1/4 w-48 h-48 rounded-full bg-brand-pink/8 blur-[60px] animate-float-delayed" />
    </div>
  );
}
