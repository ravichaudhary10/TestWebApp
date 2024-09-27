import React from "react";
import { Person } from "../../types/commonTypes";
import "./PersonInfoCard.styles.scss";

// Prime react imports
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

const CHANGE_LABEL = "Change";
const REMOVE_LABEL = "Remove";

interface PersonInfoCardProps {
  model: Person | null;
  showActionButtons?: boolean;
  onChange?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  onRemove?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  isSelectable?: boolean;
}

const PersonInfoCard: React.FC<PersonInfoCardProps> = ({
  model,
  showActionButtons = false,
  onChange,
  onRemove,
  isSelectable = false,
}) => {
  if (!model) {
    return null;
  }

  return (
    <div
      className={classNames({
        "search-result-card flex flex-column gap-2": true,
        selectable: isSelectable,
      })}
    >
      {showActionButtons && (
        <div className="flex justify-content-end gap-2">
          <Button
            label={CHANGE_LABEL}
            outlined
            size="small"
            onClick={onChange}
          />
          <Button
            label={REMOVE_LABEL}
            outlined
            size="small"
            onClick={onRemove}
          />
        </div>
      )}
      <div className="flex justify-content-between">
        <div className="flex flex-column">
          <span className="font-bold text-sm secondary-text">Email</span>
          <span className="font-normal text-base primary-text">
            {model.email}
          </span>
        </div>
        <div className="flex flex-column text-right">
          <span className="font-bold text-sm secondary-text">
            Novartis 521 Id
          </span>
          <span className="font-normal text-base primary-text">
            {model.novartis521ID}
          </span>
        </div>
      </div>
      <div className="flex justify-content-between">
        <div className="flex flex-column">
          <span className="font-bold text-sm secondary-text">Full Name</span>
          <span className="font-normal text-base primary-text">{`${model.firstName} ${model.lastName}`}</span>
        </div>
        <div className="flex flex-column text-right">
          <span className="font-bold text-sm secondary-text">Title</span>
          <span className="font-normal text-base primary-text">
            {model.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonInfoCard;
