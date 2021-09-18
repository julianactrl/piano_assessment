const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");

// =================================================================================================================//

const getSysInfo = async () => {
  try {
    const sys_info = await axios.get(
      "https://sandbox.tinypass.com/api/v3/publisher/user/list?api_token=xeYjNEhmutkgkqCZyhBn6DErVntAKDx30FqFOS6D&aid=o1sRRZSLlw"
    );
    return sys_info.data.users;
  } catch (err) {
    console.log("error", err);
  }
};


// =================================================================================================================//
const processFileA = async () => {
  records_a = [];
  const parser = fs.createReadStream(`../Data/filea.csv`).pipe(csv({}));
  for await (const record of parser) {
    records_a.push(record);
  }
  return records_a;
};
const data_a = async () => {
  let records_a = await processFileA();
  return records_a;
};

// =================================================================================================================//

const processFileB = async () => {
  records_b = [];
  const parser = fs.createReadStream(`../Data/fileb.csv`).pipe(csv({}));
  for await (const record of parser) {
    records_b.push(record);
  }
  return records_b;
};
const data_b = async () => {
  let records_b = await processFileB();
  return records_b;
};

// =================================================================================================================//
Promise.all([data_a(), data_b(), getSysInfo()])
  .then((values) => {
    const element_a = values[0];
    const element_b = values[1];
    let arr_users = [];

    for (let i = 0; i < element_a.length; i++) {
      for (let j = 0; j < element_b.length; j++) {
        if (element_a[i]["user_id"] === element_b[j]["user_id"]) {
          const obj = {
            user_id: element_a[i]["user_id"],
            email: element_a[i]["email"],
            fist_name: element_b[j]["first_name"],
            last_name: element_b[j]["last_name"],
          };
          arr_users.push(obj);
        }
      }
    }
    const sys_info = values[2]

    arr_users.map(client => {
      sys_info.map(system => {
        if(client['email'] === system['email']){
              client['user_id'] = system['uid']
        }
      })
    })
    console.log(arr_users)
    return arr_users
  })
  .catch((error) => {
    console.error(error.message);
  });

