-- DropIndex
DROP INDEX "UserSessionToken_token_key";

-- AlterTable
ALTER TABLE "UserSessionToken" ADD CONSTRAINT "UserSessionToken_pkey" PRIMARY KEY ("token");
