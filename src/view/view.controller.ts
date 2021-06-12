import {
  Controller,
  Get,
  Render,
  Param,
  UseGuards,
  UseFilters,
  Redirect,
} from '@nestjs/common';
import { UnauthorizedExceptionFilter } from '../auth/auth.exception.filter';
import { BasicAuthGuard } from '../auth/auth-basic.guard';

@UseGuards(BasicAuthGuard)
@UseFilters(UnauthorizedExceptionFilter)
@Controller('/')
export class ViewController {
  @Get()
  @Redirect('/tour')
  index() {}

  @Render('tour')
  @Get('tour')
  tourList() {
    return {};
  }

  @Render('tour/[id]')
  @Get('tour/:id')
  tourDetails(@Param('id') id: number) {
    return {};
  }

  @Render('agency')
  @Get('agency')
  agencyList() {
    return {};
  }

  @Render('agency/[id]')
  @Get('agency/:id')
  agencyDetails(@Param('id') id: number) {
    return {};
  }
}
