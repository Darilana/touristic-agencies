import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';

@Module({
  providers: [],
  controllers: [AssetController],
})
export class AssetModule {}
