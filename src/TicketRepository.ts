import pgp from "pg-promise";
import Ticket from "./Ticket";

/**
 * This class is responsible for mediation between domain object and persistence mechanism
 * */
export default class TicketRepository {
  constructor() {}

  async saveTicket(ticket: Ticket): Promise<void> {
    const connection = pgp()("postgres://postgres:pass@localhost:5432/ticket");
    await connection.query(
      "insert into ticket (ticket_id, event_id, email, price) values ($1, $2, $3, $4)",
      [ticket.ticketId, ticket.eventId, ticket.getEmail(), ticket.price]
    );
  }

  async getTicket(ticketId: string): Promise<Ticket> {
    const connection = pgp()("postgres://postgres:pass@localhost:5432/ticket");
    const [eventData] = await connection.query(
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
