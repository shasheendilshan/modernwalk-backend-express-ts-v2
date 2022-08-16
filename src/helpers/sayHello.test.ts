import { sayHello } from "./sayHello";

describe("Test Examples", () => {
  describe("sayHello()", () => {
    it('should return "Hello World!"', () => {
      const result = sayHello();
  
      expect(result).toEqual("Hello World!");
    });
  });
  
  describe('sayHello("string")', () => {
    const name = "Kasun";
  
    it(`should return "Hello ${name}!"`, () => {
      const result = sayHello(name);
  
      expect(result).toEqual(`Hello ${name}!`);
    });
  });
})
