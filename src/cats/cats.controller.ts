import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { create } from 'domain';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
    @Get()
    get(): string {
        return 'This action returns all cats';
    }

    @Get('observable')
    getAsync(): Observable<string[]> {
        return of(['one', 'two']);
    }

    @Get(':id')
    getById(@Param('id') id: string): string {
        return `This action returns the #${id} cat`;
    }

    @Get('/param/:id')
    getByIdWithParamDecorator(@Param() params): string {
        return `This action returns a #${params.id} cat with param decorator`;
    }

    @Post()
    async post(@Body() createCatDto: CreateCatDto): Promise<string> {
        if (Object.is(createCatDto, null) || 
            Object.is(createCatDto, undefined) || 
            Object.keys(createCatDto).length === 0)
        {
            throw new Error('argument null exception');
        }
        return `Cat created with name: ${createCatDto.name}, age: ${createCatDto.age}, breed: ${createCatDto.breed}`;
    }
}
