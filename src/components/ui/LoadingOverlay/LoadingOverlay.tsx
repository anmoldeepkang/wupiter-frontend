import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {FC} from "react";
import styled from "styled-components";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export type LoadingOverlayProps = {
  isLoading: boolean;
}

export const LoadingOverlay: FC<LoadingOverlayProps> = ({isLoading, children, ...props}) => {
  return (
    <>
      {isLoading && (
        <Overlay className="loading-overlay">
          <OverlaySpinner><FontAwesomeIcon icon={faSpinner} spin={true} size="4x"/></OverlaySpinner>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  display: none;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9998;
  align-items: center;
  justify-content: center;

  display: flex;
`;

const OverlaySpinner = styled.div`
`;
