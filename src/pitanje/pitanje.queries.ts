const getAllQuestionsByCategory: string = `
SELECT * FROM (
    SELECT
    pitanje.id,
    pitanje.text,
    pitanje."isCorrect",
    pitanje."dateCreated",
    pitanje."dateUpdated",
    (SELECT ARRAY(SELECT "kategorijaId" FROM "pitanjeKategorije" WHERE "pitanjeKategorije"."pitanjeId" = "pitanje"."id")) AS "kategorije"

    FROM pitanje
) AS "pitanjeWrapper"
WHERE "pitanjeWrapper"."kategorije" @> COALESCE($1::integer[])`;

const insertTestTagsQuery: string = `
    INSERT INTO "pitanjeKategorije" ("pitanjeId", "kategorijaId")
    SELECT $1, UNNEST(
        ARRAY(
            SELECT "kategorija"."id"
            FROM "kategorija"
            WHERE "kategorija"."id" = ANY($2)
        )::integer[]
    );`;

// query koji vraca sve kategorije jednog pitanja
const selectAllCategoryIDsViaPitanjeID: string = `SELECT "kategorijaId" as "id" FROM "pitanjeKategorije" WHERE "pitanjeKategorije"."pitanjeId" = $1;`;

export {
    getAllQuestionsByCategory,
    insertTestTagsQuery,
    selectAllCategoryIDsViaPitanjeID
}