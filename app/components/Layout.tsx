import React from "react"
import { Header } from "~/components"

export function Layout({
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
