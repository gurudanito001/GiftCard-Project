import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import Head from 'next/head';
import Providers from '@/utils/provider';

export const metadata = {
  title: 'Peniga',
  description: 'Peer to peer Giftcard Trading Platform',
} 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <meta charset="utf-8" />
        <meta name="author" content="Daniel Nwokocha" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        
      <body>
        <main style={{height: "100vh"}} className='d-flex flex-column'>
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  )
}
