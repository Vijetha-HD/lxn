import React from 'react';
import Card from './Card';
const ChartPlaceholder = ({ title, icon: IconComponent, children }) => (
    <Card className="p-4 md:p-6 h-full">
        <div className="flex items-center mb-4">
            {IconComponent && <IconComponent className="w-6 h-6 mr-3 text-primaryAccent" />}
            <h3 className="text-lg font-semibold text-textDark dark:text-textLight">{title}</h3>
        </div>
        <div className="h-64">{children}</div>
    </Card>
);
export default ChartPlaceholder;
