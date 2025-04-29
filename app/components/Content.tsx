import React from "react"

export function Content({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`flex w-screen justify-center px-4 py-9 ${className}`}>
      <div className="h-fit w-[960px] rounded bg-white p-8 text-center">
        {children}
      </div>
    </div>
  )
}
