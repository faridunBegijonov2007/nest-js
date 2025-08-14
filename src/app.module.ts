import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as 'postgres') || '',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      synchronize: (process.env.DB_SYNCHRONIZE || 'true') === 'true',
      logging: (process.env.DB_LOGGING || 'true') === 'true',
      entities: [],
    }),
  ],
})
export class AppModule {}
