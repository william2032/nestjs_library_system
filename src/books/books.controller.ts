import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dtos/create-book.dtos';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Get /books
   */
  @Get()
  findAll(): [] {
    return this.booksService.findAll();
  }

  /**
   * GET /book/:id
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Book {
    return this.booksService.findOne(id);
  }

  /**
   * POST /books
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  /**
   * Put /books -create new book
   * @param id
   * @param updateBookDto
   * @Body
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Book {
    return this.booksService.update(id, updateBookDto);
  }

  /**
   * DELETE /books/id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.booksService.remove(id);
  }
}
