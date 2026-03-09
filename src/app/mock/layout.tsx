export default function MockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock pages have their own layout — no shared Header/Footer
  return <>{children}</>;
}
