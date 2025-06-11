import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory, InventoryDocument } from './inventory.schema';
import { Model } from 'mongoose';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>,
  ) {}

  async getAll() {
    return this.inventoryModel.find().lean().exec();
  }

  async getByProductId(productId: string) {
    return this.inventoryModel.findOne({ productId }).lean().exec();
  }

  async updateStock(dto: UpdateStockDto) {
    const { productId, quantity } = dto;
    const existing = await this.inventoryModel.findOne({ productId });

    if (existing) {
      existing.stock = quantity;
      return existing.save();
    }

    return this.inventoryModel.create({ productId, stock: quantity });
  }
}
