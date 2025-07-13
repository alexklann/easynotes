-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_role" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "note_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "note_lines" TEXT NOT NULL,
    "note_author_id" INTEGER NOT NULL,
    CONSTRAINT "Note_note_author_id_fkey" FOREIGN KEY ("note_author_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Note_note_id_key" ON "Note"("note_id");
