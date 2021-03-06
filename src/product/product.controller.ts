import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Delete, HttpCode
} from '@nestjs/common';

import { ProductModel } from "./product.model";
import {FindProductDto} from "./dto/find-product.dto";

@Controller('product')
export class ProductController {

    @Post('create')
    async create(@Body() dto: Omit<ProductModel, '_id'>) {

    }

    @Get(':id')
    async get(@Param('id') id: string) {

    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: ProductModel) {

    }

    @Delete(':id')
    async delete() {

    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindProductDto) {

    }
}
