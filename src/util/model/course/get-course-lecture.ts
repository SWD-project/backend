export interface GetCourseByLectureRequest {
  page : number;
  limit : number;
}

export interface GetCourseByLectureResponse {
    _id: any;
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
  categoryId: string;
  lectureId: string;
  totalEnrolled: number;
  totalMoney : number;
}