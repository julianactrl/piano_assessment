const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");

function read_file_a(file) {
  const results_a = [];
  fs.createReadStream(file)
    .pipe(csv({}))
    .on("data", (data) => results_a.push(data))
    .on("end", () => {
      console.log(results_a);
    });
}

console.log(read_file_a("./Data/filea.csv"))

function read_file_b(file) {
  const results_b = [];
  fs.createReadStream(file)
    .pipe(csv({}))
    .on("data", (data) => results_b.push(data))
    .on("end", () => {
      console.log(results_b);
    });
  return results_b;
}

// console.log(read_file_b("./Data/fileb.csv"));

// axios.get('https://sandbox.tinypass.com/api/v3/publisher/user/list?api_token=xeYjNEhmutkgkqCZyhBn6DErVntAKDx30FqFOS6D&aid=o1sRRZSLlw')
// .then(result => {
//     console.log(result.data.users )
// })
// .catch(error => console.log(error))

function merge_data(a, b) {
  // data_user = []
  return a.map((file_a) => {
    console.log(file_a);
    return b.map((file_b) => {
      if (file_a["user_id"] === file_b["user_id"]) {
        return [
          {
            user_id: file_a["user_id"],
            email: file_a["email"],
            first_name: file_b["first_name"],
            last_name: file_b["last_name"],
          },
        ];
      }
    });
  });
}

// console.log(merge_data(results_a, results_b));
