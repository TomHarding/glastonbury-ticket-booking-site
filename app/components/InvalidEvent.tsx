import React from "react"

export function InvalidEvent() {
  return (
    <div className="text-left text-sm">
      <p className="my-3.5">
        We&#39;re sorry, but we couldn&#39;t find the event you were looking
        for.
      </p>
      <p className="my-3.5">Use our search box to try again or... </p>
      <button className="cursor-pointer rounded bg-header-blue px-4 py-3 text-base font-normal text-white">
        Return to the Homepage →
      </button>
    </div>
  )
}
