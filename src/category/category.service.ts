import { CourseService } from "../course/course.service.ts";
import { Category } from "../util/model/category";
import { CreateCategoryRequest, CreateCategoryResponse } from "../util/model/category/create-category";
import { GetCategoryCourseRequest, GetCategoryCourseResponse, HomeResponse } from "../util/model/category/get-category-course.ts";
import { CategoryRepository } from "./category.repository.ts";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  private courseService: CourseService;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.courseService = new CourseService();
  }

  public getCategoryById = async (id: string, page:number, pageSize:number) => {
    const category = (await this.categoryRepository.getCategoryById(
      id
    )) as unknown as Category;
    if (category == null) return [];

    const courses = await this.courseService.getCourseByCategoryId(id, page, pageSize);
    const total = await this.courseService.countCourse(id);

    const categoryResponse: GetCategoryCourseResponse =  {
      _id : category._id,
      name : category.name,
      course : courses,
      total : total,
    }

    return [categoryResponse];
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

  public home = async () => {
    const categories = await this.getCategory();
    const homeResponse: HomeResponse[] = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const course = await this.courseService.getCourseByCategoryId(categories[i]._id, 1, 5);
      const home : HomeResponse = {
        _id : category._id,
        name : category.name,
        course : course,
      }

      homeResponse.push(home);
    }

    return homeResponse;
  }


  
}
