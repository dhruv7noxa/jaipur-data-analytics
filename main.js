let appData = { townships: [], factors: [], areas: [] };
let charts = { trends: null, spatial: null, areaYield: null };

function haversineDistance(coords1, coords2) {
    const R = 6371; // km
    const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
    const dLon = (coords2.lng - coords1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// --- DATA HUB: 28 NEW BENCHMARK PROJECTS (March 2026) ---
function synthesizeData() {
    appData.townships = [
        { name: "VRB AMBER BY GOKULKRIPA", lat: 26.7797, lng: 75.6645, p150: 42.5, p200: 56.0, zone: "Jaisinghpura Neota", score: 88, growth: 42, type: "Township", plusCode: "VPRM+X9 Jaipur" },
        { name: "Galaxy Enclave : The Urban Village", lat: 26.7953, lng: 75.6192, p150: 65.0, p200: 86.0, zone: "Ajmer Road", score: 92, growth: 50, type: "Township", plusCode: "WRM9+G5 Jaipur" },
        { name: "R-Tech Samridhi Residency", lat: 26.8402, lng: 75.6986, p150: 48.0, p200: 64.0, zone: "Jaisinghpura", score: 85, growth: 38, type: "Township", plusCode: "XRX4+W6 Jaipur" },
        { name: "Sachivalaya Enclave", lat: 26.8738, lng: 75.6147, p150: 35.0, p200: 46.0, zone: "Jaisinghpura Kankroda", score: 82, growth: 32, type: "Township", plusCode: "YRG9+C7 Jaipur" },
        { name: "UNIQUE CITY EXTENSION", lat: 26.8357, lng: 75.6088, p150: 32.0, p200: 42.0, zone: "Teelawas", score: 80, growth: 28, type: "Township", plusCode: "XRC8+X6 Jaipur" },
        { name: "Vatika Infotech city Zenith Group", lat: 26.8378, lng: 75.6667, p150: 85.0, p200: 112.0, zone: "Balmukundpura", score: 95, growth: 55, type: "Township", plusCode: "XRCC+V6 Jaipur" },
        { name: "Palmera Garden", lat: 26.8511, lng: 75.6546, p150: 55.0, p200: 72.0, zone: "Ajmer Road", score: 89, growth: 45, type: "Township", plusCode: "XRCW+W6 Jaipur" },
        { name: "Keshvam Homeland", lat: 26.8362, lng: 75.6619, p150: 52.0, p200: 68.0, zone: "Mahapura", score: 88, growth: 45, type: "Township", plusCode: "XRCC+X6 Jaipur" },
        { name: "Manglam Grand City", lat: 26.8574, lng: 75.6660, p150: 68.0, p200: 90.0, zone: "Ajmer Road", score: 91, growth: 48, type: "Township", plusCode: "YRF6+P2 Jaipur" },
        { name: "Shyamashish Greens Bindayka", lat: 26.8953, lng: 75.6565, p150: 38.0, p200: 50.0, zone: "Bindayaka", score: 83, growth: 35, type: "Township", plusCode: "YRH6+X9 Jaipur" },
        { name: "Solitaire Homes", lat: 26.9006, lng: 75.6594, p150: 35.0, p200: 46.0, zone: "Neemera", score: 82, growth: 35, type: "Township", plusCode: "YRM8+P2 Jaipur" },
        { name: "Dwarika by K P Balaji", lat: 26.8842, lng: 75.6603, p150: 48.0, p200: 64.0, zone: "Ajmer Road", score: 86, growth: 40, type: "Township", plusCode: "YRH6+P2 Jaipur" },
        { name: "SAMANT VIHAR By KALASH", lat: 26.8822, lng: 75.6610, p150: 52.0, p200: 68.0, zone: "Ajmer Road", score: 87, growth: 42, type: "Township", plusCode: "YRH7+M2 Jaipur" },
        { name: "Infiniti Homes | KGK Realty", lat: 26.8524, lng: 75.6421, p150: 72.0, p200: 95.0, zone: "Ajmer Road", score: 92, growth: 52, type: "Township", plusCode: "YR3Q+W6 Jaipur" },
        { name: "Yaduraj Ojas", lat: 26.8648, lng: 75.6324, p150: 60.0, p200: 78.0, zone: "Ajmer Road", score: 90, growth: 48, type: "Township", plusCode: "YR8G+P2 Jaipur" },
        { name: "Truworth Rangoli Valley", lat: 26.8407, lng: 75.7051, p150: 75.0, p200: 100.0, zone: "Bhankrota", score: 92, growth: 52, type: "Township", plusCode: "XRX5+P2 Jaipur" },
        { name: "Motisons Township", lat: 26.8395, lng: 75.6132, p150: 35.0, p200: 46.0, zone: "Teelawas", score: 80, growth: 28, type: "Township", plusCode: "XRGC+X6 Jaipur" },
        { name: "Jaipur Greens Emaar India", lat: 26.8282, lng: 75.6540, p150: 95.0, p200: 125.0, zone: "Jhai", score: 96, growth: 60, type: "Township", plusCode: "WR7C+X9 Jaipur" },
        { name: "Yaduraj Samsara", lat: 26.8574, lng: 75.6318, p150: 55.0, p200: 72.0, zone: "Theekariya", score: 87, growth: 42, type: "Township", plusCode: "YRF6+P2 Jaipur" },
        { name: "Mangalam Balaji City", lat: 26.9141, lng: 75.6659, p150: 38.0, p200: 50.0, zone: "Bindayaka", score: 84, growth: 38, type: "Township", plusCode: "YRXX+P2 Jaipur" },
        { name: "Platinum Greens", lat: 26.8063, lng: 75.4655, p150: 22.0, p200: 28.0, zone: "Mahlan", score: 78, growth: 22, type: "Township", plusCode: "WMCV+P2 Jaipur" },
        { name: "Park Avenue", lat: 26.7594, lng: 75.6341, p150: 28.0, p200: 36.0, zone: "Ratalya", score: 79, growth: 25, type: "Township", plusCode: "VP4G+P2 Jaipur" },
        { name: "Kedia Raghav Town", lat: 26.7983, lng: 75.6324, p150: 45.0, p200: 60.0, zone: "Kalwara", score: 83, growth: 32, type: "Township", plusCode: "VRCG+P2 Jaipur" },
        { name: "Samanvay The Amelias", lat: 26.8349, lng: 75.6545, p150: 65.0, p200: 85.0, zone: "Chatarpura", score: 92, growth: 50, type: "Township", plusCode: "XR9W+P2 Jaipur" },
        { name: "Vrindavan Green's", lat: 26.8631, lng: 75.6146, p150: 42.0, p200: 55.0, zone: "Ajmer Road", score: 83, growth: 32, type: "Township", plusCode: "YR9G+X6 Jaipur" },
        { name: "Kedia The Sezasthan", lat: 26.8341, lng: 75.6241, p150: 60.0, p200: 80.0, zone: "SEZ Road", score: 90, growth: 48, type: "Township", plusCode: "XR9G+P2 Jaipur" },
        { name: "Imperial Galaxy", lat: 26.8641, lng: 75.6241, p150: 52.0, p200: 68.0, zone: "Ajmer Road", score: 87, growth: 42, type: "Township", plusCode: "YR9G+P2 Jaipur" },
        { name: "Silver Dunes", lat: 26.8141, lng: 75.5841, p150: 32.0, p200: 42.0, zone: "Bagru Khurd", score: 81, growth: 30, type: "Township", plusCode: "XRC8+X6 Jaipur" }
    ];

    // Calculate 10Y ROI
    appData.townships.forEach(t => {
        t.growth10y = Math.round(t.growth * 2.8); // 10Y is roughly 2.8x the 5Y growth potential
    });

    appData.factors = [
        { name: "Jayshree Periwal International School", lat: 26.826250, lng: 75.666250, pts: 100, cat: "School", color: "#3b82f6" },
        { name: "Delhi Public School", lat: 26.864688, lng: 75.679438, pts: 89, cat: "School", color: "#3b82f6" },
        { name: "ORCHIDS The International School", lat: 26.822313, lng: 75.675563, pts: 90, cat: "School", color: "#3b82f6" },
        { name: "St. Xavier's School, Nevta", lat: 26.805438, lng: 75.679563, pts: 80, cat: "School", color: "#3b82f6" },
        { name: "Radcliffe School, Mahapura", lat: 26.829062, lng: 75.662562, pts: 76, cat: "School", color: "#3b82f6" },
        { name: "Neerja Modi School, SEZ Road", lat: 26.794313, lng: 75.623812, pts: 77, cat: "School", color: "#3b82f6" },
        { name: "Subodh Global School", lat: 26.855562, lng: 75.625563, pts: 78, cat: "School", color: "#3b82f6" },
        { name: "Aurobindo International School", lat: 26.923188, lng: 75.684938, pts: 80, cat: "School", color: "#3b82f6" },
        { name: "Manipal University", lat: 26.829313, lng: 75.570438, pts: 100, cat: "University", color: "#1e3a8a" },
        { name: "JK Lakshmipat University", lat: 26.836563, lng: 75.650312, pts: 80, cat: "University", color: "#1e3a8a" },
        { name: "Bhartiya Skill Development University", lat: 26.802938, lng: 75.651688, pts: 76, cat: "University", color: "#1e3a8a" },
        { name: "Geetanjali Hospital Jaipur", lat: 26.865188, lng: 75.699813, pts: 90, cat: "Hospital", color: "#ffffff" },
        { name: "Shalby Multi-Specialty Hospital", lat: 26.903438, lng: 75.729188, pts: 64, cat: "Hospital", color: "#ffffff" },
        { name: "KIRTI LIFE LINE HOSPITAL", lat: 26.821188, lng: 75.639938, pts: 70, cat: "Hospital", color: "#ffffff" },
        { name: "Malot Hospital", lat: 26.843688, lng: 75.655063, pts: 28, cat: "Hospital", color: "#ffffff" },
        { name: "Balaji Soni Hospital", lat: 26.811438, lng: 75.573438, pts: 68, cat: "Hospital", color: "#ffffff" },
        { name: "CS HOSPITAL", lat: 26.890063, lng: 75.728688, pts: 68, cat: "Hospital", color: "#ffffff" },
        { name: "Manas Hospital", lat: 26.892063, lng: 75.720563, pts: 66, cat: "Hospital", color: "#ffffff" },
        { name: "Shrestha lifeline hospital", lat: 26.9150625, lng: 75.6413594, pts: 66, cat: "Hospital", color: "#ffffff" },
        { name: "Nevta Lake North View Point", lat: 26.811938, lng: 75.678313, pts: 90, cat: "Travel", color: "#22c55e" },
        { name: "CityPark Jaipur", lat: 26.8598125, lng: 75.7644375, pts: 94, cat: "Travel", color: "#22c55e" },
        { name: "Sunrise Spot", lat: 26.8716875, lng: 75.6078125, pts: 78, cat: "Travel", color: "#22c55e" },
        { name: "Pink Pearl Water Park", lat: 26.8550625, lng: 75.6669375, pts: 91, cat: "Travel", color: "#22c55e" },
        { name: "Radhe cricket academy", lat: 26.8630625, lng: 75.6624375, pts: 78, cat: "Travel", color: "#22c55e" },
        { name: "Bad ke Balaji temple", lat: 26.8523125, lng: 75.6308125, pts: 78, cat: "Travel", color: "#22c55e" },
        { name: "ISKCON Temple", lat: 26.8310625, lng: 75.7496875, pts: 90, cat: "Travel", color: "#22c55e" },
        { name: "Dakshineswar Kali Mandir", lat: 26.9178125, lng: 75.7117656, pts: 80, cat: "Travel", color: "#22c55e" },
        { name: "KGF Cricket Ground", lat: 26.8736375, lng: 75.6015781, pts: 78, cat: "Travel", color: "#22c55e" },
        { name: "New Hawai-Jahaj Waterpark", lat: 26.9443125, lng: 75.6739375, pts: 78, cat: "Travel", color: "#22c55e" },
        { name: "Samurai Palace", lat: 26.8830625, lng: 75.7171875, pts: 60, cat: "Travel", color: "#22c55e" },
        { name: "Anantam Cricket Academy", lat: 26.8559375, lng: 75.6898125, pts: 78, cat: "Travel", color: "#22c55e" },
        { name: "PUNO Jaipur", lat: 26.8798125, lng: 75.7330625, pts: 80, cat: "Travel", color: "#22c55e" },
        { name: "Sez Mahindra World City", lat: 26.8143125, lng: 75.6171875, pts: 90, cat: "Industrial", color: "#581c87" },
        { name: "Industrial area Phase-II", lat: 26.8223125, lng: 75.7601875, pts: 60, cat: "Industrial", color: "#581c87" },
        { name: "Muhana Mandi", lat: 26.8223125, lng: 75.7601875, pts: 78, cat: "Industrial", color: "#581c87" },
        { name: "Spinny Car Hub", lat: 26.8649375, lng: 75.6819375, pts: 68, cat: "Industrial", color: "#581c87" },
        { name: "OLD CHOUDHARY", lat: 26.8223125, lng: 75.6459375, pts: 70, cat: "Cafe", color: "#f97316" },
        { name: "Chokha Punjab", lat: 26.8530625, lng: 75.6659375, pts: 78, cat: "Cafe", color: "#f97316" },
        { name: "Pine & Dine Café", lat: 26.8873125, lng: 75.7271875, pts: 70, cat: "Cafe", color: "#f97316" },
        { name: "Kanchan Kesari Village Resort", lat: 26.8569375, lng: 75.6738125, pts: 72, cat: "Cafe", color: "#f97316" },
        { name: "Rafta Cafe & Kitchen", lat: 26.8436875, lng: 75.6880625, pts: 67, cat: "Cafe", color: "#f97316" },
        { name: "The Big Tree Cafe", lat: 26.8835625, lng: 75.7271875, pts: 68, cat: "Cafe", color: "#f97316" },
        { name: "Mystery Machine", lat: 26.8461875, lng: 75.5624375, pts: 78, cat: "Cafe", color: "#f97316" },
        { name: "Treasures N Treats Cafe", lat: 26.8364375, lng: 75.7413125, pts: 74, cat: "Cafe", color: "#f97316" },
        { name: "JB Cafe", lat: 26.8063125, lng: 75.6441875, pts: 72, cat: "Cafe", color: "#f97316" },
        { name: "Hapley Cakes & Bakes", lat: 26.8251875, lng: 75.6554375, pts: 78, cat: "Cafe", color: "#f97316" },
        { name: "Vyani mart", lat: 26.8226875, lng: 75.6579375, pts: 80, cat: "Cafe", color: "#f97316" },
        { name: "Domino's Pizza", lat: 26.8523125, lng: 75.6661875, pts: 72, cat: "Cafe", color: "#f97316" },
        { name: "Nothing Before Coffee", lat: 26.8510625, lng: 75.6661875, pts: 72, cat: "Cafe", color: "#f97316" },
        { name: "Burger King", lat: 26.8799375, lng: 75.7341875, pts: 72, cat: "Cafe", color: "#f97316" },
        { name: "Burger Singh", lat: 26.8415625, lng: 75.7438125, pts: 68, cat: "Cafe", color: "#f97316" },
        { name: "Burger Farm", lat: 26.8063125, lng: 75.6443125, pts: 69, cat: "Cafe", color: "#f97316" },
        { name: "Balaji Seven Hills Resort", lat: 26.9246875, lng: 75.6974375, pts: 76, cat: "Hotel", color: "#ef4444" },
        { name: "Rang Mahal, Jaipur", lat: 26.9235625, lng: 75.6854375, pts: 78, cat: "Hotel", color: "#ef4444" },
        { name: "SwapanLok Resort", lat: 26.8645625, lng: 75.5899375, pts: 74, cat: "Hotel", color: "#ef4444" },
        { name: "Naila kothi", lat: 26.8975625, lng: 75.6880625, pts: 84, cat: "Hotel", color: "#ef4444" },
        { name: "Rangmaya Resort & Spa", lat: 26.8670625, lng: 75.5826875, pts: 78, cat: "Hotel", color: "#ef4444" },
        { name: "The Fern Nest Resort Jaipur", lat: 26.8384375, lng: 75.6176875, pts: 78, cat: "Hotel", color: "#ef4444" },
        { name: "The Palace By Park Jewels", lat: 26.8833125, lng: 75.6436875, pts: 78, cat: "Hotel", color: "#ef4444" },
        { name: "ClarksInn Suites Jaipur", lat: 26.8845625, lng: 75.6793125, pts: 72, cat: "Hotel", color: "#ef4444" },
        { name: "Palette Jisaa Eco Resort", lat: 26.8526875, lng: 75.6033125, pts: 88, cat: "Hotel", color: "#ef4444" },
        { name: "STARDOM RESORT", lat: 26.8858125, lng: 75.6888125, pts: 78, cat: "Hotel", color: "#ef4444" },
        { name: "Fox N Flute", lat: 26.7915625, lng: 75.6173125, pts: 78, cat: "Hotel", color: "#ef4444" },
        { name: "Samskara Resort, Jaipur", lat: 26.8200625, lng: 75.7041875, pts: 74, cat: "Hotel", color: "#ef4444" },
        { name: "Decathlon Sports", lat: 26.8845625, lng: 75.6980625, pts: 80, cat: "Commercial", color: "#a855f7" },
        { name: "D Mart Bhakrota", lat: 26.8851875, lng: 75.6704375, pts: 80, cat: "Commercial", color: "#a855f7" },
        { name: "D MART BINDAYAKA", lat: 26.9162125, lng: 75.6418594, pts: 80, cat: "Commercial", color: "#a855f7" },
        { name: "DMART SIRSI ROAD", lat: 26.9213125, lng: 75.7297969, pts: 80, cat: "Commercial", color: "#a855f7" },
        { name: "Manglam Pinkwest", lat: 26.8733125, lng: 75.7233125, pts: 88, cat: "Commercial", color: "#a855f7" },
        { name: "ASHIANA UMANG", lat: 26.8260625, lng: 75.6565625, pts: 84, cat: "Residential", color: "#451a03" },
        { name: "Ashiana Ekansh", lat: 26.8563125, lng: 75.6963125, pts: 77, cat: "Residential", color: "#451a03" },
        { name: "Shubhashish Prakash", lat: 26.8651875, lng: 75.6983125, pts: 79, cat: "Residential", color: "#451a03" },
        { name: "Ashiana Amantran", lat: 26.8835625, lng: 75.7265625, pts: 86, cat: "Residential", color: "#451a03" },
        { name: "Ashiana Nitara", lat: 26.8735625, lng: 75.6809375, pts: 80, cat: "Residential", color: "#451a03" },
        { name: "Mahima Florenza", lat: 26.8394375, lng: 75.7395625, pts: 80, cat: "Residential", color: "#451a03" },
        { name: "Sky 25 Keshopura", lat: 26.8766625, lng: 75.7047031, pts: 79, cat: "Residential", color: "#451a03" },
        { name: "Kedia's THE KOTHI", lat: 26.9300625, lng: 75.6755625, pts: 78, cat: "Residential", color: "#451a03" }
    ];

    calculateSpatialScores();

    // 62 Jaipur Localities Data — Precision Matrix (March 2026)
    // Methodology:
    //   rent2bhk → Current listings median (semi-furnished 2BHK)
    //   perSqft  → House/flat rate: current exact-area data, or prev year + 12% adjusted growth
    //   sqydLand → Previous year land/plot baseline per sq.yd, face-value verified vs articles
    //   growth   → Forward-looking: JDA projects, metro, ring road, greenery, middle-class demand
    const areaNames = [
        "Malviya Nagar", "Jagatpura", "Pratap Nagar", "Sanganer", "Durgapura", "Raja Park", "Adarsh Nagar", 
        "Gopal Pura Mode", "Mansarovar", "Manyawas", "Khatipura", "Vaishali Nagar", "Lalkothi", "Sindhi Camp", 
        "Shastri Nagar", "Vidyadhar Nagar", "Ambabari", "Military Containment", "Bais Godam", "Vishwakarma Industrial Area", 
        "Bhankrota", "Muhana", "Sitapura", "Theekariya", "Jhai", "Kalwara", "Bagru", "Sanjharia", "Bindayaka", 
        "Kanakpura", "Gokulpura", "Nangal Jaisabohra", "Dadi Ka Phatak", "Boytawala", "Jaisinghpura Khor", "Paldi Meena", 
        "Sumel", "Jaijaspura", "Chirota", "Bagru Khurd", "Dahmi Kalan", "Neemera", "Bhakrota", "Narayan Vihar", "Dholai", 
        "Narayan Sagar A", "Lalarpura", "Panchyawala", "Hanuman Nagar", "C Scheme", "Bambala", "Chokhi Dhani", 
        "Prahladpura", "Beelwa", "Ratalya", "Shri Kishanpura", "Jhotwara", "Murlipura"
    ];

    // psft: avg flat/house price per sqft (current market, exact area)
    // rent: median 2BHK monthly rent (current listings, semi-furnished)
    // sqyd: land/plot per sq.yard (previous year baseline, face-value verified)
    // growth: 5Y expected appreciation % (demand/supply, JDA, metro, infra, greenery, middle-class)
    const priceGuide = {
        // ── ULTRA PREMIUM CORE ──
        "C Scheme":         { psft: 20000, rent: 35000, sqyd: 250000, growth: 18 },
        "Lalkothi":         { psft: 16000, rent: 30000, sqyd: 200000, growth: 15 },
        "Bais Godam":       { psft: 15000, rent: 28000, sqyd: 180000, growth: 16 },
        "Raja Park":        { psft: 14000, rent: 25000, sqyd: 160000, growth: 14 },
        // ── HIGH PREMIUM ESTABLISHED ──
        "Malviya Nagar":    { psft: 12000, rent: 23000, sqyd: 140000, growth: 22 },
        "Hanuman Nagar":    { psft: 11000, rent: 22000, sqyd: 135000, growth: 20 },
        "Vaishali Nagar":   { psft: 10500, rent: 20000, sqyd: 112000, growth: 25 },
        "Adarsh Nagar":     { psft: 9800,  rent: 18000, sqyd: 100000, growth: 18 },
        "Sindhi Camp":      { psft: 9500,  rent: 17000, sqyd: 95000,  growth: 12 },
        "Military Containment": { psft: 9200, rent: 16000, sqyd: 90000, growth: 10 },
        // ── ESTABLISHED RESIDENTIAL ──
        "Durgapura":        { psft: 8500,  rent: 18000, sqyd: 85000,  growth: 28 },
        "Mansarovar":       { psft: 7100,  rent: 16000, sqyd: 72000,  growth: 22 },
        "Vidyadhar Nagar":  { psft: 6800,  rent: 14000, sqyd: 68000,  growth: 18 },
        "Shastri Nagar":    { psft: 6500,  rent: 13000, sqyd: 65000,  growth: 15 },
        "Gopal Pura Mode":  { psft: 6200,  rent: 14000, sqyd: 62000,  growth: 20 },
        "Ambabari":         { psft: 5800,  rent: 12000, sqyd: 58000,  growth: 15 },
        "Khatipura":        { psft: 5500,  rent: 11500, sqyd: 55000,  growth: 22 },
        // ── GROWTH CORRIDORS ──
        "Jagatpura":        { psft: 6500,  rent: 13000, sqyd: 72000,  growth: 35 },
        "Pratap Nagar":     { psft: 5700,  rent: 11000, sqyd: 55000,  growth: 30 },
        "Jhotwara":         { psft: 5200,  rent: 10500, sqyd: 48000,  growth: 28 },
        "Murlipura":        { psft: 5000,  rent: 10000, sqyd: 45000,  growth: 30 },
        "Sanganer":         { psft: 4800,  rent: 9500,  sqyd: 42000,  growth: 25 },
        "Narayan Vihar":    { psft: 4500,  rent: 9000,  sqyd: 40000,  growth: 22 },
        "Panchyawala":      { psft: 4200,  rent: 8500,  sqyd: 38000,  growth: 25 },
        "Manyawas":         { psft: 4000,  rent: 8000,  sqyd: 35000,  growth: 20 },
        // ── EMERGING / AJMER ROAD BELT ──
        "Bhankrota":        { psft: 4500,  rent: 8000,  sqyd: 38000,  growth: 35 },
        "Bhakrota":         { psft: 4200,  rent: 7500,  sqyd: 35000,  growth: 32 },
        "Dadi Ka Phatak":   { psft: 3800,  rent: 7000,  sqyd: 32000,  growth: 28 },
        "Dholai":           { psft: 3500,  rent: 7000,  sqyd: 30000,  growth: 25 },
        "Narayan Sagar A":  { psft: 3200,  rent: 6500,  sqyd: 28000,  growth: 22 },
        "Lalarpura":        { psft: 3000,  rent: 6000,  sqyd: 26000,  growth: 25 },
        "Kanakpura":        { psft: 3200,  rent: 6500,  sqyd: 28000,  growth: 28 },
        "Sitapura":         { psft: 4000,  rent: 12000, sqyd: 30000,  growth: 22 },
        "Muhana":           { psft: 3000,  rent: 6500,  sqyd: 26000,  growth: 25 },
        "Vishwakarma Industrial Area": { psft: 3800, rent: 10000, sqyd: 35000, growth: 18 },
        // ── OUTER GROWTH / VALUE ZONES ──
        "Theekariya":       { psft: 3200,  rent: 5500,  sqyd: 33000,  growth: 38 },
        "Jhai":             { psft: 2800,  rent: 5000,  sqyd: 25000,  growth: 32 },
        "Kalwara":          { psft: 2500,  rent: 5000,  sqyd: 22000,  growth: 30 },
        "Bagru":            { psft: 2200,  rent: 4500,  sqyd: 18000,  growth: 28 },
        "Bagru Khurd":      { psft: 2000,  rent: 4000,  sqyd: 16000,  growth: 25 },
        "Bindayaka":        { psft: 2800,  rent: 5000,  sqyd: 30000,  growth: 40 },
        "Dahmi Kalan":      { psft: 3500,  rent: 7500,  sqyd: 32000,  growth: 35 },
        "Neemera":          { psft: 2600,  rent: 5000,  sqyd: 22000,  growth: 35 },
        "Sanjharia":        { psft: 2400,  rent: 4500,  sqyd: 20000,  growth: 30 },
        "Beelwa":           { psft: 2000,  rent: 4000,  sqyd: 15000,  growth: 28 },
        "Ratalya":          { psft: 1800,  rent: 3500,  sqyd: 12000,  growth: 25 },
        "Sumel":            { psft: 1500,  rent: 3000,  sqyd: 10000,  growth: 20 },
        // ── SATELLITE VILLAGES / PERIPHERAL ──
        "Gokulpura":        { psft: 2800,  rent: 5500,  sqyd: 25000,  growth: 30 },
        "Nangal Jaisabohra":{ psft: 2200,  rent: 4500,  sqyd: 18000,  growth: 25 },
        "Boytawala":        { psft: 2600,  rent: 5000,  sqyd: 22000,  growth: 28 },
        "Jaisinghpura Khor":{ psft: 3200,  rent: 6000,  sqyd: 28000,  growth: 32 },
        "Paldi Meena":      { psft: 2000,  rent: 4000,  sqyd: 15000,  growth: 22 },
        "Jaijaspura":       { psft: 2200,  rent: 4200,  sqyd: 18000,  growth: 25 },
        "Chirota":          { psft: 2000,  rent: 4000,  sqyd: 16000,  growth: 22 },
        "Bambala":          { psft: 3000,  rent: 6000,  sqyd: 25000,  growth: 28 },
        "Chokhi Dhani":     { psft: 3500,  rent: 7000,  sqyd: 30000,  growth: 30 },
        "Prahladpura":      { psft: 2800,  rent: 5500,  sqyd: 24000,  growth: 28 },
        "Shri Kishanpura":  { psft: 3000,  rent: 5500,  sqyd: 26000,  growth: 25 },
        // fallback
        "default":          { psft: 3500,  rent: 7000,  sqyd: 28000,  growth: 25 }
    };

    appData.areas = areaNames.map((name, i) => {
        const guide = priceGuide[name] || priceGuide["default"];
        
        let pData = { lat: 26.9124 + (Math.sin(i) * 0.15), lng: 75.7873 + (Math.cos(i) * 0.15) };
        if (typeof areaPolygons !== 'undefined' && areaPolygons[name]) {
            pData = { lat: areaPolygons[name].lat, lng: areaPolygons[name].lng };
        }

        const perSqft = guide.psft;
        const rent2bhk = guide.rent;
        const flat1800 = perSqft * 1800;
        const sqydLand = guide.sqyd; // Direct from research, not derived
        
        return {
            name: name,
            lat: pData.lat,
            lng: pData.lng,
            perSqft: perSqft,
            rent2bhk: rent2bhk,
            flat1800: flat1800,
            sqydLand: sqydLand,
            medRes: Math.round(flat1800 * 1.12),   // Median res ~12% above flat baseline
            medCom: Math.round(flat1800 * 2.0),     // Commercial 2x residential
            house200: Math.round(sqydLand * 200 + (3200 * 200 * 9)), // Land + construction ₹3200/sqft premium
            tier: perSqft > 12000 ? 3.5 : (perSqft > 7000 ? 2.5 : (perSqft > 4000 ? 1.5 : 1.0)),
            growth5y: guide.growth  // Forward-looking growth %
        };
    });
}

function calculateSpatialScores() {
    appData.townships.forEach(t => {
        let pts = 0;
        let hasSchool = false, hasHosp = false, hasUni = false;

        appData.factors.forEach(f => {
            const dist = haversineDistance({ lat: t.lat, lng: t.lng }, { lat: f.lat, lng: f.lng });
            if (dist < 2) pts += f.pts;
            else if (dist < 5) pts += (f.pts * 0.5);
            else if (dist < 8) pts += (f.pts * 0.25);

            if (dist < 8) {
                if (f.cat === "School") hasSchool = true;
                if (f.cat === "Hospital") hasHosp = true;
                if (f.cat === "University") hasUni = true;
            }
        });

        if (!hasSchool) pts -= 60;
        if (!hasHosp) pts -= 60;
        if (!hasUni) pts -= 60;

        t.spatialScore = Math.round(pts);
    });
}

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${pageId}`);
    if(target) target.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`btn-${pageId}`);
    if(btn) btn.classList.add('active');

    if (pageId === 'map') {
        renderSpatialMap();
        renderMapLegend();
        setTimeout(() => map && map.invalidateSize(), 150);
    }
    if (pageId === 'top200') renderTownshipLists();
    if (pageId === 'trends') renderTrends();
    if (pageId === 'areas') {
        renderAreaTable();
        renderAreaChart();
        renderAreaIntelMap();
        renderAreaLists();
    }
    if (pageId === 'factors') renderSpatialScoreboard();
    if (pageId === 'winners') renderWinners();
    
    // Smooth scroll to top and reset reveals
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.reveal').forEach(el => el.classList.remove('active'));
    setTimeout(initScrollReveal, 150);
}

let map = null;
let areaIntelMap = null;
let areaIntelLayers = {
    normal: null,
    satellite: null,
    current: 'normal'
};
let townshipMarkers = [];
let factorMarkers = [];
let areaBoundaries = [];
let areaIntelBoundaries = [];

window.hiddenCategories = new Set();

function renderSpatialMap() {
    if (map) return;
    
    // Google Satellite Center: Central Corridor
    map = L.map('spatial-map', {
        maxBounds: L.latLngBounds(L.latLng(26.40, 75.00), L.latLng(27.50, 76.50)),
        maxBoundsViscosity: 1.0
    }).setView([26.84, 75.63], 12); 

    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: 'Map &copy; Google',
        maxZoom: 20
    }).addTo(map);

    // Initialize Slider range
    const prices = appData.townships.map(t => t.p150);
    const minP = Math.floor(Math.min(...prices));
    const maxP = Math.ceil(Math.max(...prices));
    const slider = document.getElementById('price-range');
    if(slider) {
        slider.min = minP;
        slider.max = maxP;
        slider.value = maxP;
        document.getElementById('price-val').innerText = `₹${minP}L - ₹${maxP}L`;
    }

    renderMapMarkers();
}

function renderMapMarkers() {
    const query = document.getElementById('map-search')?.value.toLowerCase() || "";
    const maxPrice = parseFloat(document.getElementById('price-range')?.value) || 150;
    
    // Update price display
    const priceVal = document.getElementById('price-val');
    const minP = document.getElementById('price-range')?.min || 0;
    if(priceVal) priceVal.innerText = `₹${minP}L - ₹${maxPrice}L`;

    // Clear existing markers
    townshipMarkers.forEach(m => map.removeLayer(m));
    factorMarkers.forEach(m => map.removeLayer(m));
    areaBoundaries.forEach(b => map.removeLayer(b));
    townshipMarkers = [];
    factorMarkers = [];
    areaBoundaries = [];

    // Note: Area boundaries removed from main map as per user request
    // and moved to the Area Intel page.

    // Filter and add Townships
    if (!window.hiddenCategories.has("Townships")) {
        const sortedTownships = [...appData.townships].sort((a,b) => b.score - a.score);
        sortedTownships.forEach((t, i) => {
            const matchesSearch = t.name.toLowerCase().includes(query) || 
                                 t.zone.toLowerCase().includes(query) ||
                                 "township".includes(query) ||
                                 "yellow".includes(query);
            
            const matchesPrice = t.p150 <= maxPrice;

            if (matchesSearch && matchesPrice) {
                // Ensure yellow styling for townships
                const townshipStyle = {
                    radius: 8, fillColor: "#fbbf24", color: "#fff", weight: 2, fillOpacity: 0.9
                };
                
                const marker = L.circleMarker([t.lat, t.lng], townshipStyle).addTo(map).bindPopup(`
                    <div style="font-family:'Outfit', sans-serif; min-width:200px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <span style="background:var(--primary); color:white; padding:2px 8px; border-radius:10px; font-size:0.7rem; font-weight:700;">Rank #${i+1}</span>
                            <span style="color:var(--success); font-weight:700; font-size:0.8rem;">+${t.growth}% 5Y</span>
                        </div>
                        <h4 style="margin:0 0 4px 0; font-size:1.1rem; color:var(--text-main);">${t.name}</h4>
                        <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">${t.zone}</div>
                        
                        <div style="background:rgba(255,255,255,0.05); padding:8px; border-radius:8px; margin-bottom:8px;">
                            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                                <span style="color:var(--text-muted)">150 SQYD</span>
                                <span style="font-weight:700; color:white;">₹${t.p150} L</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                                <span style="color:var(--text-muted)">200 SQYD</span>
                                <span style="font-weight:700; color:white;">₹${t.p200} L</span>
                            </div>
                        </div>
                        <div style="font-size:0.8rem; color:var(--accent);">Proximity Score: <b>${t.spatialScore}</b></div>
                    </div>
                `);
                townshipMarkers.push(marker);
            }
        });
    }

    // Filter and add Factors
    appData.factors.forEach(f => {
        if (window.hiddenCategories.has(f.cat) || window.hiddenCategories.has(f.name)) return;
        
        const matchesSearch = f.name.toLowerCase().includes(query) || 
                             f.cat.toLowerCase().includes(query) ||
                             f.color.toLowerCase().includes(query) ||
                             "yellow".includes(query);

        if (matchesSearch) {
            const factorMarkerStyle = {
                radius: 8, fillColor: f.color, color: "#fff", weight: 2, fillOpacity: 0.9
            };
            const marker = L.circleMarker([f.lat, f.lng], factorMarkerStyle).addTo(map).bindPopup(`
                <div style="font-family:'Outfit', sans-serif;">
                    <div style="color:${f.color}; font-weight:700; font-size:0.7rem; text-transform:uppercase;">${f.cat}</div>
                    <h5 style="margin:2px 0; font-size:1rem; color:var(--text-main);">${f.name}</h5>
                    <div style="font-size:0.8rem; color:var(--text-muted);">Asset Weight: <b>${f.pts} Points</b></div>
                </div>
            `);
            factorMarkers.push(marker);
        }
    });
}

function filterMap() {
    if(!map) return;
    renderMapMarkers();
}

function renderTownshipLists() {
    const list = [...appData.townships].sort((a,b) => b.score - a.score);
    const body = document.getElementById('top200-body');
    if(!body) return;
    body.innerHTML = '';

    list.forEach(t => {
        const row = document.createElement('tr');
        row.style.animation = `fadeIn 0.5s ease forwards`;
        
        row.innerHTML = `
            <td><strong>${t.name}</strong></td>
            <td><span class="pill" style="background:rgba(255,255,255,0.05); color:var(--text-muted); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem;">${t.zone}</span></td>
            <td>₹${t.p150.toFixed(1)} L</td>
            <td>₹${t.p200.toFixed(1)} L</td>
            <td><span style="color:var(--success); font-weight:600;">+${t.growth}%</span></td>
            <td><span style="color:var(--primary); font-weight:600;">+${t.growth10y}%</span></td>
            <td><b style="color:var(--primary); font-size: 1.1rem;">${t.score}</b></td>
        `;
        body.appendChild(row);
    });
}

function filterTop200() {
    const query = document.getElementById('township-search').value.toLowerCase();
    const list = appData.townships.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.zone.toLowerCase().includes(query)
    ).sort((a,b) => b.score - a.score);

    const body = document.getElementById('top200-body');
    if(!body) return;
    body.innerHTML = '';

    list.forEach(t => {
        const row = document.createElement('tr');
        row.style.animation = `fadeIn 0.5s ease forwards`;
        
        row.innerHTML = `
            <td><strong>${t.name}</strong></td>
            <td><span class="pill" style="background:rgba(255,255,255,0.05); color:var(--text-muted); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem;">${t.zone}</span></td>
            <td>₹${t.p150.toFixed(1)} L</td>
            <td>₹${t.p200.toFixed(1)} L</td>
            <td><span style="color:var(--success); font-weight:600;">+${t.growth}%</span></td>
            <td><span style="color:var(--primary); font-weight:600;">+${t.growth10y}%</span></td>
            <td><b style="color:var(--primary); font-size: 1.1rem;">${t.score}</b></td>
        `;
        body.appendChild(row);
    });
}

function renderTrends() {
    const ctx = document.getElementById('trendsChart');
    if(!ctx) return;
    const ctx2d = ctx.getContext('2d');
    if (charts.trends) charts.trends.destroy();
    
    const datasets = [{
        label: 'Township Performance',
        data: appData.townships.map(t => ({ x: t.score, y: t.p150, label: t.name })),
        backgroundColor: '#D81B60',
        pointRadius: 6
    }];

    charts.trends = new Chart(ctx2d, { 
        type: 'scatter', 
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.03)' }, title: { display: true, text: 'AI Investment Score', color: '#A3969A' } },
                y: { grid: { color: 'rgba(255,255,255,0.03)' }, title: { display: true, text: 'Price (₹ Lakhs per 150sqyd)', color: '#A3969A' } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 12, 14, 0.95)',
                    titleColor: '#D81B60',
                    bodyColor: '#FFF5F7',
                    borderColor: 'rgba(216, 27, 96, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 15,
                    callbacks: {
                        label: (ctx) => `${ctx.raw.label}: Score ${ctx.raw.x}, Price ₹${ctx.raw.y}L`
                    }
                }
            }
        }
    });

    // Update Rankings Sidebars
    const sorted = [...appData.townships].sort((a,b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);
    const bottom3 = sorted.slice(-3).reverse();

    const renderList = (list, containerId) => {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = list.map(t => `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 0.8rem 0;">
                <div>
                    <div style="font-weight:600; font-size:0.9rem;">${t.name}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted)">${t.zone}</div>
                </div>
                <div style="font-weight:700; color:var(--primary);">${t.score}</div>
            </div>
        `).join('');
    };

    renderList(top3, 'top-rankings');
    renderList(bottom3, 'bottom-rankings');
}

function renderSpatialScoreboard() {
    const list = [...appData.townships].sort((a,b) => b.spatialScore - a.spatialScore);
    const body = document.getElementById('factors-body');
    if(!body) return;
    body.innerHTML = '';

    list.forEach((t, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><b style="color:var(--primary)">#${i+1}</b></td>
            <td><strong>${t.name}</strong></td>
            <td>₹${t.p150.toFixed(1)} L</td>
            <td><span style="font-weight:800; color:white; background:var(--primary); padding:4px 12px; border-radius:8px;">${t.spatialScore}</span></td>
            <td><span style="color:var(--success); font-weight:600;">${t.score}% Growth Potential</span></td>
        `;
        body.appendChild(row);
    });

    // Points vs Price Chart
    const ctx = document.getElementById('spatialChart');
    if(!ctx) return;
    const ctx2d = ctx.getContext('2d');
    if (charts.spatial) charts.spatial.destroy();

    charts.spatial = new Chart(ctx2d, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Spatial Points vs 150y Price',
                data: appData.townships.map(t => ({ x: t.spatialScore, y: t.p150, label: t.name })),
                backgroundColor: '#FF9800',
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.03)' }, title: { display: true, text: 'Spatial Proximity Points', color: '#A3969A' } },
                y: { grid: { color: 'rgba(255,255,255,0.03)' }, title: { display: true, text: 'Price (₹ Lakhs)', color: '#A3969A' } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 12, 14, 0.95)',
                    titleColor: '#FF9800',
                    bodyColor: '#FFF5F7',
                    borderColor: 'rgba(255, 152, 0, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 15,
                    callbacks: { label: (ctx) => `${ctx.raw.label}: ${ctx.raw.x} Pts, ₹${ctx.raw.y}L` }
                }
            }
        }
    });
}

