import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateClientDto } from "../../client/dtos/createClientDtos";

export enum NodeType {
    USER = 'user',
    BOT = 'bot'
}


export class CreateNodeDto {
    @IsNotEmpty()
    content!: string;

    @IsNotEmpty()
    type!: NodeType;

    @IsNotEmpty()
    @IsString() 
    projectId!: string;

    
    @IsNotEmpty()
    x!: number;

} 