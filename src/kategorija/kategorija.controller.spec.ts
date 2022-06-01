import { Test, TestingModule } from '@nestjs/testing';
import { KategorijaController } from './kategorija.controller';
import { KategorijaService } from './kategorija.service';

describe('KategorijaController', () => {
  let controller: KategorijaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategorijaController],
      providers: [KategorijaService],
    }).compile();

    controller = module.get<KategorijaController>(KategorijaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
