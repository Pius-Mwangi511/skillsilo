import { Test, TestingModule } from '@nestjs/testing';
import { CrossSiloService } from './cross-silo.service';

describe('CrossSiloService', () => {
  let service: CrossSiloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrossSiloService],
    }).compile();

    service = module.get<CrossSiloService>(CrossSiloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
