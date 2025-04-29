import React from "react"
import { Content, Footer, HeaderTitleBar, PageNotFound } from "~/components"

export default function WildCardRoute() {
  return (
    <div className="bg-layout-grey font-light">
      <HeaderTitleBar heading="Page Not Found" />
      <Content>
        <PageNotFound />
      </Content>
      <Footer />
    </div>
  )
}
