import React from "react"
import { Link } from "@remix-run/react"

export function Footer() {
  return (
    <footer className="bg-footer-grey px-2.5 py-7">
      <nav className="m-auto max-w-[1000px] overflow-hidden font-header text-lg uppercase leading-[25px] text-[#393834]">
        <div>
          Powered by
          <Link to="https://www.seetickets.com/">
            <img
              src="/see_tickets.png"
              alt="SeeTickets"
              className="inline pb-1 pl-1"
            />
          </Link>
        </div>
      </nav>
    </footer>
  )
}
