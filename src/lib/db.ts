import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(isDbConnected());
    if (!isDbConnected()) await mongoose.connect(process.env.MONGODB_URI!, {});
  } catch (error) {
    console.error(error);
  }
};

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

export { connectDB, isDbConnected };
