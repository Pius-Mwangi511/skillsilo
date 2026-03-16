import { Test, TestingModule } from '@nestjs/testing';
import { PeerReviewsService } from './peer-reviews.service';

describe('PeerReviewsService', () => {
  let service: PeerReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeerReviewsService],
    }).compile();

    service = module.get<PeerReviewsService>(PeerReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
