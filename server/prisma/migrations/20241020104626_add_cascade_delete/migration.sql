-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_category_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_currentUser_id_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_currentUser_id_fkey" FOREIGN KEY ("currentUser_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_category_task_id_fkey" FOREIGN KEY ("category_task_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
