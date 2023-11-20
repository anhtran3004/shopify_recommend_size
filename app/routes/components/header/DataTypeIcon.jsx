import React from 'react';
import { DataTypes } from '../utils';
import TextIcon from '../../images/Text';
import MultiIcon from '../../images/Multi';
import HashIcon from '../../images/Hash';

export default function DataTypeIcon({ dataType }) {
  function getPropertyIcon(dataType) {
    switch (dataType) {
      case DataTypes.NUMBER:
        return <HashIcon />;
      case DataTypes.TEXT:
        return <TextIcon />;
      case DataTypes.SELECT:
        return <MultiIcon />;
      default:
        return null;
    }
  }

  return getPropertyIcon(dataType);
}
