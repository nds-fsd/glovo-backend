const { Order } = require("../mongo");

exports.findAll = (req, res) => {
  const handleSuccess = (courses) => {
    res.status(200).json(courses);
  };
  const handleError = (error) => {
    res.status(500).json(error);
  };
  Order.find().then(handleSuccess).catch(handleError);
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.create = (req, res) => {
  const data = req.body;
  if (!data.Restaurant) {
    return res.status(400).json({ message: "Restaurant not Provided" });
  }
  const newOrder = new Order({
    User: data.User,
    Restaurant: data.Restaurant,
    orderList: data.orderList,
    status: false,
    total: data.total,
  });
  newOrder
    .save()
    .then((newOrder) => {
      res
        .status(201)
        .json({ Message: "Your new Order was created Succesfully", newOrder });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  Order.findByIdAndDelete(id)
    .then(() => {
      res
        .status(200)
        .json({ message: "Your Course has been deleted Succesfully" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Order.findById(id, (err, order) => {
    if (err) return res.status(500).json({ message: "Algo fallo" });
    order.status = !order.status;
    order.save();
  })
    .then((order) => {
      res.status(200).json({
        message: "Your Order has been updated Succesfully",
        order,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.search = async (req, res) => {
  const restaurant = req.query.restaurant;
  const page = Math.max(0, req.query.page);
  const limit = Math.max(1, req.query.limit);
  const sort = req.query.sort;
  const sortDirection = req.query.dir || "dsc";
  const skip = page * limit;
  let sortObject = {};
  let query = { restaurant };
  if (sort && sortDirection) {
    sortObject[sort] = sortDirection === "dsc" ? -1 : 1;
  }

  const ordersCount = await Order.find(query).countDocuments();

  Order.find(query)
    .limit(limit)
    .skip(skip)
    .sort(sortObject)
    .populate('Dish')
        .exec((error, orders) => {
            if (error) return res.status(500).json({ message: error });
            res.status(200).json({count: ordersCount, list: orders});
        }) 
};
