import * as logger from '@gdo-tvstack/dan-logger';
import * as mongoose from 'mongoose';
import { Nullable } from '../../../libs/Nullable';
import VersioningRepository from '../../versionable/VersioningRepository';
import { IQueryCreate, IQueryDelete, IQueryGet, IQueryList, IQueryUpdate } from './entities';
import IHomeModel from './IModel';
import { homeModel } from './model';

export default class HomeRepository extends VersioningRepository<IHomeModel,
  mongoose.Model<IHomeModel>> {

  constructor() {
    super(homeModel);
  }
  /**
   * Get home list.
   * @property {number} skip - Number of records to be skipped.
   * @property {number} limit - Limit number of records to be returned.
   * @returns {Home[]}
   */
  public async list(options: IQueryList): Promise<IHomeModel[]> {

    logger.debug('Home - List query: ', options);

    return super.getAll({}, options);
  }

  /**
   * Get home.
   * @property {string} id - _id of the record
   * @returns {Home}
   */
  public async get(query: IQueryGet): Promise<Nullable<IHomeModel>> {

    logger.debug('HomeRepository - Get: ');
    return super.getById(query.id);
  }

  /**
   * Create new home
   * @property {string} name - The name of record.
   * @returns {Home}
   */
  public async create(options: IQueryCreate): Promise<IHomeModel> {
    logger.debug('HomeRepository - Create: ');
    return super.create(options);
  }

  /**
   * Update new home
   * @property {string} name - The name of record.
   * @returns {Home}
   */
  public async update(options: IQueryUpdate): Promise<IHomeModel> {
    logger.debug('HomeRepository - Update: ');
    return super.update(options);
  }
  /**
   * Delete home
   * @property {string} body.name - The name of record.
   * @returns {Home}
   */
  public async delete(query: IQueryDelete): Promise<IHomeModel> {
    logger.debug('HomeRepository - Delete: ');
    return super.remove(query.id);
  }

  /**
   * Hard Delete home
   * @property {string} body.name - The name of record.
   * @returns {Home}
   */
  public async hardDelete(query: IQueryDelete): Promise<IHomeModel> {
    logger.debug('HomeRepository - Hard Delete: ');
    return super.hardRemove(query);
  }
}
