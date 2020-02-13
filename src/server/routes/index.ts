import express from 'express';

import fsRoutes from './fs';
import h5pRoutes from './h5p';
import lumiH5PRoutes from './lumi-h5p';

import Logger from '../helper/Logger';
const log = new Logger('routes');

export default function(): express.Router {
    const router = express.Router();

    log.info('setting up routes');

    router.use('/api/v1/fs', fsRoutes());

    router.use('/api/v0/h5p', h5pRoutes());

    router.use('/api/v1/h5p', lumiH5PRoutes());

    router.get('*', express.static(`${__dirname}/../../client`));

    return router;
}
