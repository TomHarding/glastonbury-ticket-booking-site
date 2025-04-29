import React from "react"
import { useSubmit } from "@remix-run/react"
import type { Registration, BookingCookie } from "~/lib/type"

function BookingWindow({
  registration,
  number,
  showId,
  children,
}: {
  registration: Registration
  number?: number
  showId?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="max-w-[300px] rounded border border-[#dcdcdc] p-4 text-sm">
      <div>
        <span>
          {number && <span>{number}. </span>}
          <strong>
            <u>{registration.name} </u>
            {showId && <span>({registration.id})</span>}
          </strong>
        </span>
      </div>
      <br />
      {children}
      <br />
      <div>
        <p className="mb-2 text-xs">Ticket type:</p>
        <select className="w-full rounded px-4 py-2">
          <option value="0">Deposit (£75.00)</option>
        </select>
      </div>
    </div>
  )
}

export function ConfirmRegistration({
  bookingCookie,
}: {
  bookingCookie: BookingCookie
}) {
  const submit = useSubmit()

  const onClick = () => {
    // Clear the booking cookie
    document.cookie = "booking=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    // Redirect to the home page
    window.location.href = "/"
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append("bookingCookie", JSON.stringify(bookingCookie))

    return submit(formData, {
      encType: "application/x-www-form-urlencoded",
      action: "/confirm-registrations",
      method: "post",
      replace: false,
      relative: "route",
    })
  }

  return (
    <div className="text-left">
      <button
        className="cursor-pointer rounded border-2 border-header-blue px-4 py-3 text-base font-normal text-header-blue"
        onClick={onClick}
      >
        Clear registrations
      </button>
      <div className="my-2.5 max-w-full border-t border-[#dcdcdc]" />
      <h1 className="font-header text-lg uppercase leading-[50px] text-header-blue">
        Registration
      </h1>
      <p className="text-sm">
        Thanks for entering your registrations details. You can{" "}
        <strong>
          buy {1 + bookingCookie.otherRegistrations.length} admission deposits
          with these registrations
        </strong>
        . Please confirm that the information we have is correct.
      </p>
      <br />
      <form onSubmit={onSubmit}>
        <h2 className="mb-4 text-sm uppercase text-header-blue">
          Lead Booker (you)
        </h2>
        <BookingWindow registration={bookingCookie.leadBooker} showId={true}>
          <div>
            <p>{bookingCookie.leadBooker.addressOne}</p>
            <p>{bookingCookie.leadBooker.addressTwo}</p>
            <p>{bookingCookie.leadBooker.postcode}</p>
          </div>
        </BookingWindow>
        {bookingCookie.otherRegistrations.length > 0 && (
          <h2 className="mb-4 mt-6 text-sm uppercase text-header-blue">
            Other Registrations Added To This Order (
            {bookingCookie.otherRegistrations.length})
          </h2>
        )}
        {bookingCookie.otherRegistrations.map((registration, index) => {
          return (
            <BookingWindow
              key={registration.id}
              registration={registration}
              number={index + 1}
            >
              <p>Registration No: {registration.id}</p>
              <p>Postcode: {registration.postcode}</p>
            </BookingWindow>
          )
        })}
        <button
          className="mt-6 cursor-pointer rounded bg-header-blue px-6 py-3 text-base font-normal text-white"
          type="submit"
        >
          Confirm →
        </button>
      </form>
    </div>
  )
}
