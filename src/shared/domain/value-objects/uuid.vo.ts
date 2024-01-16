import { v4 as uuid, validate as uuidValidate } from 'uuid'
import { ValueObject } from "../value-object";

export class Uuid extends ValueObject {
  readonly value: string

  constructor(value?: string) {
    super();
    this.value = value ?? uuid();
    this.validate()
  }

  private validate() {
    const isValid = uuidValidate(this.value)
    if (!isValid) throw new InvalidUuidError()
  }
}

export class InvalidUuidError extends Error {
  constructor (message?: string) {
    super(message || 'ID must be a valid UUID')
    this.name = 'InvalidUuidError'
  }
}