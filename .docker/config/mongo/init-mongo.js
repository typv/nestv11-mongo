// Switch to the target database
db = db.getSiblingDB(process.env.MONGODB_DATABASE || "crane");

// Create the database user
db.createCollection("users");