-- DropForeignKey
ALTER TABLE "telefones" DROP CONSTRAINT "telefones_userId_fkey";

-- AddForeignKey
ALTER TABLE "telefones" ADD CONSTRAINT "telefones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
