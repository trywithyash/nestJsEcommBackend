import { IsString, IsInt, Min } from 'class-validator';

export class UpdateStockDto {
  @IsString()
  productId: string;
  @IsInt()
  @Min(0)
  quantity: number;
}
