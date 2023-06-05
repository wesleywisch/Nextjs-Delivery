-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "streetNumber" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "complement" TEXT,
    "user_email" TEXT NOT NULL,
    "id_district" TEXT NOT NULL,
    CONSTRAINT "user_addresses_id_district_fkey" FOREIGN KEY ("id_district") REFERENCES "districts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_addresses_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "districts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "id_tenant" TEXT NOT NULL,
    CONSTRAINT "districts_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tenantPrimaryColor" TEXT NOT NULL,
    "tenantSecondaryColor" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "id_tenant" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,
    "id_bag" TEXT NOT NULL,
    CONSTRAINT "Product_id_bag_fkey" FOREIGN KEY ("id_bag") REFERENCES "Bag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "number_order" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payment_method" TEXT NOT NULL,
    "payment_money_return" REAL,
    "delivery_Price" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "order_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_tenant" TEXT NOT NULL,
    "id_address" TEXT NOT NULL,
    "id_coupon" TEXT NOT NULL,
    CONSTRAINT "Orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "user_addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_id_coupon_fkey" FOREIGN KEY ("id_coupon") REFERENCES "coupons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_order" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    CONSTRAINT "order_product_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "discountFixed" REAL,
    "discuntPercentage" REAL
);

-- CreateTable
CREATE TABLE "Banners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "id_tenant" TEXT NOT NULL,
    CONSTRAINT "Banners_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_order" TEXT NOT NULL,
    CONSTRAINT "order_status_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "id_tenant" TEXT NOT NULL,
    CONSTRAINT "Bag_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bag_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_email_key" ON "tenants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bag_id_user_key" ON "Bag"("id_user");
