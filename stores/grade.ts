import { makeAutoObservable } from "mobx"
import { invoke } from "blitz"
import getGrade from "app/queries/getGrade"
import { grade } from "@prisma/client"
import { _ } from "../utils/lodash"
import { errorHandler } from "utils/errorHandler"

export class GradeStore {
  constructor() {
    makeAutoObservable(this)
  }
  grades: {
    [key: string]: grade
  } = {}

  init() {
    this.getGrade()
  }

  async getGrade() {
    try {
      const res = await invoke(getGrade, {})
      this.grades = _.keyBy(res, "level")
    } catch (error) {
      errorHandler(error)
    }
  }
}
