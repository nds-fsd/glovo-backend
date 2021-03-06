const { Order, Restaurant, User } = require("../mongo");
const { sendOrderCompleteEmail, sendOrderCompleteEmailProvider } = require("../mailer/index");

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

exports.create = async (req, res) => {
  const data = req.body;
  if (!data.Restaurant) {
    return res.status(400).json({ message: "Restaurant not Provided" });
  }
  const ordersTotal = await Order.find({
    Restaurant: data.Restaurant,
  }).countDocuments();

  const newOrder = new Order({
    orderNumber: `Order Number ${ordersTotal + 1}`,
    User: data.User,
    Restaurant: data.Restaurant,
    orderList: data.orderList,
    status: false,
    total: data.total,
  });

  const selectedRestaurant = await Restaurant.findById(data.Restaurant);
  const client = await User.findById(data.User);
  const provider = await User.findById(selectedRestaurant.user)
  
  const clientData = {
      name: client.firstName,
      restaurant: selectedRestaurant.name
  }
  const providerData = {
      order: `number ${ordersTotal + 1}`,
      restaurant: selectedRestaurant.name
  }
  sendOrderCompleteEmailProvider(providerData, provider.email);
  sendOrderCompleteEmail(clientData, client.email);
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
    .then((ord) => {
      res.status(200).json({
        message: "Your Order has been updated Succesfully",
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.search = async (req, res) => {
  const restaurant = req.query.restaurant;
  const status = req.query.status;
  const page = Math.max(0, req.query.page);
  const limit = Math.max(1, req.query.limit);
  const sort = req.query.sort;
  const sortDirection = req.query.dir || "dsc";
  const skip = page * limit;
  let sortObject = {};
  let query = { Restaurant: restaurant };

  if (status === "true" || status === "false") {
    query.status = status;
  }
  if (sort && sortDirection) {
    sortObject[sort] = sortDirection === "dsc" ? -1 : 1;
  }

  const ordersCount = await Order.find(query).countDocuments();

  Order.find(query)
    .limit(limit)
    .skip(skip)
    .sort(sortObject)
    .then((orders) => {
      return res.status(200).json({ count: ordersCount, list: orders });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};
