-- CreateTable
CREATE TABLE "CrossSiloRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CrossSiloRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrossSiloReply" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CrossSiloReply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CrossSiloRequest" ADD CONSTRAINT "CrossSiloRequest_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrossSiloReply" ADD CONSTRAINT "CrossSiloReply_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "CrossSiloRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrossSiloReply" ADD CONSTRAINT "CrossSiloReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
