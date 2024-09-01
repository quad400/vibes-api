import { IsBoolean, IsNumber, IsString } from "class-validator";
import { config } from "dotenv";

config();

class Configuration {

    @IsBoolean()
    readonly IS_PRODUCTION = process.env.NODE_ENV === "production"? true: false

    @IsString()
    readonly DB_URL = process.env.DB_URL
    
    @IsString()
    readonly DB_HOST = process.env.DB_HOST
    
    @IsString()
    readonly DB_DATABASE = process.env.DB_DATABASE
    
    @IsNumber()
    readonly DB_PORT = Number(process.env.DB_PORT)
    
    @IsString()
    readonly DB_USERNAME = process.env.DB_USERNAME
    
    @IsString()
    readonly DB_PASSWORD = process.env.DB_PASSWORD
 
    @IsString()
    readonly PORT = Number(process.env.PORT)

    @IsString()
    readonly HOST = process.env.HOST

    @IsString()
    readonly REDIS_HOST = process.env.REDIS_HOST
    
    @IsNumber()
    readonly REDIS_PORT = Number(process.env.REDIS_PORT)
    
    @IsString()
    readonly REDIS_URL = process.env.REDIS_URL
    
    @IsString()
    readonly CREATE_USER_QUEUE = "create-user"

    @IsString()
    readonly JWT_SECRET = process.env.JWT_SECRET
    
    @IsString()
    readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

}

export const Config = new Configuration()