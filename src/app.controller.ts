import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('users') // http://localhost:3000/users
export class AppController {
  @Post()
  create(@Body() body: { email: string; password: string }) {
    return `새로운 사용자 생성: ${body.email}`;
  }

  @Get()
  findall(@Query('page') page?: number) {
    const currentPage = page || 1;
    return `모든 사용자 조회 (현재 페이지: ${currentPage})`;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `사용자 조회 (ID: ${id})`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return `사용자 ID ${id} 수정 -> 이용: ${body.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `사용자 삭제 (ID: ${id})`;
  }
}
