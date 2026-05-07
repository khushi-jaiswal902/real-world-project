const mongoose = require('mongoose');

// Connect directly to the DB to wipe it and fix the ID collisions
async function fixDatabase() {
  try {
    // The connection string from your .env
    await mongoose.connect('mongodb+srv://Shrisai:Akanksha123@cluster0.h79g5.mongodb.net/e-commerce');
    console.log("Connected to DB");
    
    // Wipe all products to clear the corrupted state
    const result = await mongoose.connection.collection('products').deleteMany({});
    console.log(`Deleted ${result.deletedCount} products from the database to clear ID collisions.`);

  } catch (err) {
    console.error("Error fixing database:", err);
  } finally {
    mongoose.disconnect();
  }
}

fixDatabase();
