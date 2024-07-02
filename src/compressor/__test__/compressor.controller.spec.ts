import { Test, TestingModule } from '@nestjs/testing';
import { CompressorController } from '../compressor.controller';
import { CompressorService } from '../compressor.service';

describe('AppController', () => {
  let compressorController: CompressorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompressorController],
      providers: [CompressorService],
    }).compile();

    compressorController = app.get<CompressorController>(CompressorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(compressorController.getHello()).toBe('Hello World!');
    });
  });
});
