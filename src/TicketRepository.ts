import Ticket from "./Ticket";
import DatabaseConnection from "./DatabaseConnection";

/**
 * This class is responsible for mediation between domain object and persistence mechanism
 * */
export default interface TicketRepository {
  saveTicket(ticket: Ticket): Promise<void>;
  getTicket(ticketId: string): Promise<Ticket>;
}

export class TicketRepositoryDatabase implements TicketRepository {
  constructor(readonly connection: DatabaseConnection){}

  async saveTicket(ticket: Ticket): Promise<void> {
    await this.connection.query(
      "insert into ticket (ticket_id, event_id, email, price) values ($1, $2, $3, $4)",
      [ticket.ticketId, ticket.eventId, ticket.getEmail(), ticket.price]
    );
  }

  async getTicket(ticketId: string): Promise<Ticket> {
    const [eventData] = await this.connection.query(
      "select * from ticket where ticket_id = $1",
      [ticketId]
    );

    return new Ticket(
      eventData.ticket_id,
      eventData.event_id,
      eventData.email,
      parseFloat(eventData.price)
    );
  }
}

export class TicketRepositoryFake implements TicketRepository {
  tickets: Ticket[] = [];

  async saveTicket(ticket: Ticket): Promise<void> {
    this.tickets.push(ticket);
  }
  async getTicket(ticketId: string): Promise<Ticket> {
    const ticket = this.tickets.find(
      (ticket: Ticket) => ticket.ticketId === ticketId
    );
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }
}
