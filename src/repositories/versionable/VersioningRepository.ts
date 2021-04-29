import * as logger from '@gdo-tvstack/dan-logger';
import * as mongoose from 'mongoose';
import { DocumentQuery } from 'mongoose';
import { IQueryBaseCreate, IQueryBaseDelete, IQueryBaseGet, IQueryBaseList, IQueryBaseUpdate } from '../entities';
import IVersionableDocument from './IVersionableDocument';

export default class VersioningRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {

  public static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  private modelType: M;

  constructor(modelType) {
    this.modelType = modelType;
  }

  /**
   * Create new application
   * @property {string} body.name - The name of record.
   * @returns {Application}
   */
  public async create(options: IQueryBaseCreate): Promise<D> {
    const id = VersioningRepository.generateObjectId();
    const model = new this.modelType({
      ...options,
      _id: id,
      originalId: id,
    });
    return await model.save();
  }

  /**
   * Create new application
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
  public async update(options: IQueryBaseUpdate): Promise<D> {

    const now = new Date();

    logger.debug('Searching for previous valid object...');
    const previous = await this.getById(options.originalId);
    logger.debug('PREVIOUS::::::::', JSON.stringify(previous));

    if ( previous ) {
      logger.debug('Invalidating previous valid object...');
      await this.invalidate(options.originalId);
    } else {
      // tslint:disable-next-line:no-null-keyword
      return null;
    }

    const newInstance = Object.assign(previous.toJSON(), options);
    newInstance.id = VersioningRepository.generateObjectId();
    logger.debug('NEW INSTANCE::::::::', newInstance);
    delete newInstance.deletedAt;

    const model = new this.modelType(newInstance);

    logger.debug('Creating new object...');
    return await model.save();

  }
  protected getAll(query: any = {} , options: any = {}): DocumentQuery<D[], D> {
    options.limit = options.limit || 0;
    options.skip = options.skip || 0;
    query.deletedAt = undefined;
    logger.debug('getAll query: ', query);
    logger.debug('getAll options: ', options);
    // tslint:disable:no-null-keyword
    return this.modelType.find(query, null, options);
  }

  protected getByQuery(query: any): DocumentQuery<D | null, D> {
    return this.modelType.findOne(query);
  }

  protected getById(id: string): DocumentQuery<D | null, D> {
    logger.debug(id);
    return this.modelType.findOne({ originalId: id, deletedAt: null });
  }

  protected getByIds(ids: string[]): DocumentQuery<D[], D> {
    return this.getAll({ originalId: { $in: ids } });
  }

  protected async remove(id: string): Promise<D> {
    const result = await this.getById(id);
    if (result) {
    return await this.invalidate(id);
    }
    return null;
  }
  protected invalidate(id: string): DocumentQuery<D, D> {
    const now = new Date();
    return this.modelType.update({ originalId: id, deletedAt: null }, { deletedAt: now });
  }
  protected async hardRemove(query: IQueryBaseDelete): Promise<D> {
    return await this.modelType.remove(query);
  }
}
