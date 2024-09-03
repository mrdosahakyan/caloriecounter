import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";

export type TCardItem = {
  id: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
};

type SelectableCardsProps = {
  items: TCardItem[];
  onSelect: (id: string) => void;
  defaultValue?: string;
};

const SelectableCards: React.FC<SelectableCardsProps> = ({
  items,
  onSelect,
  defaultValue,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    defaultValue || null
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedId(defaultValue);
    }
  }, [defaultValue]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {items.map((item) => (
        <Card
          radius="lg"
          key={item.id}
          isPressable
          onClick={() => handleSelect(item.id)}
          className={`flex items-center p-4 shadow-md w-full h-[90px] ${
            selectedId === item.id
              ? "border-2 border-[#FEB816] bg-[#FFF2D5]"
              : "bg-white"
          }`}
        >
          <div className="flex w-full h-full items-center space-x-5">
            {item.icon && <div>{item.icon}</div>}
            <div>
              <h4
                className={`font-inter text-[16px] ${
                  item.description ? "font-semibold" : "font-medium"
                }  leading-[22px] text-left text-primaryTextColor`}
              >
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
