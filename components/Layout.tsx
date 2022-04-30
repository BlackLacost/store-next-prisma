import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>Header</header>
      <main className="container mx-auto md:w-2/3">{children}</main>
      <footer>Footer</footer>
    </>
  )
}
