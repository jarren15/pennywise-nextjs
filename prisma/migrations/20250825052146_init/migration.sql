-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "provider" TEXT,
    "provider_id" TEXT,

    CONSTRAINT "account_id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT,
    "password_hash" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_id" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
