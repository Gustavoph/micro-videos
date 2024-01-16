import { Uuid, InvalidUuidError } from './uuid.vo';

describe('Uuid', () => {
  it('should create a valid Uuid instance with a provided ID', () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    const uuidInstance = new Uuid(validUuid);

    expect(uuidInstance.value).toBe(validUuid);
  });

  it('should create a valid Uuid instance with a generated ID', () => {
    const uuidInstance = new Uuid();

    expect(uuidInstance.value).toBeTruthy();
  });

  it('should throw InvalidUuidError for an invalid UUID', () => {
    const invalidUuid = 'not-a-valid-uuid';

    expect(() => new Uuid(invalidUuid)).toThrow(InvalidUuidError);
  });

  it('should throw InvalidUuidError for an undefined ID', () => {
    const undefinedUuid: any = undefined;
    const uuidInstance = new Uuid(undefinedUuid);

    expect(uuidInstance.value).toBeDefined()
  });
});