import { Test, TestingModule } from '@nestjs/testing';
import { PitanjeController } from './pitanje.controller';
import { PitanjeService } from './pitanje.service';

describe('PitanjeController', () => {
  let controller: PitanjeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PitanjeController],
      providers: [PitanjeService],
    }).compile();

    controller = module.get<PitanjeController>(PitanjeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
