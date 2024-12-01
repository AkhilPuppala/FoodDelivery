const mongoose = require('mongoose');
// 5TsC7VLXXJ7ahjjI
const mongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://AkhilPuppala:5TsC7VLXXJ7ahjjI@cluster0.e6z5o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("foodData");
    const data = await fetched_data.find({}).toArray();
    global.food_items = data;
    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const cat_data = await foodCategory.find({}).toArray();
    global.foodCategory = cat_data;
    
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
};

module.exports = mongoDB;
