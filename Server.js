const express = require('express');
const app = express();
app.use(express.json());

const db = require('./Models');
const trainerRoutes = require('./Routes/Trainer');
const subjectRoutes = require('./Routes/Subject');

app.use('/trainer', trainerRoutes);
app.use('/subject', subjectRoutes);

db.sequelize.sync().then(() => {
   const path = require('path');
   app.use(express.static(path.join(__dirname, 'public')));
   app.listen(3000, () => console.log('Server running on port 3000'));
});




