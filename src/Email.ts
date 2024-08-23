export default class Email {
  private value: string;

  constructor(readonly email: string) {
    if (!email.match(/.+\@.+/)) throw new Error("Invalid email");
    this.value = email;
  }

  getValue() {
    return this.value;
  }
}
