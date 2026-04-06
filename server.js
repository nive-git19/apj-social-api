const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ═══════════════════════════════════════════════════════════
// APJ CABS — SOCIAL CHANNELS API SERVER
// This server is the "brain" that Instagram/Facebook/WhatsApp
// bots call to get vehicle recommendations and fare calculations.
// ═══════════════════════════════════════════════════════════

const IMG_BASE = 'https://nive-git19.github.io/apj_test_v2/images/';

// ═══════════════════ CITY CONFIG ═══════════════════
const CITIES = {
  chennai: {
    id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', tariff: 'chennai',
    garage: { area: 'Ashok Nagar', lat: 13.0358, lng: 80.2101 },
    packages: ['4hr', '8hr'], minKmOut: 250, advanceNotice: false,
    airports: [{ code: 'MAA', name: 'Chennai International Airport' }],
    bridalAvailable: true
  },
  bangalore: {
    id: 'bangalore', name: 'Bangalore', state: 'Karnataka', tariff: 'panindia',
    garage: { area: 'Kammanahalli', lat: 13.0134, lng: 77.6425 },
    packages: ['8hr'], minKmOut: 300, advanceNotice: true,
    airports: [{ code: 'BLR', name: 'Kempegowda International Airport' }],
    bridalAvailable: false
  },
  delhi: {
    id: 'delhi', name: 'Delhi', state: 'Delhi', tariff: 'panindia',
    garage: { area: 'Red Fort', lat: 28.6562, lng: 77.2410 },
    packages: ['8hr'], minKmOut: 300, advanceNotice: true,
    airports: [{ code: 'DEL', name: 'Indira Gandhi International Airport' }],
    bridalAvailable: false
  },
  mumbai: {
    id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', tariff: 'panindia',
    garage: { area: 'Marine Drive', lat: 18.9432, lng: 72.8235 },
    packages: ['8hr'], minKmOut: 300, advanceNotice: true,
    airports: [{ code: 'BOM', name: 'Chhatrapati Shivaji International Airport' }],
    bridalAvailable: false
  }
};

