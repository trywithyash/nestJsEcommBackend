import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './cart.schema';
import { Model } from 'mongoose';
import { AddtoCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async addToCart(dto: AddtoCartDto): Promise<Cart> {
    const { userId, productId, quantity } = dto;
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = await this.cartModel.create({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const item = cart.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    return cart;
  }

  async getCart(userId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ userId }).lean().exec();
  }
}
