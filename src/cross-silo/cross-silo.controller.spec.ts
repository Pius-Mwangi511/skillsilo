import { Test, TestingModule } from '@nestjs/testing';
import { CrossSiloController } from './cross-silo.controller';
import { CrossSiloService } from './cross-silo.service';

describe('CrossSiloController', () => {
  let controller: CrossSiloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrossSiloController],
      providers: [CrossSiloService],
    }).compile();

    controller = module.get<CrossSiloController>(CrossSiloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
