-- CreateTable
CREATE TABLE "public"."Item" (
    "itemId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_itemId_key" ON "public"."Item"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_requestId_key" ON "public"."Item"("requestId");
