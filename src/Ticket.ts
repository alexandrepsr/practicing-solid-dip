export default class Ticket {
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly email: string,
    readonly price: number
  ) {}
}
