# Sentinel - System Architecture

## 🏗️ High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                  Frontend (React 18 + Vite 5.4.21)               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐      │
│  │              Landing Page (Landing.jsx)                │      │
│  │  ┌──────────────────┐    ┌──────────────────────┐      │      │
│  │  │ 3D Wireframe     │    │  GSAP Spiral         │      │      │
│  │  │ Globe            │    │  Animations          │      │      │
│  │  │ (LandingGlobe3D) │    │  (Framer Motion)     │      │      │
│  │  └──────────────────┘    └──────────────────────┘      │      │
│  │         │                           │                   │     │
│  │         ↓ Launch Tracker            ↓ Open Simulation   │     │
│  └─────────┼─────────────────────────────────────┬─────────┘     │
│            ↓                                     ↓               │
│  ┌─────────────────────────────┐  ┌─────────────────────────┐    │
│  │   Main Tracker (App.jsx)    │  │  Training Simulator     │    │
│  │                             │  │  (index5.html)          │    │
│  │  ┌────────────────────┐     │  │  ┌─────────────────┐    │    │
│  │  │ Canvas (R3F)       │     │  │  │ Three.js R128   │    │    │
│  │  │ - Globe            │     │  │  │ - Standalone    │    │    │
│  │  │ - Atmosphere       │     │  │  │ - OrbitControls │    │    │
│  │  │ - Satellites       │     │  │  │ - Aerospace UI  │    │    │
│  │  │ - OrbitPaths       │     │  │  └─────────────────┘    │    │
│  │  └────────────────────┘     │  │                         │    │
│  │  ┌────────────────────┐     │  │  Design:                │    │
│  │  │ UI Components      │     │  │  - Cascadia Code font   │    │
│  │  │ - TimeSlider (SVG) │     │  │  - #00C8FF primary    │   │
│  │  │ - HazardList (SVG) │     │  │  - Glassmorphism panels │   │
│  │  │ - InfoPanel        │     │  │  - 8px border radius    │   │
│  │  │ - ManeuverSuggestion│    │  └─────────────────────────┘   │
│  │  └────────────────────┘     │                                │
│  │  ┌────────────────────┐     │                                │
│  │  │ Physics Engine     │     │                                │
│  │  │ - keplerian.js     │     │                                │
│  │  │ - propagateKeplerian│    │                                │
│  │  │ - GMST calculations│     │                                │
│  │  └────────────────────┘     │                                │
│  └─────────────────────────────┘                                │
│            ↓ Axios HTTP Requests                                │
└────────────┼────────────────────────────────────────────────────┘
             │ GET /api/satellites
             │ GET /api/debris
             │ POST /api/predict-hazard
             ↓
┌──────────────────────────────────────────────────────────────────┐
│              Backend (Express + Node.js 18+)                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                    REST API Endpoints                   │     │
│  │  /api/satellites      → Returns 260 satellites          │     │
│  │  /api/debris         → Returns 1500 debris objects      │     │
│  │  /api/predict-hazard → Collision predictions            │     │
│  └────────────────────────────────────────────────────────┘     │
│            ↓                                                     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Collision Detection Engine                 │     │
│  │  - Stochastic modeling (18% collision probability)      │     │
│  │  - 4-10 debris per threatened satellite                 │     │
│  │  - CRITICAL: < 5 km (direct collision)                  │     │
│  │  - MODERATE: 5-50 km (proximity pass)                   │     │
│  │  - SAT-COLLISION: satellite-on-satellite                │     │
│  └────────────────────────────────────────────────────────┘     │
│            ↓                                                     │
│  ┌────────────────────────────────────────────────────────┐     │
│  │            Data Layer (staticData.js)                   │     │
│  │  ┌─────────────────────────────────────────────────┐    │     │
│  │  │  orbitalData.json (Pre-generated)               │    │     │
│  │  │  - 260 Named Satellites (ISS, Hubble, etc.)     │    │     │
│  │  │  - 1500 Debris Objects                          │    │     │
│  │  │  - Keplerian Elements (radius, inc, RAAN, etc.)│    │     │
│  │  │  - Collision Scenarios                          │    │     │
│  │  │  - Generated at: 2025-11-20T16:40:24.757Z       │    │     │
│  │  └─────────────────────────────────────────────────┘    │     │
│  └────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘

