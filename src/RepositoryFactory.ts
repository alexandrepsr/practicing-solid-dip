import DatabaseConnection from "./DatabaseConnection";
import EventRepository, {
  EventRepositoryDatabase,
  EventRepositoryFake,
} from "./EventRepository";
import TicketRepository, {
  TicketRepositoryDatabase,
  TicketRepositoryFake,
} from "./TicketRepository";

export default interface RepositoryFactory {
  createEventRepository(): EventRepository;
  createTicketRepository(): TicketRepository;
}

export class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}

  createEventRepository(): EventRepository {
    return new EventRepositoryDatabase(this.connection);
  }

  createTicketRepository(): TicketRepository {
    return new TicketRepositoryDatabase(this.connection);
  }
}

export class RepositoryFactoryFake implements RepositoryFactory {
  createEventRepository(): EventRepository {
    return new EventRepositoryFake();
  }

  createTicketRepository(): TicketRepository {
    return TicketRepositoryFake.getInstance();
  }
}
