import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb+srv://kiet:7cGve6RyNYhycCIx@cluster0.zltx294.mongodb.net/sdn");
    console.log("Đã kết nối tới MongoDB");
  } catch (error) {
    console.error("Lỗi kết nối tới MongoDB:", error);
  }
};

export default connectDB;

 