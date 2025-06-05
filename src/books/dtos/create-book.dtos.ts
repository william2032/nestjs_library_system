export class CreateBookDto {
  id: string;
  title: string;
  authorId: string;
  publicationYear: number;
  genre: string;
  availableCopies: number;
}
