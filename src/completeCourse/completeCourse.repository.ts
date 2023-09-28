import { CompleteCourseModel } from "./completeCourse.entity"

export class CompleteCourseRepository {
    public getCompleteCourse = (id?: string) => {
        if(id) {
            return CompleteCourseModel.findById(id);
        }else{
            return CompleteCourseModel.find();
        }
    };
}