// ═══════════════════ VEHICLE MASTER ═══════════════════
const VEHICLES = [
  {
    id: 'innova_g_6', name: 'Innova Crysta G', config: '6+1', category: 'SUV', paxRange: [1, 6],
    luggage: { 1: { large: 3, medium: 3, cabin: 3 }, 2: { large: 2, medium: 3, cabin: 2 }, 3: { large: 2, medium: 2, cabin: 2 }, 4: { large: 2, medium: 1, cabin: 2 }, 5: { large: 0, medium: 3, cabin: 1 }, 6: { large: 0, medium: 3, cabin: 1 } },
    image: IMG_BASE + 'innova_crysta_exterior.png', nightAllowance: 300,
    tariffs: {
      chennai: {
        local: [{ id: '4hr', label: '4 Hours / 40 KM', km: 40, fare: 2200, extrakm: 25, extrahr: 350 }, { id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 4250, extrakm: 25, extrahr: 350 }],
        out: { perKm: 25, minKm: 250, batta: 750, nightHalt: 500 },
        bridal: { fare: 5000, extrakm: 25, extrahr: 350 },
        permits: { pondicherry: 1000, andhra: 1200, kerala: 1000, karnataka: 1500 }
      },
      panindia: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 4250, extrakm: 25, extrahr: 350 }],
        out: { perKm: 25, minKm: 300, batta: 750, nightHalt: 400 },
        bridal: null, permits: 'actuals'
      }
    }
  },
  {
    id: 'innova_g_7', name: 'Innova Crysta G', config: '7+1', category: 'SUV', paxRange: [1, 7],
    luggage: { 1: { large: 3, medium: 4, cabin: 3 }, 2: { large: 3, medium: 3, cabin: 3 }, 3: { large: 2, medium: 3, cabin: 3 }, 4: { large: 2, medium: 2, cabin: 2 }, 5: { large: 2, medium: 1, cabin: 2 }, 6: { large: 0, medium: 3, cabin: 1 }, 7: { large: 0, medium: 3, cabin: 1 } },
    image: IMG_BASE + 'innova_crysta_exterior.png', nightAllowance: 300,
    tariffs: {
      chennai: {
        local: [{ id: '4hr', label: '4 Hours / 40 KM', km: 40, fare: 2200, extrakm: 25, extrahr: 350 }, { id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 4250, extrakm: 25, extrahr: 350 }],
        out: { perKm: 25, minKm: 250, batta: 750, nightHalt: 500 },
        bridal: { fare: 5000, extrakm: 25, extrahr: 350 },
        permits: { pondicherry: 1000, andhra: 1200, kerala: 1000, karnataka: 1500 }
      },
      panindia: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 4250, extrakm: 25, extrahr: 350 }],
        out: { perKm: 25, minKm: 300, batta: 750, nightHalt: 400 },
        bridal: null, permits: 'actuals'
      }
    }
  },
  {
    id: 'innova_v_7', name: 'Innova Crysta V', config: '7+1', category: 'Premium SUV', paxRange: [1, 7],
    luggage: { 1: { large: 3, medium: 4, cabin: 3 }, 2: { large: 3, medium: 3, cabin: 3 }, 3: { large: 2, medium: 3, cabin: 3 }, 4: { large: 2, medium: 2, cabin: 2 }, 5: { large: 2, medium: 1, cabin: 2 }, 6: { large: 0, medium: 3, cabin: 1 }, 7: { large: 0, medium: 3, cabin: 1 } },
    image: IMG_BASE + 'innova_crysta_exterior.png', nightAllowance: 300,
    tariffs: {
      chennai: {
        local: [{ id: '4hr', label: '4 Hours / 40 KM', km: 40, fare: 2500, extrakm: 30, extrahr: 450 }, { id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 4500, extrakm: 30, extrahr: 450 }],
        out: { perKm: 30, minKm: 250, batta: 750, nightHalt: 500 },
        bridal: { fare: 5250, extrakm: 30, extrahr: 450 },
        permits: { pondicherry: 1000, andhra: 1200, kerala: 1000, karnataka: 1500 }
      },
      panindia: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 4750, extrakm: 30, extrahr: 400 }],
        out: { perKm: 30, minKm: 300, batta: 750, nightHalt: 400 },
        bridal: null, permits: 'actuals'
      }
    }
  },
  {
    id: 'hycross_6', name: 'Innova Hycross', config: '6+1', category: 'SUV', paxRange: [1, 6],
    luggage: { 1: { large: 3, medium: 3, cabin: 3 }, 2: { large: 2, medium: 3, cabin: 2 }, 3: { large: 2, medium: 2, cabin: 2 }, 4: { large: 2, medium: 1, cabin: 2 }, 5: { large: 0, medium: 3, cabin: 1 }, 6: { large: 0, medium: 3, cabin: 1 } },
    image: IMG_BASE + 'innova_crysta_exterior.png', nightAllowance: 300,
    tariffs: {
      chennai: {
        local: [{ id: '4hr', label: '4 Hours / 40 KM', km: 40, fare: 2500, extrakm: 30, extrahr: 500 }, { id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 5000, extrakm: 30, extrahr: 500 }],
        out: { perKm: 30, minKm: 250, batta: 750, nightHalt: 500 },
        bridal: { fare: 5750, extrakm: 30, extrahr: 500 },
        permits: { pondicherry: 1000, andhra: 1200, kerala: 1000, karnataka: 1500 }
      },
      panindia: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 5250, extrakm: 32, extrahr: 450 }],
        out: { perKm: 32, minKm: 300, batta: 750, nightHalt: 400 },
        bridal: null, permits: 'actuals'
      }
    }
  },
  {
    id: 'hycross_7', name: 'Innova Hycross', config: '7+1', category: 'SUV', paxRange: [1, 7],
    luggage: { 1: { large: 3, medium: 4, cabin: 3 }, 2: { large: 3, medium: 3, cabin: 3 }, 3: { large: 2, medium: 3, cabin: 3 }, 4: { large: 2, medium: 2, cabin: 2 }, 5: { large: 2, medium: 1, cabin: 2 }, 6: { large: 0, medium: 3, cabin: 1 }, 7: { large: 0, medium: 3, cabin: 1 } },
    image: IMG_BASE + 'innova_crysta_exterior.png', nightAllowance: 300,
    tariffs: {
      chennai: {
        local: [{ id: '4hr', label: '4 Hours / 40 KM', km: 40, fare: 2500, extrakm: 30, extrahr: 500 }, { id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 5000, extrakm: 30, extrahr: 500 }],
        out: { perKm: 30, minKm: 250, batta: 750, nightHalt: 500 },
        bridal: { fare: 5750, extrakm: 30, extrahr: 500 },
        permits: { pondicherry: 1000, andhra: 1200, kerala: 1000, karnataka: 1500 }
      },
      panindia: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 5250, extrakm: 32, extrahr: 450 }],
        out: { perKm: 32, minKm: 300, batta: 750, nightHalt: 400 },
        bridal: null, permits: 'actuals'
      }
    }
  },
  {
    id: 'fortuner', name: 'Toyota Fortuner', config: '7+1', category: 'SUV', paxRange: [1, 7],
    luggage: { 1: { large: 3, medium: 4, cabin: 3 }, 2: { large: 3, medium: 3, cabin: 3 }, 3: { large: 2, medium: 3, cabin: 3 }, 4: { large: 2, medium: 2, cabin: 2 }, 5: { large: 2, medium: 1, cabin: 2 }, 6: { large: 0, medium: 3, cabin: 1 }, 7: { large: 0, medium: 3, cabin: 1 } },
    image: IMG_BASE + 'innova_crysta_exterior.png', nightAllowance: 500,
    tariffs: {
      chennai: {
        local: [{ id: '4hr', label: '4 Hours / 40 KM', km: 40, fare: 3500, extrakm: 70, extrahr: 700 }, { id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 7000, extrakm: 70, extrahr: 700 }],
        out: { perKm: 70, minKm: 250, batta: 750, nightHalt: 500 },
        bridal: { fare: 7000, extrakm: 70, extrahr: 700 },
        permits: { pondicherry: 600, andhra: 1200, kerala: 600, karnataka: 1800 }
      },
      panindia: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 7000, extrakm: 65, extrahr: 700 }],
        out: { perKm: 65, minKm: 300, batta: 750, nightHalt: 400 },
        bridal: null, permits: 'actuals'
      }
    }
  },
  {
    id: 'urbania_12', name: 'Force Urbania', config: '12+1', category: 'MPV', paxRange: [4, 12],
    luggage: { 4: { large: 4, medium: 4, cabin: 4 }, 5: { large: 4, medium: 3, cabin: 4 }, 6: { large: 3, medium: 3, cabin: 3 }, 7: { large: 3, medium: 3, cabin: 3 }, 8: { large: 2, medium: 3, cabin: 3 }, 9: { large: 2, medium: 2, cabin: 3 }, 10: { large: 1, medium: 2, cabin: 2 }, 11: { large: 1, medium: 1, cabin: 2 }, 12: { large: 0, medium: 1, cabin: 2 } },
    image: IMG_BASE + 'innova_crysta_exterior.png', nightAllowance: 1000,
    tariffs: {
      chennai: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 12000, extrakm: 50, extrahr: 1000 }],
        out: { perKm: 50, minKm: 300, batta: 1000, nightHalt: 500 },
        bridal: null,
        permits: { pondicherry: 2000, andhra: 3500, kerala: 2000, karnataka: 3000 }
      },
      panindia: {
        local: [{ id: '8hr', label: '8 Hours / 80 KM', km: 80, fare: 12000, extrakm: 55, extrahr: 750 }],
        out: { perKm: 55, minKm: 300, batta: 1000, nightHalt: 500 },
        bridal: null, permits: 'actuals'
      }
    }
  }
];

