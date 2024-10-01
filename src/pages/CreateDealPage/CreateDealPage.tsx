import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Breadcrumb } from "../../components/Breadcrumb";
import {} from "./CreateDealPage.constants";
import { PersonSearch } from "../../components/PersonSearch";
import { Person } from "../../types/commonTypes";
import { PersonInfoCard } from "../../components/PersonInfoCard";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { getBreadcrumbItems, getPageTitle } from "./CreateDealPage.helpers";

import {
  CANCEL,
  SAVE,
  SUCCESS_MESSAGES,
} from "../../constants/global.constants";

import {
  DEAL_NAME,
  DEAL_STAGE,
  THERAPEUTIC_AREA,
  DEAL_LEAD,
  DEAL_LEAD_DETAILS,
  ADD_DEAL_LEAD,
  CONFIRMATION_ACCEPT_LABEL,
  CONFIRMATION_REJECT_LABEL,
  DEAL_LEAD_REMOVAL_CONFIRMATION_HEADER,
  DEAL_LEAD_REMOVAL_CONFIRMATION_MSG,
  CANCEL_CREATE_DEAL_CONFIRMATION_MSG,
  CANCEL_CREATE_DEAL_CONFIRMATION_HEADER,
  REQUIRED_MESSAGE,
  Field,
} from "./CreateDealPage.constants";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

// Prime react imports
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import useAuth from "../../hooks/useAuth";
import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";

