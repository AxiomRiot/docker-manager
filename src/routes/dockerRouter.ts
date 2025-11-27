import express from 'express';
import { 
  updateImageController,
  startContainerController,
  stopContainerController,
  getContainersController 
} from '../controllers/dockerController';

const dockerRouter = express.Router();

dockerRouter.post('/update', updateImageController);
dockerRouter.post('/start/', startContainerController);
dockerRouter.post('/stop/', stopContainerController);
dockerRouter.get('/containers/', getContainersController);

export default dockerRouter;