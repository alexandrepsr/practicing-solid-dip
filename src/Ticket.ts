import crypto from "crypto";
import Email from "./Email";

export default class Ticket {
  private email: Email;
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    email: string,
    readonly price: number
  ) {
    this.email = new Email(email);
    if (price <= 0) throw new Error("Invalid price");
  }

  // Static Factory Method
  static create(eventId: string, email: string, price: number) {
    return new Ticket(crypto.randomUUID(), eventId, email, price);
  }

  getEmail() {
    return this.email.getValue();
  }
}
