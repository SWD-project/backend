import { CategoryModel } from "./category.entity.ts";

export class CategoryRepository {
  public getCategory = async (id?: string) => {
    if (id) {
      return await CategoryModel.findById(id);
    } else {
      return await CategoryModel.find();
    }
  };

  public createCategory = async (name: string) => {
    const createdCategory = await CategoryModel.create({
      name,
    });
    return createdCategory;
  };

  public getCategoryByName = async (nameToFind: string) => {
    const category = await CategoryModel.findOne({ name: nameToFind });
    return category;
  };

  public deleteCategoryByName = async (nameToDelete: string) => {
    const deletionResult = await CategoryModel.deleteOne({
      name: nameToDelete,
    });
    return deletionResult;
  };
}
