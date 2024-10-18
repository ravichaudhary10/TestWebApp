import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Breadcrumb } from "../../components/Breadcrumb";
import { PersonSearch } from "../../components/PersonSearch";
import { Person } from "../../types/commonTypes";
import { PersonInfoCard } from "../../components/PersonInfoCard";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Resource, ResourceListField } from "../../components/ResourceListView";

import useAuth from "../../hooks/useAuth";
import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";

import {
  CANCEL,
  CANCEL_FORM_CONFIRMATION_HEADER,
  CANCEL_FORM_CONFIRMATION_MSG,
  CANCEL_LABEL,
  CONFIRM_LABEL,
  REQUIRED_MESSAGE,
  SAVE,
  SUCCESS_MESSAGES,
} from "../../constants/global.constants";

import {
  getBreadcrumbItems,
  getFormValues,
  getPageTitle,
} from "./AddResourcePage.helper";

import {
  RESOURCE_DETAILS_LABEL,
  RESOURCE_DETAILS_KEY,
  STAGES,
} from "./AddResourcePage.constants";

import {
  EMAIL,
  LINE_FUNCTION,
  STAGE,
  VDR_ACCESS,
  WEB_TRAINING,
  KICK_OFF_ATTENDANCE,
  OPTIONAL,
  CORE_TEAM_MEMBER,
  webTrainingOptions,
  booleanOptions,
} from "../../components/ResourceListView/ResourceListView.constants";

// Prime react imports
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { isValidId } from "../../utils/isValidId";

