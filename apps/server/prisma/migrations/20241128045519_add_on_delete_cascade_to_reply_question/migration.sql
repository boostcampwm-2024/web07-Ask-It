-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_question_id_fkey";

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
