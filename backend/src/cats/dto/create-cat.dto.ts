// src/cats/dto/create-cat.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ example: 'Tommy' }) 
  name: string;

  @ApiProperty({ example: 3 }) 
  age: number;
}