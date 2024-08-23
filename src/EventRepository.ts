import pgp from "pg-promise";
import Event from "./Event";

/**
 * This class is responsible for mediation between domain object and persistence mechanism
 * */
export default class EventRepository {
  constructor() {}

  async getEvent(eventId: string): Promise<Event> {
    const connection = pgp()("postgres://postgres:pass@localhost:5432/ticket");
    const [eventData] = await connection.query(
      "select * from event where event_id = $1",
      [eventId]
    );

    return new Event(
      eventData.event_id,
      eventData.description,
      parseFloat(eventData.price)
    );
  }
}
