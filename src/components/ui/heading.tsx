export default function HeadingTitle({
    children,
  }: React.ComponentProps<"h1">) {
  return (
    <h1 className="text-2xl font-semibold">{children}</h1>
  );
}
