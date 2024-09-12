-- CreateTable
CREATE TABLE "blog_browsing_histories" (
    "id" SERIAL NOT NULL,
    "content_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_browsing_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blog_browsing_histories" ADD CONSTRAINT "blog_browsing_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