// ═══════════════════ HELPER FUNCTIONS ═══════════════════

// Get the right tariff for a vehicle based on city
function getTariff(vehicle, city) {
  const cityConfig = CITIES[city];
  if (!cityConfig) return vehicle.tariffs.chennai;
  return vehicle.tariffs[cityConfig.tariff] || vehicle.tariffs.panindia;
}

// Check if luggage fits for given passenger count
function luggageFits(vehicle, pax, largeBags, medBags, cabinBags) {
  const paxKeys = Object.keys(vehicle.luggage).map(Number);
  const paxKey = Math.min(pax, Math.max(...paxKeys));
  const cap = vehicle.luggage[paxKey];
  if (!cap) return false;
  return largeBags <= cap.large && medBags <= cap.medium && cabinBags <= cap.cabin;
}

// Get luggage capacity at a given pax count
function getLuggageCapacity(vehicle, pax) {
  const paxKeys = Object.keys(vehicle.luggage).map(Number);
  const paxKey = Math.min(pax, Math.max(...paxKeys));
  return vehicle.luggage[paxKey] || { large: 0, medium: 0, cabin: 0 };
}

// Format a number in Indian style (1,00,000)
function inr(num) {
  return num.toLocaleString('en-IN');
}


// ═══════════════════════════════════════════════════════════
// ENDPOINT 1: RECOMMEND VEHICLES
// Called after the bot collects passengers and luggage
// ═══════════════════════════════════════════════════════════
app.post('/recommend-vehicle', (req, res) => {
  const { city, trip_type, pax, large_bags, med_bags, cabin_bags } = req.body;

  const passengers = parseInt(pax) || 1;
  const large = parseInt(large_bags) || 0;
  const medium = parseInt(med_bags) || 0;
  const cabin = parseInt(cabin_bags) || 0;
  const cityId = (city || 'chennai').toLowerCase();
  const tripType = (trip_type || 'LOCAL').toUpperCase();

  // Filter and sort vehicles
  let suitable = [];
  VEHICLES.forEach(v => {
    const t = getTariff(v, cityId);
    // Skip vehicles that can't fit passengers
    if (passengers < v.paxRange[0] || passengers > v.paxRange[1]) return;
    // Skip vehicles without bridal tariff for bridal trips
    if (tripType === 'BRIDAL' && !t.bridal) return;

    const fits = luggageFits(v, passengers, large, medium, cabin);
    const cap = getLuggageCapacity(v, passengers);
    const cheapestFare = t.local[0] ? t.local[0].fare : (t.out ? t.out.perKm * 250 : 0);

    suitable.push({
      id: v.id,
      name: v.name,
      config: v.config,
      category: v.category,
      luggage_fits: fits,
      capacity: cap,
      image: v.image,
      cheapest_fare: cheapestFare
    });
  });

  // Sort: luggage fits first, then cheapest first
  suitable.sort((a, b) => {
    if (a.luggage_fits && !b.luggage_fits) return -1;
    if (!a.luggage_fits && b.luggage_fits) return 1;
    return a.cheapest_fare - b.cheapest_fare;
  });

  // Take top 3
  const top3 = suitable.slice(0, 3);

  // Build the text message the bot will show
  let message = '';
  if (top3.length === 0) {
    message = 'Sorry, no vehicles available for ' + passengers + ' passengers in ' + (CITIES[cityId] ? CITIES[cityId].name : cityId) + '. Our travel advisor can help — transferring you now.';
  } else {
    message = 'Based on your requirements (' + passengers + ' pax, ' + large + ' large bags), here are our recommendations:\n\n';
    top3.forEach((v, i) => {
      const badge = (i === 0 && v.luggage_fits) ? ' ⭐ Best Match' : '';
      const luggageStatus = v.luggage_fits ? '✅ Luggage fits' : '⚠️ Luggage may not fit';
      message += (i + 1) + '️⃣ ' + v.name + ' (' + v.config + ')' + badge + '\n';
      message += '   ' + luggageStatus + ' · ' + v.category + '\n';
      if (!v.luggage_fits) {
        message += '   Capacity at ' + passengers + ' pax: ' + v.capacity.large + 'L/' + v.capacity.medium + 'M/' + v.capacity.cabin + 'C\n';
      }
      message += '\n';
    });
    message += 'Reply with 1, 2, or 3 to select your vehicle.';
  }

  res.json({
    success: true,
    vehicle_count: top3.length,
    vehicles: top3,
    message: message,
    best_match_image: top3.length > 0 ? top3[0].image : null
  });
});


