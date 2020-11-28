import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'ec2-34-237-166-54.compute-1.amazonaws.com',
    port: 5432,
    username: 'uaglsoddmldlae',
    password: '59b6ff369371c2b8f2e7fa3f948c5278cfa6099579d6db2908067ead07afe506',
    database: 'dgtf9lms1205k',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: { rejectUnauthorized: false }

}