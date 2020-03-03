import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listsService } from "../services/ListsService";
import { taskService } from "../services/TaskService";

//PUBLIC
export class ListsController extends BaseController {
  constructor() {
    super("api/lists")
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getTaskByListId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      //only gets lists by user who is logged in
      let data = await listsService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (error) { next(error) }
  }

  async getById(req, res, next) {
    try {
      let data = await listsService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getTaskByListId(req, res, next) {
    try {
      let data = await taskService.getTasksByListId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) {

    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await listsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await listsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await listsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


