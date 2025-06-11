import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateStockDto } from './dto/update-stock.dto';
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAll() {
    return this.inventoryService.getAll();
  }
  @Get(':productId')
  async getOne(@Param('productId') productId: string) {
    const item = await this.inventoryService.getByProductId(productId);
    if (!item) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return item;
  }

  @Post()
  updateStock(@Body() dto: UpdateStockDto) {
    return this.inventoryService.updateStock(dto);
  }
}
