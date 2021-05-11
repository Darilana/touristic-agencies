import { Controller, Get, Render, Param } from '@nestjs/common';

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
