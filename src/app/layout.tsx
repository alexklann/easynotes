import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Notes",
  description: "A web-based scratch pad and single-page note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
