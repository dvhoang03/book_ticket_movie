import { ApiProcessingResponse, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class TheaterDTO {
    @ApiProperty({ name: 'name', example: 'P01' })
    @IsString()
    name: string

    @ApiProperty({ name: 'cinemaId', example: '6814c3bcc81e00be4c556c67' })
    @IsInt()
    @IsNotEmpty()
    cinemaId: string
}