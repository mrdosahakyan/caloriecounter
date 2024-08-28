import React, { useState } from 'react';
import { Card } from '@nextui-org/react';

type CardItem = {
  id: number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

type SelectableCardsProps = {
  items: CardItem[];
  onSelect: (id: number) => void;
};

const SelectableCards: React.FC<SelectableCardsProps> = ({ items, onSelect }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div className="flex flex-col space-y-4">
      {items.map((item) => (
        <Card
          key={item.id}
          isPressable
          onClick={() => handleSelect(item.id)}
          className={`flex items-center p-4 rounded-lg shadow-md w-[358px] h-[90px] ${
            selectedId === item.id
              ? 'border-2 border-[#FEB816] bg-[#FFF2D5]'
              : 'bg-white'
          }`}
        >
          <div className="flex items-center space-x-4">
            {item.icon && <div>{item.icon}</div>}
            <div>
              <h4 className="font-inter text-[16px] font-semibold leading-[22px] text-left text-[#021533]">
                {item.title}
              </h4>
              {item.description && (
                <p className="font-inter text-[14px] font-normal leading-[18px] text-left text-[#434F62]">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SelectableCards;
