import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { taskService } from "../services/TaskService";
import socketService from "../services/SocketService"

//PUBLIC
export class TaskController extends BaseController {

  constructor() {
    super("api/tasks")
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .post('', this.create)
      .post("/:id/comments", this.createComment)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .delete("/:id/comments/:commentId", this.deleteComment)
  }


  async getById(req, res, next) {
    try {
      let data = await taskService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await taskService.create(req.body)
      socketService.messageRoom('tasks', 'createTask', data)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }


  async edit(req, res, next) {
    try {
      let data = await taskService.edit(req.params.id, req.userInfo.email, req.body)
      socketService.messageRoom('tasks', 'changeTask', data)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let data = await taskService.getById(req.params.id)
      await taskService.delete(req.params.id, req.userInfo.email)
      socketService.messageRoom('tasks', 'removeTask', data)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
  async createComment(req, res, next) {
    try {
      let commentFound = await taskService.addComment(req.params.id, req.body)
      return res.send(commentFound)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      let data = await taskService.deleteComment(req.params.id, req.params.commentId)
      {
        res.send("comment deleted!")
      }
    } catch (error) {
      next(error)
    }
  }
}

