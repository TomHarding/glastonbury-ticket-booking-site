import React from "react"

export function Warning({ message }: { message: string }) {
  return (
    <p className="block rounded bg-warning-yellow p-4 text-sm">
      <em>{message}</em>
    </p>
  )
}
