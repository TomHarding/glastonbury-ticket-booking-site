import React from "react"
import { Link } from "@remix-run/react"

export function Header() {
  return (
    <header className="min-w-max bg-background-blue">
      <div className="flex justify-center">
        <Link to="https://www.glastonburyfestivals.co.uk/">
          <img
            src="/glastonbury_festival.png"
            alt="Glastonbury Festival"
            className="w-[550px]"
          />
        </Link>
      </div>
    </header>
  )
}
