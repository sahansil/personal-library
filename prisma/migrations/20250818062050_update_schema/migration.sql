-- CreateTable
CREATE TABLE "public"."Books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL,
    "blurb" TEXT,
    "cover_image" TEXT,
    "genresId" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "bio" TEXT,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BooksAuthors" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "BooksAuthors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Books" ADD CONSTRAINT "Books_genresId_fkey" FOREIGN KEY ("genresId") REFERENCES "public"."Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BooksAuthors" ADD CONSTRAINT "BooksAuthors_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BooksAuthors" ADD CONSTRAINT "BooksAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
