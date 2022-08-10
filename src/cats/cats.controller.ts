import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get('toto')
    async get(): Promise<Cat[]> {     
        return this.catsService.get();
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
    async post(@Body() createCatDto: CreateCatDto) {
        if (createCatDto == null)
        {
            throw new Error('argument null exception');
        }
        this.catsService.create(createCatDto);
        console.log("Enter");
    }
}
