import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { CinemaModule } from './cinema/cinema.module';
import { TheaterModule } from './theater/theater.module';
import { ShowTimeModule } from './show-time/show-time.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log()

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    MovieModule,
    CinemaModule,
    TheaterModule,
    ShowTimeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}


