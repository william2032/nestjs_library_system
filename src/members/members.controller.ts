import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Member } from './interfaces/member.interface';
import { CreateMemberDto } from './dtos/create-member.dto';
import { MembersService } from './members.service';
import { UpdateMemberDto } from './dtos/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  /**
   * GET all members
   */
  @Get()
  findAll(): Member[] {
    return this.memberService.findAll();
  }

  /**
   * Get a member by id
   * @param id
   *
   */
  @Get(':id')
  findOne(@Param('id') id: string): Member {
    return this.memberService.findOne(id);
  }

  /**
   * Post create new member
   */
  @Post()
  create(@Body() createMemberDto: CreateMemberDto): Member {
    return this.memberService.create(createMemberDto);
  }

  /**
   * PUT update member
   * @param id
   * @param updateMemberDto
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Member {
    return this.memberService.update(id, updateMemberDto);
  }

  /**
   * DELETE member
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.memberService.remove(id);
  }
}
