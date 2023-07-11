"use client"
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import Head from 'next/head';
import Providers from '@/utils/provider';

/* export const metadata = {
  title: 'Peniga',
  description: 'Peer to peer Giftcard Trading Platform',
} */

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="author" content="Daniel Nwokocha" />
        <title>Peniga</title>
        <meta name='description' content='Peer to peer Giftcard Trading Platform' />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous" referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