Scripts:
┌────────────────────────────────────────────┐
│  backend/scripts/                          │
│  - generate_keplerian.js                   │
│    (Creates orbital data with collisions)  │
│  - generate_static_data.js                 │
│    (Builds static JSON datasets)           │
└────────────────────────────────────────────┘
```

## 📦 Component Architecture

### Frontend Architecture

#### 1. **Core Application Layer** (`App.jsx`)
- **State Management**: React hooks for satellite data, time, selection
- **3D Scene Management**: React Three Fiber canvas
- **UI Orchestration**: Manages all UI panels and their interactions

#### 2. **3D Visualization Layer**
```
Canvas (React Three Fiber)
├── Globe.jsx (Earth with texture)
├── Atmosphere.jsx (Atmospheric glow)
├── OrbitPath.jsx (Satellite trajectories)
└── Billboard Sprites (Satellites & Debris)
```

**Technologies:**
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Useful helpers (OrbitControls, Billboard)
- `three.js`: 3D graphics library

#### 3. **UI Components Layer**

**Left Panel:**
```
SearchBar.jsx
├── Satellite name autocomplete search
├── Dropdown suggestions
└── Debris visibility toggle button

SortDropdown.jsx
└── Sort by Name/Hazards/Altitude
    (Dropdown with Material Symbols icons)

ComparisonPanel.jsx
└── Quick satellite statistics
    ├── Total satellites count
    ├── Total debris count
    └── Active threats summary

HazardList.jsx (Updated with SVG icons)
├── Scrollable collision warnings list
├── SVG Icons:
│   - Satellite icon (purple for sat-collision)
│   - Shield icon (red for CRITICAL)
│   - Warning triangle (orange for MODERATE)
├── Distance display (km)
├── Countdown timer (T-HH:MM:SS)
└── Auto-scroll to selected satellite

ManeuverSuggestion.jsx (Updated with SVG icons)
├── Safe signal (green checkmark SVG)
│   └── "All Clear - No Maneuvers Required"
├── Maneuver recommendations
│   ├── Spacecraft SVG icon (colored by urgency)
│   ├── Delta-V calculations (m/s)
│   ├── Burn duration (seconds)
│   ├── Alert status
│   └── Broadcast antenna SVG icon
```

**Right Panel:**
```
InfoPanel.jsx
├── Satellite name & type detection
├── Orbital parameters:
│   - Altitude (km)
│   - Velocity (km/s)
│   - Orbital period (minutes)
├── Current UTC time display
└── Hazard count badge

RightPanel.jsx
├── Mission brief (auto-generated)
├── Technical specifications
└── Ground station passes section

GroundStationPanel.jsx
├── Ground station list (global coverage)
├── Pass prediction calculations
├── Elevation angles
└── Pass duration estimates
```

**Bottom Elements:**
```
TimeSlider.jsx (Bottom-right, repositioned)
├── Container positioned: right: '50px'
├── Playback controls with SVG icons:
│   - Play button SVG (triangle)
│   - Pause button SVG (two bars)
├── Speed adjustment slider
├── Time scrubbing (±24 hours)
├── Current time display
└── Speed multiplier display (0.0005x - 10x)

CollisionStrip.jsx (Bottom, fixed width, updated with SVG icons)
├── Total threat count with SVG icons:
│   - Shield SVG (green) when safe
│   - Warning triangle SVG (red) when critical
├── Severity indicator with color coding
├── Top 5 hazards preview
└── Animated entry with Framer Motion
```

#### 4. **Physics Engine** (`keplerian.js`)
```javascript
// Simplified Keplerian orbital mechanics
function propagateKeplerian(satellite, time) {
  // Input: Orbital elements (radius, inclination, RAAN, phase)
  // Output: 3D position (x, y, z) in ECI coordinates
  
  1. Calculate mean anomaly from time
  2. Apply orbital rotation matrices
  3. Convert to Cartesian coordinates
  4. Return position vector
}
```

**Key Features:**
- Real-time propagation at any timestamp
- Support for time scrubbing
- Efficient client-side calculation
- Configurable time scale (0.0005x to 10x)

#### 5. **Data Management** (`useSatelliteData.js`)
```javascript
Custom React Hook
├── Fetch satellites & debris from backend
├── Parse orbital elements
├── Fetch collision predictions
└── Manage loading states
```

### Backend Architecture

#### 1. **Server Layer** (`server.js`)
```
Express.js REST API
├── GET /api/satellites → All satellite data
├── GET /api/debris → All debris data
├── POST /api/predict-hazard → Collision warnings
└── CORS enabled for frontend
```

#### 2. **Data Generation** (`generate_keplerian.js`)
```
Stochastic Data Generator
├── 260 Satellites (real names)
│   ├── ISS, Hubble, GPS constellation
│   └── Starlink, weather sats, etc.
│
├── Collision Scenarios
│   ├── 18% probability per satellite
│   ├── 4-10 debris per targeted satellite
│   ├── CRITICAL (direct) vs MODERATE (proximity)
│   └── 15 satellite-on-satellite collisions
│
└── 1500 Total Debris Objects
    ├── ~258 killer debris (targeted)
    └── ~1242 background debris
