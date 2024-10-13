import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { S3Service } from "../s3/s3.service";
import { toBoolean, isBoolean } from "src/common/utility/function.util";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    private s3Service: S3Service
  ) {}

  // async create(
  //   createCategoryDto: CreateCategoryDto,
  //   image: Express.Multer.File
  // ) {
  //   const { Location } = await this.s3Service.uploadFile(
  //     image,
  //     "snappfood-image"
  //   );
  //   let { title, show, slug, parentId } = createCategoryDto;
  //   const category = await this.findOneBySlug(slug);
  //   if (category) throw new ConflictException("Already Exist Category");
  //   if (isBoolean(show)) {
  //     show = toBoolean(show);
  //   }
  //   await this.categoryRepo.insert({
  //     title,
  //     slug,
  //     show,
  //     image: Location,
  //   });

  //   return {
  //     message: "Created Category Successfully.",
  //   };
  // }

  async create(
    createCategoryDto: CreateCategoryDto,
    image: Express.Multer.File
  ) {
    const { Location } = await this.s3Service.uploadFile(
      image,
      "snappfood-image"
    );
    let { title, show, slug, parentId } = createCategoryDto;
    const category = await this.findOneBySlug(slug);
    if (category) throw new ConflictException("Already Exist Category");
    if (isBoolean(show)) {
      show = toBoolean(show);
    }
    await this.categoryRepo.insert({
      title,
      slug,
      show,
      image: Location,
    });

    return {
      message: "Created Category Successfully.",
    };
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async findOneBySlug(slug: string) {
    return await this.categoryRepo.findOneBy({ slug });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
