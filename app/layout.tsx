import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sales Dashboard Project',
  description: 'Minimalist Sales Dashboard built with Next.js, Tailwind CSS, Lucide Icons, Recharts, Supabase and Postman API integration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full bg-offwhite text-charcoal antialiased selection:bg-clay-soft selection:text-clay-dark">
        {children}
      </body>
    </html>
  );
}
