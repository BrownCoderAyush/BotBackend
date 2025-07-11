import { IsNotEmpty } from "class-validator"


export class SubmitProjectDto {
  @IsNotEmpty()
  clientEmail!: string

  @IsNotEmpty()
  clientName!: string 

  @IsNotEmpty()
  nodes!: any[]

  flowData!: any

  @IsNotEmpty()
  edges!: any[]

  @IsNotEmpty()
  projectName!: string
}