import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.find(email)
    if (users.length > 0) {
      throw new BadRequestException('Email already in use')
    }
    // Has the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password togehter
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the salt and hash together
    const result = salt + '.' + hash.toString('hex');

    // Create the user
    const user = await this.userService.create(email, result);

    // Return the user
    return user;

  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('Invalid email')
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid password')
    }
    return user;
  }
}