import { user, grade } from "@prisma/client"
import { makeAutoObservable } from "mobx"
import { invoke } from "blitz"
import login from "app/mutations/login"
import { errorHandler } from "utils/errorHandler"

export class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: user & {
    grade_gradeTouser: grade
  }

  async login({ address }) {
    try {
      const res = await invoke(login, { data: { address } })
      this.user = res
    } catch (error) {
      errorHandler(error)
    }
  }
}
