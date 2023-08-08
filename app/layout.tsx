import './globals.css'
import { GlobalContextProvider } from './Context/store'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <GlobalContextProvider>
        {children}
        </GlobalContextProvider>
        </body>
    </html>
  )
}