// ═══════════════════════════════════════════════════════════
// ENDPOINT 2: CALCULATE FARE
// Called after the customer picks a vehicle
// ═══════════════════════════════════════════════════════════
app.post('/calculate-fare', (req, res) => {
  const {
    vehicle_id, city, trip_type, drop_type,
    distance_km, days, destination_state,
    package_id, is_night_trip, wants_decoration
  } = req.body;

  const vehicle = VEHICLES.find(v => v.id === vehicle_id);
  if (!vehicle) return res.json({ success: false, message: 'Vehicle not found' });

  const cityId = (city || 'chennai').toLowerCase();
  const cityConfig = CITIES[cityId];
  const t = getTariff(vehicle, cityId);
  const tripType = (trip_type || 'LOCAL').toUpperCase();
  const dist = parseInt(distance_km) || 0;
  const numDays = parseInt(days) || 1;
  const nightTrip = is_night_trip === true || is_night_trip === 'true';
  const decoration = wants_decoration === true || wants_decoration === 'true';
  const homeState = cityConfig ? cityConfig.state.toLowerCase().replace(/\s/g, '') : 'tamilnadu';
  const destState = (destination_state || '').toLowerCase().replace(/\s/g, '');

  let rows = [];
  let subtotal = 0;

  if (tripType === 'OUTSTATION') {
    const minBillable = (t.out.minKm || 250) * numDays;
    const billable = Math.max(dist, minBillable);
    const kmCost = billable * t.out.perKm;
    const bataCost = (t.out.batta || 0) * numDays;
    const nights = Math.max(0, numDays - 1);
    const nhCost = nights * (t.out.nightHalt || 0);
    subtotal = kmCost + bataCost + nhCost;

    rows.push({ label: 'Distance (' + billable + ' KM × ₹' + t.out.perKm + '/km)', value: kmCost });
    if (billable > dist) rows.push({ label: 'ℹ️ Min billing: ' + t.out.minKm + '/day × ' + numDays + ' days', value: null });
    rows.push({ label: 'Driver Bata (' + numDays + 'd × ₹' + t.out.batta + ')', value: bataCost });
    if (nights > 0) rows.push({ label: 'Night Halt (' + nights + 'n × ₹' + t.out.nightHalt + ')', value: nhCost });

    // Permit check
    if (typeof t.permits === 'object' && destState && destState !== homeState && t.permits[destState]) {
      const permit = t.permits[destState];
      rows.push({ label: 'Interstate Permit (' + destState.charAt(0).toUpperCase() + destState.slice(1) + ')', value: permit });
      subtotal += permit;
    } else if (t.permits === 'actuals' && destState && destState !== homeState) {
      rows.push({ label: 'Interstate Permit', value: 'At actuals' });
    }

  } else if (tripType === 'BRIDAL') {
    const extraKm = Math.max(0, dist - 80);
    const extraKmCost = extraKm * (t.bridal.extrakm || 0);
    subtotal = t.bridal.fare + extraKmCost;

    rows.push({ label: 'Bridal Package (8hr/80KM)', value: t.bridal.fare });
    if (extraKm > 0) rows.push({ label: 'Extra KM (' + extraKm + ' × ₹' + t.bridal.extrakm + ')', value: extraKmCost });
    if (decoration) { rows.push({ label: 'Flower Decoration', value: 2500 }); subtotal += 2500; }
    rows.push({ label: 'Driver Bata', value: 0 });

  } else {
    // LOCAL or AIRPORT — package based
    const pkg = t.local.find(p => p.id === package_id) || t.local[0];
    if (!pkg) return res.json({ success: false, message: 'No packages available for this vehicle' });

    const extraKm = Math.max(0, dist - pkg.km);
    const extraCost = Math.round(extraKm * pkg.extrakm);
    subtotal = pkg.fare + extraCost;

    rows.push({ label: pkg.label, value: pkg.fare });
    if (extraKm > 0) rows.push({ label: 'Extra KM (' + extraKm + ' × ₹' + pkg.extrakm + ')', value: extraCost });
    rows.push({ label: 'Driver Bata (Local)', value: 0 });
  }

  // Night allowance — local and bridal only
  if (nightTrip && (tripType === 'LOCAL' || tripType === 'BRIDAL' || tripType === 'AIRPORT')) {
    const na = vehicle.nightAllowance || 300;
    rows.push({ label: 'Night Allowance (10PM-6AM)', value: na });
    subtotal += na;
  }

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  rows.push({ label: 'GST 18%', value: gst });

  // Build display message
  const cityName = cityConfig ? cityConfig.name : cityId;
  const garageName = cityConfig ? cityConfig.garage.area : 'TBD';
  const tripLabel = tripType + (numDays > 1 ? ' · ' + numDays + ' days' : '');

  let message = '📋 YOUR FARE ESTIMATE\n';
  message += '━━━━━━━━━━━━━━━━━━━\n';
  message += '🚗 ' + vehicle.name + ' (' + vehicle.config + ')\n';
  message += '📍 ' + cityName + ' · ' + tripLabel + '\n\n';

  rows.forEach(r => {
    if (r.value === null) {
      message += r.label + '\n';
    } else if (r.value === 'At actuals') {
      message += r.label + ': At actuals\n';
    } else if (r.value === 0) {
      message += r.label + ': ₹0\n';
    } else {
      message += r.label + ' = ₹' + inr(r.value) + '\n';
    }
  });

  message += '━━━━━━━━━━━━━━━━━━━\n';
  message += '💰 TOTAL: ₹' + inr(total) + '\n\n';
  message += '+ Toll, parking at actuals\n';
  message += '📍 Garage: ' + garageName + ', ' + cityName + '\n\n';
  message += '⚠️ This is an indicative estimate. Any changes to details will result in a revised fare.';

  res.json({
    success: true,
    vehicle: vehicle.name + ' (' + vehicle.config + ')',
    subtotal: subtotal,
    gst: gst,
    total: total,
    line_items: rows,
    message: message
  });
});


