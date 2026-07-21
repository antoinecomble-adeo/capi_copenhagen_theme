import type {
  AnswerBot,
  AnswerBotGenerativeExperience,
  RequestForm,
} from "./data-types";
import { Fragment, useCallback, useState } from "react";
import { TicketFormField } from "./ticket-form-field/TicketFormField";
import { ParentTicketField } from "./parent-ticket-field/ParentTicketField";
import { Anchor, Button } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { Alert } from "@zendeskgarden/react-notifications";
import { useFormSubmit } from "./useFormSubmit";
import { usePrefilledTicketFields } from "./usePrefilledTicketFields";
import { Attachments } from "../ticket-fields/fields/attachments/Attachments";
import { getVisibleFields } from "../ticket-fields/getVisibleFields";
import { CcField } from "./fields/cc-field/CcField";
import { SuggestedArticles } from "./suggested-articles/SuggestedArticles";
import { AnswerBotModal } from "./answer-bot-modal/AnswerBotModal";
import { useTranslation } from "react-i18next";
import { Paragraph } from "@zendeskgarden/react-typography";
import { DropDown, Input, TextArea, RequestFormField } from "../ticket-fields";
import type { Organization } from "../ticket-fields/data-types/Organization";
import type { TicketFieldObject } from "../ticket-fields/data-types/TicketFieldObject";
import { GenerativeAnswerBotModal } from "./answer-bot-generative-modal/GenerativeAnswerBotModal";

export interface NewRequestFormProps {
  requestForm: RequestForm;
  wysiwyg: boolean;
  newRequestPath: string;
  parentId: string;
  parentIdPath: string;
  locale: string;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  brandId: number;
  showSuggestedArticles: boolean;
  organizations: Array<Organization>;
  answerBotModal: {
    answerBot: AnswerBot | null;
    answerBotGenerativeExperience: AnswerBotGenerativeExperience | null;
    hasRequestManagement: boolean;
    isSignedIn: boolean;
    helpCenterPath: string;
    requestsPath: string;
    requestPath: string;
  };
}

const StyledParagraph = styled(Paragraph)`
  margin: ${(props) => props.theme.space.md} 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.md};
`;

const Footer = styled.div`
  margin-top: ${(props) => props.theme.space.md};
`;

