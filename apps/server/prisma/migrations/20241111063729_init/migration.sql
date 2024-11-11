/*
  Warnings:

  - You are about to drop the column `question_create_user_token` on the `QuestionLike` table. All the data in the column will be lost.
  - You are about to drop the column `question_create_user_token` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `reply_create_user_token` on the `ReplyLike` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionLike" DROP COLUMN "question_create_user_token";

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "question_create_user_token";

-- AlterTable
ALTER TABLE "ReplyLike" DROP COLUMN "reply_create_user_token";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_create_user_token_fkey" FOREIGN KEY ("create_user_token") REFERENCES "UserSessionToken"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionLike" ADD CONSTRAINT "QuestionLike_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionLike" ADD CONSTRAINT "QuestionLike_create_user_token_fkey" FOREIGN KEY ("create_user_token") REFERENCES "UserSessionToken"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_create_user_token_fkey" FOREIGN KEY ("create_user_token") REFERENCES "UserSessionToken"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyLike" ADD CONSTRAINT "ReplyLike_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "Reply"("reply_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyLike" ADD CONSTRAINT "ReplyLike_create_user_token_fkey" FOREIGN KEY ("create_user_token") REFERENCES "UserSessionToken"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatting" ADD CONSTRAINT "Chatting_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatting" ADD CONSTRAINT "Chatting_create_user_token_fkey" FOREIGN KEY ("create_user_token") REFERENCES "UserSessionToken"("token") ON DELETE RESTRICT ON UPDATE CASCADE;
