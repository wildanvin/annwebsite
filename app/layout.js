import './globals.css'

export const metadata = {
  title: '💖 Anniversary Surprise',
  description: 'A special anniversary website with love',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
