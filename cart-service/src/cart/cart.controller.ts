import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddtoCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() dto: AddtoCartDto) {
    return this.cartService.addToCart(dto);
  }

  @Get('user/:userId')
  async getCart(@Param('userId') userId: string) {
    const cart = await this.cartService.getCart(userId);
    if (!cart) {
      throw new NotFoundException(`Cart for user ${userId} not found`);
    }
    return cart;
  }
}
