const jsonStr = '{"id": 101, "title": "JavaScript Book", "price": 450, "instock": true}';

function parseAndExtract(jsonString) {
  const obj = JSON.parse(jsonString); 
  return {
    title: obj.title,
    price: obj.price
  };
}
console.log(parseAndExtract(jsonStr));