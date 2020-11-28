import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'ec2-52-44-55-63.compute-1.amazonaws.com',
    port: 5432,
    username: 'epregmgnospvqo',
    password: '60841a6ee37bc2bd0088c1b71b9d45b662005f8d5fd0c5a8da70e1eec140c2df',
    database: 'dcll2a1qcp15of',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: { rejectUnauthorized: false }

}