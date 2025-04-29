import { type LoaderFunctionArgs, redirect } from "@remix-run/node"
import React from "react"
import { BookingComplete, Content, Footer, HeaderTitleBar } from "~/components"
import { booking } from "~/lib/cookies"
import { useLoaderData } from "@remix-run/react"

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("Cookie")
  const bookingCookie = await booking.parse(cookie)

  if (!bookingCookie) {
    return redirect("/", 302)
  }

  return { bookingCookie }
}

export default function CompleteRoute() {
  const { bookingCookie } = useLoaderData<typeof loader>()

  const heading = `Order Reference: ${bookingCookie.orderReference}`

  return (
    <div className="bg-layout-grey font-light">
      <HeaderTitleBar heading={heading} />
      <Content>
        <BookingComplete bookingCookie={bookingCookie} />
      </Content>
      <Footer />
    </div>
  )
}
