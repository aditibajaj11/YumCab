const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://bajajaditi1122:radhey11@cluster0.uggjlrq.mongodb.net/yumcabmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
   try {
       await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

       console.log("Connected to MongoDB");

       const fetched_data = await mongoose.connection.db.collection("food_items");
       const data = await fetched_data.find({}).toArray();

       const foodCategory = await mongoose.connection.db.collection("food_Category");
       const catdata = await foodCategory.find({}).toArray();

       global.food_items = data;
       global.foodCategory = catdata;
   } catch (err) {
       console.error("Error connecting to MongoDB:", err);
   }
};

module.exports = mongoDB;