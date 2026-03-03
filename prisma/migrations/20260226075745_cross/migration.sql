-- DropForeignKey
ALTER TABLE "CrossSiloRequest" DROP CONSTRAINT "CrossSiloRequest_fromUserId_fkey";

-- AlterTable
ALTER TABLE "CrossSiloRequest" ALTER COLUMN "fromUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CrossSiloRequest" ADD CONSTRAINT "CrossSiloRequest_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
