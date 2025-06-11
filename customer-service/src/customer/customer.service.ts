import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './customer.schema';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>,
  ) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    return this.customerModel.create(dto);
  }
  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().lean();
  }

  async findById(id: string): Promise<Customer | null> {
    return this.customerModel.findById(id).lean();
  }
}
