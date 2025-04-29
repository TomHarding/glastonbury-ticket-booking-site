import { Link } from "@remix-run/react"
import { serialize } from "cookie"
import React, { useEffect, useRef, useState } from "react"
import { config } from "~/lib/config"
import type { TicketType } from "~/lib/type"

export function Queue({ ticketType }: { ticketType: TicketType }) {
  const [position, setPosition] = useState(
    Math.floor(Math.random() * config.queueSize) + 1
  )
  const [progress, setProgress] = useState(0)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [numSquares, setNumSquares] = useState(0)

  useEffect(() => {
    if (position <= 1) {
      document.cookie = serialize(
        "booking-page-access",
        encodeURIComponent(btoa(JSON.stringify("true"))),
        { maxAge: 60, path: "/" }
      )

      window.location.href = "/gfl/addregistrations"
    }

    const intervalId = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = Math.max(prevPosition - 1, 0)
        setProgress(((config.queueSize - newPosition) / config.queueSize) * 100)
        return newPosition
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [position])

  useEffect(() => {
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth
      const squareSize = 18
      setNumSquares(Math.floor(progressBarWidth / squareSize) + 1)
    }
  }, [progressBarRef.current?.offsetWidth])

  const squares = []

  for (let i = 0; i < numSquares; i++) {
    squares.push(<div key={i} className="m-0.5 h-6 w-4 bg-queue-green"></div>)
  }

  return (
    <div className="text-left text-queue-grey">
      <p className="pb-4 text-lg font-bold">You are now in the queue!</p>
      <p>
        You are now in the queue for the Glastonbury{" "}
        {config.eventStartDate.getFullYear()} {ticketType.ticketLabel} sale.
        When it is your turn, you will have 10 minutes to enter the website. You
        will then be asked the enter the registration number and registered
        postcode of the lead booker and up to 5 other people for whom you are
        attempting to book tickets.
      </p>
      <br />
      <Link to="#" className="underline">
        What is this?
      </Link>
      <div
        ref={progressBarRef}
        className="relative my-8 flex h-8 w-full flex-nowrap items-center overflow-hidden border-4 border-queue-grey bg-queue-grey"
      >
        {squares}
        <div
          className="absolute right-0 top-0 h-full overflow-hidden bg-queue-grey transition-all duration-1000"
          style={{ width: `${100 - progress}%` }}
        ></div>
      </div>
    </div>
  )
}