```

**Orbital Parameters:**
- Radius: 6700-8000 km (LEO)
- Inclination: 0-180°
- Phase randomization
- Realistic velocities (7-8 km/s)

#### 3. **Collision Detection Logic**
```
For each satellite:
1. Filter debris with matching targetId
2. Calculate:
   - Distance (0.1-50 km)
   - Time to collision (seconds)
   - Severity (CRITICAL < 5km, MODERATE > 5km)
3. Sort by:
   - Satellite collisions first
   - Then CRITICAL severity
   - Then MODERATE severity
   - Finally by distance
4. Return ALL hazards (no slicing)
```

## 🔄 Data Flow

### Application Initialization Flow
```
1. User visits http://localhost:5173
   ↓
2. Vite serves index.html → main.jsx → App.jsx
   ↓
3. React Router evaluates route:
   - "/" → Landing.jsx (Landing page with 3D globe)
   - "/tracker" → Main tracking application
   ↓
4. Landing.jsx:
   - LandingGlobe3D.jsx renders wireframe globe
   - GSAP animates spiral geometry effects
   - Two action buttons appear:
     * "Launch Tracker" → navigates to /tracker
     * "Open Simulation" → window.open('/index5.html', '_blank')
   ↓
5. Main Tracker (/tracker):
   - App.jsx initializes
   - useSatelliteData() custom hook triggers:
     ↓
     a) axios.get('http://localhost:3001/api/satellites')
        → Backend returns 260 satellites
     ↓
     b) axios.get('http://localhost:3001/api/debris')
        → Backend returns 1500 debris objects
     ↓
   - Data parsing:
     * Parse Keplerian elements (radius, inclination, RAAN, phase)
     * Initialize empty hazards array
     * Set loading state to false
   ↓
6. React Three Fiber Canvas initializes:
   - Globe.jsx renders Earth with texture
   - Atmosphere.jsx adds atmospheric glow
   - SatelliteSwarm.jsx renders all 1760 objects as billboards
   - OrbitControls enables camera manipulation
   ↓
7. UI components mount:
   - LeftPanel (SearchBar, SortDropdown, ComparisonPanel, HazardList, ManeuverSuggestion)
   - RightPanel (InfoPanel, GroundStationPanel)
   - TimeSlider (bottom-right position)
   - CollisionStrip (bottom fixed bar)
   ↓
8. Position update loop begins (throttled every 2 seconds)
```

### Satellite Selection Flow
```
User Action: Click satellite or search by name
   ↓
1. SearchBar.jsx:
   - Input onChange filters satellite list
   - Fuzzy matching on satellite names
   - Dropdown shows top 5 matches
   ↓
2. User selects from dropdown or 3D scene
   ↓
3. App.jsx state update:
   setSelectedSat(satellite)
   ↓
4. useEffect dependencies trigger:
   
   Effect 1: Fetch collision hazards
   axios.post('http://localhost:3001/api/predict-hazard', {
     satelliteId: selectedSat.id
   })
   ↓
   Backend processes:
   - Filter debris with matching targetId
   - Calculate distances using Keplerian propagation
   - Assign severity (CRITICAL/MODERATE/SAT-COLLISION)
   - Sort by severity and distance
   - Return all hazards (no limit)
   ↓
   Frontend receives hazard array
   setHazards(response.data.hazards)
   
   Effect 2: Calculate orbital path
   - Generate 100 points along orbit
   - Use propagateKeplerian() for each point
   - Create OrbitPath.jsx geometry
   
   Effect 3: Update UI panels
   - InfoPanel.jsx: Display satellite details
   - HazardList.jsx: Render collision warnings with SVG icons
   - ManeuverSuggestion.jsx: Calculate Delta-V if hazards exist
   - ComparisonPanel.jsx: Update stats
   ↓
