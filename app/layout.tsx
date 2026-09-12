import './globals.css';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';
export const metadata: Metadata={title:'Campus Academic Market | Your One-Stop Academic Support Hub',description:'Study materials, academic support, projects, past questions and student services in one place.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000')};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>}
