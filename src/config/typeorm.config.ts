import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'ec2-34-232-24-202.compute-1.amazonaws.com',
    port: 5432,
    username: 'ywdfkesovsnqyu',
    password: '5129a70126b5f3aba23d62f8aa2e0c28ea3753bfc3898a262c6f98786c0b987e',
    database: 'dbbm8alppkmur3',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: { rejectUnauthorized: false }

}