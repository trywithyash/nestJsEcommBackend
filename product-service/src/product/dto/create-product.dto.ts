import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
