import { Ctx } from "blitz"
import { prisma, Prisma } from "db"
import * as yup from "yup"
import { validateAddress } from "iotex-antenna/lib/account/utils"

type Login = {
  data: Prisma.userCreateArgs["data"]
}
const inputSchema = yup.object().shape({
  ip: yup.string().required(),
  address: yup
    .string()
    .required()
    .test("is-ioAddress", "${value} is not a valid io address", (value, ctx) => {
      return validateAddress(value)
    }),
})

export default async function login({ data }: Login, ctx: Ctx) {
  const ip = (ctx.req.headers["x-forwarded-for"] || ctx.req.socket.remoteAddress) as string
  const { address } = data
  const _data = await inputSchema.validate({ address, ip })
  const user = await prisma.user.findFirst({
    where: { address },
    include: {
      grade_gradeTouser: {
        select: {
          level: true,
          point_begin: true,
          max_point: true,
        },
      },
    },
  })
  if (user) {
    return user
  }

  const exists = await prisma.user.findFirst({
    where: {
      ip,
    },
  })
  if (exists) throw new Error(`ip:${ip} has been used`)
  const newUser = await prisma.user.create({
    data: _data,
    include: {
      grade_gradeTouser: {
        select: {
          level: true,
          point_begin: true,
          max_point: true,
        },
      },
    },
  })
  return newUser
}
