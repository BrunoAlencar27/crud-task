export class AppError extends Error {
  constructor(statusCode, messages) {
    messages = Array.isArray(messages) ? messages : [messages];

    super(messages.toString());

    this.messages = messages;
    this.statusCode = statusCode;
  }
}

