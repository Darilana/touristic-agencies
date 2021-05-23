import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { BasicAuthGuard } from '../auth/auth-basic.guard';

@UseGuards(BasicAuthGuard)
@Controller('/api/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/report')
  getReport() {
    return this.statisticsService.getReport();
  }

  @Post('/query-runner')
  getQueryResult(@Body() queryParams: { query: string }) {
    return this.statisticsService.getQueryResult(queryParams.query);
  }
}
