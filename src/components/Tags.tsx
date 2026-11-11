export function Tags({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}