function renderWinners() {
    const sortedAffordable = [...appData.townships].sort((a,b) => a.p150 - b.p150).slice(0, 3);
    const sortedGrowth = [...appData.townships].sort((a,b) => b.growth - a.growth).slice(0, 3);
    const sortedPoints = [...appData.townships].sort((a,b) => b.spatialScore - a.spatialScore).slice(0, 3);

    const injectWinners = (list, containerId, accentColor) => {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = '';
        list.forEach((w, i) => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            const defaultBorder = 'var(--card-border)';
            card.style.cssText = `padding: 2rem; border-radius: 30px; border-color: ${i === 0 ? accentColor : defaultBorder}; position: relative;`;
            card.innerHTML = `
                <div style="position:absolute; top: -15px; left: 20px; background: ${i === 0 ? accentColor : 'var(--bg-dark)'}; padding: 4px 15px; border-radius: 10px; font-weight: 700; font-size: 0.6rem; letter-spacing: 1px; text-transform: uppercase;">#${i+1} RANK</div>
                <h2 style="font-size: 1.4rem; margin: 0.5rem 0 0.2rem 0; color: white;">${w.name}</h2>
                <div style="color:${accentColor}; font-weight: 600; margin-bottom: 1rem; font-size: 0.8rem;">${w.zone}</div>
                <div style="background: rgba(255,255,255,0.02); border-radius: 15px; padding: 1rem; margin-bottom: 1rem;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <span style="font-size:0.7rem; color:var(--text-muted);">PRICE 150y</span>
                        <span style="font-weight:700; color:white;">₹${w.p150}L</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span style="font-size:0.7rem; color:var(--text-muted);">SPATIAL SCORE</span>
                        <span style="font-weight:700; color:white;">${w.spatialScore} Pts</span>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.7rem; color: var(--text-muted);">ROI INDEX</div>
                    <div style="font-size: 1.2rem; font-weight: 800; color: ${accentColor};">${w.score}</div>
                </div>
            `;
            container.appendChild(card);
        });
    };

    injectWinners(sortedAffordable, 'winners-affordable', 'var(--primary)');
    injectWinners(sortedGrowth, 'winners-growth', 'var(--success)');
    injectWinners(sortedPoints, 'winners-points', 'var(--secondary)');
}

