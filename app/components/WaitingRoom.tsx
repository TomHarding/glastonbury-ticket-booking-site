import { Link } from "@remix-run/react"
import React, { useEffect, useState } from "react"
import { config } from "~/lib/config"
import type { TicketType } from "~/lib/type"

function calculateTimeLeft(saleDate: Date) {
  const now = new Date()
  const difference = saleDate.getTime() - now.getTime()

  let timeLeft = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

export function WaitingRoom({ ticketType }: { ticketType: TicketType }) {
  const saleDate = new Date(ticketType.saleDate)
  const formattedDate = `${saleDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} (${saleDate.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })})`

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(saleDate))

  useEffect(() => {
    const timeDifference =
      new Date(ticketType.saleDate).getTime() - new Date().getTime()

    if (timeDifference <= 0) {
      document.location.reload()
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(saleDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, saleDate, ticketType])

  return (
    <div className="text-left text-queue-grey">
      <p>
        The Glastonbury {config.eventStartDate.getFullYear()}{" "}
        {ticketType.ticketLabel} sale has not yet begun. When it behinds, you
        will be assigned a random place in the queue. There is no need to
        manually refresh this page.
      </p>
      <br />
      <Link to="#" className="underline">
        What is this?
      </Link>
      <br />
      <br />
      <p>The event will begin at: {formattedDate}</p>
      <br />
      <p className="text-center text-lg text-orange-600">
        {`${timeLeft.hours.toString().padStart(2, "0")} Hours ${timeLeft.minutes
          .toString()
          .padStart(2, "0")} Minutes ${timeLeft.seconds
          .toString()
          .padStart(2, "0")} Seconds`}
      </p>
    </div>
  )
}
