import { Controller, Post, Body, Put, Param, Get, Query, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) { }
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  // @Put('/update/:id')
  // updateUser(@Body() body: UpdateUserDto, @Param('id') id: number) {
  //   this.usersService.update(id, body);
  // }

  @Patch('/update/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    this.usersService.update(parseInt(id), body);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    this.usersService.remove(parseInt(id));
  }

  @Get()
  getAll(@Query('email') email: string) {
    return this.usersService.getAll(email);
  }

  @Get('/:id')
  getUserOne(@Param('id') id: number) {
    return this.usersService.getUserOne(id);
  }
}
