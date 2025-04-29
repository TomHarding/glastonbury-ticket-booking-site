import { createCookie } from "@remix-run/node"

export const canAccessBookingPage = createCookie("booking-page-access", {
  maxAge: 600, // 10 minutes
})

export const booking = createCookie("booking", {
  maxAge: 600, // 10 minutes
})
