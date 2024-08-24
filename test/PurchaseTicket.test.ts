import { PgpromiseAdapter } from "../src/DatabaseConnection";
import {
  EventRepositoryDatabase,
  EventRepositoryFake,
} from "../src/EventRepository";
import GetTicket from "../src/GetTicket";
import PurchaseTicket from "../src/PurchaseTicket";
import {
  TicketRepositoryDatabase,
  TicketRepositoryFake,
} from "../src/TicketRepository";

test("should buy a ticket", async () => {
  const connection = new PgpromiseAdapter();
  const eventRepository = new EventRepositoryDatabase(connection);
  const ticketRepository = new TicketRepositoryDatabase(connection);
  const purchaseTicket = new PurchaseTicket(eventRepository, ticketRepository);
  const inputPurchaseTicket = {
    eventId: "8c0a59f4-64cb-436e-81c1-ae92f3c7be20",
    email: "bob@gang4.com",
  };
  const outputPurchaseTicket = await purchaseTicket.execute(
    inputPurchaseTicket
  );
  expect(outputPurchaseTicket.ticketId).toBeDefined();

  const getTicket = new GetTicket(ticketRepository);
  const outputGetTicket = await getTicket.execute(
    outputPurchaseTicket.ticketId
  );
  expect(outputGetTicket.ticketId).toBe(outputPurchaseTicket.ticketId);
  expect(outputGetTicket.eventId).toBe(inputPurchaseTicket.eventId);
  expect(outputGetTicket.email).toBe(inputPurchaseTicket.email);
  expect(outputGetTicket.price).toBe(100);
  await connection.close();
});
