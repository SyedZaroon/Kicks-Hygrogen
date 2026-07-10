import React from 'react';
import Badge from '../ui/Badge';

const ProductBadge = ({ type }) => {
  return (
    <>
      <Badge variant="secondary" text={type} />
    </>
  );
};

export default ProductBadge;