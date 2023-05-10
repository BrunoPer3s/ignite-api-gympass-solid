export class UserAlreadyExistsError extends Error {
  constructor() {
    super('This E-mail is already registered in our database')
  }
}
