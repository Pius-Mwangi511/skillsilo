import { Test, TestingModule } from '@nestjs/testing';
import { PeerReviewsController } from './peer-reviews.controller';
import { PeerReviewsService } from './peer-reviews.service';

describe('PeerReviewsController', () => {
  let controller: PeerReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeerReviewsController],
      providers: [PeerReviewsService],
    }).compile();

    controller = module.get<PeerReviewsController>(PeerReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
