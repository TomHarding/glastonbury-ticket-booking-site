import React from "react"
import { Link } from "@remix-run/react"
import { config } from "~/lib/config"
import type { TicketType } from "~/lib/type"

function TicketButton({ ticketType }: { ticketType: TicketType }) {
  return (
    <>
      <Link
        to={`/event/${config.eventHandle}/${config.eventLocation}/${ticketType.ticketId}`}
      >
        <button className="my-1 w-full bg-header-blue p-4 uppercase">
          <span className="font-bold text-white">{ticketType.ticketLabel}</span>
          <br />
          {ticketType.travelDay && (
            <>
              <span className="font-bold text-white">
                {ticketType.travelDay}
              </span>
              <br />
            </>
          )}
          <em>
            <span className="text-sm text-background-blue">
              {ticketType.saleText}
            </span>
          </em>
        </button>
      </Link>
      <br />
    </>
  )
}

export function TicketType() {
  return (
    <div className="text-left">
      <h1 className="font-header text-xl uppercase text-header-blue">
        Glastonbury Festival
      </h1>
      <br />
      <p className="text-sm">
        For more information please see{" "}
        <a href="/" className="font-bold text-header-blue underline">
          here
        </a>
      </p>
      <br />
      {config.ticketTypes.map((ticketType) => (
        <TicketButton key={ticketType.ticketType} ticketType={ticketType} />
      ))}
    </div>
  )
}
