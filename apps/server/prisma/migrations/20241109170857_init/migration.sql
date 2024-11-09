/*
  Warnings:

  - You are about to drop the column `Session_id` on the `UserSessionToken` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `UserSessionToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSessionToken" DROP COLUMN "Session_id",
ADD COLUMN     "session_id" TEXT NOT NULL;
