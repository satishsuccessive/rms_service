import { NextFunction, Request, Response } from 'express';

import { SystemResponse } from '@gdo-node-experts/dan-response-handler';

export default (req: Request, res: Response, next: NextFunction) => {
  return next( SystemResponse.notFoundError() );
};
