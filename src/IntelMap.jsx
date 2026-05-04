import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';

const IntelMap = () => {
  const globeEl = useRef();

  // Auto-rotate the globe
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  // Fake threat data
  const threatData = [
    { lat: 28.6139, lng: 77.2090, label: "New Delhi (Secure)", color: '#00ffcc' },
    { lat: 34.0837, lng: 74.7973, label: "North Sector (Alert)", color: 'red' },
    { lat: 22.5726, lng: 88.3639, label: "East Command", color: 'orange' }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', background: '#000' }}>
      <h3 style={{ position: 'absolute', top: 20, left: 20, color: '#00ffcc', zIndex: 10 }}>
        LIVE THREAT TRACKER
      </h3>
      
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={threatData}
        pointAltitude={0.15}
        pointColor="color"
        pointRadius={0.5}
        pointLabel="label"
        atmosphereColor="#00ffcc"
        atmosphereAltitude={0.15}
        backgroundColor="#020617"
      />
    </div>
  );
};

export default IntelMap;