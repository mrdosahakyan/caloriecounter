"use client";

import { FC, useState } from "react";
import { FoodScanResponse } from "@/app/lib/schemas/foodScanSchema";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  Divider,
} from "@nextui-org/react";

interface FoodScanResultProps {
  result: FoodScanResponse | null;
  isReachedMaxAttempts: boolean;
  error: string | null;
}

const MessageCard: FC<{
  bgColor: string;
  textColor: string;
  title?: string;
  message: string;
}> = ({ bgColor, textColor, title, message }) => (
  <Card
    className={`absolute inset-0 justify-center h-fit m-auto w-[80%] p-2 bg-white/70`}
  >
    {title && (
      <CardHeader className="flex flex-col items-center mb-2">
        <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
      </CardHeader>
    )}
    <CardBody
      className={`text-center text-lg font-medium ${!title && textColor}`}
    >
      <p>{message}</p>
    </CardBody>
  </Card>
);

const FoodScanResult: FC<FoodScanResultProps> = ({
  result,
  isReachedMaxAttempts,
  error,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  if (error) {
    return (
      <MessageCard
        bgColor="bg-danger-100/80"
        textColor="text-danger"
        // title="Error"
        message={error}
      />
    );
  }

  if (!result) {
    return (
      <MessageCard
        bgColor="bg-default-100/80"
        textColor="text-gray-500"
        title="No Result"
        message="No scan result available."
      />
    );
  }

  const { isFood, foodName, ingredients, totalCalories } = result;

  if (!isFood && isReachedMaxAttempts) {
    return (
      <MessageCard
        bgColor="bg-danger-100/80"
        textColor="text-danger"
        title="Max Attempts Reached"
        message=" Please proceed to the next step."
      />
    );
  }

  if (!isFood) {
    return (
      <MessageCard
        bgColor="bg-warning-100/80"
        textColor="text-warning-600"
        title="Not a Food Image"
        message="Please try again with a clear photo of food."
      />
    );
  }

  return (
    <Card className="absolute inset-0 justify-center h-fit m-auto w-[80%] p-2 bg-white/70">
      <CardHeader className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-default-900">{foodName}</h3>
          {totalCalories && (
            <p className="text-xl font-medium text-nowrap">
              {totalCalories} kcal
            </p>
          )}
        </div>
      </CardHeader>
      {ingredients && ingredients.length > 0 && (
        <>
          <CardBody className="flex flex-col items-center">
            <Button
              color="primary"
              variant="light"
              className="ml-auto text-medium font-semibold"
              onPress={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Show less" : "Show more"}
            </Button>
            {showDetails && (
              <div className="w-full space-y-3 overflow-y-auto max-h-60">
                <Divider />
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-4 rounded-md bg-gray-50"
                  >
                    <span className="font-medium">{ingredient.name}</span>
                    <Badge color="secondary" size="sm" variant="flat">
                      {ingredient.calories} kcal
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default FoodScanResult;
