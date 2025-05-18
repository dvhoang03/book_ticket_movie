import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CinemaDTO {
    @ApiProperty({ name: 'name', example: 'beta hà đông' })
    @IsString()
    name: string

    @ApiProperty({ name: 'address', example: 'km10 nguyễn traaix hà đông hà nội' })
    @IsString()
    address: string
}