import Navbar from '../components/Navbar';

import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  )
}
