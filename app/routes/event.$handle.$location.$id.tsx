import {
  type LoaderFunctionArgs,
  type MetaFunction,
  redirect,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import React from "react"
import { Content, Footer, InvalidEvent, Queue, WaitingRoom } from "~/components"
import { HeaderTitleBar } from "~/components/HeaderTitleBar"
import { config } from "~/lib/config"
import { canAccessBookingPage } from "~/lib/cookies"
import type { TicketType } from "~/lib/type"

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.validEvent) {
    return [{ title: "Glastonbury Festival Deposits" }]
  }

  return [{ title: "No Events Found" }]
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie")
  const accessBookingPageCookie = await canAccessBookingPage.parse(cookie)

  if (accessBookingPageCookie === "true") {
    return redirect("/gfl/addregistrations")
  }

  let validEvent = true

  if (params.handle !== config.eventHandle) {
    validEvent = false
  }

  if (params.location !== config.eventLocation) {
    validEvent = false
  }

  const ticketType = config.ticketTypes.find((ticketType) => {
    return params.id === ticketType.ticketId.toString()
  })

  if (!ticketType) {
    validEvent = false
  }

  return { ticketType, validEvent }
}

export default function EventRoute() {
  const { ticketType, validEvent } = useLoaderData<typeof loader>()

  if (!ticketType && !validEvent) {
    return (
      <div className="bg-layout-grey font-light">
        <HeaderTitleBar heading="Event Not Found" />
        <Content>
          <InvalidEvent />
        </Content>
        <Footer />
      </div>
    )
  }

  if (!ticketType) {
    throw new Error("Ticket type not found")
  }

  const now = new Date()
  const timeDifference = new Date(ticketType.saleDate).getTime() - now.getTime()

  if (timeDifference > 0) {
    return (
      <div className="h-[calc(100vh-256px)] bg-background-blue">
        <Content className="bg-background-blue">
          <WaitingRoom ticketType={ticketType as unknown as TicketType} />
        </Content>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-256px)] bg-background-blue">
      <Content className="bg-background-blue">
        <Queue ticketType={ticketType as unknown as TicketType} />
      </Content>
    </div>
  )
}