5. 3D Scene updates:
   - Camera focuses on selected satellite (optional)
   - Highlight selected satellite with different color
   - Render orbital path line
   - Scale up billboard sprite (1.5x)
   ↓
6. Hazards render in list:
   For each hazard:
   - Determine icon type (satellite/shield/warning SVG)
   - Color code by severity
   - Display distance and countdown timer
   - Sort: SAT-COLLISION > CRITICAL > MODERATE
```

### Time Scrubbing Flow
```
User Action: Drag TimeSlider handle or click play/pause
   ↓
1. TimeSlider.jsx:
   - User drags slider handle
   - onChange event fires
   - New time value calculated (±24 hours from now)
   ↓
2. App.jsx state update:
   handleTimeChange(newTime)
   setCurrentTime(newTime)
   ↓
3. useEffect [currentTime] triggers:
   
   Position Recalculation:
   - useMemo recalculates currentPositions
   - For each satellite (260):
     position = propagateKeplerian(satellite, currentTime)
   - For each debris (1500):
     position = propagateKeplerian(debris, currentTime)
   ↓
   GMST Calculation:
   - Calculate Earth rotation angle for currentTime
   - Update globe rotation matrix
   ↓
   Hazard Distance Update:
   - If selectedSat exists:
     * Recalculate distances to all hazards
     * Update countdown timers
     * Re-sort hazards by time to collision
   ↓
4. React Three Fiber re-renders:
   - SatelliteSwarm.jsx updates billboard positions
   - OrbitPath.jsx recalculates if selectedSat changed
   - Globe.jsx rotates to new GMST angle
   ↓
5. UI updates:
   - TimeSlider.jsx displays new time
   - HazardList.jsx updates countdown timers
   - InfoPanel.jsx updates velocity/position data
   - CollisionStrip.jsx updates threat summary
```

### Position Update Flow (Throttled - Every 2 Seconds)
```
setInterval (2000ms):
   ↓
1. positionUpdateTrigger state increments:
   setPositionUpdateTrigger(prev => prev + 1)
   ↓
2. useMemo dependency [positionUpdateTrigger, currentTime] triggers:
   
   const currentPositions = useMemo(() => {
     const positions = {};
     
     satellites.forEach(sat => {
       positions[sat.id] = propagateKeplerian(sat, currentTime);
     });
     
     debris.forEach(deb => {
       positions[deb.id] = propagateKeplerian(deb, currentTime);
     });
     
     return positions;
   }, [positionUpdateTrigger, currentTime]);
   ↓
3. propagateKeplerian() for each object:
   Input: { radius, inclination, raan, phase }, currentTime
   
   Step 1: Calculate mean anomaly
   meanAnomaly = phase + (2π / period) * elapsedTime
   
   Step 2: Rotation matrices
   - Rotate by inclination (x-axis)
   - Rotate by RAAN (z-axis)
   - Rotate by mean anomaly (orbital motion)
   
   Step 3: Convert to Cartesian (x, y, z)
   x = radius * cos(meanAnomaly) * cos(raan)
   y = radius * cos(meanAnomaly) * sin(raan)
   z = radius * sin(meanAnomaly) * sin(inclination)
   
   Output: { x, y, z } in ECI coordinates
   ↓
4. Billboard positions update:
   SatelliteSwarm.jsx receives new currentPositions prop
   For each Billboard:
     position={[
       currentPositions[obj.id].x,
       currentPositions[obj.id].y,
       currentPositions[obj.id].z
     ]}
   ↓
5. Three.js renders new frame:
   - GPU updates vertex positions
   - Camera renders updated scene
   - 60 FPS maintained (1760 objects)
   ↓
6. Hazard distances recalculated (if selectedSat):
   For each hazard:
     distance = calculateDistance(
       currentPositions[selectedSat.id],
       currentPositions[hazard.debrisId]
     )
     timeToCollision = distance / relativeVelocity
```

### Backend API Request Flow
```
Frontend Request:
POST http://localhost:3001/api/predict-hazard
Body: { satelliteId: "SAT-123" }
   ↓
