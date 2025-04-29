import { type ActionFunctionArgs, redirect } from "@remix-run/node"
import { faker } from "@faker-js/faker"
import { booking } from "~/lib/cookies"
import { TicketType as TicketTypeEnum } from "~/lib/enum"
import type { Registration, RegistrationEntry } from "~/lib/type"

function parseFormData({ formData }: { formData: FormData }) {
  const registrationEntries: RegistrationEntry[] = []

  for (const pair of formData.entries()) {
    const positionMatches = pair[0].match(/\d+/g)

    if (positionMatches === null || pair[1] === "") {
      continue
    }

    const position = parseInt(positionMatches[0])
    const field = pair[0].split(".")[1]

    if (registrationEntries[position] === undefined) {
      registrationEntries.push({
        Position: position,
        [field]: pair[1],
      } as RegistrationEntry)
    }

    registrationEntries[position] = {
      ...registrationEntries[position],
      [field]: pair[1],
    }
  }

  return registrationEntries
}

function createRegistration({
  ticketType,
  id,
  postCode,
}: {
  ticketType: TicketTypeEnum
  id: number
  postCode: string
}) {
  return {
    ticketType,
    id,
    name: faker.person.fullName(),
    addressOne: faker.location.streetAddress(),
    addressTwo: faker.location.secondaryAddress(),
    postcode: postCode,
    cost: 0,
  } as Registration
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const ticketType = TicketTypeEnum.GENERAL_ADMISSION
  const registrationEntries = parseFormData({ formData })

  const leadBooker = createRegistration({
    ticketType,
    id: registrationEntries[0].RegistrationId,
    postCode: registrationEntries[0].PostCode,
  })

  const otherRegistrations = registrationEntries.slice(1).map((registration) =>
    createRegistration({
      ticketType,
      id: registration.RegistrationId,
      postCode: registration.PostCode,
    })
  )

  const bookingCookie = {
    orderReference: faker.number.int({ min: 10000000, max: 99999999 }),
    totalCost: 0,
    leadBooker,
    otherRegistrations,
  }

  const cookie = await booking.serialize(bookingCookie)

  const headers = new Headers()
  headers.set("Set-Cookie", cookie.toString())

  return redirect("/gfl/addregistrations", { headers, status: 302 })
}
