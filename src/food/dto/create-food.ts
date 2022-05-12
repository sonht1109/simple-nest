import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  minAge: number;
}