Backend server.js:
1. Receive request
2. Load static data (orbitalData.json)
3. Find satellite by ID
   ↓
4. Filter debris by targetId:
   debris.filter(d => d.targetId === satelliteId)
   ↓
5. For each targeted debris:
   - Calculate current positions (both objects)
   - Compute distance: sqrt((x2-x1)² + (y2-y1)² + (z2-z1)²)
   - Estimate time to collision
   - Assign severity:
     * distance < 5 km → "CRITICAL"
     * distance 5-50 km → "MODERATE"
   - Create hazard object:
     {
       debrisId, debrisName, distance,
       timeToCollision, severity, type
     }
   ↓
6. Add satellite-on-satellite collisions:
   - Find satellites with matching orbits
   - Calculate distances
   - Mark as "SAT-COLLISION" type
   ↓
7. Sort hazards:
   Priority: SAT-COLLISION > CRITICAL > MODERATE
   Then by distance (ascending)
   ↓
8. Return response:
   {
     hazards: [ /* all collision warnings */ ],
     timestamp: currentTime
   }
   ↓
Frontend receives:
- Updates hazards state
- HazardList.jsx re-renders with new data
- ManeuverSuggestion.jsx calculates recommendations
```

## 🎨 Design System

### Aerospace Theme (Updated November 2025)

**Typography:**
```css
Font Family: 'Cascadia Code', 'Consolas', monospace
Purpose: Professional aerospace/mission control aesthetic
Usage: All UI elements, buttons, panels, text
```

**Color Palette:**
```css
Primary Colors:
- Primary:    #00C8FF (Cyan blue - main accent)
- Secondary:  #006C99 (Dark cyan - hover states)
- Danger:     #FF365D (Red - critical alerts)
- Warning:    #f59e0b (Orange - moderate warnings)
- Success:    #4caf50 (Green - safe/success states)
- Sat-Collision: #9333ea (Purple - sat-on-sat collisions)

Text Colors:
- Primary Text:   #C7D2E0 (Light blue-gray)
- Secondary Text: rgba(199, 210, 224, 0.7) (70% opacity)
- Heading Text:   #00C8FF (Accent cyan)

Background Colors:
- Panel Background: rgba(10, 20, 40, 0.55) (Dark blue-black)
- Card Background:  rgba(0, 30, 60, 0.6) (Slightly lighter)
- Body Background:  #000814 (Very dark blue)

Border Colors:
- Primary Border: rgba(0, 200, 255, 0.15) (Subtle cyan glow)
- Glow Effect:    rgba(0, 200, 255, 0.3) (Stronger for hover)
```

**Glassmorphism Effects:**
```css
Panels:
- background: rgba(10, 20, 40, 0.55)
- backdrop-filter: blur(6px)
- border: 1px solid rgba(0, 200, 255, 0.15)
- border-radius: 8px
- box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37)

Buttons:
- background: rgba(0, 30, 60, 0.6)
- border: 1px solid rgba(0, 200, 255, 0.25)
- border-radius: 6px
- padding: 8px 14px
- transition: all 0.3s ease

Hover States:
- border-color: rgba(0, 200, 255, 0.5)
- background: rgba(0, 100, 150, 0.4)
- box-shadow: 0 0 12px rgba(0, 200, 255, 0.4)
```

**SVG Icon System:**
All emojis replaced with inline SVG icons:
```
Component Updates:
- TimeSlider.jsx: Play/Pause SVG icons
- CollisionStrip.jsx: Shield/Warning triangle SVGs
- HazardList.jsx: Satellite/Shield/Warning SVGs
- ManeuverSuggestion.jsx: Checkmark/Spacecraft/Antenna SVGs

