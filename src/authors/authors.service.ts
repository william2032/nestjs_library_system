import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    {
      id: '1',
      name: 'William Max',
    },
    {
      id: '2',
      name: 'Goodman Saul',
    },
  ];

  // Get all authors
  findAll(): Author[] {
    return this.authors;
  }

  // Get a single author by ID
  findOne(id: string): Author {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  // Create a new author
  create(createAuthorDto: CreateAuthorDto): Author {
    const newAuthor: Author = {
      id: uuidv4(),
      ...createAuthorDto,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  // Update an existing author
  update(id: string, updateAuthorDto: UpdateAuthorDto): Author {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...updateAuthorDto,
    };
    return this.authors[authorIndex];
  }

  // Delete an author
  remove(id: string): void {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(authorIndex, 1);
  }
}
