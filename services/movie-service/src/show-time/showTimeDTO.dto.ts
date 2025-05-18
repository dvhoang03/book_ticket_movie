import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ShowTimeDTO {
    @ApiProperty({ name: 'movieId', example: '14214n412n4n14n1' })
    @IsString()
    movieId: string

    @ApiProperty({ name: 'theaterId', example: '14214n412n4n14n1' })
    @IsString()
    theaterid: string

    @ApiProperty({ name: 'time', example: 'YYYY-MM-DD HH:mm:ss' })
    @IsString()
    time: string
}