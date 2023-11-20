import { DataTypes } from './utils';
import TextCell from './TextCell';
import NumberCell from './NumberCell';
export default function Cell({
    value: initialValue,
    row: { index },
    column: { id, dataType, options },
    dataDispatch,
  }) {
    function getCellElement() {
      switch (dataType) {
        case DataTypes.TEXT:
          return (
            <TextCell
              initialValue={initialValue}
              rowIndex={index}
              columnId={id}
              dataDispatch={dataDispatch}
            />
          );
        case DataTypes.NUMBER:
          return (
            <NumberCell
              initialValue={initialValue}
              rowIndex={index}
              columnId={id}
              dataDispatch={dataDispatch}
            />
          );
        default:
          return <span></span>;
      }
    }
  
    return getCellElement();
  }