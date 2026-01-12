import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  major: string;
}

@Injectable()
export class BoardService {
  private boards: Board[] = [
    {
      id: 1,
      title: '게시물 1',
      content: '게시물 1 내용',
      author: '작성자 1',
      major: '컴퓨터공학과',
    },
    {
      id: 2,
      title: '게시물 2',
      content: '게시물 1 내용',
      author: '작성자 2',
      major: '컴퓨터공학과',
    },
    {
      id: 3,
      title: '게시물 3',
      content: '게시물 3 내용',
      author: '작성자 3',
      major: '컴퓨터공학과',
    },
  ];

  findAll(): Board[] {
    return this.boards;
  }

  findOne(id: number): Board {
    const board = this.boards.find((board) => board.id === id);
    if (!board) {
      throw new NotFoundException(`게시물을 찾을 수 없습니다. ID: ${id}`);
    }
    return board;
  }

  create(payload: CreatePostDto) {
    const newBoard = {
      id: this.generateId(),
      ...payload,
    };
    this.boards.push(newBoard);

    return newBoard;
  }

  update(id: number, payload: CreatePostDto) {
    const boardIndex = this.boards.findIndex((board) => board.id === id);

    if (boardIndex === -1) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 게시글을 찾을 수 없습니다.`,
      );
    }
    this.boards[boardIndex] = { ...this.boards[boardIndex], ...payload };

    return this.boards[boardIndex];
  }

  delete(id: number) {
    const boardIndex = this.boards.findIndex((board) => board.id === id);

    if (boardIndex === -1) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 게시글을 찾을 수 없습니다.`,
      );
    }
    this.boards.splice(boardIndex, 1);

    return this.boards;
  }

  generateId() {
    return this.boards.length === 0
      ? 1
      : Math.max(...this.boards.map((board) => board.id)) + 1;
  }
}
