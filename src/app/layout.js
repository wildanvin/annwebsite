import './globals.css'

export const metadata = {
  title: '6 mesesitos :3',
  description: 'Especial para mi Pau 💖',
}

export default function RootLayout({ children }) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
