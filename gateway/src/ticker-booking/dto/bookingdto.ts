import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class BookingRequestDTO {

    @ApiProperty({
        description: 'Danh sách các ghế được chọn để đặt vé',
        type: [String],  // Chỉ ra rằng seatIds là một mảng các chuỗi
        example: ['A1', 'A2', 'B1'],
    })
    @IsArray()  // Kiểm tra seatIds là một mảng
    @IsNotEmpty({ each: true })  // Đảm bảo rằng mỗi phần tử trong mảng seatIds không rỗng
    seatIds: string[];


    @ApiProperty({
        description: 'Tên của khách hàng đặt vé',
        type: String,
        example: 'Nguyễn Văn A',
    })
    @IsString()
    @IsNotEmpty()
    name: string;


    @ApiProperty({
        description: 'Số điện thoại của khách hàng',
        type: String,
        example: '0123456789',
    })
    @IsPhoneNumber('VN')  // Kiểm tra số điện thoại là hợp lệ với mã quốc gia VN (Việt Nam)
    @IsNotEmpty()
    phone: string;


    @ApiProperty({
        description: 'Email của khách hàng',
        type: String,
        example: 'duongviethoang240803@gmail.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
