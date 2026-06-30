export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-24 px-8 md:px-24 min-h-screen">
      {children}
    </main>
  );
}