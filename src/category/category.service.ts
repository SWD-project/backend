import { Category } from "../util/model/category";
import { CategoryRepository } from "./category.repository";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  async getCategoryById(id: string) {
    const category = (await this.categoryRepository.getCategory(
      id
    )) as unknown as Category;
    if (category == null) return [];
    return [category];
  }
}
