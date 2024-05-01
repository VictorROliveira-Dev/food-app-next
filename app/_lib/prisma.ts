/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";
// Arquivo para otimizar o desempenho do Prisma em ambientes de desenvolvimento e produção, garantindo que as conexões do banco de dados sejam gerenciadas de forma eficiente.

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
