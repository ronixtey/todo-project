import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guards';
import { CreateUserDto } from './users/dto/create-user.tdo';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({ description: 'User login and get jwt token' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Get profile'})
  @ApiUnauthorizedResponse({description: 'Invalid JWT token'})
  @ApiHeader({name: 'Token', description: 'JWT Token'})
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }
}