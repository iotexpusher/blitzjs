import { Ctx } from "blitz"
import { Prisma, prisma } from "db"

type GetCheckinInput = {
  where: Prisma.FindManycheckinArgs["where"]
}

export default async function getCheckin({ where }: GetCheckinInput, ctx: Ctx) {
  const checkin = await prisma.checkin.findMany({ where })
  return checkin
}
