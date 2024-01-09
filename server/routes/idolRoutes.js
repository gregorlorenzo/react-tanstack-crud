module.exports = (app) => {
    const IdolController = require("../controller/idolController");
    var router = require("express").Router();
  
    router.get("/", IdolController.findAll);
  
    router.get("/:id", IdolController.findOne);

    router.post("/", IdolController.create);

    router.put("/:id", IdolController.update);

    router.delete("/:id", IdolController.delete);

    app.use('/api/v1/idols', router);
  };