// ═══════════════════════════════════════════════════════════
// ENDPOINT 3: GET CITY CONFIG
// Returns city details for the bot
// ═══════════════════════════════════════════════════════════
app.get('/city-config', (req, res) => {
  const cityId = (req.query.city || '').toLowerCase();
  const city = CITIES[cityId];

  if (!city) {
    return res.json({
      success: false,
      message: 'City not available. Our travel advisor will check and get back within 2 working days.'
    });
  }

  res.json({
    success: true,
    city: city
  });
});


// ═══════════════════════════════════════════════════════════
// ENDPOINT 4: GET PACKAGES FOR A VEHICLE
// Returns available packages for a vehicle in a city
// ═══════════════════════════════════════════════════════════
app.post('/get-packages', (req, res) => {
  const { vehicle_id, city, trip_type } = req.body;

  const vehicle = VEHICLES.find(v => v.id === vehicle_id);
  if (!vehicle) return res.json({ success: false, message: 'Vehicle not found' });

  const cityId = (city || 'chennai').toLowerCase();
  const t = getTariff(vehicle, cityId);
  const tripType = (trip_type || 'LOCAL').toUpperCase();

  let message = '';
  let packages = [];

  if (tripType === 'OUTSTATION') {
    message = 'Outstation — Per KM Billing\n';
    message += '₹' + t.out.perKm + '/km · Min ' + t.out.minKm + ' KM/day · Bata ₹' + t.out.batta + '/day\n\n';
    message += 'This package will be applied automatically.';
    packages = [{ id: 'out', label: 'Outstation Per KM', perKm: t.out.perKm }];

  } else if (tripType === 'BRIDAL') {
    message = 'Bridal — 8 Hours / 80 KM\n';
    message += '₹' + inr(t.bridal.fare) + ' base · Extra: ₹' + t.bridal.extrakm + '/km\n\n';
    message += 'This package will be applied automatically.';
    packages = [{ id: 'bridal', label: 'Bridal 8hr/80KM', fare: t.bridal.fare }];

  } else {
    // LOCAL or AIRPORT
    const available = t.local.filter(p => p.fare > 0);
    if (available.length === 0) {
      message = 'No packages available for this vehicle.';
    } else {
      message = 'Available packages for ' + vehicle.name + ' (' + vehicle.config + '):\n\n';
      available.forEach((pkg, i) => {
        message += (i + 1) + '️⃣ ' + pkg.label + ' — ₹' + inr(pkg.fare) + '\n';
        message += '   Extra: ₹' + pkg.extrakm + '/km · ₹' + pkg.extrahr + '/hr\n\n';
      });
      message += 'Reply with ' + available.map((_, i) => i + 1).join(' or ') + ' to select.';
      packages = available;
    }
  }

  res.json({
    success: true,
    packages: packages,
    message: message
  });
});


// ═══════════════════════════════════════════════════════════
// HEALTH CHECK — so Render knows the server is alive
// ═══════════════════════════════════════════════════════════
app.get('/', (req, res) => {
  res.json({
    status: 'APJ Social API is running',
    endpoints: ['/recommend-vehicle', '/calculate-fare', '/city-config', '/get-packages']
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


// ═══════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('APJ Social API running on port ' + PORT);
});
