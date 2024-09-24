import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Breadcrumb } from "../../components/Breadcrumb";
import { BREADCRUMB_ITEMS } from "./CreateDealPage.constants";
import { PersonSearch } from "../../components/PersonSearch";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";

import {
  CANCEL,
  CREATE_NEW_DEAL,
  SAVE,
} from "../../constants/global.constants";

import {
  DEAL_NAME,
  DEAL_STAGE,
  THERAPEUTIC_AREA,
  DEAL_LEAD_DETAILS,
  ADD_DEAL_LEAD,
  CONFIRMATION_ACCEPT_LABEL,
  CONFIRMATION_REJECT_LABEL,
  DEAL_LEAD_REMOVAL_CONFIRMATION_HEADER,
  DEAL_LEAD_REMOVAL_CONFIRMATION_MSG,
  CANCEL_CREATE_DEAL_CONFIRMATION_MSG,
  CANCEL_CREATE_DEAL_CONFIRMATION_HEADER,
} from "./CreateDealPage.constants";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// Prime react imports
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Person } from "../../types/commonTypes";
import { PersonInfoCard } from "../../components/PersonInfoCard";

const CreateDealPage: React.FC = () => {
  // States
  const [dealName, setDealName] = useState<string>("");
  const [selectedTA, setSelectedTA] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [dealLeadInfo, setDealLeadInfo] = useState<Person | null>(null);
  const [lastDealLeadInfo, setLastDealLeadInfo] = useState<Person | null>(null);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] =
    useState<boolean>(false);

  // Selectors
  const therapeuticAreas = useAppSelector((state) => state.therapeuticAreas);
  const stages = useAppSelector((state) => state.stages);

  // Dispatch function
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  /**
   * Gets invoked when user clicks form cancel button
   */
  const handleCancelClick = () => {
    const accept = () => {
      navigate(-1);
    };

    confirmDialog({
      message: CANCEL_CREATE_DEAL_CONFIRMATION_MSG,
      header: CANCEL_CREATE_DEAL_CONFIRMATION_HEADER,
      accept,
    });
  };

  /**
   * Gets invoked when user clicks form save button
   */
  const handleSaveClick = () => {
    // dispatch(SAVE_DEAL);
  };

  const requiredFieldIndicator = <span className="required-text">*</span>;

  /**
   * Clear out existing deal lead info for the user to select a new one
   */
  const changeDealLead = () => {
    // Keep track of existing deal lead info before clearing it out
    setLastDealLeadInfo(dealLeadInfo);

    // Clears out deal lead info
    setDealLeadInfo(null);
  };

  /**
   * Clear out deal lead info after confirmation
   */
  const removeDealLead = () => {
    showDealLeadRemovalConfirmationDialog(() => {
      // Clears out deal lead info
      setDealLeadInfo(null);
    });
  };

  /**
   * Update deal lead info with the person info passed as parameter.
   * @param person
   */
  const updateDealLeadInfo = (person: Person) => {
    // Update deal lead info
    setDealLeadInfo(person);

    // Clear last deal lead info if any
    if (lastDealLeadInfo) {
      setLastDealLeadInfo(null);
    }
  };

  /**
   * Cancels the deal lead change flow
   */
  const cancelDealLeadChange = () => {
    // Restore back to last deal lead info
    if (lastDealLeadInfo) {
      setDealLeadInfo(lastDealLeadInfo);
      setLastDealLeadInfo(null);
    }
  };

  /**
   * Shows a confirmation popup when user clicks the remove deal lead button on person info card
   */
  const showDealLeadRemovalConfirmationDialog = (accept: () => void) => {
    confirmDialog({
      message: DEAL_LEAD_REMOVAL_CONFIRMATION_MSG,
      header: DEAL_LEAD_REMOVAL_CONFIRMATION_HEADER,
      accept,
    });
  };

  return (
    <div className="flex flex-column align-items-center">
      <ConfirmDialog
        acceptLabel={CONFIRMATION_ACCEPT_LABEL}
        rejectLabel={CONFIRMATION_REJECT_LABEL}
        closable={false}
        acceptClassName="p-button-sm"
        rejectClassName="p-button-outlined p-button-sm"
        defaultFocus="reject"
      />

      <Header />

      <div className="flex-1  w-11  p-3">
        <Breadcrumb items={BREADCRUMB_ITEMS} />

        {/* Page Header section */}
        <div className="flex align-items-center mb-5 w-full">
          <h1 className="font-bold text-xl line-height-2">{CREATE_NEW_DEAL}</h1>

          <div className="flex flex-1 gap-2 justify-content-end ">
            <Button
              label={CANCEL}
              size="small"
              outlined
              onClick={handleCancelClick}
            />
            <Button
              label={SAVE}
              size="small"
              onClick={handleSaveClick}
              disabled={!isSaveButtonEnabled}
            />
          </div>
        </div>

        {/* Create deal form */}
        <div className="flex flex-column gap-4">
          {/* Deal name field */}
          <div className="flex flex-column gap-2">
            <div className="font-bold text-base">
              {DEAL_NAME}
              {requiredFieldIndicator}
            </div>
            <div className="p-float-label">
              <InputText
                value={dealName}
                className="w-4"
                onChange={(e) => setDealName(e.target.value)}
              />
              <label>Type</label>
            </div>
          </div>

          {/* Deal stage field */}
          <div className="flex flex-column gap-2">
            <div className="font-bold text-base">
              {DEAL_STAGE}
              {requiredFieldIndicator}
            </div>
            <div className="p-float-label">
              <Dropdown
                value={selectedStage}
                onChange={(e: DropdownChangeEvent) => setSelectedStage(e.value)}
                options={stages || []}
                optionLabel="label"
                className="w-4"
              />

              <label>Select</label>
            </div>
          </div>

          {/* Therapeutic area field */}
          <div className="flex flex-column gap-2">
            <div className="font-bold text-base">
              {THERAPEUTIC_AREA}
              {requiredFieldIndicator}
            </div>
            <div className="p-float-label">
              <Dropdown
                value={selectedTA}
                onChange={(e: DropdownChangeEvent) => setSelectedTA(e.value)}
                options={therapeuticAreas || []}
                optionLabel="label"
                className="w-4"
              />
              <label>Select</label>
            </div>
          </div>

          {/* Add deal lead section */}
          {!dealLeadInfo && (
            <div className="flex flex-column gap-2 w-4">
              <div className="font-bold text-base">
                {ADD_DEAL_LEAD}{" "}
                <span className="optional-text">(optional)</span>
              </div>

              <PersonSearch
                onUpdate={updateDealLeadInfo}
                onCancel={cancelDealLeadChange}
                showCancel={!!lastDealLeadInfo}
              />
            </div>
          )}

          {/* Section showing deal lead information */}
          {dealLeadInfo && (
            <div className="flex flex-column gap-2 w-4">
              <div className="font-bold text-base">{DEAL_LEAD_DETAILS}</div>

              <PersonInfoCard
                model={dealLeadInfo}
                showActionButtons
                onChange={changeDealLead}
                onRemove={removeDealLead}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDealPage;
