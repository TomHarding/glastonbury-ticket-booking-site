import { faker } from "@faker-js/faker"
import React from "react"
import { config } from "~/lib/config"
import type { BookingCookie } from "~/lib/type"
import { Link } from "@remix-run/react"

export function BookingComplete({
  bookingCookie,
}: {
  bookingCookie: BookingCookie
}) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="text-left">
      <h3 className="mt-7 max-w-fit border-b-2 border-header-blue py-1 text-left font-bold">
        Information
      </h3>
      <br />
      <div className="pb-10 text-sm text-layout-grey">
        <h4 className="pb-4 font-normal uppercase text-header-blue">
          Your Details
        </h4>
        <p>{bookingCookie.leadBooker.name}</p>
        <p>{bookingCookie.leadBooker.addressOne}</p>
        <p>{bookingCookie.leadBooker.addressTwo}</p>
        <p className="pb-4">{bookingCookie.leadBooker.postcode}</p>
        <p className="pb-4">Telephone Number: {faker.phone.number()}</p>
        <p>
          Should we need to contact you about this event, we will use the
          telephone number and email address listed above.
        </p>
      </div>
      <h3 className="font-bold text-red-600">
        Glastonbury {config.eventStartDate.getFullYear()} Deposits
      </h3>
      <div className="text-layout-grey">
        <p className="text-sm">
          {config.eventStartDate.getDate()} -{" "}
          {formatter.format(config.eventEndDate)} | Worthy Farm
        </p>
        <div className="my-2.5 max-w-full border-t border-[#dcdcdc]" />
        <div className="pb-4">
          <p className="float-right">£{bookingCookie.totalCost.toFixed(2)}</p>
          <p>{1 + bookingCookie.otherRegistrations.length}x DEPOSIT</p>
          <div className="pl-4">
            <p className="text-xs">
              <em>
                {bookingCookie.leadBooker.name} (#
                {bookingCookie.leadBooker.id}) -{" "}
                <strong className="uppercase text-black">Lead Booker</strong>
              </em>
            </p>
            {bookingCookie.otherRegistrations.map((registration, index) => (
              <p key={index} className="text-xs">
                <em>
                  {registration.name} (#{registration.id})
                </em>
              </p>
            ))}
          </div>
          <div className="my-2.5 max-w-full border-t border-[#dcdcdc]" />
          <p className="float-right text-sm">
            Total{" "}
            <strong className="pl-2 text-lg">
              £{bookingCookie.totalCost.toFixed(2)}
            </strong>
          </p>
          <br />
        </div>
        <div className="text-sm">
          <p>
            Your booking is now complete, your payment card has been charged £
            {bookingCookie.totalCost.toFixed(2)}.
          </p>
          <br />
          <p>
            This payment will appear on your bill as{" "}
            <strong className="uppercase text-black">
              Tickets {bookingCookie.orderReference}
            </strong>
            .
          </p>
          <br />
          <p>
            Your order reference is{" "}
            <strong className="text-black">
              {bookingCookie.orderReference}
            </strong>
          </p>
        </div>
      </div>
      <br />
      <Link to="https://www.glastonburyfestivals.co.uk/">
        <button className="cursor-pointer border border-header-blue px-4 py-3 text-base font-normal text-header-blue">
          Return to website
        </button>
      </Link>
    </div>
  )
}
