export class SampleClass {
  private _id: number;
  private _email: string;
  private _name: string;

  get id(): number {
    return this._id;
  }

  // values can be assigned only in the constructor
  private set id(id: number) {
    if (!this.isValidId(id)) {
      throw new Error('Invalid id');
    }

    this._id = id;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email');
    }

    this._email = email;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    if (!this.isValidName(name)) {
      throw new Error('Invalid name');
    }

    this._name = name;
  }

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

  // the next 3 functions below do all validation regarding the properties itself, like type, size, content, etc... and can be called multiple times. Here is being used to validate the field in the assignment but also in the validation before saving, to ensure the model is being fully validated.
  isValidId(id: number): boolean {
    return isNaN(id) || id <= 0 || id > 1000 ? false : true;
  }

  isValidName(name: string): boolean {
    return !!name;
  }

  isValidEmail(email: string): boolean {
    return !!email && email.indexOf('@') > -1;
  }

  validateClientBeforeSave() {
    if (
      !this.isValidId(this.id) ||
      !this.isValidName(this.name) ||
      !this.isValidEmail(this.email)
    ) {
      // do anything we want, like throw error or return a friendly message to the user
      return 'impossible to save, invalid data';
    }

    console.log(this);
    return true;
  }
}

// we can have parameters being passed to the constructor
const client = new SampleClass(5165165, 'israel@test.com');
// but we can also have assign values outta constructor, like below
client.name = 'Israel';

// we can even more, create private setters to avoid rewriting the prop value, like below
// client.id = '10';

const result = client.validateClientBeforeSave();
// if (result) {
//   callRepoToSave(result)
// }

console.log(result);
