-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "id_tenant" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,
    "id_bag" TEXT,
    CONSTRAINT "Product_id_bag_fkey" FOREIGN KEY ("id_bag") REFERENCES "Bag" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("description", "id", "id_bag", "id_category", "id_tenant", "image", "name", "price") SELECT "description", "id", "id_bag", "id_category", "id_tenant", "image", "name", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
