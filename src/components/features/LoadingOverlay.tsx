import React from "react";
import { colors } from "../../theme";
import { SCAN_STEPS } from "../../hooks/useScanFlow";
import type { ScanState } from "../../types";

interface LoadingOverlayProps extends ScanState {
  active: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  active,
  currentFile,
  fileIndex,
  totalFiles,
  currentStep,
}) => {
  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(9,12,16,.94)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: `3px solid ${colors.border}`,
          borderTopColor: colors.accent,
          animation: "spin .8s linear infinite",
        }}
      />

      {/* Steps */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{ fontSize: ".7rem", color: colors.accent2, marginBottom: 10 }}
        >
          ({fileIndex + 1}/{totalFiles}) {currentFile}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            minWidth: 260,
            textAlign: "left",
          }}
        >
          {SCAN_STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div
                key={step}
                style={{
                  fontSize: ".73rem",
                  lineHeight: 1.8,
                  color: isDone
                    ? colors.accent
                    : isActive
                      ? colors.text
                      : colors.muted,
                  transition: "color .3s",
                }}
              >
                {isDone ? `✓ ${step}` : isActive ? `› ${step}` : step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
