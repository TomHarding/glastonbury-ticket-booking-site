import React from "react"

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden border-l-4 border-note-border-blue bg-note-blue p-3 text-sm leading-[18px]">
      {children}
    </div>
  )
}
