const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const port = 3000;

//1) Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware...');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) handle routing
/*Handling get request */
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined...',
  });
};

/*responding to URL paramters*/
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id...',
    });
  }
  res.status(200).json({ status: 'success', data: { tour } });
};

const getUser = (req, res) => {
  const id = req.params.id * 1;
  if (!id) {
    return res.status(500).json({});
  }
};

/*handling post requests*/
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tours } });
    }
  );
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined...',
  });
};

/*handling patch requests*/
const updateTour = (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invalid id...',
      },
    });
  }
  res.status(201).json({
    status: 'success',
    data: { message: '<Updated tours successfully...>' },
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined...',
  });
};

/*handling delete requests*/
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id...',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined...',
  });
};

// 3) Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', postTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id',deleteTour)

const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//tours
tourRouter.route('/').get(getAllTours).post(createTour);
/* 
//this code is working before (api/v1/tours/:id) but after (api/v1/tours),it isn't being
app.use((req, res, next) => {
    console.log('Hello from the middleware...');
    next();
  });
  */
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//users

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//4) Server
app.listen(port, () => {
  console.log(`Server is listening at ${port}...`);
});
