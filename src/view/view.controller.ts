import { Controller, Get, Render, Param, UseGuards, UseFilters } from '@nestjs/common';
import { BasicAuthGuard } from '../auth/auth-basic.guard';
import { UnauthorizedExceptionFilter } from '../auth/auth.exception.filter';

@UseGuards(BasicAuthGuard)
@UseFilters(UnauthorizedExceptionFilter)
@Controller('/')
export class ViewController {

  @Render('tour')
  @Get('tour')
  tourList() {
    return {}
  }

  @Render('tour/[id]')
  @Get('tour/:id')
  tourDetails(@Param('id') id: number) {
    return {}
  }

  @Render('agency')
  @Get('agency')
  agencyList() {
    return {}
  }

  @Render('agency/[id]')
  @Get('agency/:id')
  agencyDetails(@Param('id') id: number) {
    return {}
  }
}
