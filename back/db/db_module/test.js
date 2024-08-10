const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function duplicateFirstMission() {
  try {
    // Fetch the first row in the Mission table
    const firstMission = await prisma.mission.findFirst();
    
    if (!firstMission) {
      console.log('No mission found in the database.');
      return;
    }

    // Create an array to hold the new missions
    const newMissions = [];

    // Copy the first mission 10 times
    for (let i = 0; i < 10; i++) {
      const newMission = {
        planeIcao24: firstMission.planeIcao24,
        planeCountry: firstMission.planeCountry,
        planeLatitude: firstMission.planeLatitude,
        planeLongitude: firstMission.planeLongitude,
        planeSpeed: firstMission.planeSpeed,
        threatLatitude: firstMission.threatLatitude,
        threatLongitude: firstMission.threatLongitude,
        threatRadius: firstMission.threatRadius,
        threatSpeed: firstMission.threatSpeed,
        closeTime: firstMission.closeTime,
      };

      newMissions.push(newMission);
    }

    // Insert the new missions into the database
    await prisma.mission.createMany({
      data: newMissions,
    });

    console.log('10 copies of the first mission have been successfully created.');
  } catch (error) {
    console.error('Error duplicating missions:', error);
  } finally {
    await prisma.$disconnect();
  }
}
async function addMission(missionData) {
  try {
    const mission = await prisma.mission.create({
      data: missionData,
    });
    console.log('Mission added:', mission);
  } catch (error) {
    console.error('Error adding mission:', error);
  } finally {
    await prisma.$disconnect();
  }
}
const newMission = {
  planeIcao24: 'ABC123',
  planeCountry: 'USA',
  planeLatitude: 40.7128,
  planeLongitude: -74.0060,
  planeSpeed: 500,
  threatLatitude: 41.7128,
  threatLongitude: -75.0060,
  threatRadius: 100,
  threatSpeed: 600,
  closeTime: 1234567890,
};

addMission(newMission);
duplicateFirstMission();
