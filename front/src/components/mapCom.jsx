import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box } from '@mui/material';
import ThreatInput from './threatInputs';
import ThreatCard from './threatCard';
import Toast from './noThreatAlert';
import DangerAlert from './timeClose';

// Update the default marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = () => {
  const [alertMarkers, setAlertMarkers] = useState([]);
  const [plane, setPlane] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [threat, setThreat] = useState([]);
  const [isThreat, setIsThreat] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [closeTime, setCloseTime] = useState();
  const [showDangerAlert,setShowDangerAlert] = useState(false)
  const [defaultCenter,setDefualtCenter] = useState([51.505, -0.09])
  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleCloseTime = async (planeSpeed,threatSpeed, distance) => {
    try {
      const response = await fetch('http://localhost:81/api/getTimeClose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ distance,planeSpeed,threatSpeed }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const time = await response.json();
      setCloseTime(time);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShowToast = () => {
    setToastMsg('No Dangers!');
    setOpenToast(true);
  };
 
  const handleAddThreat = async (newThreat) => {
    try {
        const response = await fetch('http://localhost:81/api/checkThreat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newThreat),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAlertMarkers([newThreat]);
      setDefualtCenter([newThreat.position[0],newThreat.position[1]])
      if (Object.keys(data).length > 0) {
        setPlane(data);
        setThreat(newThreat);
        await handleCloseTime(data.speed,newThreat.speed, data.distance);
        setIsThreat(true)
        setShowDangerAlert(true)
        setTimeout(() => setShowDangerAlert(false), 25000); 
      } else {
        handleShowToast();
        setIsThreat(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMarkers = async () => {
    try {
      const response = await fetch('http://localhost:81/api/getPlanes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const validMarkers = data.filter(marker => marker.latitude !== null && marker.longitude !== null);
      setMarkers(validMarkers);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  useEffect(() => {
    fetchMarkers();
    const interval = setInterval(fetchMarkers, 120000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <Box sx={{ width: '100%', height: '71vh',  position: 'relative' }}>
      <MapContainer center={defaultCenter} zoom={6} style={{ height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, idx) => {
            const [icao24, callsign, country, lastPosition, lastContact, longitude,latitude , altitude, onGround, velocity, heading, verticalRate, sensors, geoAltitude, squawk, spi, positionSource] = marker;
            if (latitude != null && longitude != null) {
            return (
              <Marker key={idx} position={[latitude, longitude]}>
                <Popup>{icao24}</Popup>
              </Marker>
            );
          }
        })}
        {isThreat && <Marker position={[plane.latitude,plane.longitude]}>
            <Popup>{plane.icao24}</Popup>
        </Marker>}
        {alertMarkers.map((alertMarker, idx) => (
          <Circle
            key={idx}
            center={alertMarker.position}
            radius={alertMarker.radius * 1000 || 200} 
            pathOptions={{ color: 'red', fillOpacity: 0.5 }}
          >
            <Popup>{alertMarker.popupText}</Popup>
          </Circle>
        ))}
      </MapContainer>
      {isThreat && <ThreatCard plane={plane} threat={threat} time={closeTime}  />}
      {isThreat && showDangerAlert && <DangerAlert hours={closeTime}></DangerAlert>}
      <Toast open={openToast} message={toastMsg} onClose={handleCloseToast} />
      <ThreatInput onAddThreat={handleAddThreat} />
    </Box>
  );
};

export default MapComponent;
