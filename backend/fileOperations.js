const fs = require("fs");

const filePath = "services.json";

const services = [
  {
    name: "Haircut",
    category: "Hair",
    duration: 30,
    price: 199,
  },
  {
    name: "Facial",
    category: "Skin",
    duration: 20,
    price: 499,
  },
];

fs.writeFileSync(filePath, JSON.stringify(services, null, 2));
console.log("Service data written to file successfully.");

const data = fs.readFileSync(filePath, "utf-8");
const parsedData = JSON.parse(data);

console.log("Service data read from file:");
console.log(parsedData);
