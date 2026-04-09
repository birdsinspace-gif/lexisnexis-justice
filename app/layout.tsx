import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LexisNexis Justice | File Your Grievance',
  description: 'Former and current employees of LexisNexis Risk Solutions — join the class action.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
