const { getDrives } = require('../index');

getDrives().then(drives => console.log(drives));