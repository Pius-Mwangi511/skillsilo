/*
  Warnings:

  - You are about to drop the column `url` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `fileType` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "url",
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
