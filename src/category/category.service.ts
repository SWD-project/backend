import { Category } from "../util/model/category";
import { CreateCategoryRequest, CreateCategoryResponse } from "../util/model/category/create-category";
import { CategoryRepository } from "./category.repository.ts";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  public getCategoryById = async (id: string) => {
    const category = (await this.categoryRepository.getCategory(
      id
    )) as unknown as Category;
    if (category == null) return [];
    return [category];
  };

  public createCategory = async (createRequest : CreateCategoryRequest) => {
    const category = await this.categoryRepository.getCategoryByName(createRequest.name);
    if (category) {
      throw new Error("Category name is existed!");
    }

    const createdCategory = (await this.categoryRepository.createCategory(createRequest.name)) as unknown as Category
    if (createdCategory === null) return []
    return [createdCategory]
  }

  public getCategory = async () => {
    const categories = await this.categoryRepository.getCategory() as unknown as Category[];
    return categories;
  }

  public deleteCategory = async (name : string) => {
    const category = await this.categoryRepository.getCategoryByName(name);
    if (!category) {
      throw new Error("Category name is not existed!");
    }

    const deleteResult = await this.categoryRepository.deleteCategoryByName(name);
    if (deleteResult.deletedCount === 0) {
      throw new Error("Delete category fail");
    }
    
    return true;
  }
}
