// src/cats/cats.controller.ts (updated)
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCatDto } from './dto/create-cat.dto';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  @Post()
  @ApiOperation({ summary: 'Create a cat' })
  @ApiResponse({ status: 201, description: 'The cat has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCatDto: CreateCatDto) {
    return `This action adds a new cat named ${createCatDto.name} aged ${createCatDto.age}`;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiResponse({ status: 200, description: 'The cat has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  findOne(@Param('id') id: string) {
    return `This action returns a cat with ID ${id}`;
  }
}