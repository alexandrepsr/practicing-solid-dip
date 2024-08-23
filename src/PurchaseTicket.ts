import EventRepository from "./EventRepository";
import TicketRepository from "./TicketRepository";
import Ticket from "./Ticket";

export default class PurchaseTicket {
  eventRepository = new EventRepository();
  ticketRepository = new TicketRepository();

  constructor() {}

  async execute(input: Input): Promise<Output> {
    const eventData = await this.eventRepository.getEvent(input.eventId);
    const ticket = Ticket.create(input.eventId, input.email, eventData.price);
    await this.ticketRepository.saveTicket(ticket);
    return { ticketId: ticket.ticketId };
  }
}

type Input = {
  eventId: string;
  email: string;
};

type Output = {
  ticketId: string;
};