function renderMapLegend() {
    const categories = [
        { name: "Townships", color: "#fbbf24" },
        { name: "School", color: "#3b82f6" },
        { name: "University", color: "#1e3a8a" },
        { name: "Hospital", color: "#ffffff" },
        { name: "Travel", color: "#22c55e", label: "Travel/Leisure" },
        { name: "Industrial", color: "#581c87" },
        { name: "Cafe", color: "#f97316", label: "Cafe/Restro" },
        { name: "Hotel", color: "#ef4444", label: "Hotel/Resort" },
        { name: "Commercial", color: "#a855f7" },
        { name: "Residential", color: "#451a03" }
    ];

    const container = document.getElementById('legend-items');
    if(!container) return;
    container.innerHTML = '';

    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        if (window.hiddenCategories.has(cat.name)) {
            item.classList.add('dimmed');
        }
        item.innerHTML = `
            <div style="width: 14px; height: 14px; border-radius: 50%; background: ${cat.color}; border: 2px solid #fff; box-shadow: 0 0 5px rgba(255,255,255,0.2);"></div>
            <span style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600;">${cat.label || cat.name}</span>
        `;
        
        item.onclick = () => {
             if (window.hiddenCategories.has(cat.name)) {
                 window.hiddenCategories.delete(cat.name);
             } else {
                 window.hiddenCategories.add(cat.name);
             }
             filterMap();
             renderMapLegend();
        };

        container.appendChild(item);
    });
}

