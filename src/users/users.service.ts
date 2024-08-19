import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  async create(email: string, password: string) {
    const checkEmail = await this.repo.findOne({ where: { email } })
    if (checkEmail) {
      throw new BadRequestException('Email already exists');
    }
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    console.log(user, id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.repo.remove(user);
  }

  async getAll(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async getUserOne(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

