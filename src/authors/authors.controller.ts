import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  /**
   * GET  /author
   */
  @Get()
  findAll(): Author[] {
    return this.authorsService.findAll();
  }

  /**
   * GET /author/:id
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string): Author {
    return this.authorsService.findOne(id);
  }

  /**
   * POST  /author
   * @param createAuthorDto
   */
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Author {
    return this.authorsService.create(createAuthorDto);
  }

  /**
   * PUT /author/:id  update author
   * @param id
   * @param updateAuthorDto
   * @Body
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Author {
    return this.authorsService.update(id, updateAuthorDto);
  }

  /**
   * DELETE
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.authorsService.remove(id);
  }
}
