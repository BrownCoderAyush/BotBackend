import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;
}