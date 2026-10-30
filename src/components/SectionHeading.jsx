// Three pixels from the logo's path, then the heading.
export default function SectionHeading({ children, className = '' }) {
  return (
    <div className={className}>
      <div className="mb-3 flex gap-1" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-[2px] bg-teal" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-rose" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-amber" />
      </div>
      <h2 className="text-3xl font-bold sm:text-4xl">{children}</h2>
    </div>
  );
}
