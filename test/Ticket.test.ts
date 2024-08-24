import Ticket from "../src/Ticket";

test("should create a ticket", () => {
  const ticket = new Ticket("", "", "bob@gang4.com", 100);

  expect(ticket.getEmail()).toBe("bob@gang4.com");
  expect(ticket.price).toBe(100);
});

test("should not create a ticket if email is invalid", () => {
  expect(() => new Ticket("", "", "gang4.com", 100)).toThrow(
    new Error("Invalid email")
  );
});

test("should not create a ticket if price is invalid", () => {
  expect(() => new Ticket("", "", "bob@gang4.com", -100)).toThrow(
    new Error("Invalid price")
  );
});
