function Component(template: string, selector: string) {
  console.log('decorator in Component');

  return <T extends { new (...args: any[]): { name: string } }>(
    constructorFn: T
  ) => {
    console.log('decorator factory in Component');

    const mountedElement = document.querySelector(selector);
    const instance = new constructorFn();

    if (mountedElement) {
      mountedElement.innerHTML = template;
      mountedElement.querySelector('h1')!.textContent = instance.name;
    }

    return class extends constructorFn {
      constructor(...args: any[]) {
        console.log('😀 return class in Component');
        super();
      }
    };
  };
}

function Component2() {
  console.log('decorator in Component2');
  return (constructorFn: { new (...args: any[]): {} }) => {
    console.log('decorator factory in Component2');
  };
}

function PropertyLog(target: any, propertyKey: string) {
  console.log('========= 🧚‍♂️ PropertyLog... =========');
  console.log(target);
  console.log(propertyKey);
}

function MethodLog(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log('========= 🧝🏻 MethodLog... ==========');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

function Parameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log('========= 🫀 PerameterLog... ==========');
  console.log(parameterIndex);
}

function Enumerable(isEnumerable: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    return {
      enumerable: isEnumerable,
    };
  };
}
function Accessor(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log('========= 🚀 Accessor... ==========');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

@Component('<h1>{{ name }}</h1>', '#app')
@Component2()
class User {
  constructor(private _age: number) {}

  @Enumerable(false)
  @Accessor
  get age(): number {
    return this.age;
  }
  set age(val) {
    this._age = val;
  }

  @PropertyLog
  name = 'Bob!!';

  @MethodLog
  hello(@Parameter message: string) {
    console.log(message);
  }
}

const user = new User(42);
const user2 = new User(42);