const CreateDealPage: React.FC = () => {
  // States
  const [lastDealLeadInfo, setLastDealLeadInfo] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  // Selectors
  const therapeuticAreas = useAppSelector((state) => state.therapeuticAreas);
  const stages = useAppSelector((state) => state.stages);

  // useForm hook for form validation
  const defaultValues = {
    [Field.DEAL_NAME]: "",
    [Field.DEAL_STAGE]: null,
    [Field.THERAPEUTIC_AREA]: null,
    [Field.DEAL_LEAD]: null,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues, mode: "onSubmit" });

  // Dispatch function
  const dispatch = useAppDispatch();

  // Navigate function
  const navigate = useNavigate();

  // Get params if any
  const params = useParams<{ dealId: string }>();

  // Fetch the deal details if this is edit deal page.
  useEffect(() => {
    if (params.dealId) {
      const fetchDealDetail = async (dealId: number) => {
        // Show loading spinner
        setIsLoading(true);

        try {
          const response = await ApiManager.fetchDealDetail(dealId);
          if (response.data) {
            reset({
              [Field.DEAL_NAME]: response.data.name,
              [Field.DEAL_STAGE]: response.data.stage.id,
              [Field.THERAPEUTIC_AREA]: response.data.therapeuticArea.id,
              [Field.DEAL_LEAD]: response.data.dealLeads?.[0],
            });
          }
        } catch (error: any) {
          // Show error toast
          handleError(dispatch, error);
        } finally {
          // Hide loading spinner
          setIsLoading(false);
        }
      };

      fetchDealDetail(parseInt(params.dealId));
    }
  }, [params.dealId, dispatch, reset]);

  /**
   * Gets invoked when user clicks form cancel button
   */
  const handleCancelClick = (e: any) => {
    e.preventDefault();

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
  const handleSave = (formData: any) => {
    console.log("Form data: ", formData);

    // Form payload
    const payload = {
      name: formData.name,
      stage: formData.stage,
      therapeuticArea: formData.therapeuticArea,
      dealLead: formData.dealLead.id,
      userId: user?.id,
    };

    const dealId = params.dealId ? parseInt(params.dealId) : null;
    createDeal(dealId, payload);
  };

  /**
   * Creates/edits a deal by making an API call and passing required data to
   * @param dealId - Either null in case of create or Id of the deal in case of edit
   * @param data - Payload to pass on to create/edit deal API call
   */
  const createDeal = async (dealId: number | null, data: any) => {
    try {
      // Show loading spinner
      setIsLoading(true);

      // Check whether it is edit or create deal call
      if (dealId) {
        await ApiManager.updateDeal(dealId, data);

        // Show success toast
        handleSuccess(dispatch, SUCCESS_MESSAGES.DEAL_UPDATION_SUCCESS);
      } else {
        await ApiManager.createDeal(data);

        // Show success toast
        handleSuccess(dispatch, SUCCESS_MESSAGES.DEAL_CREATION_SUCCESS);
      }

      // Go back to previous view on success
      navigate(-1);
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
      // Hide loading spinner
      setIsLoading(false);
    }
  };

  const requiredFieldIndicator = <span className="required-text">*</span>;

  /**
   * Clear out existing deal lead info for the user to select a new one
   */
  const changeDealLead = (field: any) => {
    // Keep track of existing deal lead info before clearing it out
    setLastDealLeadInfo(field.value);

    // Clears out deal lead info
    field.onChange(null);
  };

  /**
   * Clear out deal lead info after confirmation
   */
  const removeDealLead = (field: any) => {
    // showDealLeadRemovalConfirmationDialog(() => {
    // Clears out deal lead info
    field.onChange(null);
    // });
  };

  /**
   * Update deal lead info with the person info passed as parameter.
   * @param person
   */
  const updateDealLeadInfo = (person: Person, field: any) => {
    field.onChange(person);
    setLastDealLeadInfo(null);
  };

  /**
   * Cancels the deal lead change flow
   */
  const cancelDealLeadChange = (field: any) => {
    // Restore back to last deal lead info
    if (lastDealLeadInfo) {
      field.onChange(lastDealLeadInfo);
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

  const getFormErrorMessage = (name: string) => {
    return (
      (errors as any)[name]?.message && (
        <small className="error-text">
          {(errors as any)[name].message.toString()}
        </small>
      )
    );
  };

  return (
    <div className="flex flex-column align-items-center">
      {isLoading && <LoadingIndicator />}

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
        <Breadcrumb items={getBreadcrumbItems(!!params.dealId)} />

        {/* Create deal form */}
        <form>
          {/* Page Header section */}
          <div className="flex align-items-center mb-5 w-full">
            <h1 className="font-bold text-xl line-height-2">
              {getPageTitle(!!params.dealId)}
            </h1>

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
                onClick={handleSubmit(handleSave)}
              />
            </div>
          </div>

          <div className="flex flex-column gap-4">
            {/* Deal name field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {DEAL_NAME}
                {requiredFieldIndicator}
              </div>
              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={Field.DEAL_NAME}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace("{0}", DEAL_NAME),
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        maxLength={250}
                        className={
                          "w-5 " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />
                  <label>Type</label>
                </div>
                {getFormErrorMessage(Field.DEAL_NAME)}
              </div>
            </div>

            {/* Deal stage field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {DEAL_STAGE}
                {requiredFieldIndicator}
              </div>
              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={Field.DEAL_STAGE}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace("{0}", DEAL_STAGE),
                    }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={stages || []}
                        optionLabel="label"
                        className={
                          "w-5 " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />

                  <label>Select</label>
                </div>
                {getFormErrorMessage(Field.DEAL_STAGE)}
              </div>
            </div>

            {/* Therapeutic area field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {THERAPEUTIC_AREA}
                {requiredFieldIndicator}
              </div>

              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={Field.THERAPEUTIC_AREA}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace(
                        "{0}",
                        THERAPEUTIC_AREA
                      ),
                    }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={therapeuticAreas || []}
                        optionLabel="label"
                        className={
                          "w-5 " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />

                  <label>Select</label>
                </div>
                {getFormErrorMessage(Field.THERAPEUTIC_AREA)}
              </div>
            </div>

            <Controller
              name={Field.DEAL_LEAD}
              control={control}
              rules={{
                required: REQUIRED_MESSAGE.replace("{0}", DEAL_LEAD),
              }}
              render={({ field, fieldState }) => (
                <div>
                  {/* Add deal lead section */}
                  {!field.value && (
                    <div className="flex flex-column gap-2 w-5">
                      <div className="font-bold text-base">
                        {ADD_DEAL_LEAD} {requiredFieldIndicator}
                      </div>

                      <PersonSearch
                        onUpdate={(model: Person) => {
                          updateDealLeadInfo(model, field);
                        }}
                        onCancel={() => {
                          cancelDealLeadChange(field);
                        }}
                        showCancel={!!lastDealLeadInfo}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    </div>
                  )}

                  {getFormErrorMessage(Field.DEAL_LEAD)}

                  {/* Section showing deal lead information */}
                  {field.value && (
                    <div className="flex flex-column gap-2 w-5">
                      <div className="font-bold text-base">
                        {DEAL_LEAD_DETAILS}
                      </div>

                      <PersonInfoCard
                        model={field.value}
                        showActionButtons
                        onChange={() => {
                          // e.preventDeafult();
                          // e.stopPropagation();
                          changeDealLead(field);
                        }}
                        onRemove={() => {
                          // e.preventDeafult();
                          // e.stopPropagation();
                          removeDealLead(field);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDealPage;
