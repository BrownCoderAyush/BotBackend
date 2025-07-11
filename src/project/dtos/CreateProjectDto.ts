import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateClientDto } from "../../client/dtos/createClientDtos";


export class CreateProjectDto {
  @IsNotEmpty()
  name!: string;

  @ValidateNested()
  @Type(() => CreateClientDto)
  client!: CreateClientDto;
} 
