-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "appMessage" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "senderId" DROP NOT NULL,
ALTER COLUMN "receiverId" DROP NOT NULL;