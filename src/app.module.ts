import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { OfficeModule } from './office/office.module';
import { TourModule } from './tour/tour.module';
import { RenderModule } from 'nest-next';
import { ViewModule } from './view/view.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AssetModule } from './asset/asset.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/static'
    }),
    ConfigModule.forRoot(),
    AgencyModule,
    OfficeModule,
    TourModule,
    RenderModule,
    ViewModule,
    AuthModule,
    AssetModule,
  ],
})
export class AppModule {}
