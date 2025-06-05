import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, CreateBookDto } from './dtos/create-book.dtos';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: uuidv4(),
      title: 'The Great Leader',
      authorId: '1',
      publicationYear: 1999,
      genre: 'Politics',
      availableCopies: 20,
    },
    {
      id: uuidv4(),
      title: 'Shoe Dog',
      authorId: '2',
      publicationYear: 2009,
      genre: 'Business',
      availableCopies: 50,
    },
    {
      id: uuidv4(),
      title: 'Atomic Habits',
      authorId: '3',
      publicationYear: 2019,
      genre: 'Lifestyle',
      availableCopies: 20,
    },
  ];

  //get all books
  findAll(): Book[] {
    return this.books;
  }

  //get a book by Id
  findOne(id: string): Book {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book with ID ${id} not found');
    }
    return book;
  }

  //create a new book
  create(creatBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: uuidv4(),
      ...creatBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  //update a book
  update(id: string, updateBookDto: UpdateBookDto): Book {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books[bookIndex] = { ...this.books[bookIndex], ...updateBookDto }; //update book properties
    return this.books[bookIndex];
  }

  //delete  a book
  remove(id: string): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
  }
}
