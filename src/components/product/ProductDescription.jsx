import React from 'react';
import Accordion from '../ui/Accordion';

export default function ProductDescription({ productDescription }) {
    if (!productDescription) return null;

    return (
        <Accordion title="Product Description">
            <div className="prose prose-sm max-w-none text-gray-600">
                <p>{productDescription}</p>
            </div>
        </Accordion>
    );
}