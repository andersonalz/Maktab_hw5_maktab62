function getMap() {
  let gameMap = "";
  for (let i = 0; i < 300; ++i) {
    gameMap += "*";
  }
  return gameMap;
}

function Car(name, position) {
  this.name = name;
  this.position = position;
}

function replaceAt(string, index, replacement) {
  const stringConvertedToArray = string.split("");
  stringConvertedToArray[index] = replacement;
  const result = stringConvertedToArray.join("");
  return result;
}

let cars = [];

const numberOfCars = prompt("please enter the count of cars in game:");

for (let i = 0; i < numberOfCars; i++) {
  cars.push(new Car(prompt(`please enter the name of ${i + 1} car`), 0));
}

let gameMap = getMap();

function match() {
  let endPoint = true;

  function CurrentPosition(name, position) {
    this.name = name;
    this.position = position;
  }

  while (endPoint) {
    const positions = [];
    for (let i = 0; i < cars.length; ++i) {
      const step = Math.floor(Math.random() * 11);
      cars[i].position += step;
      positions.push(new CurrentPosition(cars[i].name, cars[i].position));
    }
    for (let i = positions.length - 1; i >= 0; i--) {
      for (let j = i - 1; j >= 0; --j) {
        if (positions[i].position === positions[j].position) {
          for (let n = 0; n < cars.length; ++n) {
            if (cars[n].name === positions[j].name) {
              cars[n].position = 0;
            }
          }
        }
      }
    }

    cars = cars.sort((a, b) => {
      return a.position - b.position;
    });

    for (let i = 0; i < cars.length; ++i) {
      gameMap = replaceAt(gameMap, cars[i].position, cars[i].name);
      if (cars[i].position >= 300) {
        endPoint = false;
      }
    }

    console.log(positions);
    console.log(gameMap);
    gameMap = getMap();

    if (!endPoint) {
      console.log(`${cars[cars.length - 1].name} won!!!!`);
    }
  }
}

match();