function renderAreaTable() {
    const list = [...appData.areas].sort((a,b) => b.perSqft - a.perSqft);
    const body = document.getElementById('areas-body');
    if(!body) return;
    body.innerHTML = '';

    list.forEach((a, i) => {
        const row = document.createElement('tr');
        row.style.animation = `fadeIn 0.5s ease forwards`;
        row.style.animationDelay = `${(i % 10) * 0.05}s`;
        
        row.innerHTML = `
            <td><strong>${a.name}</strong> <br><small style="color:var(--text-muted)">Rank #${i+1}</small></td>
            <td><b style="color:var(--primary); font-size:1.1rem">₹${a.perSqft.toLocaleString()}</b></td>
            <td>₹${a.rent2bhk.toLocaleString()}/mo</td>
            <td>₹${(a.flat1800/100000).toFixed(2)}L</td>
            <td>₹${a.sqydLand.toLocaleString()}</td>
            <td>₹${(a.medRes/10000000).toFixed(2)}Cr</td>
            <td>₹${(a.medCom/10000000).toFixed(2)}Cr</td>
            <td><span style="color:var(--success); font-weight:600;">₹${(a.house200/10000000).toFixed(2)}Cr</span></td>
        `;
        body.appendChild(row);
    });
}

function renderAreaChart() {
    const ctx = document.getElementById('areaYieldChart');
    if(!ctx) return;
    const ctx2d = ctx.getContext('2d');
    if (charts.areaYield) charts.areaYield.destroy();

    const datasets = [{
        label: 'Area Analytics (Price vs Rent)',
        data: appData.areas.map(a => ({ x: a.perSqft, y: a.rent2bhk, label: a.name })),
        backgroundColor: '#D81B60', 
        pointRadius: 6,
        pointHoverRadius: 9
    }];

    charts.areaYield = new Chart(ctx2d, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.03)' }, title: { display: true, text: 'Average Property Price (₹ per sq.ft)', color: '#A3969A' } },
                y: { grid: { color: 'rgba(255,255,255,0.03)' }, title: { display: true, text: 'Average 2BHK Rent (₹ monthly)', color: '#A3969A' } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 12, 14, 0.95)',
                    titleColor: '#D81B60',
                    bodyColor: '#FFF5F7',
                    borderColor: 'rgba(216, 27, 96, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 15,
                    callbacks: {
                        label: (ctx) => `${ctx.raw.label} : Price ₹${ctx.raw.x.toLocaleString()}/sqft | Rent ₹${ctx.raw.y.toLocaleString()}/mo`
                    }
                }
            }
        }
    });
}

