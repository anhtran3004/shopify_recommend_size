import {
    Page,
    Text,
    Button,
    Link,
    Card,
    BlockStack,
    InlineStack,
    Autocomplete,
    Icon,
    Select,
    Tag,
    useIndexResourceState,
    IndexTable,
    Modal,
    Pagination

} from "@shopify/polaris";
import {
    DeleteMajor,
    EditMajor,
    SearchMinor
} from '@shopify/polaris-icons';
import { json } from "@remix-run/node"
import indexStyles from "./styles/dashboard.css";
import banner from "./images/banner.png";
//   import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState, useMemo, useCallback } from "react";
export const links = () => [{ rel: "stylesheet", href: indexStyles }];
export async function loader() {

    const user_name = "Lily Nguyen"
    return json({
        user_name: user_name
    })
}
export default function DashboardPage() {
    const user_name = useLoaderData<typeof loader>();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <Page>
            <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "24px" }} >
                <Button variant="primary" tone="critical" onClick={() => console.log('Button clicked')} >Add new size chart</Button>
            </div>
            <div className="banner">
                <img
                    alt=""
                    width="100%"
                    height="100%"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    src={banner}
                />
                <div className="text-banner">
                    <p style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "2px" }}>Hi {user_name.user_name}!</p>
                    <p style={{ fontSize: "14px", fontWeight: "regular" }}>Welcome to Fashion AI Size Chart and Recomemeder</p>

                    {/* <Text variant="headingXl" as="h2" fontWeight="bold">
                        Hi {user_name.user_name}!
                    </Text>
                    <Text as="p">
                        Welcome to Fashion AI Size Chart and Recomemeder
                    </Text> */}
                </div>
            </div>
            <div style={{ background: "#FDEDED", border: "1px solid #FBDADA", borderRadius: "8px", padding: "24px", marginTop: "24px", marginBottom: "24px" }}>
                <p style={{ fontWeight: "bold", fontSize: "16px", paddingBottom: "15px" }}>Create and customize your size chart and recommender</p>
                <p style={{ fontSize: "14px", paddingBottom: "15px" }}>Create, customize your own size chart, intergrate size recommendation and more</p>
                <Button>Add new size chart</Button>
                <span style={{ paddingLeft: "24px" }}>
                    <Link url="">Learn moreabout how to create a size chart</Link>
                </span>
            </div>
            <Card>
                <Text variant="headingLg" as="h6">
                    Onboarding Video
                </Text>
                {/* <VideoThumbnail
                    videoLength={80}
                    videoProgress={45}
                    showVideoProgress
                    thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                    onClick={() => console.log('clicked')}
                /> */}
                <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "24px" }}>
                    <video
                        style={{ width: "640px", height: "360px" }}
                        controls
                        poster="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                        src="https://directus.3drp.tech/assets/571e3f9b-4b42-4749-ab51-fee9a290b391"
                    ></video>
                </div>
            </Card>
            <SizeBox />

            <div style={{ paddingTop: "24px", paddingBottom: "24px" }}>
                <Card>
                    <p style={{ fontSize: "16px", fontWeight: "bold", paddingBottom: "10px" }}>Product help guides</p>
                    <BlockStack align="start">
                        <Placeholder height="85px" width="100%" label="How to create my first size chart?" content="The management of products or other resources as they travel between a point of origin and a destination." showBorder />
                        <Placeholder height="85px" width="100%" label="How does Fashion AI help  my shop?" content="It helps you reduce returning rate. In fact, the average online apparel retailer experiences a return rate of 28%, and 80% of these returns are due to fit issues, she added." showBorder />
                        <Placeholder height="85px" width="100%" content="We are willing to help you, please follow the help desk document or contact us." label="How to learn more about  the app?" />
                    </BlockStack>
                </Card>
            </div>
            <Card>
                <p style={{ fontSize: "16px", fontWeight: "bold", paddingBottom: "16px" }}>Enjoy Fashion AI Sizing</p>
                <p style={{ fontSize: "14px", fontWeight: "regular", paddingBottom: "16px" }}>Select a star to rate it on Shopify store</p>
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || rating) ? "on" : "off"}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <span className="star">&#9733;</span>
                            </button>
                        );
                    })}
                </div>
            </Card>



        </Page>
    );
}

const SizeBox = () => {
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
            <div style={{display:"flex", justifyContent:"flex-end"}}>
            <PaginationItems />
            </div>
            
        </Card>
    )
}
const PaginationItems = () => {
    return (
        <Pagination
            label="Page"
            hasPrevious
            onPrevious={() => {
                console.log('Previous');
            }}
            hasNext
            onNext={() => {
                console.log('Next');
            }}
        />
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
const Placeholder = ({
    label = '',
    content = '',
    height = 'auto',
    width = 'auto',
    showBorder = false,
}) => {
    return (
        <div
            style={{
                //   background: 'var(--p-color-text-info)',
                padding: '14px var(--p-space-200)',
                height: height,
                width: width,
                borderBlockEnd: showBorder
                    ? '1px solid #E1E3E5'
                    : 'none',
            }}
        >
            <InlineStack>
                <div
                    style={{
                        color: 'var(--p-color-text-info-on-bg-fill)',
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <span style={{ fontWeight: "bold", fontSize: "14px", width: "320px" }}>{label}</span>
                    <span style={{ fontWeight: "regular", fontSize: "14px", width: "580px" }}>{content}</span>
                    {/* <Text as="h2" variant="bodyMd" fontWeight="bold">
                        {label}
                    </Text>
                    <Text as="h2" variant="bodyMd" fontWeight="regular">
                        {content}
                    </Text> */}
                </div>
            </InlineStack>
        </div>
    );
};

