/*
  Warnings:

  - Changed the type of `value` on the `TransactionsCashIn` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `TransactionsCashOut` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TransactionsCashIn" DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "TransactionsCashOut" DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
