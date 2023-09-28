import { Category } from "../util/model/category";
import { CreateCategoryRequest } from "../util/model/category/create-category";
import { CategoryRepository } from "./category.repository";

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
    const createdCategory = (await this.categoryRepository.createCategory(createRequest.name)) as unknown as Category
    if (createdCategory === null) return []
    return [createdCategory]
  }
}
