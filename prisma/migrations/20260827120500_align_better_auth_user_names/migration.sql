ALTER TABLE "user" RENAME CONSTRAINT "User_pkey" TO "user_pkey";
ALTER INDEX "User_email_key" RENAME TO "user_email_key";
ALTER INDEX "User_handle_key" RENAME TO "user_handle_key";
