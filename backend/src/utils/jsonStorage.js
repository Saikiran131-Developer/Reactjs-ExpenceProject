const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../src/data/users.json');

const readData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON data:', error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing JSON data:', error);
  }
};

module.exports = { readData, writeData };