Benefits:
- Scalable at any resolution
- Customizable colors (fill property)
- Better performance than emoji fonts
- Consistent cross-platform rendering
- Accessible with proper ARIA labels
```

**Spacing & Layout:**
```css
Panel Padding: 16px 20px
Button Padding: 8px 14px
Border Radius (Panels): 8px
Border Radius (Buttons): 6px
Gap Between Elements: 12-16px
```

## 🚀 Performance Optimizations

1. **Position Update Throttling**: Only recalculate every 2 seconds
2. **useMemo**: Expensive calculations cached
3. **Lazy Rendering**: Only render visible objects
4. **Static Data**: Pre-generated orbital data (no live TLE fetches)
5. **Client-side Propagation**: No constant server requests

## 🔐 Security Considerations

- CORS enabled for frontend domain only
- No sensitive data exposed
- Static orbital data (no live tracking)
- Rate limiting recommended for production

## 📊 Scalability

**Current Limits:**
- 260 satellites
- 1500 debris objects
- ~260 collision warnings

**Can Scale To:**
- 10,000+ objects with InstancedMesh
- Real TLE fetches from CelesTrak/Space-Track
- WebSocket for real-time updates
- Database for persistent tracking

## 🧪 Testing Strategy

**Unit Tests:**
- `propagateKeplerian()` accuracy
- Collision detection logic
- Data parsing

**Integration Tests:**
- API endpoint responses
- Data flow satellite → hazards
- Time scrubbing functionality

**E2E Tests:**
- User journey: Landing → Selection → Collision Warning
- Time scrubbing
- Search functionality

## 🌐 Deployment Architecture

```
Production Setup:
├── Frontend: Vercel/Netlify
├── Backend: Railway/Render/Fly.io
└── CDN: Cloudflare (optional)

Development:
├── Frontend: Vite dev server (port 5173)
└── Backend: Node.js (port 3001)
```

## 📝 Future Enhancements

1. **Real TLE Integration**: Live data from CelesTrak
2. **Machine Learning**: Collision probability ML models
3. **Multi-user**: Collaborative tracking sessions
4. **Mobile App**: React Native version
5. **AR View**: Satellite AR visualization
6. **Historical Playback**: Rewind/replay past conjunctions
7. **Notifications**: Email/SMS collision alerts

## 🏆 Key Innovations & Recent Updates

### Core Innovations
1. **Stochastic Collision System**: Dynamic, realistic threat scenarios with 18% collision probability
2. **Dual Severity Levels**: CRITICAL (< 5km) vs MODERATE (5-50km) warnings with distinct color coding
3. **Satellite-on-Satellite Detection**: Rare but critical collision type with purple gradient highlighting
4. **Maneuver Recommendations**: Delta-V calculations (2-20 m/s) with burn duration and alert broadcasting
5. **Time Travel Simulation**: Sub-second precision time scrubbing (±24 hours) with throttled updates
6. **Client-Side Propagation**: No server dependency for position updates, fully functional offline

### November 2025 Updates
1. **Training Simulator (index5.html)**:
   - Standalone Three.js simulation environment
   - Accessible from landing page "Open Simulation" button
   - Mission control training scenarios
   - Independent of React framework for portability

2. **Aerospace UI Refactor**:
   - Cascadia Code monospace font for professional aesthetic
   - Updated color palette (#00C8FF primary, #006C99 secondary)
   - Consistent 8px panel radius, 6px button radius
   - Enhanced glassmorphism with 6px backdrop blur

3. **SVG Icon System**:
   - Replaced all Unicode emojis with inline SVG icons
   - Components updated:
     * TimeSlider.jsx: Play/Pause SVGs
     * CollisionStrip.jsx: Shield/Warning triangle SVGs
     * HazardList.jsx: Satellite/Shield/Warning SVGs
     * ManeuverSuggestion.jsx: Checkmark/Spacecraft/Antenna SVGs
   - Benefits: Scalable, customizable colors, better cross-platform rendering

4. **Time Slider Repositioning**:
   - Moved from bottom-left to bottom-right (right: 50px)
   - Prevents overflow on smaller screens
   - Better visual balance with collision strip on left

5. **OrbitControls Enhancement**:
   - Explicitly enabled enableRotate={true} and enableZoom={true}
   - Fixed interaction issues after satellite selection
   - Maintains camera control at all times

6. **GSAP Integration**:
   - Added for landing page spiral animations
   - Smooth geometry transformations on LandingGlobe3D
   - Enhances visual appeal of entry experience

### Technical Achievements
- **Performance**: 60 FPS with 1,760 objects (260 satellites + 1,500 debris)
- **Scalability**: Throttled position updates (2-second intervals) for efficiency
- **Responsiveness**: Sub-50ms search across 260 satellites
- **Accuracy**: Keplerian orbital mechanics with GMST synchronization
- **Reliability**: Static data generation ensures consistent collision scenarios
