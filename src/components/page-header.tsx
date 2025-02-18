interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="1000" height="100" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative px-8 py-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
          {description && (
            <p className="mt-2 text-slate-300">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
} 