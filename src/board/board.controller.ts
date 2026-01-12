import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  major: string;
}

@Controller('board')
export class BoardController {
  // 구문 분석
  // - constructor(...): 클래스가 생성될 때 실행되는 생성자
  // - private: 매개변수로 받은 값을 클래스 내부의 private 필드로 자동 선언
  // - readonly: 이후에 이 속성을 수정할 수 없도록(읽기 전용)
  // - boardService: 실제 주입받을 객체의 이름(이름은 자유롭게 작성할 수 있지만, 일반적으로 클래스명 기반으로 작성)
  // - BoardService: 주입받을 서비스의 타입(nestjs가 타입을 보고 인스턴스를 찾아 주입)
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll(): Board[] {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Board {
    return this.boardService.findOne(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe()) //해당 핸들러의 파이프 적용을 한다.
  create(@Body() data: CreatePostDto) {
    // 이곳에 도달했다면 유효성 검사를 통과한 상태임이 보장된다.
    return this.boardService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ): Board {
    return this.boardService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Board[] {
    return this.boardService.delete(id);
  }
}
