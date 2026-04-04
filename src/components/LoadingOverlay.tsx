import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Progress from "@radix-ui/react-progress";
import { colors, fonts } from "../theme";
import type { ScanState } from "../types";
import { SCAN_STEPS } from "../hooks";

interface LoadingOverlayProps extends ScanState {
  active: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ active, currentFile, fileIndex, totalFiles, currentStep }) => {
  const progressValue = ((fileIndex * SCAN_STEPS.length + currentStep) / (totalFiles * SCAN_STEPS.length)) * 100;

  return (
    <Dialog.Root open={active}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ position: "fixed", inset: 0, background: "rgba(9,12,16,.94)", backdropFilter: "blur(8px)", zIndex: 100 }} />
        <Dialog.Content
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: 400,
            textAlign: "center",
            zIndex: 101,
            outline: "none",
          }}
        >
          <div style={{ display: "inline-block", width: 52, height: 52, borderRadius: "50%", border: `3px solid ${colors.border}`, borderTopColor: colors.accent, animation: "spin .8s linear infinite", marginBottom: 24 }} />
          
          <Progress.Root
            value={progressValue}
            style={{ position: "relative", overflow: "hidden", background: colors.surface2, borderRadius: 10, width: "100%", height: 6, marginBottom: 32 }}
          >
            <Progress.Indicator
              style={{ background: colors.accent, width: "100%", height: "100%", transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)", transform: `translateX(-${100 - progressValue}%)` }}
            />
          </Progress.Root>

          <div style={{ fontSize: ".75rem", color: colors.accent2, marginBottom: 12, fontWeight: 600 }}>
            Audit in progress: {fileIndex + 1}/{totalFiles}
          </div>
          <div style={{ fontSize: ".85rem", fontWeight: 700, marginBottom: 24, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {currentFile}
          </div>

          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 8 }}>
            {SCAN_STEPS.map((step, i) => {
              const isDone = i < currentStep;
              const isActive = i === currentStep;
              return (
                <div key={step} style={{ fontSize: ".73rem", color: isDone ? colors.accent : isActive ? colors.text : colors.muted, transition: "color .3s" }}>
                  {isDone ? "✓" : isActive ? "›" : "○"} {step}
                </div>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