function getAreaColor(name) {
    const colorMap = {
        "Jagatpura": "#fbbf24", // Yellow
        "Malviya Nagar": "#10b981", // Green
        "Mansarovar": "#3b82f6", // Blue
        "C Scheme": "#ef4444", // Red
        "Pratap Nagar": "#f59e0b", // Orange
        "Sanganer": "#8b5cf6", // Purple
        "Vaishali Nagar": "#ec4899", // Pink
        "Raja Park": "#06b6d4", // Cyan
        "Adarsh Nagar": "#84cc16", // Lime
        "Shastri Nagar": "#f43f5e"  // Rose
    };
    
    if (colorMap[name]) return colorMap[name];
    
    // Cycle through neon palette for others
    const neonPalette = ["#a855f7", "#22d3ee", "#fb7185", "#34d399", "#fbbf24", "#818cf8", "#f472b6"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return neonPalette[Math.abs(hash) % neonPalette.length];
}

function renderAreaIntelMap() {
    if (areaIntelMap) {
        setTimeout(() => areaIntelMap.invalidateSize(), 150);
        return;
    }

    areaIntelMap = L.map('area-intel-map', {
        maxBounds: L.latLngBounds(L.latLng(26.40, 75.00), L.latLng(27.50, 76.50)),
        maxBoundsViscosity: 1.0
    }).setView([26.84, 75.80], 11); 

    // Normal Layer (Light/White theme)
    areaIntelLayers.normal = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 20
    });

    // Satellite Layer
    areaIntelLayers.satellite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: 'Map &copy; Google',
        maxZoom: 20
    });

    // Default to Normal View
    areaIntelLayers.normal.addTo(areaIntelMap);
    areaIntelLayers.current = 'normal';

    // Render Area Boundaries on the dedicated map
    appData.areas.forEach(area => {
        const areaColor = getAreaColor(area.name);
        const boundsStyle = {
            color: areaColor,
            weight: 2,
            fillColor: areaColor,
            fillOpacity: 0.15,
            dashArray: "5, 5"
        };

        let boundaryLayer;
        if (typeof areaPolygons !== 'undefined' && areaPolygons[area.name] && areaPolygons[area.name].geojson) {
            boundaryLayer = L.geoJSON(areaPolygons[area.name].geojson, { style: boundsStyle }).addTo(areaIntelMap);
        } else {
            boundaryLayer = L.circle([area.lat, area.lng], { radius: area.radius, ...boundsStyle }).addTo(areaIntelMap);
        }
        
        boundaryLayer.bindTooltip(`
            <div style="font-weight: 700; font-size: 0.9rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.8);">${area.name}</div>
        `, {
            permanent: true,
            direction: "center",
            className: "area-label-tooltip"
        });
        
        boundaryLayer.bindPopup(`
            <div style="font-family:'Outfit', sans-serif; min-width: 250px;">
                <h3 style="margin:0 0 10px 0; color:${areaColor}; font-size:1.4rem;">${area.name}</h3>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85rem;">
                    <div style="color:var(--text-muted)">Avg Price/SqFt:</div> <div style="font-weight:700; color:white;">₹${area.perSqft.toLocaleString()}</div>
                    <div style="color:var(--text-muted)">Avg 2BHK Rent:</div> <div style="font-weight:700; color:white;">₹${area.rent2bhk.toLocaleString()}/mo</div>
                    <div style="color:var(--text-muted)">SqYd Land Rate:</div> <div style="font-weight:700; color:white;">₹${area.sqydLand.toLocaleString()}</div>
                </div>
            </div>
        `);

        areaIntelBoundaries.push(boundaryLayer);
    });
}