const AddResourcePage: React.FC = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  // Selectors
  const stages = useAppSelector((state) => state.stages);
  const lineFunctions = useAppSelector((state) => state.lineFunctions);

  // useForm hook for form validation
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: getFormValues(null), mode: "onSubmit" });

  // Dispatch function
  const dispatch = useAppDispatch();

  // Navigate function
  const navigate = useNavigate();

  // Get params if any
  const {
    dealId = "",
    resourceId = "",
    stageId = "",
  } = useParams<{
    dealId: string;
    resourceId: string;
    stageId: string;
  }>();

  // Fetch the resource details if this is edit resource page.
  useEffect(() => {
    // Validate dealId, stageId and resourceId
    if (!isValidId(dealId) || !isValidId(resourceId) || !isValidId(stageId)) {
      return;
    }

    const fetchResourceDetail = async () => {
      // Show loading spinner
      setIsLoading(true);

      try {
        const response = await ApiManager.fetchResourceDetail(
          parseInt(resourceId),
          parseInt(dealId),
          parseInt(stageId)
        );
        if (response.data) {
          reset(getFormValues(response.data as Resource));
        }
      } catch (error: any) {
        // Show error toast
        handleError(dispatch, error);
      } finally {
        // Hide loading spinner
        setIsLoading(false);
      }
    };

    fetchResourceDetail();
  }, [dealId, resourceId, stageId, user, dispatch, reset]);

  /**
   * Gets invoked when user clicks form cancel button
   */
  const handleCancelClick = (e: any) => {
    e.preventDefault();

    const accept = () => {
      navigate(-1);
    };

    confirmDialog({
      message: CANCEL_FORM_CONFIRMATION_MSG,
      header: CANCEL_FORM_CONFIRMATION_HEADER,
      accept,
    });
  };

  /**
   * Gets invoked when user clicks form save button
   */
  const handleSave = (formData: any) => {
    // Validate dealId
    if (!isValidId(dealId)) {
      return;
    }

    // Form payload
    const payload = {
      userId: user?.id,
      dealId: parseInt(dealId),
      resources: [
        {
          [ResourceListField.EMAIL]: formData[RESOURCE_DETAILS_KEY].email,
          stages: formData.stages,
          [ResourceListField.LINE_FUNCTION]:
            formData[ResourceListField.LINE_FUNCTION],
          [ResourceListField.VDR_ACCESS]:
            formData[ResourceListField.VDR_ACCESS] === "yes",
          [ResourceListField.WEB_TRAINING]:
            formData[ResourceListField.WEB_TRAINING],
          [ResourceListField.KICK_OFF_ATTENDANCE]:
            formData[ResourceListField.KICK_OFF_ATTENDANCE],
          [ResourceListField.CORE_TEAM_MEMBER]:
            formData[ResourceListField.CORE_TEAM_MEMBER] === "yes",
          [ResourceListField.OPTIONAL]: formData[ResourceListField.OPTIONAL],
        },
      ],
    };

    // Add the resource
    addResource(payload);
  };

  /**
   * Adds/updates a resource by making an API call and passing required data
   * @param data - Payload for create/edit resource API call
   */
  const addResource = async (data: any) => {
    try {
      // Show loading spinner
      setIsLoading(true);

      // Check whether we are adding or updating the resource
      if (dealId && resourceId && stageId) {
        await ApiManager.updateResource(data);

        // Show success toast
        handleSuccess(dispatch, SUCCESS_MESSAGES.RESOURCE_UPDATION_SUCCESS);
      } else {
        await ApiManager.addResources(data);

        // Show success toast
        handleSuccess(dispatch, SUCCESS_MESSAGES.RESOURCE_CREATION_SUCCESS);
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

  /**
   * Update resource info with the person info passed as parameter.
   * @param person
   */
  const updateResourceInfo = (person: Person, field: any) => {
    // Update the field value
    field.onChange(person);
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

  // Create Suffix for Required and Optional fields
  const optionalText = <span className="optional-text">(Optional)</span>;
  const requiredFieldIndicator = <span className="required-text">*</span>;

  return (
    <div className="flex flex-column align-items-center">
      {isLoading && <LoadingIndicator />}

      <ConfirmDialog
        acceptLabel={CONFIRM_LABEL}
        rejectLabel={CANCEL_LABEL}
        closable={false}
        acceptClassName="p-button-sm"
        rejectClassName="p-button-outlined p-button-sm"
        defaultFocus="reject"
        style={{ maxWidth: "30%" }}
      />

      <Header />

      <div className="flex-1  w-11  p-3">
        <Breadcrumb items={getBreadcrumbItems(!!resourceId)} />

        {/* Add resource form */}
        <form autoComplete="off">
          {/* Page Header section */}
          <div className="flex align-items-center mb-5 w-full">
            <h1 className="font-bold text-xl line-height-2">
              {getPageTitle(!!resourceId)}
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
            {/* Email field */}
            <Controller
              name={RESOURCE_DETAILS_KEY}
              control={control}
              rules={{
                required: REQUIRED_MESSAGE.replace(
                  "{0}",
                  RESOURCE_DETAILS_LABEL.slice(0, -1)
                ),
              }}
              render={({ field, fieldState }) => (
                <div className="flex flex-column gap-1">
                  {/* Add resource section */}
                  <div className="flex flex-column gap-2 w-5 item-min-width">
                    <div className="font-bold text-base">
                      {EMAIL} {requiredFieldIndicator}
                    </div>

                    <PersonSearch
                      onUpdate={(model: Person) => {
                        updateResourceInfo(model, field);
                      }}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  </div>

                  {getFormErrorMessage(RESOURCE_DETAILS_KEY)}
                </div>
              )}
            />

            {/* Resource details field */}
            <Controller
              name={RESOURCE_DETAILS_KEY}
              control={control}
              render={({ field }) => (
                <>
                  {field.value && (
                    <div className="flex flex-column gap-2 w-5 item-min-width">
                      <div className="font-bold text-base">
                        {RESOURCE_DETAILS_LABEL}
                      </div>

                      <PersonInfoCard model={field.value} />
                    </div>
                  )}
                </>
              )}
            />

            {/* Line Function field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {LINE_FUNCTION}
                {requiredFieldIndicator}
              </div>

              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={ResourceListField.LINE_FUNCTION}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace("{0}", LINE_FUNCTION),
                    }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        options={lineFunctions || []}
                        optionLabel="label"
                        className={
                          "w-5 item-min-width " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />

                  <label>Select</label>
                </div>
                {getFormErrorMessage(ResourceListField.LINE_FUNCTION)}
              </div>
            </div>

            {/* Deal stage field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {STAGE}
                {requiredFieldIndicator}
              </div>
              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={!!resourceId ? ResourceListField.STAGE : STAGES}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace("{0}", STAGE),
                    }}
                    render={({ field, fieldState }) =>
                      !!resourceId ? (
                        <Dropdown
                          options={stages || []}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          optionLabel="label"
                          className={
                            "w-5 item-min-width " +
                            classNames({ "p-invalid": fieldState.invalid })
                          }
                        />
                      ) : (
                        <MultiSelect
                          options={stages || []}
                          value={field.value}
                          onChange={(e: MultiSelectChangeEvent) =>
                            field.onChange(e.value)
                          }
                          optionLabel="label"
                          maxSelectedLabels={1}
                          className={
                            "w-5 item-min-width " +
                            classNames({ "p-invalid": fieldState.invalid })
                          }
                        />
                      )
                    }
                  />

                  <label>Select</label>
                </div>
                {getFormErrorMessage(ResourceListField.STAGE)}
              </div>
            </div>

            {/* VDR Access Requested field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {VDR_ACCESS}
                {requiredFieldIndicator}
              </div>

              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={ResourceListField.VDR_ACCESS}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace("{0}", VDR_ACCESS),
                    }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        options={booleanOptions || []}
                        optionLabel="label"
                        className={
                          "w-5 item-min-width " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />

                  <label>Select</label>
                </div>
                {getFormErrorMessage(ResourceListField.VDR_ACCESS)}
              </div>
            </div>

            {/* Web-based Training field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {WEB_TRAINING}
                {requiredFieldIndicator}
              </div>

              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={ResourceListField.WEB_TRAINING}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace("{0}", WEB_TRAINING),
                    }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        options={webTrainingOptions || []}
                        optionLabel="label"
                        className={
                          "w-5 item-min-width " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />

                  <label>Select</label>
                </div>
                {getFormErrorMessage(ResourceListField.WEB_TRAINING)}
              </div>
            </div>

            {/* Kick off attendance field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {KICK_OFF_ATTENDANCE} {optionalText}
              </div>
              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={ResourceListField.KICK_OFF_ATTENDANCE}
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputTextarea
                        id={field.name}
                        {...field}
                        rows={5}
                        cols={30}
                        className={
                          "w-5 item-min-width " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />
                  <label>Type</label>
                </div>
                {getFormErrorMessage(ResourceListField.KICK_OFF_ATTENDANCE)}
              </div>
            </div>

            {/* Optional field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {OPTIONAL} {optionalText}
              </div>
              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={ResourceListField.OPTIONAL}
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputTextarea
                        id={field.name}
                        {...field}
                        rows={5}
                        cols={30}
                        className={
                          "w-5 item-min-width " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />
                  <label>Type</label>
                </div>
                {getFormErrorMessage(ResourceListField.OPTIONAL)}
              </div>
            </div>

            {/* Core Team Member field */}
            <div className="flex flex-column gap-2">
              <div className="font-bold text-base">
                {CORE_TEAM_MEMBER}
                {requiredFieldIndicator}
              </div>

              <div className="field">
                <div className="p-float-label">
                  <Controller
                    name={ResourceListField.CORE_TEAM_MEMBER}
                    control={control}
                    rules={{
                      required: REQUIRED_MESSAGE.replace(
                        "{0}",
                        CORE_TEAM_MEMBER
                      ),
                    }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        options={booleanOptions || []}
                        optionLabel="label"
                        className={
                          "w-5 item-min-width " +
                          classNames({ "p-invalid": fieldState.invalid })
                        }
                      />
                    )}
                  />

                  <label>Select</label>
                </div>
                {getFormErrorMessage(ResourceListField.CORE_TEAM_MEMBER)}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourcePage;
