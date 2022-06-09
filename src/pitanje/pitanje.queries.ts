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

export {
    getAllQuestionsByCategory
}