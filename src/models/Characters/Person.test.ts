import { Person } from "@/models/Characters/Person.ts";
import { createPersonType } from "@/types/Person.ts";

describe("Person", () => {
  const personData = { fullName: "John Doe", age: 30, sex: "чоловік" };
  let person: Person;

beforeEach(() => {
	person = new Person(personData as createPersonType);
});

  test("constructor assigns the correct values", () => {
    expect(person.getPersonInfo()).toEqual({
      id: expect.any(String),
      fullName: personData.fullName,
      age: personData.age,
      sex: personData.sex,
      health: 0,
      happiness: 0,
      food: 0,
      money: 0,
    });
  });

// test("setHealth sets the correct value", () => {
// 	person.setHealth(50);
// 	expect(person.getPersonInfo().health).toBe(50);
// 	person.setHealth(150);
// 	expect(person.getPersonInfo().health).toBe(100); // MAX_HEALTH
// });

// test("setHappiness sets the correct value", () => {
// 	person.setHappiness(50);
// 	expect(person.getPersonInfo().happiness).toBe(50);
// 	person.setHappiness(150);
// 	expect(person.getPersonInfo().happiness).toBe(100); // MAX_HAPPINESS
// });

//   test("setFood sets the correct value", () => {
//     person.setFood(50);
//     expect(person.getPersonInfo().food).toBe(50);
//   });

//   test("setMoney sets the correct value", () => {
//     person.setMoney(50);
//     expect(person.getPersonInfo().money).toBe(50);
//   });
});
