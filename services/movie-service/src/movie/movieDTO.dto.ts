import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MovieDTO {
    @ApiProperty({ name: 'title', description: "title of movie", required: true, example: 'mắt biếc' })
    @IsString()
    title: string

    @ApiProperty({ name: 'description', description: "description of movie", required: true, example: '' })
    @IsString()
    description: string

    @ApiProperty({ name: 'duration', description: "duration of movie", required: true, example: '' })
    @IsString()
    duration: string

    @ApiProperty({ name: 'posterUrl', description: "posterUrl of movie", required: true, example: '' })
    @IsString()
    posterUrl: string

    @ApiProperty({ name: 'genre', description: "genre of movie", required: true, example: '' })
    @IsString()
    genre: string

    @ApiProperty({ name: 'rating', description: "rating of movie", required: true, example: '1' })
    @IsString()
    rating: string
}