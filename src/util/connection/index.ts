import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb://atlas-sql-6507bb265506401a84ab069e-jmazi.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin");
    console.log("Đã kết nối tới MongoDB");
  } catch (error) {
    console.error("Lỗi kết nối tới MongoDB:", error);
  }
};

export default connectDB;

