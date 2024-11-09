-- CreateTable
CREATE TABLE "User_Session_Token" (
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "Session_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Session_Token_token_key" ON "User_Session_Token"("token");
