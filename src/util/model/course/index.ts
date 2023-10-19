export interface Course {
  _id: any;
  lectureId: number;
  title: string;
  rating: number;
  description: string;
  price: number;
  discountPercent: number;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  outcome: string;
  courseStatus: number;
  totalLesson: number;
  level: number;
  categoryId: number;
}
