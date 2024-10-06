import Navbar from "@/components/custom/navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar className="sticky top-0 z-50" />
      <div className="p-2">{children}</div>
    </main>
  );
}
