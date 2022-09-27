import {
  RangeSlider,
  Card,
  ResourceList,
  Filters,
  Avatar,
  TextStyle,
  useIndexResourceState,
  IndexTable,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import BulkActions from "../bulkActions/BulkActions";
import { useAppQuery } from "../../hooks";
import { Link } from "react-router-dom";
const resourceName = {
  singular: "product",
  plural: "products",
};
export default function ResourceListFiltersExample() {
  const [moneySpent, setMoneySpent] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([])

  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    []
  );

  const handleFiltersVendorChange = useCallback(
    (value) => setVendor(value),
    []
  );

  const handleFiltersQueryChange = useCallback(
    (value) => {
      debugger
    const flterProducts = (value !== '')  ? productsData.map((product) => product.title.toLowerCase().startsWith(value)) : products
    setQueryValue(value)
    setProductsData(flterProducts)
  },[queryValue, setQueryValue]);

  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleVendorValueRemove = useCallback(() => setVendorValue(null), []);
  const handleQueryValueRemove = useCallback(() => {  
    setQueryValue(null)
    setProductsData(products)
  }, [queryValue, setQueryValue]);
  const handleFiltersClearAll = useCallback(() => {
    handleMoneySpentRemove();
    handleVendorValueRemove();
  }, [handleMoneySpentRemove, handleVendorValueRemove]);

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
          onChange={handleMoneySpentChange}
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

  const {
    data,
    refetch: refetchProducts,
    isLoading: isProductLoading,
  } = useAppQuery({
    url: "/api/products",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  useEffect(() => {
    if (!isProductLoading && data) {
      setProducts(data);
      setProductsData(data)
    } else {
      setIsLoading(true);
    }
  }, [data, isProductLoading]);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  // let prods = products.filter((prod) =>
  //   prod.title.toLowerCase().startsWith(input.toLowerCase())
  // );

  const rowMarkup = productsData
    ? productsData.map(({ id, title, variants }, index) => (
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
        </IndexTable.Row>
      ))
    : null;


  return (
    <div style={{ height: "568px" }}>
      <Card>
        <ResourceList
          resourceName={{ singular: "customer", plural: "customers" }}
          filterControl={
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleFiltersClearAll}
            >
              <BulkActions />
            </Filters>
          }
          items={[{}, {}]}
          renderItem={() => {
            return (
              <ResourceList.Item>
                <Card sectioned actions={[]}>
                  <IndexTable
                    resourceName={resourceName}
                    itemCount={productsData.length}
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
                    ]}
                  >
                    {rowMarkup}
                  </IndexTable>
                </Card>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "moneySpent":
        return `Money spent is between $${value[0]} and $${value[1]}`;
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
