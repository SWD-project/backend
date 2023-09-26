export interface CreateCourse {
  _id: any;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  thumbnailUrl: string;
  createAt: string;
  updateAt: string;
  outcome: string;
  courseStatusId: number;
  totalLesson: number;
  level: number;
  categoryId: number;
}
