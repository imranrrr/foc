import {
  RangeSlider,
  Card,
  Filters,
  useIndexResourceState,
  DataTable,
  IndexTable,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import BulkActions from "../bulkActions/BulkActions";
import { useAppQuery } from "../../hooks";
import { Link } from "react-router-dom";
const resourceName = {
  singular: "product",
  plural: "products",
};
export default function SeacrchFilter({
  products,
  isProductLoading,
  setProductsData,
  productsData,
  refetchProducts
}) {
  const [moneySpent, setMoneySpent] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFiltersQueryChange = (value) => {
    const flterProducts =
      value !== ""
        ? products.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
          )
        : products;
    setQueryValue(value);
    setProductsData(flterProducts);
  };

  const handleFilterChange = (type, value) => {
    let filterProducts = products;
    if (type === "money") {
      filterProducts = filterProducts.filter(
        (product) =>
          product.variants[0].price >= value[0] &&
          product.variants[0].price <= value[1]
      );
      setMoneySpent(value);
    }
    if (type === "vendor") {
      filterProducts =
        value !== ""
          ? filterProducts.filter(
              (product) => product.vendor.toLowerCase().includes(value.toLowerCase())
            )
          : filterProducts;
      setVendor(value);
    }
    if (type === "input") {
      filterProducts = filterProducts.filter(
        (product) => product.title.toLowerCase().includes(value.toLowerCase())
      );
      setQueryValue(value);
    }
    setProductsData(filterProducts);
  };
  const handleMoneySpentRemove = () => {
    let filterProducts = products;
    setMoneySpent(null);
    if (vendor) {
      filterProducts = filterProducts.filter(
        (product) => product.vendor.toLowerCase().includes(vendor.toLowerCase())
      );
    }
    if (queryValue) {
      filterProducts = filterProducts.filter(
        (product) => product.title.toLowerCase().includes(queryValue.toLowerCase())
      );
    }
    setProductsData(filterProducts);
  };

  const handleVendorValueRemove = useCallback(() => {
    setVendor(null);
    let filterProducts = products;
    if (moneySpent) {
      filterProducts = filterProducts.filter(
        (product) =>
          product.variants[0].price >= value[0] &&
          product.variants[0].price <= value[1]
      );
    }
    if (queryValue) {
      filterProducts = filterProducts.filter(
        (product) => product.title.toLowerCase().incudes(queryValue.toLowerCase())
      );
    }
    setProductsData(filterProducts);
  });

  const handleQueryValueRemove = () => {
    setQueryValue([]);
    let filterProducts = products;
    if (moneySpent) {
      filterProducts = filterProducts.filter(
        (product) =>
          product.price >= moneySpent[0] && product.price <= moneySpent[1]
      );
    }
    if (queryValue) {
      filterProducts = filterProducts.filter(
        (product) => product.title.toLowerCase().includes(queryValue.toLowerCase())
      );
    }
    setProductsData(filterProducts);
  };

  const handleFiltersClearAll = () => {
    handleMoneySpentRemove();
    handleVendorValueRemove();
  };

  const filters = [
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={(value) => handleFilterChange("money", value)}
        />
      ),
    },
    {
      key: "vendor",
      label: "Vendor Name",
      filter: (
        <TextField
          label="Vendor name"
          value={vendor || ""}
          onChange={(value) => handleFilterChange("vendor", value)}
          autoComplete="off"
          labelHidden
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(moneySpent)) {
    const key = "moneySpent";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(vendor)) {
    const key = "vendor";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, vendor),
      onRemove: handleVendorValueRemove,
    });
  }

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

    useEffect(()=>{
      if (!isLoading && products){
        return refetchProducts;
      }
    }, [isLoading])

  const rowMarkup = productsData
    ? productsData.map(({ id, title, variants, vendor, status }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <TextStyle variation="strong">
              <Link
                to={`/product/${id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                {title}
              </Link>
            </TextStyle>
          </IndexTable.Cell>
          <IndexTable.Cell>${variants[0].price}</IndexTable.Cell>
          <IndexTable.Cell>{variants[0].sku}</IndexTable.Cell>
          <IndexTable.Cell>{variants[0].inventory_quantity}</IndexTable.Cell>
          <IndexTable.Cell>
            {variants[0].old_inventory_quantity}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {vendor}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {status}
          </IndexTable.Cell>
        </IndexTable.Row>
      ))
    : null;
  return (
    <div style={{ height: "568px" }}>
      <Card>
        <Card.Section>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={() => handleFiltersClearAll()}
          >
            <BulkActions products={products} selectedProducts={selectedResources} setLoading={setIsLoading} loading={isLoading}/>
          </Filters>
        </Card.Section>
        <IndexTable
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          loading={isLoading || isProductLoading}
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Product Title" },
            { title: "Price" },
            { title: "SKU Number" },
            { title: "Net Quantity" },
            { title: "Total Quantity" },
            { title: "vendor" },
            { title: "Status" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "moneySpent":
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case "vendor":
        return `vendor with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}