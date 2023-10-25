export interface UpdateCourseRequest {
    _id: any;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  thumbnailUrl: string;
  outcome: string;
  totalLesson: number;
  level: number;
  categoryId: string;
}

export interface UpdateCourseResponse {
    
}