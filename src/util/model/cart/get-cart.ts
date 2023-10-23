import { Course } from '../course'

export interface GetCartRequest {}

export interface GetCartResponse {
  id: string
  studentId: any
  cartDetailList: GetCartDetail[]
}

export interface GetCartDetail {
  _id: any
  cartId: string
  courseId: Course
  createdAt: string
  updatedAt: string
}
