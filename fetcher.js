const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const saveLocation = args[1];
const fileName = saveLocation.slice(2);

const fetcher = (url, saveLocation) => {
  request(url, (error, response, body) => {
    
    // Stretch
    if (response.statusCode !== 200) {
      console.log("Error: ", response.statusCode);
      console.log("There is an error on the website. Ending process now.");
      process.exit();
    }

    // Stretch
    // if (fs.access(saveLocation, error => {
    //   if (error) return console.log(error);
    // }))

    // if (!fs.access(saveLocation, error => {
    //   console.log(`The directory you are trying to save to does not exist: ${saveLocation}`);
    //   console.log("Ending process now.");
    //   process.exit(); 
    // })) 

    fs.writeFile(saveLocation, body, error => {
      if (error) return console.log(error);
      console.log(`Downloaded and saved ${body.length} bytes to ${saveLocation}`);
    })

  });
};

fetcher(url, saveLocation);

module.exports = fetcher;