export function NewRequestForm({
  requestForm,
  wysiwyg,
  newRequestPath,
  parentId,
  parentIdPath,
  locale,
  baseLocale,
  hasAtMentions,
  userRole,
  userId,
  brandId,
  showSuggestedArticles,
  organizations,
  answerBotModal,
}: NewRequestFormProps) {
  const {
    ticket_fields,
    action,
    http_method,
    accept_charset,
    errors,
    parent_id_field,
    ticket_form_field,
    email_field,
    cc_field,
    organization_field,
    due_date_field,
    end_user_conditions,
    attachments_field,
    inline_attachments_fields,
    description_mimetype_field,
  } = requestForm;

  let currentAttachmentsCount = 0;
      if (attachments_field) {
        attachments_field.isRequired = true; // Not required as can be passed in description
        attachments_field.description = "Please attach the necessary file here or link in description."; // Set the attachments field description
       }

      // Matches Google Docs links, Google Drive links, and direct links to image files
      const fileLinkRegex = /https:\/\/docs\.google\.com\/document\/d\/[^\/\s]+\/|https:\/\/drive\.google\.com\/drive\/\S+|https?:\/\/\S+\.(?:jpe?g|png|gif|bmp|webp|svg)/i;

      // This can be condensed into a much lighter method depending on how many verification you want to conduct
      const hasFileLinkInDescription = () => {
        const descriptionField = ticketFields.find((field) => field.type === "description");
        if (!descriptionField || typeof descriptionField.value !== "string") {
          return undefined; // Description field is missing or not a string
        }
        const match = (descriptionField.value as string).match(fileLinkRegex);
        return match?.[0];
      }

      const hasFileInDescription = () => hasFileLinkInDescription();


  const { answerBot, answerBotGenerativeExperience } = answerBotModal;
  const {
    ticketFields: prefilledTicketFields,
    emailField,
    ccField,
    organizationField: prefilledOrganizationField,
    dueDateField: prefilledDueDateField,
  } = usePrefilledTicketFields({
    ticketFields: ticket_fields,
    emailField: email_field,
    ccField: cc_field,
    organizationField: organization_field,
    dueDateField: due_date_field,
  });
  const [ticketFields, setTicketFields] = useState(prefilledTicketFields);
  const [organizationField, setOrganizationField] = useState(
    prefilledOrganizationField
  );
  const [dueDateField, setDueDateField] = useState(prefilledDueDateField);
  const visibleFields = getVisibleFields(ticketFields, end_user_conditions);
  const { formRefCallback, handleSubmit } = useFormSubmit(ticketFields);
  const { t } = useTranslation();
  const defaultOrganizationId =
    organizations.length > 0 && organizations[0]?.id
      ? organizations[0]?.id?.toString()
      : null;

  const handleChange = useCallback(
    (field: TicketFieldObject, value: TicketFieldObject["value"]) => {
      setTicketFields(
        ticketFields.map((ticketField) =>
          ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField
        )
      );
    },
    [ticketFields]
  );

  function handleOrganizationChange(value: string) {
    if (organizationField === null) {
      return;
    }

    setOrganizationField({ ...organizationField, value });
  }

  const handleDueDateChange = useCallback(
    (value: string) => {
      if (dueDateField === null) {
        return;
      }

      setDueDateField({ ...dueDateField, value });
    },
    [dueDateField]
  );

  const answerBotModalEnabled =
    !!answerBot?.auth_token &&
    !!answerBot?.interaction_access_token &&
    !!answerBot?.articles?.length &&
    !!answerBot?.request_id;

  const answerBotGenerativeModalEnabled =
    answerBotGenerativeExperience &&
    Boolean(answerBotGenerativeExperience.request_id);

  return (
    <>
      {parentId && (
        <StyledParagraph>
          <Anchor href={parentIdPath}>
            {t(
              "new-request-form.parent-request-link",
              "Follow-up to request {{parentId}}",
              {
                parentId: `\u202D#${parentId}\u202C`,
              }
            )}
          </Anchor>
        </StyledParagraph>
      )}
      <StyledParagraph aria-hidden="true">
        {t(
          "new-request-form.required-fields-info",
          "Fields marked with an asterisk (*) are required."
        )}
      </StyledParagraph>
      <Form
        ref={formRefCallback}
        action={action}
        method={http_method}
        acceptCharset={accept_charset}
        noValidate
        onSubmit={handleSubmit}
      >
        {errors && <Alert type="error">{errors}</Alert>}
        {parent_id_field && <ParentTicketField field={parent_id_field} />}
        {ticket_form_field.options.length > 0 && (
          <TicketFormField
            field={ticket_form_field}
            newRequestPath={newRequestPath}
          />
        )}
        {emailField && <Input key={emailField.name} field={emailField} />}
        {ccField && <CcField field={ccField} />}
        {organizationField && (
          <DropDown
            key={organizationField.name}
            field={organizationField}
            onChange={(value) => {
              handleOrganizationChange(value);
            }}
          />
        )}
        {visibleFields.map((field) => {
          if (field.type === "subject") {
            return (
              <Fragment key={field.name}>
                <Input
                  field={field}
                  onChange={(value) => handleChange(field, value)}
                />
                {showSuggestedArticles && (
                  <SuggestedArticles
                    query={field.value as string | undefined}
                    locale={locale}
                  />
                )}
              </Fragment>
            );
          } else if (field.type === "description") {
            return (
              <Fragment key={field.name}>
                <TextArea
                  field={field}
                  hasWysiwyg={wysiwyg}
                  baseLocale={baseLocale}
                  hasAtMentions={hasAtMentions}
                  userRole={userRole}
                  brandId={brandId}
                  onChange={(value) => handleChange(field, value)}
                />
                <input
                  type="hidden"
                  name={description_mimetype_field.name}
                  value={wysiwyg ? "text/html" : "text/plain"}
                />
              </Fragment>
            );
          } else {
            return (
              <RequestFormField
                key={field.name}
                field={field}
                baseLocale={baseLocale}
                hasAtMentions={hasAtMentions}
                userRole={userRole}
                userId={userId}
                brandId={brandId}
                dueDateField={dueDateField}
                handleDueDateChange={handleDueDateChange}
                organizationField={organizationField}
                defaultOrganizationId={defaultOrganizationId}
                visibleFields={visibleFields}
                handleChange={handleChange}
              />
            );
          }
        })}
        {attachments_field && (
          <Attachments
            field={attachments_field}
            baseLocale={baseLocale}
            onAttachmentCountChange={(count) => {
              currentAttachmentsCount = count;
            }}
            />
        )}
        {inline_attachments_fields.map(({ type, name, value }, index) => (
          <input key={index} type={type} name={name} value={value} />
        ))}
        <Footer>
          {(ticket_form_field.options.length === 0 ||
            ticket_form_field.value) && (
            <Button isPrimary type="submit" onClick = {(e) => {
                                            		   // We check if 1 attachment is either attached or pasted
                                                            if (currentAttachmentsCount === 0 && hasFileInDescription() === undefined) {
                                                              e.preventDefault();
                                                              alert(t("new-request-form.attachments-required-alert", "Please attach at least one file before submitting the form."));
                                                            }
                                                          }}

                                                         >
              {t("new-request-form.submit", "Submit")}
            </Button>
          )}
        </Footer>
      </Form>
      {answerBotModalEnabled && (
        <AnswerBotModal
          authToken={answerBot.auth_token!}
          interactionAccessToken={answerBot.interaction_access_token!}
          articles={answerBot.articles!}
          requestId={answerBot.request_id!}
          {...answerBotModal}
        />
      )}
      {answerBotGenerativeModalEnabled && (
        <GenerativeAnswerBotModal
          requestId={Number(answerBotGenerativeExperience.request_id)}
          {...answerBotModal}
        />
      )}
    </>
  );
}
