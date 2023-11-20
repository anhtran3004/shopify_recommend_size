import {
    Page,
    Card,
    DataTable,
} from "@shopify/polaris";
import React, { useEffect, useState } from 'react';
import { json } from "@remix-run/node"
// import { useLoaderData } from "@remix-run/react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";
import MaterialTable from 'material-table';
import indexStyles from "./styles/editor.css";
export const links = () => [{ rel: "stylesheet", href: indexStyles }];
export async function loader() {

    // const user_name = "Lily Nguyen"
    return json({
        id: 1,
        type: "table",
        config: {
            rows: 2,
            cols: 3

        }
    })
}
export default function DetailPage() {
    // const data = useLoaderData<typeof loader>();
    const [columnContentTypes, setColumnContentTypes] = useState([
        'text',
        'numeric',
        'numeric',
        'numeric',
        'numeric',
    ])
    const [heading, setHeading] = useState([
        'Product',
        'Price',
        'SKU Number',
        'Net quantity',
        'Net sales', 
    ])

    const cards = [
        {
            id: 1, type: "table", config: {
                columnContentTypes: columnContentTypes,
                headings: heading,
                rows: [
                    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
                    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
                    [
                        'Navy Merino Wool Blazer with khaki chinos and yellow belt',
                        '$445.00',
                        124518,
                        32,
                        '$14,240.00',
                    ],
                ]

            }
        },
        { id: 2, type: "text", text: "lala" },
        {
            id: 3, type: "cross_table", config: {
                rows: 2,
                cols: 3

            }
        },
        { id: 4, type: "image", url: "https://directus.3drp.tech/assets/24789469-872b-4c73-bcca-dd371eee9637" },
        {
            id: 5, type: "video", url: "https://directus.3drp.tech/assets/571e3f9b-4b42-4749-ab51-fee9a290b391",
            urlImage: "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        },
        { id: 6, type: "divider", text: "hello world! I'm an AI, so i don't this anwser. this question related individual " },
        { id: 7, type: "cross_table" }

    ];

    //daft
    useEffect(() => {
        const mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks,
        });

        new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
                doc: DOMParser.fromSchema(mySchema).parse(
                    document.querySelector("#content")
                ),
                plugins: exampleSetup({ schema: mySchema }),
            }),
        });
    }, []);

    return (

        <Page>
            {cards.map((card) => (

                (card.type === "table") ? (
                    <Card key={card.id}>
                        <DataTable
                            columnContentTypes={card.config?.columnContentTypes as any}
                            headings={card.config?.headings as any}
                            rows={card.config?.rows as any}
                        />
                        <div>
                        {heading.map((x, index) =>(
                            <input value={x} key={x} onChange={() =>setHeading(x)}/>
                        ))}
                        </div>
                    </Card>
                    
                ) :
                    (card.type === "text") ? (
                        <Card key={card.id}>

                            <div id="editor" style={{ display: "flex" }}></div>
                            <div id="content"></div>

                        </Card>
                    ) : (card.type === "image") ? (
                        <Card key={card.id}>
                            <img
                                alt=""
                                width="100%"
                                height="100%"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                                src={card.url}
                            />
                        </Card>
                    ) : (card.type === "video") ? (
                        <Card key={card.id}>
                            <video
                                style={{ width: "640px", height: "360px" }}
                                controls
                                poster={card.urlImage}
                                src={card.url}
                            ></video>
                        </Card>
                    ) : (card.type === "divider") ? (
                        <Card key={card.id}>
                            <div className="container">
                                <div className="border" />
                                <span className="content">{card.text}</span>
                                <div className="border" />
                            </div>
                        </Card>
                    ) : (card.type === "cross_table") ? (
                        <Card key={card.id}>
                                     
                        </Card>

                    ) : null


            ))}

        </Page>
    );
}