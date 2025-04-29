import { useSubmit } from "@remix-run/react"
import React, { useRef } from "react"
import { Note } from "~/components"
import { config } from "~/lib/config"

function IndividualRegistrationForm({ guestNumber }: { guestNumber: number }) {
  return (
    <div className="mb-3.5 max-w-[568px] py-2.5">
      {guestNumber > 0 && (
        <span className="float-right mr-2 text-[#707070]">#{guestNumber}</span>
      )}
      <label className="mx-3.5 mt-4 inline-block min-w-[123px] text-xs font-bold">
        Registration Number:
      </label>
      <input
        className="mb-2.5 inline-block w-full max-w-[18.75rem] rounded border border-[#bababa] bg-[#f8f8f8] p-1.5"
        id={`registrations_${guestNumber}__RegistrationId`}
        maxLength={30}
        name={`registrations[${guestNumber}].RegistrationId`}
        type="text"
      />
      <br />
      <label className="mx-3.5 mt-4 inline-block min-w-[123px] text-xs font-bold">
        Postcode:
      </label>
      <input
        className="mb-2.5 inline-block w-full max-w-[18.75rem] rounded border border-[#bababa] bg-[#f8f8f8] p-1.5 uppercase"
        id={`registrations_${guestNumber}__PostCode`}
        maxLength={30}
        name={`registrations[${guestNumber}].PostCode`}
        type="text"
      />
    </div>
  )
}

export function Registration() {
  const formRef = useRef<HTMLFormElement>(null)

  const cancelOnClick = () => {
    formRef.current?.reset()
  }

  const submit = useSubmit()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    return submit(formData, {
      encType: "application/x-www-form-urlencoded",
      action: "/set-registrations",
      method: "post",
      replace: false,
      relative: "route",
    })
  }

  return (
    <div className="text-left">
      {/*<Warning message=" Use of this page is limited to authorised guest access only. You may only use this page with pre-authorised registrations." />*/}
      <h1 className="font-header text-lg uppercase leading-[50px] text-header-blue">
        Registration
      </h1>
      <div className="text-sm">
        <p>
          Please enter the registration number and postcode for each person
          (aged 13 or over) for whom you are placing a deposit. You may enter up
          to 6 people&#39;s registration details, but can only purchase 1 ticket
          per registration.
        </p>
        <br />
        <Note>
          <p className="text-md">Your Responsibility</p>
          <br />
          <p>
            You are booking a general admission ticket deposit. This means that
            you will pay just &pound;{config.depositAmount} per admission ticket
            now.
          </p>
          <br />
          <p>
            All ticket balances will be payable in the first week of April 2025
            from{" "}
            <strong>
              9:00 BST Tuesday 1st April - 23:59 BST Monday 7th April 2025
            </strong>
            , when you will also be able to book car parking and Booking Refund
            Protection.
          </p>
          <br />
          <p>
            If you have not paid your balance by the end of the balance payment
            window, or you decide to cancel your deposit, you will be charged an
            administration fee of &pound;25.00 per ticket and refunded
            &pound;50.00 per ticket. You will be sent a reminder email when the
            deadline is approaching, however, ultimately you are responsible for
            paying your ticket balance.
          </p>
        </Note>
        <br />
        <p>Please enter your Glastonbury details.</p>
        <div className="block max-w-[568px]">
          <h3 className="mt-7 border-b-2 border-[#d71837] py-1 text-left font-normal uppercase">
            Your Details
          </h3>
          <form id="mainRegForm" ref={formRef} onSubmit={onSubmit}>
            <IndividualRegistrationForm guestNumber={0} />
            <h3 className="mt-7 border-b-2 border-[#d71837] py-1 text-left font-normal uppercase">
              Add up to 5 additional tickets
            </h3>
            <IndividualRegistrationForm guestNumber={1} />
            <div className="my-2.5 max-w-full border-t border-[#dcdcdc]" />
            <IndividualRegistrationForm guestNumber={2} />
            <div className="my-2.5 max-w-full border-t border-[#dcdcdc]" />
            <IndividualRegistrationForm guestNumber={3} />
            <div className="my-2.5 max-w-full border-t border-[#dcdcdc]" />
            <IndividualRegistrationForm guestNumber={4} />
            <div className="my-2.5 max-w-full border-t border-[#dcdcdc]" />
            <IndividualRegistrationForm guestNumber={5} />
            <button
              type="submit"
              className="cursor-pointer rounded bg-header-blue px-5 py-2 text-base font-normal text-white"
            >
              Proceed
            </button>
          </form>
        </div>
        <p
          className="mt-3 cursor-pointer text-xs text-header-blue underline"
          onClick={cancelOnClick}
        >
          Clear registration form
        </p>
      </div>
    </div>
  )
}
