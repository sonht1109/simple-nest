import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat';
import { CatsService } from './cat.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { CurrentAccount } from 'src/common/decorators/current-user';
import { Account } from 'src/auth/account.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileConfigs } from 'src/common/configs/file-interceptor.config';
import { UploadInterceptor } from 'src/common/interceptors/upload.interceptor';

@ApiTags('Cat')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() CreateCatDto: CreateCatDto,
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.create(CreateCatDto, by);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.delete(id, by);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() cat: CreateCatDto,
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.update(+id, cat, by);
  }

  @Get('by-account/:id')
  async findByAccount(@Param('id') id: string) {
    return await this.catsService.findByAccount(+id);
  }

  @Post('feed/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async feed(
    @Param('id', ParseIntPipe) id: number,
    @Body() { foods }: { foods: number[] },
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.feed(id, foods, by);
  }

  @Post('file/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', imageFileConfigs), UploadInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @CurrentAccount() by: Account,
  ) {
    return await this.catsService.updateImage(id, by, file);
  }
}
