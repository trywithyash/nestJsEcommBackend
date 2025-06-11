import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddtoCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
