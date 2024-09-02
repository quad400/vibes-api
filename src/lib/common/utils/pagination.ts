import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";


export class PageMetaDto {
    @IsInt()
    page?: number;
  
    @IsInt()
    limit?: number;
  
    @IsInt()
    itemCount: number;
  
    @IsInt()
    pageCount: number;
  
    @IsBoolean()
    hasPreviousPage: boolean;
  
    @IsBoolean()
    hasNextPage: boolean;
  
    constructor({ queryOptionsDto, itemCount }: PageMetaDtoParameters) {
      this.page = queryOptionsDto.page;
      this.limit = queryOptionsDto.limit;
      this.itemCount = itemCount;
      this.pageCount = Math.ceil(this.itemCount / this.limit);
      this.hasPreviousPage = this.page > 1;
      this.hasNextPage = this.page < this.pageCount;
    }
  }

export class QueryOptionsDto {

    @IsInt()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;
  
    @IsInt()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;
  
    @IsString()
    @IsOptional()
    keywords?: string
  }


export interface PageMetaDtoParameters {
    queryOptionsDto: QueryOptionsDto;
    itemCount: number;
  }
  
  export class PageDto<T> {
    @IsArray()
    results: T[];
  
    meta: PageMetaDto;
  
    constructor(results: T[], meta: PageMetaDto) {
      this.meta = meta;
      this.results = results;
    }
  }
  