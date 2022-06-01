import { Test, TestingModule } from '@nestjs/testing';
import { PitanjeService } from './pitanje.service';

describe('PitanjeService', () => {
  let service: PitanjeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PitanjeService],
    }).compile();

    service = module.get<PitanjeService>(PitanjeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
