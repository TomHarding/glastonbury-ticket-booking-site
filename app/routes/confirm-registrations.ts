import { type ActionFunctionArgs, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import { config } from "~/lib/config"
import { booking } from "~/lib/cookies"
import type { BookingCookie } from "~/lib/type"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const bookingFormDataEntry = formData.get("bookingCookie")
  invariant(bookingFormDataEntry, "Missing booking cookie")

  const bookingCookie: BookingCookie = JSON.parse(
    bookingFormDataEntry.toString()
  )

  let totalBookingCost = config.depositAmount
  bookingCookie.leadBooker.cost = config.depositAmount

  for (const registration of bookingCookie.otherRegistrations) {
    registration.cost = config.depositAmount
    totalBookingCost += config.depositAmount
  }

  bookingCookie.totalCost = totalBookingCost

  const cookie = await booking.serialize(bookingCookie)

  const headers = new Headers()
  headers.set("Set-Cookie", cookie.toString())

  return redirect("/payment", { headers, status: 302 })
}
