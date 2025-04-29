import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import React from "react"
import {
  ConfirmRegistration,
  Content,
  Footer,
  HeaderTitleBar,
  Registration,
} from "~/components"
import { booking, canAccessBookingPage } from "~/lib/cookies"
import { config } from "~/lib/config"

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie")
  const accessBookingPageCookie = await canAccessBookingPage.parse(cookie)
  const bookingCookie = await booking.parse(cookie)

  if (accessBookingPageCookie !== "true") {
    return redirect("/", 302)
  }

  return { bookingCookie }
}

export default function RegistrationRoute() {
  const { bookingCookie } = useLoaderData<typeof loader>()

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const heading = `Glastonbury ${config.eventStartDate.getFullYear()} Tickets`
  const subHeading = `Worthy Farm, Pilton, Somerset. ${config.eventStartDate.getDate()} - ${formatter.format(
    config.eventEndDate
  )}`

  return (
    <div className="bg-layout-grey font-light">
      <HeaderTitleBar heading={heading} subHeading={subHeading} />
      <Content>
        {bookingCookie ? (
          <ConfirmRegistration bookingCookie={bookingCookie} />
        ) : (
          <Registration />
        )}
      </Content>
      <Footer />
    </div>
  )
}
