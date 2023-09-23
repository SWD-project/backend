import { CategoryModel } from "./category.entity.ts";

export class CategoryRepository {
  public getCategory = (id?: string) => {
    if (id) {
      return CategoryModel.findById(id);
    } else {
      return CategoryModel.find();
    }
  };
}
