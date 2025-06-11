import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop([
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ])
  items: { productId: string; quantity: number }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
