import { Injectable } from '@nestjs/common';
import { CreatePitanjeDto } from './dto/create-pitanje.dto';
import { UpdatePitanjeDto } from './dto/update-pitanje.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Pitanje } from './entities/pitanje.entity';
import { getAllQuestionsByCategory, insertTestTagsQuery, selectAllCategoryIDsViaPitanjeID, deleteAllCategoriesQuery, getAllQuestionsWithCategories } from './pitanje.queries';

type KategorijaId = { id: number }

@Injectable()
export class PitanjeService {
  constructor(
    @InjectRepository(Pitanje) private pitRepository: Repository<Pitanje>
  ) { }

  async create(createPitanjeDto: CreatePitanjeDto) {
    let finalPitanje = new Pitanje();
    finalPitanje.text = createPitanjeDto.text;
    finalPitanje.isCorrect = createPitanjeDto.isCorrect;
    finalPitanje.dateCreated = new Date();
    finalPitanje.dateUpdated = new Date();
    finalPitanje.categories = [];
    let result = await this.pitRepository.save(finalPitanje);
    let finalPitanjeCategories: number[] = [];
    if (createPitanjeDto.categories && createPitanjeDto.categories.length > 0) {
      let ubaceneKategorije: InsertResult = await this.pitRepository.query(insertTestTagsQuery, [result.id, createPitanjeDto.categories]);
      let fetchedCategoriesAfterChange: any[] = await this.pitRepository.query(selectAllCategoryIDsViaPitanjeID, [result.id]);
      finalPitanjeCategories = fetchedCategoriesAfterChange.map((tagId: KategorijaId) => tagId.id);
      console.log(result, finalPitanjeCategories);
    }
    return {
      ...result,
      categories: finalPitanjeCategories || []
    }
  }

  async findAll() {
    let pitanja = await this.pitRepository.query(getAllQuestionsWithCategories);
    return pitanja;
  }

  async findAllByCategory(categoryId: number) {
    // get all pitanja which contain categoryId
    let pitanja = await this.pitRepository
      .query(getAllQuestionsByCategory, [[categoryId]]);
    // let pitanja = await this.pitRepository.find();
    return pitanja;
  }

  async findOne(id: number) {
    let pitanje = await this.pitRepository.findOneBy({ id });
    if (!pitanje || !pitanje.id) {
      throw new Error('Pitanje with that ID not found');
    }
    return pitanje;
  }

  async update(id: number, updatePitanjeDto: UpdatePitanjeDto) {
    let pitanje = await this.pitRepository.findOneBy({ id });
    if (!pitanje || !pitanje.id) {
      throw new Error('Pitanje with that ID not found');
    }
    const { text, isCorrect } = updatePitanjeDto;
    console.log(updatePitanjeDto);

    if (!text) {
      throw new Error('Ime kategorije je obavezno');
    }
    pitanje.text = text;
    pitanje.isCorrect = isCorrect;
    pitanje.dateUpdated = new Date();
    let result: Pitanje = await this.pitRepository.save(pitanje);

    let deleteResult: DeleteResult;
    let insertResult: InsertResult;
    let finalPitanjeCategories: number[] = [];
    // brisemo sve kategorije pitanja
    deleteResult = await this.pitRepository.query(deleteAllCategoriesQuery, [result.id]);
    if (updatePitanjeDto.categories && updatePitanjeDto.categories.length > 0) {
      // ubacujemo nove kategorije
      insertResult = await this.pitRepository.query(insertTestTagsQuery, [result.id, updatePitanjeDto.categories]);
    }

    let fetchedCategoriesAfterChange: any[] = await this.pitRepository.query(selectAllCategoryIDsViaPitanjeID, [result.id]);
    finalPitanjeCategories = fetchedCategoriesAfterChange.map((tagId: KategorijaId) => tagId.id);

    return {
      ...result,
      categories: finalPitanjeCategories || []
    }
    /* return this.pitRepository.update(id, { ...updatePitanjeDto, dateUpdated: new Date() }); */
  }

  async remove(id: number) {
    let result: DeleteResult = await this.pitRepository.delete(id);
    return !!result.affected;
  }
}

