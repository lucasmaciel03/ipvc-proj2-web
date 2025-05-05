export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-grow">{children}</main>
      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} IPVC Projeto 2. Todos os direitos reservados.
      </footer>
    </div>
  );
}