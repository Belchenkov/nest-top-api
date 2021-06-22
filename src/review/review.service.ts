import { Injectable } from "@nestjs/common";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";

import { ReviewModel } from "./review.model";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>
  ) {  }

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({ productId: Types.ObjectId(productId) }).exec();
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async deleteByProductId(productId: string): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    return this.reviewModel.deleteMany({ productId: Types.ObjectId(productId) }).exec();
  }
}
