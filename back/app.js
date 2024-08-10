const express = require('express');
const app = express();
const cors = require('cors');

const saveMission  = require('./routes/missionsRoutes/saveMissionRoute')
const getMissions = require('./routes/missionsRoutes/getMissionRoute')
const deletedMissions = require('./routes/missionsRoutes/deleteMissionRoute')

const getAllPlanes = require('./routes/getPlanesRoute')
const getTime = require('./routes/getTimeRoute')
const checkThreatRoute = require('./routes/checkThreatRoute');


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS','DELETE'], 
    allowedHeaders: ['Content-Type'],
  }));
app.use(express.json());

app.use('/api/checkThreat', checkThreatRoute); 
app.use('/api/getPlanes', getAllPlanes);
//missions routes 
app.use('/api/missions/', saveMission);
app.use('/api/missions/', getMissions);
app.use('/api/missions/', deletedMissions)
app.use('/api/getTimeClose',getTime)


const port = process.env.PORT || 81;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
