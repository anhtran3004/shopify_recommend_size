import { faker } from '@faker-js/faker';
export function shortId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
export function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 95%, 90%)`;
}
export function makeData(count) {
    let data = [];
    let options = [];
    // let json = [
    //     {
    //         ID: 1,
    //         firstName: "Wayne",
    //         lastName:"Fadel",
    //         email: "Neil_Crooks@gmail.com",
    //         age: 45
    //     },
    //     {
    //         ID: 2,
    //         firstName: "Charity",
    //         lastName:"Fadel",
    //         email: "Lue_Carroll75@gmail.com",
    //         age: 43
    //     },
    // ]
    for (let i = 0; i < count; i++) {
        let row = {
            ID: faker.number.int(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: Math.floor(20 + Math.random() * 20),
            music: faker.music.genre(),
        };
        options.push({ label: row.music, backgroundColor: randomColor() });

        data.push(row);
    }
    // for (let i = 0; i < json.length; i++) {
        
    

    //     data.push(json[i]);
    

    options = options.filter(
        (a, i, self) => self.findIndex(b => b.label === a.label) === i
    );
    let columns = [
        {
            id: 'firstName',
            label: 'First Name',
            accessor: 'firstName',
            minWidth: 100,
            dataType: DataTypes.TEXT,
            options: [],
        },
        {
            id: 'lastName',
            label: 'Last Name',
            accessor: 'lastName',
            minWidth: 100,
            dataType: DataTypes.TEXT,
            options: [],
        },
        {
            id: 'age',
            label: 'Age',
            accessor: 'age',
            width: 80,
            dataType: DataTypes.NUMBER,
            options: [],
        },
        {
            id: 'email',
            label: 'E-Mail',
            accessor: 'email',
            width: 300,
            dataType: DataTypes.TEXT,
            options: [],
        },
        {
            id: Constants.ADD_COLUMN_ID,
            width: 20,
            label: '+',
            disableResizing: true,
            dataType: 'null',
        },
    ];
    return { columns: columns, data: data, skipReset: false };
}
export const ActionTypes = Object.freeze({
    ADD_OPTION_TO_COLUMN: 'add_option_to_column',
    ADD_ROW: 'add_row',
    UPDATE_COLUMN_TYPE: 'update_column_type',
    UPDATE_COLUMN_HEADER: 'update_column_header',
    UPDATE_CELL: 'update_cell',
    ADD_COLUMN_TO_LEFT: 'add_column_to_left',
    ADD_COLUMN_TO_RIGHT: 'add_column_to_right',
    DELETE_COLUMN: 'delete_column',
    ENABLE_RESET: 'enable_reset',
});
export const DataTypes = Object.freeze({
    NUMBER: 'number',
    TEXT: 'text',
    SELECT: 'select',
});
export const Constants = Object.freeze({
    ADD_COLUMN_ID: 999999,
});