function toggleAreaMapLayer() {
    if (!areaIntelMap) return;
    
    const btn = document.querySelector('[onclick="toggleAreaMapLayer()"]');
    
    if (areaIntelLayers.current === 'normal') {
        areaIntelMap.removeLayer(areaIntelLayers.normal);
        areaIntelLayers.satellite.addTo(areaIntelMap);
        areaIntelLayers.current = 'satellite';
        btn.textContent = "Switch to Map View";
    } else {
        areaIntelMap.removeLayer(areaIntelLayers.satellite);
        areaIntelLayers.normal.addTo(areaIntelMap);
        areaIntelLayers.current = 'normal';
        btn.textContent = "Switch to Satellite View";
    }
}

function renderAreaLists() {
    // Sort areas by price (sqydLand)
    const sortedExpensive = [...appData.areas].sort((a, b) => b.sqydLand - a.sqydLand).slice(0, 5);
    const sortedCheapest = [...appData.areas].sort((a, b) => a.sqydLand - b.sqydLand).slice(0, 5);
    
    const expensiveListEl = document.getElementById('expensive-areas-list');
    const affordableListEl = document.getElementById('affordable-areas-list');
    
    if (expensiveListEl) {
        expensiveListEl.innerHTML = sortedExpensive.map((area, idx) => `
            <div class="list-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; background: rgba(255,255,255,0.03); border-radius: 12px; border-left: 4px solid ${getAreaColor(area.name)}">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <span style="font-weight: 700; color: var(--text-muted); width: 20px;">#${idx + 1}</span>
                    <span style="font-weight: 600;">${area.name}</span>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 700; color: white;">₹${area.sqydLand.toLocaleString()}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">per sqyd</div>
                </div>
            </div>
        `).join('');
    }
    
    if (affordableListEl) {
        affordableListEl.innerHTML = sortedCheapest.map((area, idx) => `
            <div class="list-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; background: rgba(255,255,255,0.03); border-radius: 12px; border-left: 4px solid ${getAreaColor(area.name)}">
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <span style="font-weight: 700; color: var(--text-muted); width: 20px;">#${idx + 1}</span>
                    <span style="font-weight: 600;">${area.name}</span>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 700; color: white;">₹${area.sqydLand.toLocaleString()}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">per sqyd</div>
                </div>
            </div>
        `).join('');
    }
}

// Initial Sync
synthesizeData();
showPage('home');

// Export for global access
window.showPage = showPage;
window.filterTop200 = filterTop200;
window.filterMap = filterMap;
window.toggleAreaMapLayer = toggleAreaMapLayer;

// --- INTERACTIVE ENGINE: SCROLL REVEAL ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

function initScrollReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.unobserve(el);
        revealObserver.observe(el);
    });
}

// Re-init on page changes for dynamic content
const originalShowPage = window.showPage;
window.showPage = function(pageId) {
    originalShowPage(pageId);
    setTimeout(initScrollReveal, 100);
};

// Start observer
initScrollReveal();
