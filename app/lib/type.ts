import type { TicketType as TicketTypeEnum } from "~/lib/enum"

export type TicketType = {
  ticketId: number
  ticketType: TicketTypeEnum
  ticketLabel: string
  travelDay?: string
  saleDate: Date
  saleText: string
}

export type Config = {
  depositAmount: number
  eventHandle: string
  eventLocation: string
  eventId: string
  eventStartDate: Date
  eventEndDate: Date
  ticketTypes: TicketType[]
  queueSize: number
}

export type RegistrationEntry = {
  Position: number
  RegistrationId: number
  PostCode: string
}

export type Registration = {
  ticketType: TicketTypeEnum
  id: number
  name: string
  addressOne: string
  addressTwo: string
  postcode: string
  cost: number
}

export type BookingCookie = {
  orderReference: number
  totalCost: number
  leadBooker: Registration
  otherRegistrations: Registration[]
}
