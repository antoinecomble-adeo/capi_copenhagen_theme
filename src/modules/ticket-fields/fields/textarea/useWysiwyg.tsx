import { useCallback, useRef } from "react";
import { notify } from "../../../shared";

interface UseWysiwygOptions {
  hasWysiwyg: boolean;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  brandId: number;
  onChange?: (value: string) => void;
}

export function useWysiwyg({
  hasWysiwyg,
  baseLocale,
  hasAtMentions,
  userRole,
  brandId,
  onChange,
}: UseWysiwygOptions) {
  const isInitializedRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  return useCallback(
    async (ref: HTMLTextAreaElement) => {
      if (hasWysiwyg && ref && !isInitializedRef.current) {
        isInitializedRef.current = true;

        const { createEditor } = await import("@zendesk/help-center-wysiwyg");

        const editor = await createEditor(ref, {
          editorType: "supportRequests",
          hasAtMentions,
          userRole,
          brandId,
          baseLocale,
        });

        const notifications = editor.plugins.get("Notification");

        // Handle generic notifications and errors with "toast" notifications
        notifications.on(
          "show",
          (
            event: { stop: () => void },
            data: {
              message: Error | string;
              title: string;
              type: "warning" | "info" | "success";
            }
          ) => {
            event.stop(); // Prevent the default notification from being shown via window.alert

            const message =
              data.message instanceof Error
                ? data.message.message
                : data.message;

            const { type, title } = data;

            notify({ type, title, message });
          }
        );

        editor.model.document.on("change:data", () => {
          onChangeRef.current?.(editor.getData());
        });
      }
    },
    [hasWysiwyg, baseLocale, hasAtMentions, userRole, brandId]
  );
}
