import React from "react"
import { Content, Footer, TicketType } from "~/components"

export function loader() {
  return {}
}

export default function ContentRoute() {
  return (
    <div className="bg-layout-grey font-light">
      <Content>
        <TicketType />
      </Content>
      <Footer />
    </div>
  )
}
