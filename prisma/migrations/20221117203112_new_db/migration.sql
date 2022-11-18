-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountsId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountsId" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "balance" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_accountsId_key" ON "User"("accountsId");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_id_key" ON "Accounts"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
