import { CategoryModel } from "./category.entity.ts";

export class CategoryRepository {
  public getCategory = (id?: string) => {
    if (id) {
      return CategoryModel.findById(id);
    } else {
      return CategoryModel.find();
    }
  };
  public createCategory = async (name: string) => {
    const createdCategory = await CategoryModel.create({
      name,
    });
    return createdCategory;
  };
}
