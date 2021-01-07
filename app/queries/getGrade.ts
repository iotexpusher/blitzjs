import { Ctx } from "blitz"
import { Prisma, prisma } from "db"

type GetGradeInput = {
  where: Prisma.FindManygradeArgs["where"]
}

export default async function getGrade({ where }: GetGradeInput, ctx: Ctx) {
  const data = await prisma.grade.findMany({ where })
  return data
}
