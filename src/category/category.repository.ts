import { CategoryModel } from "./category.entity.ts";


export class CategoryRepository {
  public getCategory = (id?: string) => {
    if (id) {
      return CategoryModel.findById(id).then((category) => (category ? [category] : []));
    } else {
      return CategoryModel.find().exec();
    }
  };

  public createCategory = async (name: string) => {
    try {
      const createdCategory = await CategoryModel.create({
        name,
      });
      return createdCategory;
    } catch (error: any) {
      console.log(error);
      throw new Error("Lỗi khi tạo category: " + error.message);
    }
  };

  public getCategoryByName = async (nameToFind: string) => {
    const category = await CategoryModel.findOne({name: nameToFind})
    return category;
  }

  public deleteCategoryByName = async (nameToDelete: string) => {
    const deletionResult = await CategoryModel.deleteOne({name: nameToDelete})
    return deletionResult;
  }


}
