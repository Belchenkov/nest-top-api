import { Injectable } from '@nestjs/common';
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { genSaltSync, hashSync } from "bcryptjs";

import { AuthDto } from "./dto/auth.dto";
import { UserModel } from "./user.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
  ) {
  }

  async createUser(dto: AuthDto) {
    const { login, password } = dto;
    const salt = genSaltSync(10);

    const newUser = new this.userModel({
      email: login,
      passwordHash: hashSync(password, salt)
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}