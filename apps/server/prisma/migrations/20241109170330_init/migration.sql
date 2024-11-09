/*
  Warnings:

  - You are about to drop the `User_Session_Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User_Session_Token";

-- CreateTable
CREATE TABLE "UserSessionToken" (
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "Session_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSessionToken_token_key" ON "UserSessionToken"("token");
