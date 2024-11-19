-- DropForeignKey
ALTER TABLE "QuestionLike" DROP CONSTRAINT "QuestionLike_question_id_fkey";

-- DropForeignKey
ALTER TABLE "ReplyLike" DROP CONSTRAINT "ReplyLike_reply_id_fkey";

-- AddForeignKey
ALTER TABLE "QuestionLike" ADD CONSTRAINT "QuestionLike_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyLike" ADD CONSTRAINT "ReplyLike_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "Reply"("reply_id") ON DELETE CASCADE ON UPDATE CASCADE;
