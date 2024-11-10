/*
  Warnings:

  - You are about to drop the column `user_id` on the `Session` table. All the data in the column will be lost.
  - Added the required column `created_user_id` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "user_id",
ADD COLUMN     "created_user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_created_user_id_fkey" FOREIGN KEY ("created_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
