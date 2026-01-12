import { BadRequestException, Controller, Get, Post } from '@nestjs/common';

@Controller('classroom')
export class ClassroomController {
  @Get()
  findAll() {
    throw new BadRequestException('잘못된 요청입니다.');
  }

  @Post()
  create() {
    throw new BadRequestException('잘못된 요청입니다.');
  }
}
