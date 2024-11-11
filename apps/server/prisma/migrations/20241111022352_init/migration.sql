/*
  Warnings:

  - You are about to drop the column `created_user_id` on the `Session` table. All the data in the column will be lost.
  - Added the required column `create_user_id` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_created_user_id_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "created_user_id",
ADD COLUMN     "create_user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "create_user_token" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "closed" BOOLEAN NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "QuestionLike" (
    "question_like_id" SERIAL NOT NULL,
    "create_user_token" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "question_create_user_token" TEXT NOT NULL,

    CONSTRAINT "QuestionLike_pkey" PRIMARY KEY ("question_like_id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "reply_id" SERIAL NOT NULL,
    "create_user_token" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,
    "question_create_user_token" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("reply_id")
);

-- CreateTable
CREATE TABLE "ReplyLike" (
    "reply_like_id" SERIAL NOT NULL,
    "create_user_token" TEXT NOT NULL,
    "reply_id" INTEGER NOT NULL,
    "reply_create_user_token" TEXT NOT NULL,

    CONSTRAINT "ReplyLike_pkey" PRIMARY KEY ("reply_like_id")
);

-- CreateTable
CREATE TABLE "Chatting" (
    "chatting_id" SERIAL NOT NULL,
    "create_user_token" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" TEXT NOT NULL,

    CONSTRAINT "Chatting_pkey" PRIMARY KEY ("chatting_id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_create_user_id_fkey" FOREIGN KEY ("create_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
