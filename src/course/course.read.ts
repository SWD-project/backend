const { CourseModel } = require("./course.entity"); // Đảm bảo đường dẫn đúng đến course.entity.ts

// Tạo một đối tượng mới dựa trên schema
const newCourse = new CourseModel({
  lectureId: "5fbb50ae94c97027f8c55e4a", // ID của người dạy khóa học (User)
  title: "Khóa học về Mongoose và MongoDB",
  rating: 4.5,
  description: "Học cách sử dụng Mongoose để làm việc với MongoDB",
  price: 29.99,
  discountPercent: 10,
  thumbnailUrl: "https://example.com/thumbnail.jpg",
  outcome: "Học cách xây dựng ứng dụng sử dụng MongoDB và Mongoose",
  courseStatusId: "5fbb50ae94c97027f8c55e4b", // ID của trạng thái khóa học (CourseStatus)
  totalLesson: 12,
  level: 2,
  categoryId: "5fbb50ae94c97027f8c55e4c",
});
