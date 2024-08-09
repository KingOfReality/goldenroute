# goldenroute
Certainly! Below are step-by-step instructions for your site, structured as you requested:

---

### 1. Enter the Site
- Upon entering the site, you'll see a **map of the world** with **100 random planes** displayed in real-time. These planes are fetched using the **OpenSky API**.

### 2. Locate the Input Fields
- You’ll find three input fields on the site:
  1. **Coordinates (Lat, Long)**: Enter the latitude and longitude in the format `example: (1.1, 2.2)`.
  2. **Speed**: Enter the speed in km/h (as a float).
  3. **Radius**: Enter the radius in km (as a float).

### 3. Define the Threat Zone
- After filling out the inputs, the site will:
  - Draw a **red circle** on the map representing the threat zone based on the radius and coordinates you provided.
  - Add a marker to indicate the location of the plane considered under threat.

### 4. Check for Danger
- The site will automatically check if any planes are within the defined radius.
  - **No Planes in Radius**: A toast message will appear stating "No danger".
  - **Planes in Radius**: A card will open displaying all the details of the plane(s) within the radius, indicating a potential threat.

### 5. Threat Card Actions
- The card that appears provides two options:
  1. **Save Button**: Saves all the threat information to the database.
  2. **Exit Button**: Closes the card without saving any information.

### 6. Alert of Closing Time
- A red rectangle will pop up displaying the current time. This is a visual alert to indicate the closing time of the site.

### 7. View Saved Operations
- In the top bar, click the **"Get Operations"** button:
  - A modal window will open showing all the operations (threats) you have saved.
  - You can:
    - **Search** for specific data by entering a subject or keyword.
    - **Sort by Column** by clicking the column header to organize the information.

### 8. Learn More About the Site
- In the top bar, click the "Info" button:
  - A modal window will open explaining how the site works and providing additional information about the features and functionalities.

---

