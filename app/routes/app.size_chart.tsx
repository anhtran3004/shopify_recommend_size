import {
    Text,
    Card,
    Autocomplete,
    Icon,
    Select,
    Tag,
    useIndexResourceState,
    IndexTable,
    Modal

} from "@shopify/polaris";
import {
    DeleteMajor,
    EditMajor,
    SearchMinor
} from '@shopify/polaris-icons';
import indexStyles from "./styles/dashboard.css";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import React, { useState, useMemo, useCallback } from "react";
import { getSizes } from "../model/SizeChart.server"
export const links = () => [{ rel: "stylesheet", href: indexStyles }];
export async function loader({ request }: LoaderFunctionArgs) {
    const { admin, session } = await authenticate.admin(request)
    const sizes = await getSizes(session.shop, admin.graphql);
    return json({
        sizes
    })
}
// [START empty]
// const Emptysizestate = ({ onAction }: any) => (
//     <EmptyState
//       heading="Create unique QR codes for your product"
//       action={{
//         content: "Create QR code",
//         onAction,
//       }}
//       image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
//     >
//       <p>Allow customers to scan codes and buy products using their phones.</p>
//     </EmptyState>
//   );
// [END empty]
//   function truncate(str, { length = 25 } = {}) {
//     if (!str) return "";
//     if (str.length <= length) return str;
//     return str.slice(0, length) + "…";
//   }
// [START table]
const resourceName = {
    singular: 'order',
    plural: 'orders',
};
// const { selectedResources, allResourcesSelected, handleSelectionChange } =
//         useIndexResourceState(orders);
const SizeChartTable = ({ sizes }: any) => (
    <IndexTable
                resourceName={resourceName}
                itemCount={sizes.length}
                // selectedItemsCount={
                //     allResourcesSelected ? 'All' : selectedResources.length
                // }
                // onSelectionChange={handleSelectionChange}
                headings={[
                    { title: 'Size chart name' },
                    { title: 'Product matching condition' },
                    { title: 'Status' },
                    // { title: 'Total', alignment: 'end' },
                    { title: 'Action' },
                ]}
            >
        {sizes?.map((size: any) => (
            <SizeTableRow key={size.id} size={size} />
        ))}
    </IndexTable>
);
// [END table]
// [START row]
const SizeTableRow = ({ size }: any) => (
    <IndexTable.Row id={size.id} position={size.id}>
        <IndexTable.Cell>
            <p>{size.id}</p>
        </IndexTable.Cell>
        <IndexTable.Cell>
            <p>{size.name}</p>
        </IndexTable.Cell>
        <IndexTable.Cell>
            <p>{size.condition}</p>
        </IndexTable.Cell>
        <IndexTable.Cell>
            <p>{size.status}</p>
        </IndexTable.Cell>
        <IndexTable.Cell>
            <Icon source={EditMajor} tone="base" />
            <ModalAlert />
        </IndexTable.Cell>
    </IndexTable.Row>
);
// [END row]
export default function SizeBox() {
    const sizes = useLoaderData<typeof loader>();
    const deselectedOptions = useMemo(
        () => [
            { value: 'rustic', label: 'Rustic' },
            { value: 'antique', label: 'Antique' },
            { value: 'vinyl', label: 'Vinyl' },
            { value: 'vintage', label: 'Vintage' },
            { value: 'refurbished', label: 'Refurbished' },
        ],
        [],
    );
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);

    const updateText = useCallback(
        (value: string) => {
            setInputValue(value);


            if (value === '') {
                setOptions(deselectedOptions);
                return;
            }

            const filterRegex = new RegExp(value, 'i');
            const resultOptions = deselectedOptions.filter((option) =>
                option.label.match(filterRegex),
            );
            setOptions(resultOptions);
        },
        [deselectedOptions],
    );

    const updateSelection = useCallback(
        (selected: string[]) => {
            const selectedValue = selected.map((selectedItem) => {
                const matchedOption = options.find((option) => {
                    return option.value.match(selectedItem);
                });
                return matchedOption && matchedOption.label;
            });

            setSelectedOptions(selected);
            setInputValue(selectedValue[0] || '');
        },
        [options],
    );
    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            label=""
            value={inputValue}
            prefix={<Icon source={SearchMinor} tone="base" />}
            placeholder="Search size chart"
            autoComplete="off"
        />
    );
    const [selected, setSelected] = useState('newestUpdate');

    const handleSelectChange = useCallback(
        (value: string) => setSelected(value),
        [],
    );

    const optionSorts = [
        { label: 'Newest update', value: 'newestUpdate' },
        { label: 'Oldest update', value: 'oldestUpdate' },
        { label: 'Most spent', value: 'mostSpent' },
        { label: 'Most orders', value: 'mostOrders' },
        { label: 'Last name A–Z', value: 'lastNameAlpha' },
        { label: 'Last name Z–A', value: 'lastNameReverseAlpha' },
    ];
    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };
    const orders = [
        {
            id: '1020',
            name: (
                <Text as="span" variant="bodyMd" fontWeight="bold">
                    SKU 25047 - Milanio midi dress
                </Text>
            ),
            condition: <div className="condition-col">
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Wholesale</Tag>
                </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Collection: Autumn midi dress for vintage style</Tag>
                </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Category: Dress</Tag>
                </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Product vendor: ABC textile company</Tag>
                </span>
            </div>,
            status: <div>
                <p className="tag-publish">Publish</p>
            </div>,
            action: <div style={{ display: "flex" }}>
                <Icon source={EditMajor} tone="base" />
                {/* <Icon source={DeleteMajor} tone="base"/> */}
                <ModalAlert />
            </div>,

        },
        {
            id: '1019',
            name: (
                <Text as="span" variant="bodyMd" fontWeight="bold">
                    SKU 25047 - Milanio midi dress
                </Text>
            ),
            condition: <div className="condition-col"><span style={{ marginBottom: "8px", marginRight: "8px" }}>
                <Tag>Wholesale</Tag>
            </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Collection: Autumn midi dress for vintage style</Tag>
                </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Category: Dress</Tag>
                </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Product vendor: ABC textile company</Tag>
                </span>
            </div>,
            status: <div>
                <p className="tag-publish">Publish</p>
            </div>,
            action: <div style={{ display: "flex" }}>
                <Icon source={EditMajor} tone="base" />
                {/* <Icon source={DeleteMajor} tone="base"/> */}
                <ModalAlert />
            </div>,

        },
        {
            id: '1021',
            name: (
                <Text as="span" variant="bodyMd" fontWeight="bold">
                    SKU 25047 - Milanio midi dress
                </Text>
            ),
            condition: <div className="condition-col"><span style={{ marginBottom: "8px", marginRight: "8px" }}>
                <Tag>Wholesale</Tag>
            </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Collection: Autumn midi dress for vintage style</Tag>
                </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Category: Dress</Tag>
                </span>
                <span style={{ marginBottom: "8px", marginRight: "8px" }}>
                    <Tag>Product vendor: ABC textile company</Tag>
                </span>
            </div>,
            status: <div>
                <p className="tag-publish">Publish</p>
            </div>,
            action: <div style={{ display: "flex", fontSize: "20px" }}>
                <Icon source={EditMajor} tone="base" />
                {/* <Icon source={DeleteMajor} tone="base"/> */}
                <ModalAlert />
            </div>,

        },

    ];
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(orders);
    const rowMarkup = orders.map(
        (
            { id, name, condition, status, action },
            index,
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{condition}</IndexTable.Cell>
                <IndexTable.Cell>{status}</IndexTable.Cell>
                <IndexTable.Cell>{action}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );
    return (

        <Card>
            {/* <p>{user.sessionShop}</p> */}
            {/* <p>{sizes.count}</p>
            <Grid items={sizes.map(size =>(
                <Card key={size.id} >{size.name}</Card>
            ))}> */}

            {/* </Grid> */}
            <SizeChartTable size={sizes} />
            
            <div style={{ height: '45px', display: "flex" }}>
                <div style={{ width: "95%", marginRight: "8px" }}>
                    <Autocomplete
                        options={options}
                        selected={selectedOptions}
                        onSelect={updateSelection}
                        textField={textField}
                    />
                </div>
                <div style={{ width: "17%" }}>
                    <Select
                        label=""
                        labelInline
                        options={optionSorts}
                        onChange={handleSelectChange}
                        value={selected}
                    />

                </div>
            </div>
            <IndexTable
                resourceName={resourceName}
                itemCount={orders.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: 'Size chart name' },
                    { title: 'Product matching condition' },
                    { title: 'Status' },
                    // { title: 'Total', alignment: 'end' },
                    { title: 'Action' },
                ]}
            >
                {rowMarkup}
            </IndexTable>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {/* <PaginationItems /> */}
            </div>

        </Card>
    )
}
const ModalAlert = () => {
    const [active, setActive] = useState(false);

    const toggleModal = useCallback(() => setActive((active) => !active), []);

    const activator = <div onClick={toggleModal}><Icon source={DeleteMajor} tone="base" /></div>;
    return (
        // <Frame>
        <div style={{ height: '30px', display: "flex", alignItems: "center" }}>
            <Modal
                activator={activator}
                open={active}
                onClose={toggleModal}
                title="Delete size chart"
                primaryAction={{
                    destructive: true,
                    content: 'Save',
                    onAction: toggleModal,
                }}
                secondaryActions={[
                    {
                        content: 'Close',
                        onAction: toggleModal,
                    },
                ]}
            >
                <Modal.Section>
                    Are you sure to delete the size chart(s)?
                </Modal.Section>
            </Modal>
        </div>
        // </Frame>
    )
}