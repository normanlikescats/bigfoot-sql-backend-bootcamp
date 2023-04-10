const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, categoryModel, commentModel) {
    super(model);
    this.categoryModel = categoryModel;
    this.commentModel = commentModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addOne(req, res) {
    const {date, location, notes, selectedCategoriesId } = req.body;
    try{
      const sighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoriesId,
        }
      })
      console.log(sighting.id)
      console.log(selectedCategories)
      return res.json(sighting);
    } catch(err){
      return res.status(400).json({error: true, msg: err})
    }
  }

  async getComments(req, res){
    const { sightingId } = req.params;
    console.log(sightingId);
    try{
      const output = await this.commentModel.findAll({
        attributes: ["content"],
        where: {
          sightingId: sightingId
        }
      });
      console.log(output)
      return res.json(output);
    } catch(err){
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addComment(req, res){
    const sightingId = req.params.sightingId;
    const commentContent = req.body.content;
    try{
      const comment = await this.commentModel.create({
        content: commentContent,
        sightingId: sightingId,
      });
      return res.json(comment);
    } catch(err){
      return res.status(400).json({error: true, msg: err})
    }
  }

}

module.exports = SightingsController;
