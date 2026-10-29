export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-ice-dark px-6 pt-32 pb-24 text-center">
      <h1 className="font-display text-headline uppercase">{title}</h1>
      <p className="mt-6 max-w-xl text-ice-100">{description}</p>
    </main>
  );
}
