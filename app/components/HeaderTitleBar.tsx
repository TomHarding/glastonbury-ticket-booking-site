import React from "react"

export function HeaderTitleBar({
  heading,
  subHeading,
}: {
  heading: string
  subHeading?: string
}) {
  return (
    <div className="flex justify-center bg-white px-4 py-6">
      <div className="w-[960px]">
        <h1 className="font-header text-xl uppercase leading-[50px] text-header-blue">
          {heading}
        </h1>
        {subHeading && <h2 className="font-header text-md">{subHeading}</h2>}
      </div>
    </div>
  )
}
