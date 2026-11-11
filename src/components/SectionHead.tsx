export function SectionHead({ eyebrow, title, lead, index }: { eyebrow: string; title: string; lead?: string; index: string }) {
  return (
    <div className="section-head" data-reveal>
      <p className="eyebrow">
        <span className="mono">{index}</span> {eyebrow}
      </p>
      <h2>{title}</h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </div>
  );
}
