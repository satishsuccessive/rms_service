import { SystemResponse } from '@gdo-node-experts/dan-response-handler';
import IHome from '../../entities/IHome';
import { Nullable } from '../../libs/Nullable';
import { HomeService } from '../../services';

class HomeController {
  public static getInstance() {
    if (!HomeController.instance) {
      HomeController.instance = new HomeController();
    }

    return HomeController.instance;
  }
  private static instance: HomeController;

  /* tslint:disable: variable-name */
  private _homeService: HomeService;

  /* tslint:disable: no-null-keyword */
  private constructor() {
    this._homeService =  new HomeService();
  }

  /**
   * Get home list.
   * @property {number} skip - Number of messages to be skipped.
   * @property {number} limit - Limit number of messages to be returned.
   * @returns {IHome[]}
   */
  public async list(req, res, next): Promise<IHome[]> {
    try {
      const { limit, skip } = req.query;
      const result = await HomeController.getInstance()._homeService.list(limit, skip);
      if (!result.length) {
        return next(SystemResponse.badRequestError('Data not found'));
      }
      return res.send(SystemResponse.success('List of homes', result));
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Get home.
   * @property {string} id - Number of messages to be skipped.
   * @returns {IHome}
   */
  public async get(req, res, next): Promise<Nullable<IHome>> {
    try {
      const { id } = req.params;
      const result = await HomeController.getInstance()._homeService.get({id});
      if (!result) {
        return next(SystemResponse.badRequestError('Data not found'));
      }
      return res.send(SystemResponse.success('Home', result));
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Create new home
   * @property {string} name - The name of hello world.
   * @returns {IHome}
   */
  public async create(req, res, next) {
    try {
      const { name } = req.body;
      const result = await HomeController.getInstance()._homeService.create({
        name,
      });
      if (!result) {
        return next(SystemResponse.badRequestError('Unable to create'));
      }
      return res.send(SystemResponse.success('Home created', result));
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Update the home
   * @param id {string} - The id of the home.
   * @param name {string} -The updated name
   * @returns {IHome}
   */
  public async update(req, res, next) {
    try {
      const { id, name } = req.body;
      const result = await HomeController.getInstance()._homeService.update({
        name,
        originalId: id,
      });
      if (!result) {
        return next(SystemResponse.badRequestError('Unable to update'));
      }
      return res.send(SystemResponse.success('Home updated', result));
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Delete the home
   * @param id {string} The id of the home
   */
  public async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await HomeController.getInstance()._homeService.delete({
        id,
      });
      if (!result) {
        return next(SystemResponse.badRequestError('Unable to delete'));
      }
      return res.send(SystemResponse.success('Home deleted', result));
    } catch (err) {
      return next(err);
    }
  }

}

export default HomeController.getInstance();
