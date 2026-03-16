/*
  Warnings:

  - You are about to drop the column `content` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `message` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siloId` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_messageId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "content",
DROP COLUMN "messageId",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "siloId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "read",
DROP COLUMN "type",
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_FeedbackToMessage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedbackToMessage_AB_unique" ON "_FeedbackToMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedbackToMessage_B_index" ON "_FeedbackToMessage"("B");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_siloId_fkey" FOREIGN KEY ("siloId") REFERENCES "Silo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToMessage" ADD CONSTRAINT "_FeedbackToMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToMessage" ADD CONSTRAINT "_FeedbackToMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
