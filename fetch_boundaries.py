import urllib.request
import urllib.parse
import json
import time
import os

areas = [
        "Malviya Nagar", "Jagatpura", "Pratap Nagar", "Sanganer", "Durgapura", "Raja Park", "Adarsh Nagar", 
        "Gopal Pura Mode", "Mansarovar", "Manyawas", "Khatipura", "Vaishali Nagar", "Lalkothi", "Sindhi Camp", 
        "Shastri Nagar", "Vidyadhar Nagar", "Ambabari", "Military Containment", "Bais Godam", "Vishwakarma Industrial Area", 
        "Bhankrota", "Muhana", "Sitapura", "Theekariya", "Jhai", "Kalwara", "Bagru", "Sanjharia", "Bindayaka", 
        "Kanakpura", "Gokulpura", "Nangal Jaisabohra", "Dadi Ka Phatak", "Boytawala", "Jaisinghpura Khor", "Paldi Meena", 
        "Sumel", "Jaijaspura", "Chirota", "Bagru Khurd", "Dahmi Kalan", "Neemera", "Bhakrota", "Narayan Vihar", "Dholai", 
        "Narayan Sagar A", "Lalarpura", "Panchyawala", "Hanuman Nagar", "C Scheme", "Bambala", "Chokhi Dhani", 
        "Prahladpura", "Beelwa", "Ratalya", "Shri Kishanpura", "Jhotwara", "Murlipura"
]

headers = {
    'User-Agent': 'JaipurPropAIDataFetcher/1.0 (dhruv123meena@gmail.com)'
}

results = {}
print(f"Fetching {len(areas)} areas using urllib...")

for area in areas:
    query = f"{area}, Jaipur, Rajasthan"
    url = f"https://nominatim.openstreetmap.org/search?q={urllib.parse.quote(query)}&format=json&polygon_geojson=1&limit=1"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        if len(data) > 0:
            item = data[0]
            geojson = item.get('geojson')
            # Fallback for when Nominatim doesn't have a polygon, just a point. We build a small box.
            if not geojson or geojson['type'] == 'Point':
                lat = float(item['lat'])
                lon = float(item['lon'])
                d = 0.015 # rough ~1.5km box
                geojson = {
                    "type": "Polygon",
                    "coordinates": [[
                        [lon-d, lat-d], [lon+d, lat-d], [lon+d, lat+d], [lon-d, lat+d], [lon-d, lat-d]
                    ]]
                }
            
            results[area] = {
                "name": area,
                "lat": float(item['lat']),
                "lng": float(item['lon']),
                "geojson": geojson,
                "boundingbox": item.get('boundingbox')
            }
            print(f"Success: {area}")
        else:
            print(f"Failed to find: {area}")
            # Generate a completely synthetic fallback if not found at all
            results[area] = {
                "name": area,
                "lat": 26.9124,
                "lng": 75.7873,
                "geojson": {
                    "type": "Polygon",
                    "coordinates": [[[75.77, 26.90], [75.79, 26.90], [75.79, 26.92], [75.77, 26.92], [75.77, 26.90]]]
                }
            }
    except Exception as e:
        print(f"Error on {area}: {e}")
    
    # Nominatim requires 1s sleep
    time.sleep(1.2)

# Write to JS file
js_content = f"const areaPolygons = {json.dumps(results, indent=2)};\n"
with open('c:\\Users\\hp\\Desktop\\Land_Value\\areas_geojson.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Finished writing areas_geojson.js!")
