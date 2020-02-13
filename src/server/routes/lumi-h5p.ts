import express from 'express';

import controller from '../controller/lumi-h5p';

export default function(): express.Router {
    const router = express.Router();
    router.post(
        `/`,
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            controller
                .import(req.body.path)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => next(error));
        }
    );

    router.get(
        `/`,
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            controller
                .export(req.query.contentId, req.query.path)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => next(error));
        }
    );

    router.patch(
        `/`,
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            const { parameters, metadata, library, id } = req.body;
            controller
                .update(parameters, metadata, library, id)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => next(error));
        }
    );

    router.delete(
        '/',
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            const { contentId } = req.query;
            controller
                .delete(contentId)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => next(error));
        }
    );

    return router;
}
