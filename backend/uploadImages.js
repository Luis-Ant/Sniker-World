const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// Database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'ecommerce_sneakers',
  port: process.env.DB_PORT || 5432,
});

// Map image filenames to sneaker models
const sneakerImageMap = {
  'Air Max 90': 'AirMax90.jpg',
  'Air Force 1': 'AirForce1.jpg',
  'React Infinity': 'ReactInfinity.jpg',
  'Zoom Pegasus 38': 'ZoomPegasus38.jpg',
  'Air Jordan 1': 'AirJordan1.jpg',
  'Vaporfly Next%': 'VaporflyNext.jpg',
  'Free RN 5.0': 'FreeRN50.jpg',
  'Blazer Mid 77': 'BlazerMid77.jpg',
  'Ultraboost 21': 'Ultraboost21.jpg',
  'Stan Smith': 'StanSmith.jpg',
  'Yeezy Boost 350': 'YeezyBoost350.jpg',
  'NMD R1': 'NMDR1.jpg',
  'Superstar': 'Superstar.jpg',
  'Forum Low': 'ForumLow.jpg',
  'Pureboost Go': 'PureboostGo.jpg',
  'Ozweego': 'Ozweego.jpg',
  'Fresh Foam 1080': 'FreshFoam1080.jpg',
  '574 Core': '574Core.jpg',
  '990v5': '990v5.jpg',
  'FuelCell Rebel': 'FuelCellRebel.jpg',
  'Fresh Foam Hierro': 'FreshFoamHierro.jpg',
  '997H': '997H.jpg',
  'Minimus 10': 'Minimus10.jpg',
  'XC-72': 'XC-72.jpg',
  'Classic Leather': 'ClassicLeather.jpg',
  'Nano X2': 'NanoX2.jpg',
  'Zig Kinetica': 'ZigKinetica.jpg',
  'Club C 85': 'ClubC85.jpg',
  'Floatride Energy': 'FloatrideEnergy.jpg',
  'DMX Comfort': 'DMXComfort.jpg',
  'Legacy Lifter': 'LegacyLifter.jpg',
  'Freestyle Hi': 'FreestyleHi.jpg',
  'Suede Classic': 'SuedeClassic.jpg',
  'Clyde Hardwood': 'ClydeHardwood.jpg',
  'RS-X3': 'RS-X3.jpg',
  'Future Rider': 'FutureRider.jpg',
};

// Function to upload images
async function uploadImages() {
  // Path to the images folder in the frontend directory
  const imagesFolder = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'images');

  try {
    // Get list of files in the images folder
    const files = await fs.readdir(imagesFolder);

    // Connect to the database
    const client = await pool.connect();

    // Iterate over each sneaker model
    for (const [modelo_snkr, imageFileName] of Object.entries(sneakerImageMap)) {
      if (files.includes(imageFileName)) {
        // Read the image file
        const imagePath = path.join(imagesFolder, imageFileName);
        const imageData = await fs.readFile(imagePath);

        // Update the sneaker record with the image
        const query = `
          UPDATE sneakers
          SET imagen_snkr = $1
          WHERE modelo_snkr = $2
        `;
        await client.query(query, [imageData, modelo_snkr]);
        console.log(`Uploaded image for ${modelo_snkr}`);
      } else {
        console.warn(`Image file ${imageFileName} not found for ${modelo_snkr}`);
      }
    }

    // Release the database connection
    client.release();
    console.log('Image upload completed.');
  } catch (err) {
    console.error('Error uploading images:', err.stack);
  } finally {
    await pool.end();
  }
}

// Run the upload function
uploadImages();