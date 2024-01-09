const db = require("../model");
const Idol = db.idols;

exports.findAll = async (req, res) => {
    const allIdols = await Idol.find();

    if (allIdols.length === 0)
        return res.status(404).json('No idols found');

    return res.json(allIdols);

}

exports.findOne = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json('Id is not valid');

    const idol = await Idol.findById(id);

    if (!idol) return res.status(404).json('Idol not found');

    return res.json(idol);
}

exports.create = async (req, res) => {
    const { stageName, birthName, position, birthday, height, weight } = req.body;

    if (!stageName || !birthName || !position || !birthday || !height || !weight)
        return res.status(400).json('Missing required fields');


    const newIdol = new Idol({
        stageName,
        birthName,
        position,
        birthday,
        height,
        weight
    });

    await newIdol.save();

    return res.status(201).json(newIdol);
}

exports.update = async (req, res) => {
    if (!req.body) return res.status(400).json('Missing required fields');

    const { id } = req.params;

    if (!id) return res.status(400).json('Id is not valid');

    await Idol.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) return res.status(404).json('Idol not found');

        return res.json({ message: "Idol updated successfully." })
    }).catch(error => {
        return res.status(500).json({ message: error.message });
    })
}

exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json('Id is not valid');

    await Idol.findByIdAndDelete(id).then(data => {
        if (!data) return res.status(404).json('Idol not found');

        return res.json({ message: "Idol deleted successfully." })
    }).catch(error => {
        return res.status(500).json({ message: error.message });
    })
}