import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Tolland Cares — Care takes many forms', description: 'Neighbors helping neighbors in Tolland, Connecticut. Yardwork, food drives, gifts, and community support.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
