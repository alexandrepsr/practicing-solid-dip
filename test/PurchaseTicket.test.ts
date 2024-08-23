import GetTicket from "../src/GetTicket";
import PurchaseTicket from "../src/PurchaseTicket";

test("should buy a ticket", async () => {
  const purchaseTicket = new PurchaseTicket();
  const inputPurchaseTicket = {
    eventId: "8c0a59f4-64cb-436e-81c1-ae92f3c7be20",
    email: "bob@gang4.com",
  };
  const outputPurchaseTicket = await purchaseTicket.execute(
    inputPurchaseTicket
  );
  expect(outputPurchaseTicket.ticketId).toBeDefined();
  
  const getTicket = new GetTicket();
  const outputGetTicket = await getTicket.execute(outputPurchaseTicket.ticketId);
  expect(outputGetTicket.ticketId).toBe(outputPurchaseTicket.ticketId);
  expect(outputGetTicket.eventId).toBe(inputPurchaseTicket.eventId);
  expect(outputGetTicket.email).toBe(inputPurchaseTicket.email);
  expect(outputGetTicket.price).toBe(100);
});
