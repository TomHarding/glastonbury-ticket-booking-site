import { TicketType as TicketTypeEnum } from "~/lib/enum"
import type { Config } from "~/lib/type"

export const config: Config = {
  depositAmount: 75,
  eventHandle: "glastonbury-2025-deposits",
  eventLocation: "worthy-farm",
  eventId: "3500001",
  eventStartDate: new Date(2025, 5, 25),
  eventEndDate: new Date(2025, 5, 29),
  ticketTypes: [
    {
      ticketId: 3500002,
      ticketType: TicketTypeEnum.WEDNESDAY_COACH_TRAVEL,
      ticketLabel: "Tickets Plus Coach Travel",
      travelDay: "Wednesday 25th June Departure",
      saleDate: new Date(2024, 10, 14, 18, 0, 0),
      saleText: "On sale at 6pm GMT, Thursday 14th November",
    },
    {
      ticketId: 3500002,
      ticketType: TicketTypeEnum.THURSDAY_COACH_TRAVEL,
      ticketLabel: "Tickets Plus Coach Travel",
      travelDay: "Thursday 26th June Departure",
      saleDate: new Date(2025, 10, 14, 18, 0, 0),
      saleText: "On sale at 6pm GMT, Thursday 14th November",
    },
    {
      ticketId: 3500001,
      ticketType: TicketTypeEnum.GENERAL_ADMISSION,
      ticketLabel: "General Admission",
      saleDate: new Date(2024, 10, 6, 9, 0, 0),
      saleText: "On sale at 9am GMT, Sunday 17th November",
    },
  ],
  queueSize: 1000,
}
