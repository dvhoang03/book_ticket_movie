import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CustomerDTO {

    @ApiProperty({ name: 'name', required: true, example: 'hoang' })
    @IsString()
    name: string

    @ApiProperty({ name: 'email', required: true, example: 'duongviethoang240803@gmail.com' })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ name: 'phone', required: true, example: '1234125361' })
    @IsString()
    phone: string
}