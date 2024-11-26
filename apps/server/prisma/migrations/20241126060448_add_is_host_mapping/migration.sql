/*
  Warnings:

  - You are about to drop the column `isHost` on the `UserSessionToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSessionToken" DROP COLUMN "isHost",
ADD COLUMN     "is_host" BOOLEAN NOT NULL DEFAULT false;
