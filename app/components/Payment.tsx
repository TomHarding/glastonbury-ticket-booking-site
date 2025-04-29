import React, { useState } from "react"
import { Link } from "@remix-run/react"
import { Content, Note } from "~/components"
import type { BookingCookie } from "~/lib/type"
import { config } from "~/lib/config"

export function Payment({ bookingCookie }: { bookingCookie: BookingCookie }) {
  const [checkboxes, setCheckboxes] = useState({
    check1: false,
    check2: false,
    check3: false,
  })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setCheckboxes((prev) => ({ ...prev, [name]: checked }))
  }

  const allChecked = checkboxes.check1 && checkboxes.check2 && checkboxes.check3

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <Content className="!pt-9 pb-2">
        <div className="text-left">
          <p className="text-sm">
            Your order details are displayed below. If you are happy with your
            order, please fill in the purchase form and click Buy Tickets.
          </p>
          <br />
          <Note>
            <p className="text-md">Your Responsibility</p>
            <br />
            <p>
              You are booking a general admission ticket deposit. This means
              that you will pay just &pound;{config.depositAmount} per admission
              ticket now.
            </p>
            <br />
            <p>
              All ticket balances will be payable in the first week of April
              2025 from{" "}
              <strong>
                9:00 BST Tuesday 1st April - 23:59 BST Monday 7th April 2025
              </strong>
              , when you will also be able to book car parking and Booking
              Refund Protection.
            </p>
            <br />
            <p>
              If you have not paid your balance by the end of the balance
              payment window, or you decide to cancel your deposit, you will be
              charged an administration fee of &pound;25.00 per ticket and
              refunded &pound;50.00 per ticket. You will be sent a reminder
              email when the deadline is approaching, however, ultimately you
              are responsible for paying your ticket balance.
            </p>
          </Note>
        </div>
      </Content>
      <Content className="!py-2">
        <div className="text-left">
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
              <p className="float-right">
                £{bookingCookie.totalCost.toFixed(2)}
              </p>
              <p>{1 + bookingCookie.otherRegistrations.length}x DEPOSIT</p>
              <div className="pl-4">
                <p className="text-xs">
                  <em>
                    {bookingCookie.leadBooker.name} (#
                    {bookingCookie.leadBooker.id}) -{" "}
                    <strong className="uppercase text-black">
                      Lead Booker
                    </strong>
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
          </div>
        </div>
      </Content>
      <Content className="!py-2">
        <div className="text-left">
          <h2 className="font-bold">
            Your Billing Contact And Delivery Address Details
          </h2>
          <div className="text-sm">
            <p>
              Please check and/or update your billing contact and delivery
              address details.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="min-w-[400px] flex-1">
              <label htmlFor="title" className="block">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="firstName" className="block">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="lastName" className="block">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="email" className="block">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="confirmEmail" className="block">
                Confirm Email Address
              </label>
              <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="telephone" className="block">
                Telephone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="country" className="block">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="address1" className="block">
                Address 1
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="address2" className="block">
                Address 2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="town" className="block">
                Town
              </label>
              <input
                type="text"
                id="town"
                name="town"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="county" className="block">
                County
              </label>
              <input
                type="text"
                id="county"
                name="county"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
            <div className="min-w-[400px] flex-1">
              <label htmlFor="postcode" className="block">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                className="mb-2 w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>
        </div>
      </Content>
      <Content className="!py-2">
        <div className="text-left">
          <h2 className="font-bold">Payment Details</h2>
          <div className="flex max-w-[320px] flex-wrap border-b pt-4 text-sm">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="mb-2 w-40 border-none p-2 outline-none"
              placeholder="Card number"
            />
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              className="mb-2 w-20 border-none p-2 outline-none"
              placeholder="MM/YY"
            />
            <input
              type="text"
              id="cvv"
              name="cvv"
              className="mb-2 w-20 border-none p-2 outline-none"
              placeholder="CVC"
            />
          </div>
        </div>
      </Content>
      <Content className="!py-2">
        <div className="text-left">
          <div className="text-sm">
            <input
              type="checkbox"
              id="check1"
              name="check1"
              value="Check1"
              className="cursor-pointer"
              checked={checkboxes.check1}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check1">
              {" "}
              Please tick here to confirm you have read, understood and agreed
              to the Festival&#39;s{" "}
              <Link
                to="https://glastonburyfestivals.co.uk/info/#tickets--glastonbury-festival-terms-and-conditions"
                className="font-bold text-header-blue underline"
              >
                Terms and Conditions of Entry
              </Link>
            </label>
            <br />
            <br />
            <input
              type="checkbox"
              id="check2"
              name="check2"
              value="Check2"
              className="cursor-pointer"
              checked={checkboxes.check2}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check2">
              {" "}
              Please tick here to confirm that everyone on this booking had
              consented for their registration data to be processed for the
              purpose of issuing their Glastonbury Festival ticket, as outlined
              the Festival&#39;s{" "}
              <Link
                to="https://www.glastonburyfestivals.co.uk/privacy-policy/"
                className="font-bold text-header-blue underline"
              >
                Privacy Policy
              </Link>{" "}
              (and that for anyone aged 15 or under, a parent, carer or legal
              guardian had consented on their behalf)
            </label>
            <br />
            <br />
            <p>
              Under 16s must be accompanied to the Festival by a responsible
              adult (who must be aged 18 or over, who would usually be the
              parent, carer or legal guardian)
            </p>
            <input
              type="checkbox"
              id="check3"
              name="check3"
              value="Check3"
              className="cursor-pointer"
              checked={checkboxes.check3}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check3" className="font-bold">
              {" "}
              Please tick here to confirm either
            </label>
            <br />
            <br />
            <div className="ml-4">
              <p>&#x2022; everyone on this booking is aged 16 or over</p>
              <p className="font-bold">
                or if you are booking tickets for children aged 13, 14, or 15,
                and/or bringing children aged 12 or under with you to the
                Festival
              </p>
              <br />
              <p>
                &#x2022; the leader booker is aged 18 or over (usually the
                parent, carer or legal guardian) and accepts full responsibility
                for all under 16s attending in this group.
              </p>
            </div>
          </div>
        </div>
      </Content>
      <Content className="!py-2">
        <div className="text-left">
          <button
            className={`rounded bg-header-blue px-6 py-3 text-base font-normal text-white ${
              allChecked ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            type="submit"
            disabled={!allChecked}
          >
            <Link
              to={allChecked ? "/booking/complete" : "#"}
              className={allChecked ? "cursor-pointer" : "cursor-not-allowed"}
            >
              Buy Tickets
            </Link>
          </button>
        </div>
      </Content>
    </>
  )
}
