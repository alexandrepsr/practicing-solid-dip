import Event from "./Event";
import DatabaseConnection from "./DatabaseConnection";

/**
 * This class is responsible for mediation between domain object and persistence mechanism
 * */
export default interface EventRepository {
  getEvent(eventId: string): Promise<Event>;
}

export class EventRepositoryDatabase implements EventRepository {
  constructor(readonly connection: DatabaseConnection){}

  async getEvent(eventId: string): Promise<Event> {
    const [eventData] = await this.connection.query(
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

export class EventRepositoryFake implements EventRepository {
  async getEvent(eventId: string): Promise<Event> {
    return new Event("8c0a59f4-64cb-436e-81c1-ae92f3c7be20", "Evento A", 100);
  }
}
