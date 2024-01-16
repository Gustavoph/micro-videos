import { ValueObject } from "./value-object";

describe("ValueObject Unit Test", () => {
  class MockValueObject extends ValueObject {
    constructor(readonly value: number) {
      super();
    }
  }

  it("should return true for equal objects", () => {
    const obj1 = new MockValueObject(42);
    const obj2 = new MockValueObject(42);

    expect(obj1.equals(obj2)).toBe(true);
  });

  it("should return false for different objects", () => {
    const obj1 = new MockValueObject(42);
    const obj2 = new MockValueObject(99);

    expect(obj1.equals(obj2)).toBe(false);
  });

  it("should return false for comparison with null", () => {
    const obj1 = new MockValueObject(42);

    expect(obj1.equals(null as any)).toBe(false);
  });

  it("should return false for comparison with a different class object", () => {
    class AnotherValueObject extends ValueObject {
      constructor(public value: number) {
        super();
      }
    }

    const obj1 = new MockValueObject(42);
    const obj2 = new AnotherValueObject(42);

    expect(obj1.equals(obj2)).toBe(false);
  });
});