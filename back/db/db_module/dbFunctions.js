const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMission(plane, threat,time) {
  const newMission = await prisma.mission.create({
    data: {
      planeIcao24: plane.icao24,
      planeCountry: plane.country,
      planeLatitude: plane.latitude,
      planeLongitude: plane.longitude,
      planeSpeed: plane.speed,
      threatLatitude: threat.position[0],
      threatLongitude: threat.position[1],
      threatRadius: threat.radius,
      threatSpeed: threat.speed,
      closeTime: time
    },
  });

  return newMission;
}


  

async function deleteMission(missionId) {
  const deletedMission = await prisma.mission.delete({
    where: {
      id: missionId,
    },
  });
  return deletedMission;
}

// async function updateMission(missionId, data) {
//   const updatedMission = await prisma.mission.update({
//     where: {
//       id: missionId,
//     },
//     data,
//   });
//   return updatedMission;
// }

async function getMissionById(missionId) {
  const mission = await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
  });
  return mission;
}

async function getAllMissions() {
  const missions = await prisma.mission.findMany();
  return missions;
}

module.exports = {
  addMission,
  deleteMission,
//   updateMission,
  getMissionById,
  getAllMissions,
  prisma, 
};
