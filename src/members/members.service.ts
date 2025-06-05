import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './interfaces/member.interface';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MembersService {
  private members: Member[] = [
    {
      id: uuidv4(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      borrowedBooks: [],
    },
    {
      id: uuidv4(),
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      borrowedBooks: [],
    },
  ];

  // Get all members
  findAll(): Member[] {
    return this.members;
  }

  // Get a single member by ID
  findOne(id: string): Member {
    const member = this.members.find((member) => member.id === id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  // Create a new member
  create(createMemberDto: CreateMemberDto): Member {
    const newMember: Member = {
      id: uuidv4(),
      ...createMemberDto,
      borrowedBooks: [], // Initialize with empty borrowed books
    };
    this.members.push(newMember);
    return newMember;
  }

  // Update an existing member
  update(id: string, updateMemberDto: UpdateMemberDto): Member {
    const memberIndex = this.members.findIndex((member) => member.id === id);
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    this.members[memberIndex] = {
      ...this.members[memberIndex],
      ...updateMemberDto,
    };
    return this.members[memberIndex];
  }

  // Delete a member
  remove(id: string): void {
    const memberIndex = this.members.findIndex((member) => member.id === id);
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    this.members.splice(memberIndex, 1);
  }
}
