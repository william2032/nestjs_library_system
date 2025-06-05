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
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  /**
   * GET /books/:id
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.booksService.findOne(id);
  }

  /**
   * POST /books
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.create(createBookDto);
  }

  /**
   * PUT /books/:id - update existing book
   * @param id
   * @param updateBookDto
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Book {
    return this.booksService.update(id, updateBookDto);
  }

  /**
   * DELETE /books/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.booksService.remove(id);
  }
}
